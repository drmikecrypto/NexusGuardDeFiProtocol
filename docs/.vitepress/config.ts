import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'NexusGuard Protocol',
  description: 'Revolutionizing DeFi security through advanced risk management',
  lastUpdated: true,
  lang: 'en-US',
  appearance: true,

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
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/docs/' },
      { text: 'GitHub', link: 'https://github.com/yourusername/nexusguard' }
    ],

    sidebar: {
      '/docs/': [
        {
          text: 'Abstract',
          link: '/docs/abstract'
        },
        {
          text: 'Economic Model',
          items: [
            { text: 'Premium Management', link: '/docs/economic-model/Premium-Management' },
            { text: 'Token Economics', link: '/docs/economic-model/Token-Economics' },
            { text: 'Yield Generation', link: '/docs/economic-model/Yield-Generation' },
            {
              text: 'Tokenomics',
              items: [
                { text: 'Emission Schedule', link: '/docs/economic-model/tokenomics/Emission-Schedule' },
                { text: 'Token Distribution', link: '/docs/economic-model/tokenomics/Token-Distribution' },
                { text: 'Vesting Schedules', link: '/docs/economic-model/tokenomics/Vesting-Schedules' }
              ]
            }
          ]
        },
        {
          text: 'Technical Architecture',
          items: [
            { text: 'Smart Contracts', link: '/docs/technical/Smart-Contracts' },
            { text: 'Risk Assessment', link: '/docs/technical/Risk-Assessment' },
            { text: 'Claims Processing', link: '/docs/technical/Claims-Processing' },
            { text: 'Integration Guide', link: '/docs/technical/Integration-Guide' }
          ]
        },
        {
          text: 'Governance',
          items: [
            { text: 'DAO Structure', link: '/docs/governance/DAO-Structure' },
            { text: 'Voting Mechanism', link: '/docs/governance/Voting-Mechanism' },
            { text: 'Proposal Process', link: '/docs/governance/Proposal-Process' }
          ]
        },
        {
          text: 'Security',
          items: [
            { text: 'Audit Reports', link: '/docs/security/Audit-Reports' },
            { text: 'Risk Management', link: '/docs/security/Risk-Management' },
            { text: 'Emergency Procedures', link: '/docs/security/Emergency-Procedures' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/nexusguard' },
      { icon: 'twitter', link: 'https://twitter.com/nexusguard' },
      { icon: 'discord', link: 'https://discord.gg/nexusguard' },
      { icon: 'medium', link: 'https://medium.com/@nexusguard' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 NexusGuard Protocol'
    },

    search: {
      provider: 'local',
      options: {
        detailedView: true,
        placeholder: 'Search documentation...',
        hotkeys: ['/', 's'],
        maxSuggestions: 10,
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search documentation'
          },
          modal: {
            noResultsText: 'No results for',
            resetButtonTitle: 'Reset search',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate'
            }
          }
        }
      }
    },

    editLink: {
      pattern: 'https://github.com/drmikecrypto/NexusGuardDeFiProtocol/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

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
    },
    build: {
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            'group-user': [
              './components/UserProfile.vue',
              './components/UserSettings.vue'
            ],
            'group-admin': [
              './components/AdminDashboard.vue',
              './components/AdminSettings.vue'
            ]
          }
        }
      }
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
  },

  buildEnd: async (siteConfig) => {
    // Add any build end hooks
  },

  postRender: async (context) => {
    // Add any post render hooks
  },

  async transformHtml(code, id, context) {
    // Transform HTML if needed
    return code
  },

  async buildStart() {
    // Add any build start hooks
  }
}))
