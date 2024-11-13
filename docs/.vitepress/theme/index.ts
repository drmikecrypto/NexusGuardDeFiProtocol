import DefaultTheme from 'vitepress/theme'
import Roadmap from './components/Roadmap.vue'
import Partners from './components/Partners.vue'
import Features from './components/Features.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Roadmap', Roadmap)
    app.component('Partners', Partners)
    app.component('Features', Features)
  }
}
