import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    redirect:'/'
  },
  {
    path: '/',
    meta: { auth: true,title:'主界面' },
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/',
        redirect:'/home/files',
      },
      {
        path:'home/files',
        component: () => import('../components/HomeFiles'),
        meta: { auth: true,title:'主界面' },
      },
      {
        path:'home/userManage',
        meta: { auth: true,title:'主界面' },
        component: () => import('../components/userManage')
      },
    ]

  },
  {
    path: '/login',
    meta: { auth: false,title:'登录界面' },
    name: 'Login',
    component: Login
  },

]





const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 目标路由是否需要鉴权
  if (to.meta.auth) {
    let token = sessionStorage.getItem('token') ? true : false
    if (!token) {
      Vue.prototype.$message.error('登录状态无效！请使用账号密码进行登陆！');
      next('/login')
      return
    }
  }
  next()
})


export default router
