// 项目的启动入口
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载element组件库
import ElementUI from 'element-ui'

// 加载element组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

// 导入全局样式文件
import './styles/index.less'

// 全局注册element组件库
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
