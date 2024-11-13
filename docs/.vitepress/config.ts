import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'NexusGuard Protocol',
  description: 'Advanced DeFi Insurance Protocol',
  lastUpdated: true,
  
  head: [
    ['link', { rel: 'icon', href: '/images/logo.svg' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:site_name', content: 'NexusGuard Protocol' }],
    ['meta', { name: 'og:description', content: 'Decentralized insurance protocol for DeFi projects on Sonic blockchain' }]
  ],

  themeConfig: {
    logo: '/images/logo.svg',
    siteTitle: 'NexusGuard',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/introduction/' },
      { 
        text: 'Protocol',
        items: [
          { text: 'Architecture', link: '/protocol/architecture' },
          { text: 'Components', link: '/protocol/components' },
          { text: 'Risk Engine', link: '/technical/risk-engine' }
        ]
      },
      {
        text: 'Economics',
        items: [
          { text: 'Token Economics', link: '/economic-model/token-economics' },
          { text: 'Yield Generation', link: '/economic-model/yield-generation' },
          { text: 'Tokenomics', link: '/economic-model/tokenomics/distribution' }
        ]
      },
      { text: 'Integration', link: '/integration/' },
      { text: 'GitHub', link: 'https://github.com/drmikecrypto/NexusGuardDeFiProtocol' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/introduction/' },
            { text: 'DeFi Insurance Challenge', link: '/introduction/defi-challenge' },
            { text: 'NexusGuard Solution', link: '/introduction/nexusguard-solution' }
          ]
        },
        {
          text: 'Protocol',
          collapsed: false,
          items: [
            { text: 'Architecture', link: '/protocol/architecture' },
            { text: 'Core Components', link: '/protocol/components' }
          ]
        },
        {
          text: 'Technical Implementation',
          collapsed: false,
          items: [
            { text: 'Smart Contracts', link: '/technical/smart-contracts' },
            { text: 'Risk Assessment Engine', link: '/technical/risk-engine' }
          ]
        },
        {
          text: 'Risk Management',
          collapsed: false,
          items: [
            { text: 'Dynamic Risk Assessment', link: '/risk-management/dynamic-assessment' },
            { text: 'Risk Mitigation Strategies', link: '/risk-management/mitigation' }
          ]
        },
        {
          text: 'Economic Model',
          collapsed: false,
          items: [
            { text: 'Token Economics', link: '/economic-model/token-economics' },
            { text: 'Premium Management', link: '/economic-model/premium-management' },
            { text: 'Yield Generation', link: '/economic-model/yield-generation' },
            {
              text: 'Tokenomics',
              collapsed: true,
              items: [
                { text: 'Token Distribution', link: '/economic-model/tokenomics/distribution' },
                { text: 'Token Utility', link: '/economic-model/tokenomics/utility' },
                { text: 'Economics Model', link: '/economic-model/tokenomics/model' },
                { text: 'Supply Dynamics', link: '/economic-model/tokenomics/supply' },
                { text: 'Emission Schedule', link: '/economic-model/tokenomics/emission' },
                { text: 'Incentive Mechanisms', link: '/economic-model/tokenomics/incentives' },
                { text: 'Long-term Sustainability', link: '/economic-model/tokenomics/sustainability' }
              ]
            }
          ]
        },
        {
          text: 'Governance',
          collapsed: false,
          items: [
            { text: 'Decentralized Governance', link: '/governance/decentralized' },
            { text: 'Security Mechanisms', link: '/governance/security' }
          ]
        },
        {
          text: 'Applications',
          collapsed: false,
          items: [
            { text: 'Use Cases', link: '/applications/use-cases' },
            { text: 'Development Roadmap', link: '/applications/roadmap' }
          ]
        },
        {
          text: 'Technical Specifications',
          collapsed: false,
          items: [
            { text: 'Protocol Parameters', link: '/specifications/parameters' },
            { text: 'Performance Specs', link: '/specifications/performance' }
          ]
        },
        {
          text: 'Integration Guide',
          collapsed: false,
          items: [
            { text: 'Getting Started', link: '/integration/getting-started' },
            { text: 'Implementation Examples', link: '/integration/examples' }
          ]
        },
        {
          text: 'Mathematical Models',
          collapsed: false,
          items: [
            { text: 'Risk Assessment Formulas', link: '/mathematics/risk-formulas' },
            { text: 'Premium Calculation Model', link: '/mathematics/premium-model' },
            { text: 'Capital Efficiency Model', link: '/mathematics/capital-model' }
          ]
        },
        {
          text: 'Reference',
          collapsed: false,
          items: [
            { text: 'Glossary of Terms', link: '/terms/' },
            { text: 'Key Achievements', link: '/conclusion/achievements' },
            { text: 'Future Directions', link: '/conclusion/future' }
          ]
        }
      ]
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 NexusGuard Protocol'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/drmikecrypto/NexusGuardDeFiProtocol' },
      { icon: 'twitter', link: 'https://twitter.com/nexusguard' },
      { icon: 'discord', link: 'https://discord.gg/nexusguard' }
    ],

    search: {
      provider: 'local',
      options: {
        detailedView: true,
        placeholder: 'Search documentation...',
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
    }
  }
})
