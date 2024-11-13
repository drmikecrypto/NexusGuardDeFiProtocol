import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'NexusGuard Protocol',
  description: 'Decentralized insurance protocol for DeFi projects',
  themeConfig: {
    logo: '/assets/images/logo/logo.ico',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/documentation' },
      { text: 'Protocol', link: '/protocol/' },
      { text: 'Economics', link: '/economic-model/' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Abstract', link: '/abstract' },
          { text: 'DeFi Insurance Challenge', link: '/introduction/defi-insurance-challenge' },
          { text: 'NexusGuard Solution', link: '/introduction/nexusguard-solution' }
        ]
      },
      {
        text: 'Protocol',
        items: [
          { text: 'Architecture', link: '/protocol/architecture' },
          { text: 'Core Components', link: '/protocol/core-components' }
        ]
      },
      {
        text: 'Economic Model',
        items: [
          { text: 'Token Economics', link: '/economic-model/tokenomics/token-economics' },
          { text: 'Premium Management', link: '/economic-model/premium-management' },
          { text: 'Yield Generation', link: '/economic-model/yield-generation' }
        ]
      }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present NexusGuard Protocol'
    },
    search: {
      provider: 'local'
    }
  }
})
