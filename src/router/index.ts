import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardLayout from '../components/DashboardLayout.vue'
import ProfileView from '../views/ProfileView.vue'
import ShowcaseView from '../views/ShowcaseView.vue'
import ContactView from '../views/ContactView.vue'
import BlogView from '../views/BlogView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/portfolio',
      component: DashboardLayout,
      children: [
        {
          path: '',
          redirect: '/portfolio/profile'
        },
        {
          path: 'profile',
          name: 'Profile',
          component: ProfileView
        },
        {
          path: 'showcase',
          name: 'Showcase',
          component: ShowcaseView
        },
        {
          path: 'contact',
          name: 'Contact',
          component: ContactView
        },
        {
          path: 'blog',
          name: 'Blog',
          component: BlogView
        }
      ]
    }
  ]
})

// Route guard to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  if (to.path !== '/login' && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/portfolio')
  } else {
    next()
  }
})

export default router