import { withMermaid } from "vitepress-plugin-mermaid";
import { generateSidebar } from 'vitepress-sidebar';
import { fileURLToPath, URL } from 'node:url'

// Generate the raw items for a section, with index.md filtered out so it can be
// re-added manually as a pinned "Overview" entry.
function sectionItems(scanStartPath: string, resolvePath: string, extra: Record<string, any> = {}) {
  const generated = generateSidebar([{
    documentRootPath: '/docs/',
    scanStartPath,
    resolvePath,
    capitalizeFirst: false,
    useTitleFromFrontmatter: true,
    useFolderLinkFromIndexFile: true,
    useFolderTitleFromIndexFile: true,
    sortMenusByFrontmatterOrder: true,
    ...extra,
  }]);
  return generated[resolvePath].items.filter((i: any) => i.link !== 'index.md');
}

// Universal sidebar pattern: a named section header matching the section name,
// with a pinned "Overview" entry at the top followed by the generated items.
// Every section uses this; the header text is the banner shown in the sidebar.
function sectionSidebar(path: string, title: string, extra: Record<string, any> = {}) {
  const resolvePath = `/${path}/`;
  const items = sectionItems(path, resolvePath, extra);
  return {
    [resolvePath]: {
      base: resolvePath,
      items: [
        { text: title, items: [{ text: 'Overview', link: 'index.md' }, ...items] },
      ],
    },
  };
}

// Special case: the Operations Manual nests Platform, Observability and
// Sustainability under a single shared header across four routes.
function operationsSidebar() {
  const platformItems = sectionItems('operations/platform', '/operations/platform/');
  const observabilityItems = sectionItems('observability', '/observability/');
  const sustainabilityItems = sectionItems('sustainability', '/sustainability/');

  const sharedItems = [
    {
      text: 'Operations Manual',
      items: [
        { text: 'Overview', link: '/operations/' },
        {
          text: 'Platform',
          collapsed: true,
          base: '/operations/platform/',
          items: [{ text: 'Overview', link: 'index.md' }, ...platformItems],
        },
        {
          text: 'Observability',
          collapsed: true,
          base: '/observability/',
          items: [{ text: 'Overview', link: 'index.md' }, ...observabilityItems],
        },
        {
          text: 'Sustainability',
          collapsed: true,
          base: '/sustainability/',
          items: [{ text: 'Overview', link: 'index.md' }, ...sustainabilityItems],
        },
      ],
    },
  ];

  return {
    '/operations/': { items: sharedItems },
    '/operations/platform/': { items: sharedItems },
    '/observability/': { items: sharedItems },
    '/sustainability/': { items: sharedItems },
  };
}

// Special case: the Documentation nav links to About and shares a single sidebar
// across all seven documentation sections, nesting each (other than About) under
// a collapsible group with its own Overview + child pages.
function documentationSidebar() {
  const gettingStartedItems = sectionItems('getting-started', '/getting-started/');
  const controlPlaneItems = sectionItems('control-plane', '/control-plane/');
  const bareMetalItems = sectionItems('bare-metal', '/bare-metal/');
  const computeItems = sectionItems('compute', '/compute/');
  const storageItems = sectionItems('storage', '/storage/', { excludePattern: ['observability/**'] });
  const networkItems = sectionItems('network', '/network/');
  const openstackItems = sectionItems('openstack', '/openstack/');
  const aboutItems = sectionItems('about', '/about/');

  const sharedItems = [
    {
      text: 'Documentation',
      items: [
        {
          text: 'About CobaltCore',
          collapsed: true,
          base: '/about/',
          items: [{ text: 'Overview', link: 'index.md' }, ...aboutItems],
        },
        {
          text: 'Getting Started',
          collapsed: true,
          base: '/getting-started/',
          items: [{ text: 'Overview', link: 'index.md' }, ...gettingStartedItems],
        },
        {
          text: 'Control Plane',
          collapsed: true,
          base: '/control-plane/',
          items: [{ text: 'Overview', link: 'index.md' }, ...controlPlaneItems],
        },
        {
          text: 'Network',
          collapsed: true,
          base: '/network/',
          items: [{ text: 'Overview', link: 'index.md' }, ...networkItems],
        },
        {
          text: 'Bare Metal Management',
          collapsed: true,
          base: '/bare-metal/',
          items: [{ text: 'Overview', link: 'index.md' }, ...bareMetalItems],
        },
        {
          text: 'Compute',
          collapsed: true,
          base: '/compute/',
          items: [{ text: 'Overview', link: 'index.md' }, ...computeItems],
        },
        {
          text: 'Storage',
          collapsed: true,
          base: '/storage/',
          items: [{ text: 'Overview', link: 'index.md' }, ...storageItems],
        },
        {
          text: 'OpenStack',
          collapsed: true,
          base: '/openstack/',
          items: [{ text: 'Overview', link: 'index.md' }, ...openstackItems],
        },
      ],
    },
  ];

  return {
    '/about/': { items: sharedItems },
    '/getting-started/': { items: sharedItems },
    '/control-plane/': { items: sharedItems },
    '/bare-metal/': { items: sharedItems },
    '/compute/': { items: sharedItems },
    '/storage/': { items: sharedItems },
    '/network/': { items: sharedItems },
    '/openstack/': { items: sharedItems },
  };
}

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "CobaltCore",
  description: "Infrastructure management for cloud native and traditional workloads. Get your cloud running in weeks with Kubernetes-native orchestration and OpenStack-compatible API surface, fully open source.",
  base: "/",
  head: [
    ['link', { rel: 'icon', href: 'https://raw.githubusercontent.com/cobaltcore-dev/.github/refs/heads/main/assets/Logo_Cobalt_Core_background_white.svg' }],
    ['link', { rel: 'canonical', href: 'https://cobaltcore.dev/' }],
    ['meta', { property: 'og:url', content: 'https://cobaltcore.dev/' }],
    ['meta', { property: 'og:title', content: 'CobaltCore — Cloud Infrastructure Docs' }],
    ['meta', { property: 'og:description', content: 'Infrastructure management for cloud native and traditional workloads. Kubernetes-native orchestration and OpenStack-compatible API surface, fully open source.' }],
    ['meta', { property: 'og:image', content: 'https://cobaltcore.dev/social-preview.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'CobaltCore — Cloud Infrastructure Docs' }],
    ['meta', { name: 'twitter:description', content: 'Infrastructure management for cloud native and traditional workloads. Kubernetes-native orchestration and OpenStack-compatible API surface, fully open source.' }],
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
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Documentation',
        link: '/about/',
      },
      {
        text: 'Operations Manual',
        link: '/operations/',
      },
      { text: 'Blog', link: '/blog/' },
      { text: 'Community', link: '/community/' },
      { text: 'Governance', link: '/governance/' },
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
      ...sectionSidebar('community', 'Community'),
      ...sectionSidebar('governance', 'Governance'),
      ...documentationSidebar(),
      ...operationsSidebar(),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cobaltcore-dev' }
    ],
  },
})
