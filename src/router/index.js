import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/hello'
import Room from '@/components/room/room'
import Login from '@/components/login'
import AddNav from '@/components/dev/add-nav'

Vue.use(Router)

const router = new Router({
  routes: [
    //develop environment components
    { path: '/add-nav', name: 'add-nav', component: AddNav, meta: { auth: true } },

    // login
    { path: '/login', name: 'login', component: Login },
    //   meta.auth : 是否需要登录
    { path: '/', name: 'hello', component: Hello, meta: { auth: true } },
    { path: '/rooms', name: 'rooms', component: Room, meta: { auth: true } },
  ]
})

// 路由钩子，判定是否登录
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    if (sessionStorage.getItem('access_token')) {
      next({path:'/',query: { redirect: to.query.redirect }})
    }
  }
  // 需要登录
  if (to.matched.some(record => record.meta.auth)) {
      if (sessionStorage.getItem('access_token')) {
          next()
      } else {
          //   未登录
          next({
              path: '/login',
              query: { redirect: to.fullPath }
          })
      }
  } else {
    next()
  }
})


export default router
