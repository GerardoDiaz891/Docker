import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../components/Dashboard.vue'
import LoginForm from '@/views/LoginForm.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  const requiresAuth = to.meta.requiresAuth
  const requiresAdmin = to.meta.requiresAdmin

  if (requiresAuth && !authStore.isAuth) {
    return next({ name: 'login' })
  }

  if (requiresAdmin && authStore.user?.role !== 'admin') {
    return next({ name: 'home' })
  }

  next()
})

export default router
