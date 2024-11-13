// docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { type Theme } from 'vitepress'
import Layout from './Layout.vue'
import Roadmap from './components/Roadmap.vue'
import Partners from './components/Partners.vue'
import Features from './components/Features.vue'
import ProtocolMetrics from './components/ProtocolMetrics.vue'
import CodeBlock from './components/CodeBlock.vue'
import './styles/main.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Roadmap', Roadmap)
    app.component('Partners', Partners)
    app.component('Features', Features)
    app.component('ProtocolMetrics', ProtocolMetrics)
    app.component('CodeBlock', CodeBlock)
  }
} satisfies Theme
