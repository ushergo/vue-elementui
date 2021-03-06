// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  {store} from './store'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//导入scss
import './assets/styles/index.scss'

/** 注册 element 组件 */
Vue.use(elementui)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
