const _404 = () => import(/* webpackChunkName: "views/404" */'@/views/404.vue')
const iosGuide = () => import(/* webpackChunkName: "views/ios-guide" */'@/views/ios-guide.vue')

const routes =[
    {
        path: '/ig',
        name: 'iosGuide',
        component: iosGuide
    },
    {
        path: "*",
        component: _404
    },
]

export default routes
