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
        meta: { auth: true,title:'用户信息' },
        component: () => import('../components/userManage')
      },
      {
        path:'home/rubbish',
        meta: { auth: true,title:'回收站' },
        component: () => import('../components/Rubbish')
      },
      {
        path:'home/share',
        component: () => import('../components/shareFiles/ShareFiles')
      },
    ]

  },
  {
    path: '/login',
    meta: { auth: false,title:'登录界面' },
    name: 'Login',
    component: Login
  },
  {
    path: '/verify',
    name: 'Verify',
    component: () => import('../components/shareFiles/Verify')
  },

]





const router = new VueRouter({
  routes,
  // mode:'history'
})


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  console.log(to.query.folderID)
  if(to.path.includes('/share')){
    if(sessionStorage.getItem('shareVerify')) next()
    else next({path:'/verify',params:{folderID:to.query.folderID,username:to.query.username}})
  }
  // 目标路由是否需要鉴权
  // if (to.meta.auth) {
  //   let token = sessionStorage.getItem('token') ? true : false
  //   if (!token) {
  //     Vue.prototype.$message.error('登录状态无效！请使用账号密码进行登陆！');
  //     next('/login')
  //     return
  //   }
  // }
  if(to.path === from.path) next(false)
  else next()
})


export default router
