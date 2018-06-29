import Vue from 'vue'
import Router from 'vue-router'
//登陆+注册+忘记密码
import Login from '@/pages/user/login'
import Modify from '@/pages/user/modify'
import Register from '@/pages/user/register'
//主页
import Home from '@/pages/home/home'
import store from '../store/index'

//css格式化
import 'reset-css';

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'Home',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Home
  }, {
    path: '/home',
    name: 'Home',
    component: Home
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/modify',
    name: 'Modify',
    component: Modify
  }, {
    path: '/register',
    name: 'Register',
    component: Register
  }]
})

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (token) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      console.log('该页面需要登陆')
      next({
        path: '/login'
        // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router
