import { createRouter, createWebHashHistory } from 'vue-router'
import UserLogin from '../UserLogin/UserLogin.vue'
import Controller from '../Controller/Controller.vue'

const routes = [
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin
  }
  ,
  {
    path: '/home',
    name: 'Controller',
    component: Controller
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
 
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('logToken')
  if (!tokenStr) return next('/login')
  next()
})
 

export default router
