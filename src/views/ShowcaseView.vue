<template>
  <div class="showcase-view">
    <!-- Header Section -->
    <div class="showcase-header">
      <h1 class="showcase-title">Project Showcase</h1>
      <p class="showcase-subtitle">
        Explore my latest work and creative projects that demonstrate my skills and passion for development.
      </p>
      
      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button
          v-for="category in categories"
          :key="category"
          :class="{ 'active': activeCategory === category }"
          @click="setActiveCategory(category)"
          class="filter-tab"
        >
          {{ category }}
        </button>
      </div>
    </div>
    
    <!-- Projects Grid -->
    <div class="projects-grid">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="project-card"
        :class="{ 'featured': project.featured }"
        @click="openProjectModal(project)"
      >
        <div class="project-image">
          <img :src="project.image" :alt="project.title" />
          <div class="project-overlay">
            <div class="project-links">
              <a
                :href="project.demoUrl"
                target="_blank"
                @click.stop
                class="project-link demo"
                title="View Demo"
              >
                🚀
              </a>
              <a
                :href="project.githubUrl"
                target="_blank"
                @click.stop
                class="project-link github"
                title="View Code"
              >
                💻
              </a>
            </div>
          </div>
          <div v-if="project.featured" class="featured-badge">Featured</div>
        </div>
        
        <div class="project-content">
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-description">{{ project.description }}</p>
          
          <div class="project-tech">
            <span
              v-for="tech in project.technologies"
              :key="tech"
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>
          
          <div class="project-meta">
            <span class="project-date">{{ project.date }}</span>
            <span class="project-category">{{ project.category }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Project Modal -->
    <div v-if="selectedProject" class="modal-overlay" @click="closeProjectModal">
      <div class="project-modal" @click.stop>
        <button class="modal-close" @click="closeProjectModal">✕</button>
        
        <div class="modal-image">
          <img :src="selectedProject.image" :alt="selectedProject.title" />
        </div>
        
        <div class="modal-content">
          <h2 class="modal-title">{{ selectedProject.title }}</h2>
          <p class="modal-description">{{ selectedProject.fullDescription }}</p>
          
          <div class="modal-tech">
            <h4>Technologies Used:</h4>
            <div class="tech-list">
              <span
                v-for="tech in selectedProject.technologies"
                :key="tech"
                class="tech-tag large"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          
          <div class="modal-features">
            <h4>Key Features:</h4>
            <ul>
              <li v-for="feature in selectedProject.features" :key="feature">
                {{ feature }}
              </li>
            </ul>
          </div>
          
          <div class="modal-links">
            <a
              :href="selectedProject.demoUrl"
              target="_blank"
              class="modal-link demo"
            >
              🚀 View Live Demo
            </a>
            <a
              :href="selectedProject.githubUrl"
              target="_blank"
              class="modal-link github"
            >
              💻 View Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// Types
interface Project {
  id: number
  title: string
  description: string
  fullDescription: string
  image: string
  technologies: string[]
  category: string
  date: string
  demoUrl: string
  githubUrl: string
  featured: boolean
  features: string[]
}

// State
const activeCategory = ref('All')
const selectedProject = ref<Project | null>(null)

// Categories
const categories = ['All', 'Web Apps', 'Mobile', 'UI/UX', 'Open Source']

// Projects data
const projects = reactive<Project[]>([
  {
    id: 1,
      "title": "Iskapade Website",
  "description": "Smart vending machine website for on-the-go coffee lovers.",
  "fullDescription": "Iskapade is a thesis project that features a smart coffee vending machine paired with a comprehensive web-based admin dashboard. Built with Vue.js and Node.js, the system allows for real-time monitoring of sales, inventory, and machine status. Designed to support the needs of mobile coffee consumers, the dashboard provides user-friendly controls, data visualization, and performance analytics for efficient operations and maintenance.",
  "image": "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600",
  "technologies": ["Vue.js", "Node.js", "Express", "MongoDB", "Chart.js"],
  "category": "Web Apps",
    date: "Jan 2025",
    demoUrl: "https://demo.ecommerce-dashboard.com",
    githubUrl: "https://github.com/iskapade/ecommerce-dashboard",
    featured: true,
    features: [
      "Real-time sales analytics",
      "Inventory management system",
      "Customer relationship management",
      "Responsive design",
      "Advanced data visualization"
    ]
  },
  {
    id: 2,
    "title": "Smart Home Leak Detection System",
  "description": "IoT-based real-time water leak detection and alerting with web dashboard.",
  "fullDescription": "This project is an IoT-based smart home system designed for real-time water leak detection and alerting. Moisture sensors are strategically placed in leak-prone areas like the kitchen, bathroom, and basement, and are connected to a NodeMCU microcontroller. When a leak is detected, sensor data is transmitted via MQTT to the cloud and logged in Firebase, which also manages user authentication, data storage, and real-time alert notifications. A Vue.js-based web dashboard provides users with real-time sensor status, historical leak logs, and customizable alert settings. Users can log in to monitor sensor health, view charts of past leak incidents, and manage alerts on a per-sensor basis.",
  "image": "https://images.pexels.com/photos/267614/pexels-photo-267614.jpeg?auto=compress&cs=tinysrgb&w=600",
  "technologies": ["NodeMCU", "MQTT", "Firebase", "Vue.js", "Chart.js"],
  "category": "IoT Projects",
    date: "May 2025",
    demoUrl: "https://taskmanager.app",
    githubUrl: "https://github.com/leakdetection/task-manager-app",
    featured: false,
    features: [
      "Cross-platform compatibility",
      "Real-time collaboration",
      "File sharing and attachments",
      "Time tracking",
      "Project analytics"
    ]
  },
  
  
])

// Computed properties
const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') {
    return projects
  }
  return projects.filter(project => project.category === activeCategory.value)
})

