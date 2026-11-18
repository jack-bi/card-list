import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router'

const landingPage = () => import(/* webpackChunkName: "views/landingPage" */'@/views/landingPage.vue')

routes.push({
  path: '/',
  name: 'landingPage',
  component: landingPage
})

Vue.use(Router)

export default new Router({
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { x: 0, y: 0 }
  }
})
