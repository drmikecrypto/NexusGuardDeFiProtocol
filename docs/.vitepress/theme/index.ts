// theme/index.ts
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

// Export theme configuration
export default {
  extends: DefaultTheme,
  Layout,
  // Type-safe enhance function
  enhanceApp(ctx: EnhanceAppContext) {
    // Register components globally with proper types
    ctx.app.component('MobileMenu', MobileMenu)
    ctx.app.component('Roadmap', Roadmap)
    ctx.app.component('Partners', Partners)
    ctx.app.component('Features', Features)
    ctx.app.component('ProtocolMetrics', ProtocolMetrics)
    ctx.app.component('CodeBlock', CodeBlock)

    // Add any other app enhancements
    ctx.app.config.globalProperties.$theme = {
      isDark: false, // Add theme-related global properties
      toggleDark: () => {
        ctx.app.config.globalProperties.$theme.isDark = 
          !ctx.app.config.globalProperties.$theme.isDark
      }
    }
  },

  // Add setup hook for theme-wide functionality
  setup() {
    // Add any theme-wide setup logic
    const handleTheme = () => {
      // Theme setup logic
    }

    return {
      handleTheme
    }
  }
} satisfies Theme

// Export components for direct imports if needed
export {
  MobileMenu,
  Roadmap,
  Partners,
  Features,
  ProtocolMetrics,
  CodeBlock
}

// Export types
export type { ThemeComponents }
