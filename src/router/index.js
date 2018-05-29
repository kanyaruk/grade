import Vue from 'vue'
import Router from 'vue-router'
import Grade from '@/components/Grade'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Grade',
      component: Grade
    }
  ]
})
