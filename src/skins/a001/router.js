import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router'

// const home = () => import(/* webpackChunkName: "/views/landingPage" */'@/views/landingPage.vue')
const landingPage = () => import(/* webpackChunkName: "/views/landingPage" */'@/views/landingPage.vue')

routes.push(
    {
        path: '/',
        name: 'home',
        component: landingPage
    },
    {
        path: '/lp',
        name: 'landingPage',
        component: landingPage
    },
)

Vue.use(Router)

export default new Router({
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
