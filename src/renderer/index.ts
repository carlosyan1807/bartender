import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
// import router from './router'
import store from './store'

import '/@/themes/index.less'
// import '/@/assets/iconfont/iconfont.css'
import { createFromIconfontCN } from '@ant-design/icons-vue'
const IconFont = createFromIconfontCN({
  scriptUrl: '/@/assets/iconfont.js'
})

const app = createApp(App)

// app.use(router)
app.component('IconFont', (<any>IconFont))
app.use(store)
app.use(Antd)

app.mount('#app')
