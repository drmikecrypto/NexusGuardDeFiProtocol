import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default defineConfig({
  title: 'NexusGuard Protocol',
  description: 'Advanced DeFi Insurance Protocol',
  lastUpdated: true,
  lang: 'en-US',
  appearance: true, // Enable dark mode

  head: [
    ['link', { rel: 'icon', href: '/images/logo.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:site_name', content: 'NexusGuard Protocol' }],
    ['meta', { name: 'og:description', content: 'Decentralized insurance protocol for DeFi projects on Sonic blockchain' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@nexusguard' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ],

  themeConfig: {
    logo: '/images/logo.svg',
    siteTitle: 'NexusGuard',
    
    // Your existing nav configuration...
    nav: [/* ... */],

    // Your existing sidebar configuration...
    sidebar: {/* ... */},

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 NexusGuard Protocol'
    },

    socialLinks: [/* ... */],

    search: {
      provider: 'local',
      options: {
        detailedView: true,
        placeholder: 'Search documentation...',
        hotkeys: ['/', 's'],
        maxSuggestions: 10,
        translations: {/* ... */}
      }
    },

    editLink: {
      pattern: 'https://github.com/drmikecrypto/NexusGuardDeFiProtocol/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    // New configurations
    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    carbonAds: {
      code: 'your-carbon-code',
      placement: 'your-carbon-placement'
    },

    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },

    darkModeSwitchLabel: 'Appearance',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Return to top',

    lastUpdatedText: 'Last updated',
    
    externalLinkIcon: true
  },

  markdown: {
    lineNumbers: true,
    anchor: {
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '#'
    },
    toc: { level: [2, 3] },
    config: (md) => {
      // Add markdown-it plugins if needed
    }
  },

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('custom-')
      }
    }
  },

  vite: {
    ssr: {
      noExternal: ['vue-demi']
    },
    optimizeDeps: {
      exclude: ['@vueuse/core']
    }
  },

  ignoreDeadLinks: true,

  cleanUrls: true,

  sitemap: {
    hostname: 'https://nexusguard.protocol'
  },

  transformHead: ({ pageData }) => {
    const head = []
    if (pageData.frontmatter.description) {
      head.push(['meta', { name: 'description', content: pageData.frontmatter.description }])
    }
    if (pageData.frontmatter.image) {
      head.push(['meta', { property: 'og:image', content: pageData.frontmatter.image }])
    }
    return head
  },

  transformPageData: (pageData) => {
    pageData.contributors = [] // Add logic to fetch contributors
  }
})
