import Vue from 'vue'
import VueRouter from 'vue-router'
import FrontLayout from '../views/FrontLayout'
import Index from '../views/front/Index'
import Donate from '../views/front/Donate'
import Blog from '../views/front/Blog'
import Video from '../views/front/Video'
import Opensource from '../views/front/Opensource'
import BackLayout from '../views/BackLayout'
import Dashboard from '../views/back/Dashboard'
import Write from '../views/back/Write'
import Login from '@/views/Login'
import { getToken } from '@/utils/auth'
import BasicConfig from '@/views/back/BasicConfig'
import SystemSetting from '@/views/back/SystemSetting'
import OpenSource from '@/views/back/OpenSource'
import BlogType from '@/views/back/BlogType'
import BlogList from '@/views/back/BlogList'
import NewBlog from '@/views/back/NewBlog'
import BlogTag from '@/views/back/BlogTag'
import BlogDetail from '@/views/front/BlogDetail'
import Search from '@/views/front/Search'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'FrontLayout',
    component: FrontLayout,
    redirect: 'index',
    meta: { title: '大熊实验室' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: Index,
        meta: { title: '首页' }
      },
      {
        path: 'blog',
        name: 'Blog',
        component: Blog,
        meta: { title: '博客' }
      },
      {
        path: 'blogDetail/:blogId',
        name: 'BlogDetail',
        component: BlogDetail,
        meta: { title: '博客' }
      },
      {
        path: 'video',
        name: 'Video',
        component: Video,
        meta: { title: '视频' }
      }, {
        path: 'opensource',
        name: 'Opensource',
        component: Opensource,
        meta: { title: '开源项目' }
      },
      {
        path: 'donate',
        name: 'Donate',
        component: Donate,
        meta: { title: '捐助' }
      },
      {
        path: 'search',
        name: 'Search',
        component: Search,
        meta: { title: '搜索' }
      }
    ]
  },
  {
    path: '/admin',
    name: 'BackLayout',
    component: BackLayout,
    redirect: 'admin/dashboard',
    meta: { title: '大熊实验室' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: '控制台' }
      }, {
        path: 'blogType',
        name: 'BlogType',
        component: BlogType,
        meta: { title: '博客分类' }
      }, {
        path: 'blogTag',
        name: 'BlogTag',
        component: BlogTag,
        meta: { title: '博客标签' }
      }, {
        path: 'newBlog',
        name: 'NewBlog',
        component: NewBlog,
        meta: { title: '新增博客' }
      }, {
        path: 'blogList',
        name: 'BlogList',
        component: BlogList,
        meta: { title: '博客列表' }
      },
      {
        path: 'write',
        name: 'Write',
        component: Write,
        meta: { title: '写作' }
      },
      {
        path: 'systemSetting',
        name: 'SystemSetting',
        component: SystemSetting,
        meta: { title: '系统设置' }
      },
      {
        path: 'basicConfig',
        name: 'BasicConfig',
        component: BasicConfig,
        meta: { title: '基础设置' }
      },
      {
        path: 'openSource',
        name: 'OpenSource',
        component: OpenSource,
        meta: { title: '开源项目' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '后台登录' }
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.fullPath.indexOf('/admin') !== -1) {
    // 访问后台，校验token
    if (getToken() == null || getToken() === '') {
      console.log(getToken())
      // 没有token跳转登录页
      next('/login')
    }
  }
  next()
  if (to.meta.title) {
    document.title = '大熊实验室-' + to.meta.title
  }
})

export default router
