import MyLayout from './MyLayout.vue'
import './custom.css'
import { AntDesignContainer, ElementPlusContainer, NaiveUIContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

export default {
  Layout: MyLayout,
  enhanceApp: async ({ app }) => {
    app.component('demo-preview', NaiveUIContainer)
  },
}
