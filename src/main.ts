import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Day from 'dayjs'

// 加载全局样式
import './styles/index.scss'

Vue.use(ElementUI)

Vue.filter('date', (date: string, format = 'YYYY-MM-DD HH:mm') => {
  return Day(date).format(format)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
