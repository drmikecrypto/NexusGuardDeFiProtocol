import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'NexusGuard Protocol',
  description: 'Advanced DeFi Insurance Protocol',
  lang: 'en-US',
  lastUpdated: true,
  
  head: [
    ['link', { rel: 'icon', href: '/images/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:site_name', content: 'NexusGuard Protocol' }]
  ],

  themeConfig: {
    logo: '/images/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Protocol',
        items: [
          { text: 'Architecture', link: '/protocol/architecture' },
          { text: 'Components', link: '/protocol/components' }
        ]
      },
      {
        text: 'Economics',
        items: [
          { text: 'Tokenomics', link: '/economic-model/tokenomics' },
          { text: 'Yield Generation', link: '/economic-model/yield-generation' }
        ]
      },
      { text: 'Documentation', link: '/documentation' }
    ],

    sidebar: {
      '/protocol/': [
        {
          text: 'Protocol',
          items: [
            { text: 'Overview', link: '/protocol/' },
            { text: 'Architecture', link: '/protocol/architecture' },
            { text: 'Core Components', link: '/protocol/components' }
          ]
        }
      ],
      '/economic-model/': [
        {
          text: 'Economics',
          items: [
            { text: 'Overview', link: '/economic-model/' },
            { text: 'Tokenomics', link: '/economic-model/tokenomics' },
            { text: 'Premium Management', link: '/economic-model/premium-management' },
            { text: 'Yield Generation', link: '/economic-model/yield-generation' }
          ]
        }
      ]
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present NexusGuard Protocol'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/drmikecrypto/NexusGuardDeFiProtocol' },
      { icon: 'twitter', link: 'https://twitter.com/nexusguard' }
    ],

    search: {
      provider: 'local',
      options: {
        detailedView: true
      }
    }
  }
})
