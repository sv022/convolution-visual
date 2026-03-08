import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Conv2dView from '@/views/Conv2dView.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import ConvRGBView from '@/views/ConvRGBView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Convolution visual | Home' },
      component: HomeView,
    },
    {
      path: '/conv2d',
      name: 'Conv2d Visualization',
      meta: { title: 'Convolution visual | GrayScale' },
      component: Conv2dView,
    },
    {
      path: '/convrgb',
      name: 'Conv2d RGB Visualization',
      meta: { title: 'Convolution visual | RGB' },
      component: ConvRGBView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Page not found',
      meta: { title: 'Page not found' },
      component: PageNotFound,
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || 'Convolution Visual'
  next()
})

export default router
