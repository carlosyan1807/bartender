import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
// import router from './router'
import store from './store'

// 主题样式
import '/@/themes/index.less'

// 图标组件 及 图标
import Iconfont from '/@/components/Iconfont'
import '/@/assets/iconfont'

const app = createApp(App)

app.component('iconfont', Iconfont)
// app.use(router)
app.use(store)
app.use(Antd)

app.mount('#app')
