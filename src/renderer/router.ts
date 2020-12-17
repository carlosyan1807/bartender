import { createRouter, createMemoryHistory } from 'vue-router'
// import Home from '/@/components/Home.vue'
// import About from '/@/components/About.vue'
import Layout from '/@/components/Layout.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Layout,
    },
  ],
})

export default router
