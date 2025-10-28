import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: { title: '主页' }
        },
        {
          path: 'voice',
          name: 'voice',
          component: () => import('@/views/VoiceView.vue'),
          meta: { title: '角色语音' }
        },
        {
          path: 'meme',
          name: 'meme',
          component: () => import('@/views/MemeView.vue'),
          meta: { title: '表情包' }
        },
        {
          path: 'gallery',
          name: 'gallery',
          component: () => import('@/views/GalleryView.vue'),
          meta: { title: '图集' }
        },
        {
          path: 'timeline',
          name: 'timeline',
          component: () => import('@/views/TimelineView.vue'),
          meta: { title: '时间线' }
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/AboutView.vue'),
          meta: { title: '关于可莉' }
        }
      ]
    }
  ]
})

// 路由守卫：更新页面标题
router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string | undefined
  document.title = title ? `${title} - 可莉` : '可莉'
  next()
})

export default router
