import { withMermaid } from "vitepress-plugin-mermaid";
import { generateSidebar } from 'vitepress-sidebar';
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "CobaltCore",
  description: "Opinionated OpenStack distribution that builds upon IronCore's foundation to support non-cloud-native workloads",
  base: "/docs/",
  head: [['link', { rel: 'icon', href: 'https://raw.githubusercontent.com/cobaltcore-dev/.github/refs/heads/main/assets/Logo_Cobalt_Core_background_white.svg' }]],
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
          { text: 'Platform', link: '/platform/' },
          { text: 'Compute', link: '/compute/' },
          { text: 'OpenStack', link: '/openstack/' },
          { text: 'Storage', link: '/storage/' },
          { text: 'Networking', link: '/networking/' },
          { text: 'Observability', link: '/observability/' },
          { text: 'Management', link: '/management/' },
          { text: 'API Reference', link: '/api/' },
        ],
      },
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

    sidebar: generateSidebar([
      {
        documentRootPath: '/docs/',
        scanStartPath: 'overview',
        resolvePath: '/overview/',
        useTitleFromFileHeading: false,
        useTitleFromFrontmatter: true,
        useFolderLinkFromIndexFile: true,
        useFolderTitleFromIndexFile: true,
        sortMenusByFrontmatterOrder: true,
      },
      {
        documentRootPath: '/docs/',
        scanStartPath: 'getting-started',
        resolvePath: '/getting-started/',
        useTitleFromFileHeading: false,
        useTitleFromFrontmatter: true,
        useFolderLinkFromIndexFile: true,
        useFolderTitleFromIndexFile: true,
        sortMenusByFrontmatterOrder: true,
      },
      {
        documentRootPath: '/docs/',
        scanStartPath: 'platform',
        resolvePath: '/platform/',
        useTitleFromFileHeading: false,
        useTitleFromFrontmatter: true,
        useFolderLinkFromIndexFile: true,
        useFolderTitleFromIndexFile: true,
        sortMenusByFrontmatterOrder: true,
      },
      {
        documentRootPath: '/docs/',
        scanStartPath: 'compute',
        resolvePath: '/compute/',
        useTitleFromFileHeading: false,
        useTitleFromFrontmatter: true,
        useFolderLinkFromIndexFile: true,
        useFolderTitleFromIndexFile: true,
        sortMenusByFrontmatterOrder: true,
      },
      {
        documentRootPath: '/docs/',
        scanStartPath: 'openstack',
        resolvePath: '/openstack/',
        useTitleFromFileHeading: false,
        useTitleFromFrontmatter: true,
        useFolderLinkFromIndexFile: true,
        useFolderTitleFromIndexFile: true,
        sortMenusByFrontmatterOrder: true,
      },
      {
        documentRootPath: '/docs/',
        scanStartPath: 'storage',
        resolvePath: '/storage/',
        useTitleFromFileHeading: false,
        useTitleFromFrontmatter: true,
        useFolderLinkFromIndexFile: true,
        useFolderTitleFromIndexFile: true,
        sortMenusByFrontmatterOrder: true,
      },
      {
        documentRootPath: '/docs/',
        scanStartPath: 'networking',
        resolvePath: '/networking/',
        useTitleFromFileHeading: false,
        useTitleFromFrontmatter: true,
        useFolderLinkFromIndexFile: true,
        useFolderTitleFromIndexFile: true,
        sortMenusByFrontmatterOrder: true,
      },
      {
        documentRootPath: '/docs/',
        scanStartPath: 'observability',
        resolvePath: '/observability/',
        useTitleFromFileHeading: false,
        useTitleFromFrontmatter: true,
        useFolderLinkFromIndexFile: true,
        useFolderTitleFromIndexFile: true,
        sortMenusByFrontmatterOrder: true,
      },
      {
        documentRootPath: '/docs/',
        scanStartPath: 'management',
        resolvePath: '/management/',
        useTitleFromFileHeading: false,
        useTitleFromFrontmatter: true,
        useFolderLinkFromIndexFile: true,
        useFolderTitleFromIndexFile: true,
        sortMenusByFrontmatterOrder: true,
      },
      {
        documentRootPath: '/docs/',
        scanStartPath: 'api',
        resolvePath: '/api/',
        useTitleFromFileHeading: false,
        useTitleFromFrontmatter: true,
        useFolderLinkFromIndexFile: true,
        useFolderTitleFromIndexFile: true,
        sortMenusByFrontmatterOrder: true,
      },
      {
        documentRootPath: '/docs/',
        scanStartPath: 'changelog',
        resolvePath: '/changelog/',
        useTitleFromFileHeading: false,
        useTitleFromFrontmatter: true,
        useFolderLinkFromIndexFile: true,
        useFolderTitleFromIndexFile: true,
        sortMenusByFrontmatterOrder: true,
      },
    ]),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cobaltcore-dev' }
    ],
  },
})
