// docs/.vitepress/theme/index.ts
// (previous imports and interfaces remain the same...)

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

    // Router hooks using the correct VitePress router API
    if (router) {
      router.beforeEach((to, from, next) => {
        try {
          console.log(`Route changing from ${from.path} to ${to.path}`)
          next()
        } catch (error) {
          console.error('Router error:', error)
          next()
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
  // (rest of the code remains the same...)
} satisfies Theme