// Methods
const setActiveCategory = (category: string) => {
  activeCategory.value = category
}

const openProjectModal = (project: Project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeProjectModal = () => {
  selectedProject.value = null
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
.showcase-view {
  max-width: 1400px;
  margin: 0 auto;
}

.showcase-header {
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.showcase-title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 1rem 0;
}

.showcase-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto 2rem auto;
  line-height: 1.6;
}

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e5e7eb;
  background: white;
  color: #6b7280;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-tab:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.filter-tab.active {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border-color: transparent;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  animation: fadeIn 0.8s ease-out 0.2s both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.project-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  animation: slideInUp 0.6s ease-out;
}

@keyframes slideInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.project-card.featured {
  grid-column: span 2;
}

.project-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.project-card.featured .project-image {
  height: 300px;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.project-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.75rem 0;
}

.project-description {
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
  font-weight: 500;
}

.tech-tag.large {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #9ca3af;
  font-size: 0.875rem;
}

.project-category {
  background: #e0f2fe;
  color: #0277bd;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 500;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  animation: fadeIn 0.3s ease-out;
}

.project-modal {
  background: white;
  border-radius: 20px;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideInUp 0.3s ease-out;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s ease;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.2);
}

.modal-image {
  height: 300px;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-content {
  padding: 2rem;
}

.modal-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.modal-description {
  color: #6b7280;
  line-height: 1.7;
  margin: 0 0 2rem 0;
  font-size: 1.1rem;
}

.modal-tech,
.modal-features {
  margin-bottom: 2rem;
}

.modal-tech h4,
.modal-features h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.modal-features ul {
  margin: 0;
  padding-left: 1.5rem;
}

.modal-features li {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.modal-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.modal-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.modal-link.demo {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
}

.modal-link.github {
  background: #f3f4f6;
  color: #374151;
}

.modal-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .showcase-title {
    font-size: 2rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-card.featured {
    grid-column: span 1;
  }
  
  .modal-overlay {
    padding: 1rem;
  }
  
  .modal-content {
    padding: 1.5rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .modal-links {
    flex-direction: column;
  }
  
  .modal-link {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .filter-tabs {
    gap: 0.25rem;
  }
  
  .filter-tab {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}
</style>