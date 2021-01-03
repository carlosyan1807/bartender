import { createApp } from 'vue'
// import Antd, { notification } from 'ant-design-vue'
import ElementPlus from 'element-plus'
import App from './App.vue'

// import router from './router'
import store from './store'
import PerfectScrollbar from 'vue3-perfect-scrollbar'

// 主题样式
// import '/@/themes/index.less'
// import 'element-plus/lib/theme-chalk/index.css'
import '/@/themes/index.scss'
// 图标组件 及 图标
import Iconfont from '/@/components/Common/Iconfont.vue'
import '/@/assets/iconfont'

const app = createApp(App)

// app.provide('$notification', notification)
app.component('Iconfont', Iconfont)
// app.use(router)
app.use(store)
app.use(PerfectScrollbar)
// app.use(Antd)
app.use(ElementPlus)
app.mount('#app')
