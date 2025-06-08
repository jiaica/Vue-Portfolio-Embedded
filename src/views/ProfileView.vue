<template>
  <div class="profile-view">
    <!-- Profile Header -->
    <div class="profile-header">
      <div class="profile-image-container">
        <img
          :src="profileData.image"
          :alt="profileData.name"
          class="profile-image"
        />
        <div class="status-indicator"></div>
      </div>
      
      <div class="profile-info">
        <h1 class="profile-name">{{ profileData.name }}</h1>
        <p class="profile-title">{{ profileData.title }}</p>
        <div class="profile-location">
          <span class="location-icon">📍</span>
          {{ profileData.location }}
        </div>
      </div>
      
      <div class="profile-stats">
        <div class="stat-item">
          <div class="stat-number">{{ profileData.stats.projects }}</div>
          <div class="stat-label">Projects</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ profileData.stats.experience }}</div>
          <div class="stat-label">Years Experience</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ profileData.stats.clients }}</div>
          
        </div>
      </div>
    </div>
    
    <!-- Profile Content -->
    <div class="profile-content">
      <!-- About Section -->
      <div class="content-card">
        <h2 class="card-title">About Me</h2>
        <p class="about-text">{{ profileData.about }}</p>
        
        <div class="bio-details">
          <div class="bio-item">
            <strong>Email:</strong> {{ profileData.email }}
          </div>
          <div class="bio-item">
            <strong>Phone:</strong> {{ profileData.phone }}
          </div>
          <div class="bio-item">
            <strong>Website:</strong> 
            <a :href="profileData.website" target="_blank">{{ profileData.website }}</a>
          </div>
        </div>
      </div>
      
      <!-- Skills Section -->
      <div class="content-card">
        <h2 class="card-title">Skills & Technologies</h2>
        <div class="skills-grid">
          <div
            v-for="skill in profileData.skills"
            :key="skill.name"
            class="skill-item"
          >
            <div class="skill-info">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-percentage">{{ skill.level }}%</span>
            </div>
            <div class="skill-bar">
              <div
                class="skill-progress"
                :style="{ width: skill.level + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Social Links Section -->
      <div class="content-card">
        <h2 class="card-title">Connect With Me</h2>
        <div class="social-links">
          <a
            v-for="social in profileData.socialLinks"
            :key="social.platform"
            :href="social.url"
            target="_blank"
            class="social-link"
            :class="social.platform"
          >
            <span class="social-icon">{{ social.icon }}</span>
            <span class="social-text">{{ social.platform }}</span>
          </a>
        </div>
      </div>
      
      <!-- Experience Timeline -->
      <div class="content-card">
        <h2 class="card-title">Professional Experience</h2>
        <div class="timeline">
          <div
            v-for="exp in profileData.experience"
            :key="exp.id"
            class="timeline-item"
          >
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h3 class="timeline-title">{{ exp.position }}</h3>
              <h4 class="timeline-company">{{ exp.company }}</h4>
              <div class="timeline-period">{{ exp.period }}</div>
              <p class="timeline-description">{{ exp.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// Profile data - in a real app this would come from an API
const profileData = reactive({
  name: "Jamaica Shein R. Quitong",
  title: "Computer Engineering Student",
  location: "Quezon City, Philippines",
  image: "https://i.imgur.com/l4i2Nde.jpeg",
  email: "jayemaica@gmail.com",
  phone: "+639770439583",
  website: " https://jamaicaquitong.dev",
  about: "I am a fourth-year Computer Engineering student at the Polytechnic University of the Philippines, Sta. Mesa. With a strong interest in technology and innovation, I am passionate about learning how hardware and software systems work together to solve real-world problems. Throughout my academic journey, I have gained hands-on experience in programming, electronics, and system design, and I continuously seek opportunities to improve my skills and knowledge. As I approach graduation, I am eager to explore career paths that will allow me to apply what I’ve learned and contribute meaningfully to the tech industry.",
  stats: {
    projects: 2,
    experience: 0,
    
  },
  skills: [
    { name: "JavaScript/TypeScript", level: 50 },
    { name: "Vue.js/React", level: 60 },
    { name: "Node.js", level: 50 },
    { name: "Python", level: 75 },
    { name: "UI/UX Design", level: 75 },
    { name: "Docker/DevOps", level: 30 }
  ],
  socialLinks: [
    { platform: "GitHub", icon: "🐙", url: "https://github.com/jamaicaquitong" },
    { platform: "LinkedIn", icon: "💼", url: "https://linkedin.com/in/jamaicaquitong" },
    { platform: "Twitter", icon: "🐦", url: "https://twitter.com/jamaicaquitong" },
    { platform: "Instagram", icon: "📷", url: "https://instagram.com/jamaicaquitong" }
  ],
  
})
</script>

<style scoped>
.profile-view {
  max-width: 1200px;
  margin: 0 auto;
}

.profile-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2rem;
  animation: slideInUp 0.6s ease-out;
}

@keyframes slideInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.profile-image-container {
  position: relative;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease;
}

.profile-image:hover {
  transform: scale(1.05);
}

.status-indicator {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: #10b981;
  border: 3px solid white;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.profile-info {
  min-width: 0;
}

.profile-name {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.profile-title {
  font-size: 1.25rem;
  opacity: 0.9;
  margin: 0 0 1rem 0;
}

.profile-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  opacity: 0.8;
}

.location-icon {
  font-size: 1.2rem;
}

.profile-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-top: 0.25rem;
}

.profile-content {
  display: grid;
  gap: 2rem;
}

.content-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.content-card:nth-child(1) { animation-delay: 0.1s; }
.content-card:nth-child(2) { animation-delay: 0.2s; }
.content-card:nth-child(3) { animation-delay: 0.3s; }
.content-card:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
  from { opacity: 0; transform: translateY(20px); }
}

.content-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1.5rem 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
}

.about-text {
  color: #6b7280;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.bio-details {
  display: grid;
  gap: 0.75rem;
}

.bio-item {
  color: #374151;
}

.bio-item a {
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.3s ease;
}

.bio-item a:hover {
  color: #1d4ed8;
}

.skills-grid {
  display: grid;
  gap: 1.5rem;
}

.skill-item {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.skill-item:hover {
  transform: translateX(5px);
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-weight: 600;
  color: #374151;
}

.skill-percentage {
  font-weight: 600;
  color: #3b82f6;
}

.skill-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 4px;
  transition: width 1s ease-out;
  animation: fillBar 1.5s ease-out;
}

@keyframes fillBar {
  from { width: 0 !important; }
}

.social-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  text-decoration: none;
  color: #374151;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.social-icon {
  font-size: 1.5rem;
}

.social-text {
  font-weight: 600;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  animation: slideInLeft 0.6s ease-out;
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0.5rem;
  width: 12px;
  height: 12px;
  background: #3b82f6;
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: 0 0 0 3px #3b82f6;
}

.timeline-content {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  margin-left: 1rem;
}

.timeline-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.timeline-company {
  font-size: 1rem;
  font-weight: 500;
  color: #3b82f6;
  margin: 0 0 0.5rem 0;
}

.timeline-period {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.timeline-description {
  color: #374151;
  line-height: 1.6;
  margin: 0;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .profile-header {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }
  
  .profile-stats {
    justify-content: center;
  }
  
  .profile-name {
    font-size: 2rem;
  }
  
  .content-card {
    padding: 1.5rem;
  }
  
  .social-links {
    grid-template-columns: 1fr;
  }
  
  .timeline {
    padding-left: 1.5rem;
  }
  
  .timeline-marker {
    left: -1.5rem;
  }
}
</style>