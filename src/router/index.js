import Vue from 'vue'
import VueRouter from 'vue-router'
import FrontLayout from '../views/FrontLayout'
import Index from '../views/front/Index'
import Donate from '../views/front/Donate'
import Blog from '../views/front/Blog'
import Video from '../views/front/Video'
import Opensource from '../views/front/Opensource'

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
        path: 'video',
        name: 'Video',
        component: Video,
        meta: { title: '视频' }
      }, {
        path: 'opensource',
        name: 'Opensource',
        component: Opensource,
        meta: { title: '开源' }
      },
      {
        path: 'donate',
        name: 'Donate',
        component: Donate,
        meta: { title: '捐助' }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = '大熊实验室-' + to.meta.title
  }
  next()
})

export default router
