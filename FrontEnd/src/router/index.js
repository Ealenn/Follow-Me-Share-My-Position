import Vue from 'vue'
import Materials from 'vue-materials'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'

Vue.use(Router)
Vue.use(Materials)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    }
  ]
})
