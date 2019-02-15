/* global Vue */
import Router from 'vue-router'
import List from '@/components/List'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    }
  ]
})
