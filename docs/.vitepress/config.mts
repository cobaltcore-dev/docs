import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";
import { generateSidebar } from 'vitepress-sidebar';


// https://vitepress.dev/reference/site-config
export default defineConfig(withMermaid({
  title: "CobaltCore",
  description: "Opinionated OpenStack distribution that builds upon IronCore’s foundation to support non-cloud-native workloads",
  base: "/docs/",
  head: [['link', { rel: 'icon', href: 'https://raw.githubusercontent.com/cobaltcore-dev/.github/refs/heads/main/assets/Logo_Cobalt_Core_background_white.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Projects',
        items: [
          { text: 'ApeiroRA', link: 'https://apeirora.eu/' },
          { text: 'Gardener', link: 'https://gardener.cloud/' },
          { text: 'GardenLinux', link: 'https://github.com/gardenlinux/gardenlinux' },
          { text: 'IronCore', link: 'https://ironcore.dev/' },
          { text: 'IronCore Metal Operator', link: 'https://ironcore.dev/metal-operator/' },
          { text: 'OpenStack', link: 'https://www.openstack.org/' },
        ]
      },
    ],

    editLink: {
      pattern: 'https://github.com/cobaltcore-dev/docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      copyright: `Copyright ${new Date().getFullYear()} SAP SE or an SAP affiliate company and cobaltcore-dev contributors.`
    },

    logo: { src: 'https://raw.githubusercontent.com/cobaltcore-dev/.github/refs/heads/main/assets/Logo_Cobalt_Core_background_white.svg', width: 24, height: 24 },

    search: {
      provider: 'local'
    },

    sidebar: generateSidebar({
      documentRootPath: '/docs/',
      capitalizeFirst: true,
      useTitleFromFileHeading: false,
      useTitleFromFrontmatter: true,
      useFolderLinkFromIndexFile: true,
      useFolderTitleFromIndexFile: true,
    }),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cobaltcore-dev' }
    ],
  },
}))
