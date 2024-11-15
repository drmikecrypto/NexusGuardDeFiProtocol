// docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { type Theme } from 'vitepress'
import { type EnhanceAppContext } from 'vitepress/client'
import Layout from './Layout.vue'
import './styles/main.css'

// Import components
import MobileMenu from './components/MobileMenu.vue'
import Roadmap from './components/Roadmap.vue'
import Partners from './components/Partners.vue'
import Features from './components/Features.vue'
import ProtocolMetrics from './components/ProtocolMetrics.vue'
import CodeBlock from './components/CodeBlock.vue'

// Define component types
interface ThemeComponents {
  Layout: typeof Layout
  MobileMenu: typeof MobileMenu
  Roadmap: typeof Roadmap
  Partners: typeof Partners
  Features: typeof Features
  ProtocolMetrics: typeof ProtocolMetrics
  CodeBlock: typeof CodeBlock
}

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }: EnhanceAppContext) {
    console.log('Theme enhancement started...')
    
    // Register components globally
    app.component('MobileMenu', MobileMenu)
    app.component('Roadmap', Roadmap)
    app.component('Partners', Partners)
    app.component('Features', Features)
    app.component('ProtocolMetrics', ProtocolMetrics)
    app.component('CodeBlock', CodeBlock)

    // Add error handling
    app.config.errorHandler = (err, instance, info) => {
      console.error('Vue Error:', err)
      console.error('Component:', instance)
      console.error('Info:', info)
    }

    // Add theme-related global properties
    app.config.globalProperties.$theme = {
      isDark: false,
      toggleDark: () => {
        app.config.globalProperties.$theme.isDark = 
          !app.config.globalProperties.$theme.isDark
      }
    }
  }
} satisfies Theme

export {
  MobileMenu,
  Roadmap,
  Partners,
  Features,
  ProtocolMetrics,
  CodeBlock
}

export type { ThemeComponents }
