import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import empty from './views/404.vue'

Vue.use(Router)

const router= new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children:[
        {path:'',component:()=>import('./views/Home.vue')},
        {path:'/home',name:'home',component:()=>import('./views/Home.vue')},
        {path:'/infoshow',name:'infoshow',component:()=>import('./views/InfoShow.vue')},
        {path:'/fundlist',name:'fundlist',component:()=>import('./views/FundList.vue')},
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    
    {
      path:"*",
      name:"/404",
      component:empty
    }

  ]
})


router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    if (localStorage.getItem('eleToken')) {
      next()
    } else {
      next('/login')
    }
  }
}
)

export default router