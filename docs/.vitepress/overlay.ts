// Build-time overlay of an upstream repository's VitePress docs into this site.
// The upstream checkout lives in docs/_upstream/<name> (gitignored) and is never modified:
// pages are mapped with `rewrites`, everything not published is excluded with `srcExclude`,
// and links are resolved in source space so they survive any URL mapping.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import type MarkdownIt from 'markdown-it'

export interface OverlayOptions {
  srcDir: string                       // absolute path of this site's srcDir
  checkout: string                     // upstream checkout, relative to srcDir
  mount: string                        // URL prefix on this site, e.g. 'openstack'
  ref?: string                         // upstream ref used for blob links
  routes?: Record<string, string>      // per-file overrides: upstream docs path -> path below mount
  groupTitles?: Record<string, string> // rename upstream sidebar groups
}

interface Manifest { canonical: string; repository: string; publish: string[] }

const globToRegExp = (g: string) =>
  new RegExp('^' + g.split('**').map(p => p.split('*').map(s => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('[^/]*')).join('.*') + '$')

function walk(dir: string, base = dir): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p, base) : [path.relative(base, p).split(path.sep).join('/')]
  })
}

export function createOverlay(o: OverlayOptions) {
  const root = path.join(o.srcDir, o.checkout)
  const docs = path.join(root, 'docs')
  const manifestFile = path.join(docs, '.vitepress', 'publish.json')
  const present = fs.existsSync(manifestFile)
  const manifest: Manifest = present
    ? JSON.parse(fs.readFileSync(manifestFile, 'utf8'))
    : { canonical: '', repository: '', publish: [] }
  const ref = o.ref ?? 'main'
  const published = manifest.publish.map(globToRegExp)
  const isPublished = (rel: string) => published.some(r => r.test(rel))
  const prefix = `${o.checkout}/docs/`

  // upstream docs path (e.g. 'guides/x.md') -> site path (e.g. 'openstack/guides/x.md')
  const route = (rel: string) => `${o.mount}/${o.routes?.[rel] ?? rel}`

  const srcExclude = present
    ? walk(root).filter(f => f.endsWith('.md'))
        .filter(f => !(f.startsWith('docs/') && isPublished(f.slice(5))))
        .map(f => `${o.checkout}/${f}`)
    : []

  const rewrites = (id: string) => (id.startsWith(prefix) ? route(id.slice(prefix.length)) : id)

  // Resolve a link target found in an upstream page to a URL on this site, the canonical
  // upstream site (unpublished pages) or the upstream repository (files outside docs/).
  function resolveHref(href: string, realPath: string): string | undefined {
    if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//') || href.startsWith('#')) return
    const [p, hash = ''] = href.split(/(?=#)/)
    const abs = p.startsWith('/') ? path.join(docs, p) : path.resolve(path.dirname(realPath), p)
    const inDocs = path.relative(docs, abs)
    if (inDocs.startsWith('..')) return `${manifest.repository}/blob/${ref}/${path.relative(root, abs)}${hash}`
    let rel = inDocs.split(path.sep).join('/')
    if (p.endsWith('/') || rel === '') rel = rel ? `${rel}/index.md` : 'index.md'
    else if (rel.endsWith('.html')) rel = rel.slice(0, -5) + '.md'
    else if (!path.extname(rel)) rel += '.md'
    if (!rel.endsWith('.md')) return `${manifest.repository}/blob/${ref}/docs/${rel}`
    if (isPublished(rel)) return `/${route(rel)}${hash}`
    return manifest.canonical + rel.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '.html') + hash
  }

  function markdown(md: MarkdownIt) {
    md.core.ruler.push('upstream-links', state => {
      const realPath: string | undefined = state.env?.realPath ?? state.env?.path
      if (!realPath || !realPath.startsWith(docs + path.sep)) return
      for (const t of state.tokens) {
        for (const c of t.children ?? []) {
          if (c.type !== 'link_open') continue
          const href = c.attrGet('href')
          const next = href && resolveHref(href, realPath)
          if (next) c.attrSet('href', next)
        }
      }
    })
  }

  // Upstream sidebar, reduced to published pages and mapped to site URLs.
  async function sidebar(): Promise<any[]> {
    if (!present) return []
    const { default: raw } = await import(pathToFileURL(path.join(docs, '.vitepress', 'sidebar.ts')).href)
    const map = (link: string) => {
      let rel = link.replace(/^\//, '')
      rel = rel === '' || rel.endsWith('/') ? `${rel}index.md` : `${rel}.md`
      return isPublished(rel) ? `/${route(rel)}`.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '') : undefined
    }
    const prune = (item: any): any | undefined => {
      const link = item.link ? map(item.link) : undefined
      let items = item.items?.map(prune).filter(Boolean)
      if (items && link && items.every((i: any) => i.link === link && !i.items)) items = undefined
      if (!link && !items?.length) return
      return { ...item, text: o.groupTitles?.[item.text] ?? item.text, link, items }
    }
    return raw.map(prune).filter(Boolean)
  }

  return { present, manifest, srcExclude, rewrites, markdown, sidebar }
}
