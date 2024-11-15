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

console.log('Theme loading started...') // Debug log

// Single default export
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }: EnhanceAppContext) {
    console.log('Theme enhancement started...') // Debug log
    
    // Register components globally
    app.component('MobileMenu', MobileMenu)
    app.component('Roadmap', Roadmap)
    app.component('Partners', Partners)
    app.component('Features', Features)
    app.component('ProtocolMetrics', ProtocolMetrics)
    app.component('CodeBlock', CodeBlock)

    // Add error handling for Vue components
    app.config.errorHandler = (err, instance, info) => {
      console.error('Vue Error:', err)
      console.error('Component:', instance)
      console.error('Info:', info)
    }

    // Router hooks using onBeforeRouteChange
    if (router?.onBeforeRouteChange) {
      router.onBeforeRouteChange((to) => {
        try {
          console.log(`Route changing to ${to.path}`)
        } catch (error) {
          console.error('Router error:', error)
        }
      })
    }

    // Add theme-related global properties
    app.config.globalProperties.$theme = {
      isDark: false,
      toggleDark: () => {
        app.config.globalProperties.$theme.isDark = 
          !app.config.globalProperties.$theme.isDark
      }
    }
  },

  setup() {
    // Theme setup logic
    const handleTheme = () => {
      // Theme setup logic here if needed
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
