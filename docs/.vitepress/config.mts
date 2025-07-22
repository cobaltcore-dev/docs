import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";


// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  title: "CobaltCore",
  description: "Opinionated OpenStack distribution that builds upon IronCore’s foundation to support non-cloud-native workloads",
  head: [['link', { rel: 'icon', href: 'https://raw.githubusercontent.com/cobaltcore-dev/.github/refs/heads/main/assets/Logo_Cobalt_Core_background_white.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Architecture', link: '/architecture' }
    ],

    editLink: {
      pattern: 'https://github.com/cobaltcore-dev/.github/blob/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      copyright: `Copyright ${new Date().getFullYear()} SAP SE or an SAP affiliate company and cobaltcore-dev contributors.`
    },

    logo: { src: 'https://raw.githubusercontent.com/cobaltcore-dev/.github/refs/heads/main/assets/Logo_Cobalt_Core_background_white.svg', width: 24, height: 24 },

    search: {
      provider: 'local'
    },

    sidebar: [
      {
        text: 'Contents',
        items: [
          { text: 'Architecture', link: '/architecture' },
          { text: 'API Reference', link: '/api' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cobaltcore-dev' }
    ]
  }
}))
