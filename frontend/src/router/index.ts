import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { useAuthStore } from '@/modules/auth/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: () => import('../views/HomeView.vue')
    // }
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/modules/auth/pages/LoginPage.vue'),
    },

    {
      path: '/register',
      name: 'Register',
      component: () => import('@/modules/auth/pages/RegisterPage.vue'),
    },

    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('@/modules/products/pages/HomePage.vue'),
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('@/modules/products/pages/SearchPage.vue'),
        },
        {
          path: '/coba',
          name: 'coba',
          component: () => import('@/modules/products/pages/CobaPage.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: 'Login',
      query: {
        redirect: to.fullPath,
      },
    }
  }
})

export default router
