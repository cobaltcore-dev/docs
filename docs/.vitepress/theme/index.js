import DefaultTheme from 'vitepress/theme'
import Layout from './components/Layout.vue'
import BlogPost from './components/BlogPost.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('BlogPost', BlogPost)
  },
}
