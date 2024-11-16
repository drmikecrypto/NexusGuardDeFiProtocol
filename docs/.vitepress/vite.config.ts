// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ command, mode }) => ({
  plugins: [
    vue({
      // Vue plugin options
      template: {
        compilerOptions: {
          // Add compiler options if needed
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ],

  // Development server configuration
  server: {
    hmr: { 
      overlay: true,
      port: 24678 // Explicit HMR websocket port
    },
    watch: {
      usePolling: true,
      ignored: ['**/node_modules/**', '**/dist/**']
    },
    host: true, // Listen on all addresses
    port: 3000,
    strictPort: false, // Try next available port if 3000 is taken
    open: false // Don't open browser automatically
  },

  // Build configuration
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: mode === 'development',
    minify: mode === 'production' ? 'esbuild' : false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue'],
          'vitepress-vendor': ['vitepress']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },

  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'components'),
      '@theme': resolve(__dirname, 'theme')
    }
  },

  // Optimization configuration
  optimizeDeps: {
    include: ['vue', 'vitepress'],
    exclude: []
  },

  // CSS configuration
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },

  // Environment variables configuration
  envPrefix: 'VITE_',
  
  // Performance configuration
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    legalComments: 'none'
  },

  logLevel: 'info',
  
  // Define global constants
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    'process.env.NODE_ENV': JSON.stringify(mode)
  },

  // Preview server configuration
  preview: {
    port: 8080,
    strictPort: true,
    host: true
  }
}))
