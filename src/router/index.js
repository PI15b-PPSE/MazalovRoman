import Vue from 'vue'
import Router from 'vue-router'
import StartMenu from '@/components/StartMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartMenu',
      component: StartMenu
    }
  ]
})
