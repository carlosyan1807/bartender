import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'

// import router from './router'
import store from './store'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

// 主题样式
import '/@/themes/index.less'

// 图标组件 及 图标
import Iconfont from '/@/components/Common/Iconfont.vue'
import '/@/assets/iconfont'

const app = createApp(App)

app.component('iconfont', Iconfont)
// app.use(router)
app.use(store)
app.use(PerfectScrollbar)
app.use(Antd)
app.mount('#app')
