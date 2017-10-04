import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/hello'
import Login from '@/components/login'
//develop environment
import AddNav from '@/components/dev/add-nav'

// room module
import Rooms from '@/components/room/rooms'
import RoomTypes from '@/components/room/types'
// person module
import People from '@/components/person/people'

// bill module
import Bills from '@/components/bill/bills'


// not found
import NotFound from '@/components/not-found'

Vue.use(Router)

const router = new Router({
  routes: [
    // login
    { path: '/login', name: 'login', component: Login },

    //   meta.auth : 是否需要登录

    //develop environment components
    { path: '/add-nav', name: 'add-nav', component: AddNav, meta: { auth: true } },
    { path: '/', name: 'hello', component: Hello, meta: { auth: true } },

    // room module
    { path: '/rooms', name: 'rooms', component: Rooms, meta: { auth: true } },
    { path: '/room-types', name: 'room-types', component: RoomTypes, meta: { auth: true } },

    // person module
    { path: '/people', name: 'people', component: People, meta: { auth: true } },


    // bill module
    { path: '/bills', name: 'bills', component: Bills, meta: { auth: true } },


    // not found
    { path: '*', name: 'not-found', component: NotFound, meta: { auth:true } },
  ]
})

// navigation guards,  路由钩子，判定是否登录
router.beforeEach((to, from, next) => {

  if (to.path == '/login') {
    if (sessionStorage.getItem('access_token')) {
      next({path:'/',query: { redirect: to.query.redirect }})
    }
  }
  // need login
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
