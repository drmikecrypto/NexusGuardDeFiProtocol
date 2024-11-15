import DefaultTheme from 'vitepress/theme'
import { type Theme } from 'vitepress'
import Layout from './Layout.vue'
import './styles/main.css'

// Lazy load components for better performance
const Roadmap = () => import('./components/Roadmap.vue')
const Partners = () => import('./components/Partners.vue')
const Features = () => import('./components/Features.vue')
const ProtocolMetrics = () => import('./components/ProtocolMetrics.vue')
const CodeBlock = () => import('./components/CodeBlock.vue')

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // Register components
    app.component('Roadmap', Roadmap)
    app.component('Partners', Partners)
    app.component('Features', Features)
    app.component('ProtocolMetrics', ProtocolMetrics)
    app.component('CodeBlock', CodeBlock)
  }
} satisfies Theme
