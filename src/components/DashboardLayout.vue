<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-mobile-open': isMobileMenuOpen }">
      <div class="sidebar-header">
        <div class="logo">
          <div class="logo-icon">🚀</div>
          <span class="logo-text">Portfolio</span>
        </div>
        <button class="mobile-close-btn" @click="toggleMobileMenu">✕</button>
      </div>
      
      <nav class="sidebar-nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ 'active': $route.path === item.path }"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-text">{{ item.name }}</span>
        </router-link>
      </nav>
      
      <div class="sidebar-footer">
        <button class="logout-btn" @click="handleLogout">
          <span class="nav-icon">🚪</span>
          <span class="nav-text">Logout</span>
        </button>
      </div>
    </aside>
    
    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Header -->
      <header class="top-header">
        <button class="mobile-menu-btn" @click="toggleMobileMenu">☰</button>
        <div class="header-title">
          <h1>{{ currentPageTitle }}</h1>
        </div>
        <div class="header-user">
          <span class="user-name">Welcome, {{ username }}</span>
          <div class="user-avatar">{{ username.charAt(0).toUpperCase() }}</div>
        </div>
      </header>
      
      <!-- Page Content -->
      <div class="page-content">
        <router-view />
      </div>
    </main>
    
    <!-- Mobile Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="mobile-overlay"
      @click="toggleMobileMenu"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Mobile menu state
const isMobileMenuOpen = ref(false)

// User data
const username = ref(localStorage.getItem('username') || 'User')

// Navigation items
const navItems = [
  { path: '/portfolio/profile', name: 'Profile', icon: '👤' },
  { path: '/portfolio/showcase', name: 'Showcase', icon: '💼' },
  { path: '/portfolio/contact', name: 'Contact', icon: '📧' },
  { path: '/portfolio/blog', name: 'Creative', icon: '📝' }
]

// Page title mapping
const pageTitles: Record<string, string> = {
  '/portfolio/profile': 'My Profile',
  '/portfolio/showcase': 'Project Showcase',
  '/portfolio/contact': 'Contact Me',
  '/portfolio/blog': 'My Blog'
}

const currentPageTitle = computed(() => {
  return pageTitles[route.path] || 'Dashboard'
})

// Mobile menu toggle
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Logout handler
const handleLogout = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('username')
  router.push('/login')
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}

/* Sidebar Styles */
.sidebar {
  width: 280px;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1000;
  transition: transform 0.3s ease;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
}

.mobile-close-btn {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.active {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  border-left-color: #3b82f6;
}

.nav-icon {
  font-size: 1.25rem;
  width: 24px;
  text-align: center;
}

.nav-text {
  font-weight: 500;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.top-header {
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #374151;
}

.header-title h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.header-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-name {
  font-weight: 500;
  color: #6b7280;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.page-content {
  flex: 1;
  padding: 2rem;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.mobile-overlay {
  display: none;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar-mobile-open {
    transform: translateX(0);
  }
  
  .mobile-close-btn {
    display: block;
  }
  
  .main-content {
    margin-left: 0;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .top-header {
    padding: 1rem;
  }
  
  .header-user .user-name {
    display: none;
  }
  
  .page-content {
    padding: 1rem;
  }
  
  .mobile-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
}
</style>