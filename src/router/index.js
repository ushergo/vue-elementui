import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('../components/container'),
      children: [
        {
          path: '/',
          name: 'main',
          component: () => import('../view/index')
        }
      ]
    }
  ]
})
