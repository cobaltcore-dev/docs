import { withMermaid } from "vitepress-plugin-mermaid";
import { generateSidebar } from 'vitepress-sidebar';
import { fileURLToPath, URL } from 'node:url'

function storageSidebar() {
  const generated = generateSidebar([{
    documentRootPath: '/docs/',
    scanStartPath: 'storage',
    resolvePath: '/storage/',
    capitalizeFirst: false,
    useTitleFromFrontmatter: true,
    useFolderLinkFromIndexFile: true,
    useFolderTitleFromIndexFile: true,
    sortMenusByFrontmatterOrder: true,
    excludePattern: ['observability/**'],
  }]);
  const items = generated['/storage/'].items.filter((i: any) => i.link !== 'index.md');
  return {
    '/storage/': {
      base: '/storage/',
      items: [
        { text: 'Storage', items: [{ text: 'Overview', link: 'index.md' }, ...items] },
      ],
    },
  };
}

function observabilitySidebar() {
  const generated = generateSidebar([{
    documentRootPath: '/docs/',
    scanStartPath: 'observability',
    resolvePath: '/observability/',
    capitalizeFirst: false,
    useTitleFromFrontmatter: true,
    useFolderLinkFromIndexFile: true,
    useFolderTitleFromIndexFile: true,
    sortMenusByFrontmatterOrder: true,
  }]);
  const items = generated['/observability/'].items.filter((i: any) => i.link !== 'index.md');
  return {
    '/observability/': {
      base: '/observability/',
      items: [
        { text: 'Observability', items: [{ text: 'Overview', link: 'index.md' }, ...items] },
      ],
    },
  };
}

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "CobaltCore",
  description: "Infrastructure management for cloud native and traditional workloads. Get your cloud running in weeks with Kubernetes-native orchestration and OpenStack-influenced services, fully open source.",
  base: "/",
  head: [
    ['link', { rel: 'icon', href: 'https://raw.githubusercontent.com/cobaltcore-dev/.github/refs/heads/main/assets/Logo_Cobalt_Core_background_white.svg' }],
    ['link', { rel: 'canonical', href: 'https://cobaltcore.dev/' }],
    ['meta', { property: 'og:url', content: 'https://cobaltcore.dev/' }],
    ['meta', { property: 'og:title', content: 'CobaltCore — Cloud Infrastructure Docs' }],
    ['meta', { property: 'og:description', content: 'Infrastructure management for cloud native and traditional workloads. Kubernetes-native orchestration and OpenStack-influenced services, fully open source.' }],
    ['meta', { property: 'og:image', content: 'https://cobaltcore.dev/social-preview.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'CobaltCore — Cloud Infrastructure Docs' }],
    ['meta', { name: 'twitter:description', content: 'Infrastructure management for cloud native and traditional workloads. Kubernetes-native orchestration and OpenStack-influenced services, fully open source.' }],
    ['meta', { name: 'twitter:image', content: 'https://cobaltcore.dev/social-preview.png' }],
  ],
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPFooter.vue', import.meta.url)
          )
        },
      ]
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Overview', link: '/overview/' },
      { text: 'Getting Started', link: '/getting-started/' },
      {
        text: 'Documentation',
        items: [
          { text: 'Bare Metal Management', link: '/bare-metal/' },
          { text: 'Compute', link: '/compute/' },
          { text: 'Storage', link: '/storage/' },
          { text: 'Network', link: '/network/' },
          { text: 'OpenStack', link: '/openstack/' },
          {
            text: 'Operations',
            link: '/overview/',
            items: [
              { text: 'Platform', link: '/platform/' },
              { text: 'Observability', link: '/observability/' },
              { text: 'Sustainability', link: '/sustainability/' },
            ],
          },
        ],
      },
      { text: 'Blog', link: '/blog/' },
      { text: 'Community', link: '/community/' },
    ],

    editLink: {
      pattern: 'https://github.com/cobaltcore-dev/docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    logo: { src: 'https://raw.githubusercontent.com/cobaltcore-dev/.github/refs/heads/main/assets/Logo_Cobalt_Core_background_white.svg', width: 24, height: 24 },

    footer: {
      message: '',
    },

    search: {
      provider: 'local'
    },

    sidebar: {
      ...generateSidebar([
        {
          documentRootPath: '/docs/',
          scanStartPath: 'bare-metal',
          resolvePath: '/bare-metal/',
          capitalizeFirst: false,
          useTitleFromFrontmatter: true,
          useFolderLinkFromIndexFile: true,
          useFolderTitleFromIndexFile: true,
          sortMenusByFrontmatterOrder: true,
        },
        {
          documentRootPath: '/docs/',
          scanStartPath: 'overview',
          resolvePath: '/overview/',
          capitalizeFirst: false,
          useTitleFromFrontmatter: true,
          useFolderLinkFromIndexFile: true,
          useFolderTitleFromIndexFile: true,
          sortMenusByFrontmatterOrder: true,
        },
        {
          documentRootPath: '/docs/',
          scanStartPath: 'getting-started',
          resolvePath: '/getting-started/',
          capitalizeFirst: false,
          useTitleFromFrontmatter: true,
          useFolderLinkFromIndexFile: true,
          useFolderTitleFromIndexFile: true,
          sortMenusByFrontmatterOrder: true,
        },
        {
          documentRootPath: '/docs/',
          scanStartPath: 'compute',
          resolvePath: '/compute/',
          capitalizeFirst: false,
          useTitleFromFrontmatter: true,
          useFolderLinkFromIndexFile: true,
          useFolderTitleFromIndexFile: true,
          sortMenusByFrontmatterOrder: true,
        },
        {
          documentRootPath: '/docs/',
          scanStartPath: 'openstack',
          resolvePath: '/openstack/',
          capitalizeFirst: false,
          useTitleFromFrontmatter: true,
          useFolderLinkFromIndexFile: true,
          useFolderTitleFromIndexFile: true,
          sortMenusByFrontmatterOrder: true,
        },
        {
          documentRootPath: '/docs/',
          scanStartPath: 'network',
          resolvePath: '/network/',
          capitalizeFirst: false,
          useTitleFromFrontmatter: true,
          useFolderLinkFromIndexFile: true,
          useFolderTitleFromIndexFile: true,
          sortMenusByFrontmatterOrder: true,
        },
        {
          documentRootPath: '/docs/',
          scanStartPath: 'blog',
          resolvePath: '/blog/',
          capitalizeFirst: false,
          useTitleFromFrontmatter: true,
          useFolderLinkFromIndexFile: true,
          useFolderTitleFromIndexFile: true,
          sortMenusByFrontmatterOrder: true,
        },
        {
          documentRootPath: '/docs/',
          scanStartPath: 'community',
          resolvePath: '/community/',
          capitalizeFirst: false,
          useTitleFromFrontmatter: true,
          useFolderLinkFromIndexFile: true,
          useFolderTitleFromIndexFile: true,
          sortMenusByFrontmatterOrder: true,
        },
        {
          documentRootPath: '/docs/',
          scanStartPath: 'sustainability',
          resolvePath: '/sustainability/',
          capitalizeFirst: false,
          useTitleFromFrontmatter: true,
          useFolderLinkFromIndexFile: true,
          useFolderTitleFromIndexFile: true,
          sortMenusByFrontmatterOrder: true,
        },
      ]),
      ...storageSidebar(),
      ...observabilitySidebar(),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cobaltcore-dev' }
    ],
  },
})
