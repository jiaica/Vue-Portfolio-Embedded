<template>
  <div class="blog-view">
    <!-- Header Section -->
    <div class="blog-header">
      <h1 class="blog-title">Creative Page</h1>
      <p class="blog-subtitle">
        Thoughts, insights, and tutorials about web development, technology, and design.
      </p>
      
      <!-- Search and Filter -->
      <div class="blog-controls">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search articles..."
            class="search-input"
          />
        </div>
        
        <div class="filter-tags">
          <button
            v-for="tag in allTags"
            :key="tag"
            :class="{ 'active': selectedTag === tag }"
            @click="setSelectedTag(tag)"
            class="tag-filter"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Featured Article -->
    <div v-if="featuredArticle && !searchQuery && selectedTag === 'All'" class="featured-section">
      <h2 class="section-title">Featured Article</h2>
      <article class="featured-article" @click="openArticle(featuredArticle)">
        <div class="featured-image">
          <img :src="featuredArticle.image" :alt="featuredArticle.title" />
          <div class="featured-badge">Featured</div>
        </div>
        <div class="featured-content">
          <div class="article-meta">
            <span class="article-date">{{ formatDate(featuredArticle.date) }}</span>
            <span class="article-category">{{ featuredArticle.category }}</span>
          </div>
          <h2 class="featured-title">{{ featuredArticle.title }}</h2>
          <p class="featured-excerpt">{{ featuredArticle.excerpt }}</p>
          <div class="article-tags">
            <span
              v-for="tag in featuredArticle.tags"
              :key="tag"
              class="article-tag"
            >
              {{ tag }}
            </span>
          </div>
          <div class="read-more">
            Read Full Article →
          </div>
        </div>
      </article>
    </div>
    
    <!-- Articles Grid -->
    <div class="articles-section">
      <h2 class="section-title">
        {{ getArticlesSectionTitle() }}
      </h2>
      
      <div v-if="filteredArticles.length === 0" class="no-articles">
        <div class="no-articles-icon">📝</div>
        <h3>No articles found</h3>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
      
      <div v-else class="articles-grid">
        <article
          v-for="article in filteredArticles"
          :key="article.id"
          class="article-card"
          @click="openArticle(article)"
        >
          <div class="article-image">
            <img :src="article.image" :alt="article.title" />
            <div class="article-overlay">
              <span class="read-time">{{ article.readTime }} min read</span>
            </div>
          </div>
          
          <div class="article-content">
            <div class="article-meta">
              <span class="article-date">{{ formatDate(article.date) }}</span>
              <span class="article-category">{{ article.category }}</span>
            </div>
            
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            
            <div class="article-tags">
              <span
                v-for="tag in article.tags.slice(0, 3)"
                :key="tag"
                class="article-tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
    
    <!-- Article Modal -->
    <div v-if="selectedArticle" class="modal-overlay" @click="closeArticle">
      <div class="article-modal" @click.stop>
        <button class="modal-close" @click="closeArticle">✕</button>
        
        <div class="modal-header">
          <img :src="selectedArticle.image" :alt="selectedArticle.title" class="modal-image" />
          <div class="modal-header-content">
            <div class="article-meta">
              <span class="article-date">{{ formatDate(selectedArticle.date) }}</span>
              <span class="article-category">{{ selectedArticle.category }}</span>
              <span class="read-time">{{ selectedArticle.readTime }} min read</span>
            </div>
            <h1 class="modal-title">{{ selectedArticle.title }}</h1>
            <p class="modal-excerpt">{{ selectedArticle.excerpt }}</p>
            <div class="article-tags">
              <span
                v-for="tag in selectedArticle.tags"
                :key="tag"
                class="article-tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="modal-content">
          <div class="article-body" v-html="selectedArticle.content"></div>
          
          <div class="article-footer">
            <div class="author-info">
              <div class="author-avatar">A</div>
              <div class="author-details">
                <div class="author-name">Alex Johnson</div>
                <div class="author-title">Full Stack Developer</div>
              </div>
            </div>
            
            <div class="article-actions">
              <button class="action-btn like-btn">
                ❤️ Like
              </button>
              <button class="action-btn share-btn">
                📤 Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// Types
interface Article {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  date: Date
  category: string
  tags: string[]
  readTime: number
  featured: boolean
}

// State
const searchQuery = ref('')
const selectedTag = ref('All')
const selectedArticle = ref<Article | null>(null)

// Sample blog articles
const articles = reactive<Article[]>([
  {
    id: 1,
    title: "Building Modern Web Applications with Vue 3 and TypeScript",
    excerpt: "Explore the latest features of Vue 3 and how TypeScript integration can improve your development workflow and code quality.",
    content: `
      <p>Vue 3 has revolutionized the way we build web applications, bringing composition API, better TypeScript support, and improved performance. In this comprehensive guide, we'll explore how to leverage these powerful features.</p>
      
      <h3>Why Vue 3 and TypeScript?</h3>
      <p>The combination of Vue 3 and TypeScript provides developers with a robust foundation for building scalable applications. TypeScript's static typing helps catch errors early, while Vue 3's composition API offers better code organization and reusability.</p>
      
      <h3>Setting Up Your Project</h3>
      <p>Starting a new Vue 3 project with TypeScript is straightforward with Vite:</p>
      <pre><code>npm create vue@latest my-project -- --typescript</code></pre>
      
      <h3>Composition API Benefits</h3>
      <ul>
        <li>Better logic reuse with composables</li>
        <li>Improved TypeScript inference</li>
        <li>More flexible component organization</li>
        <li>Better performance with tree-shaking</li>
      </ul>
      
      <p>The composition API allows you to group related logic together, making your components more maintainable and easier to understand.</p>
    `,
    image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: new Date('2024-01-15'),
    category: "Tutorial",
    tags: ["Vue.js", "TypeScript", "Web Development", "Frontend"],
    readTime: 8,
    featured: true
  },
  {
    id: 2,
    title: "The Future of CSS: New Features and Best Practices",
    excerpt: "Discover the latest CSS features like container queries, CSS grid subgrid, and modern layout techniques that will shape the future of web design.",
    content: `
      <p>CSS continues to evolve rapidly, with new features that make responsive design easier and more powerful. Let's explore the cutting-edge features that are changing how we approach web styling.</p>
      
      <h3>Container Queries: A Game Changer</h3>
      <p>Container queries allow components to adapt based on their container's size rather than the viewport, enabling truly modular responsive design.</p>
      
      <h3>CSS Grid Subgrid</h3>
      <p>Subgrid extends CSS Grid's capabilities, allowing nested grids to participate in their parent's grid structure.</p>
      
      <p>These features represent the future of CSS and responsive design, offering developers more control and flexibility.</p>
    `,
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: new Date('2024-01-10'),
    category: "Design",
    tags: ["CSS", "Web Design", "Responsive Design", "Frontend"],
    readTime: 6,
    featured: false
  },
  {
    id: 3,
    title: "JavaScript Performance Optimization Techniques",
    excerpt: "Learn practical techniques to optimize JavaScript performance, from code splitting to efficient DOM manipulation and memory management.",
    content: `
      <p>Performance optimization is crucial for creating fast, responsive web applications. Here are proven techniques to optimize your JavaScript code.</p>
      
      <h3>Code Splitting and Lazy Loading</h3>
      <p>Break your application into smaller chunks that load on demand, reducing initial bundle size and improving load times.</p>
      
      <h3>Efficient DOM Manipulation</h3>
      <p>Minimize DOM queries and batch DOM updates to reduce layout thrashing and improve rendering performance.</p>
      
      <h3>Memory Management</h3>
      <p>Understand garbage collection and avoid memory leaks by properly managing event listeners and references.</p>
    `,
    image: "https://images.pexels.com/photos/11035482/pexels-photo-11035482.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: new Date('2024-01-05'),
    category: "Performance",
    tags: ["JavaScript", "Performance", "Optimization", "Web Development"],
    readTime: 10,
    featured: false
  },
  {
    id: 4,
    title: "Design Systems: Building Consistent User Interfaces",
    excerpt: "A comprehensive guide to creating and maintaining design systems that scale across teams and products while ensuring consistency.",
    content: `
      <p>Design systems are essential for maintaining consistency and efficiency in modern product development. They provide a shared language between designers and developers.</p>
      
      <h3>Components and Tokens</h3>
      <p>Design tokens define the visual design atoms of your system, while components are the building blocks of your interface.</p>
      
      <h3>Documentation and Guidelines</h3>
      <p>Proper documentation ensures your design system is adopted and used correctly across teams.</p>
      
      <p>A well-implemented design system reduces development time and improves user experience consistency.</p>
    `,
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: new Date('2023-12-28'),
    category: "Design",
    tags: ["Design Systems", "UI/UX", "Frontend", "Design"],
    readTime: 7,
    featured: false
  },
  {
    id: 5,
    title: "Getting Started with Node.js and Express",
    excerpt: "Build your first REST API with Node.js and Express. Learn routing, middleware, error handling, and best practices for backend development.",
    content: `
      <p>Node.js and Express form a powerful combination for backend development. This tutorial will guide you through building a complete REST API.</p>
      
      <h3>Setting Up Express</h3>
      <p>Initialize your project and configure Express with essential middleware for JSON parsing, CORS, and request logging.</p>
      
      <h3>Routing and Controllers</h3>
      <p>Organize your routes and implement controllers to handle different HTTP methods and endpoints.</p>
      
      <h3>Error Handling</h3>
      <p>Implement proper error handling middleware to gracefully handle exceptions and provide meaningful responses.</p>
    `,
    image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: new Date('2023-12-20'),
    category: "Backend",
    tags: ["Node.js", "Express", "Backend", "API"],
    readTime: 12,
    featured: false
  },
  {
    id: 6,
    title: "Mobile-First Responsive Design Principles",
    excerpt: "Master the art of mobile-first design with practical examples and techniques for creating responsive layouts that work on any device.",
    content: `
      <p>Mobile-first design is no longer optional—it's essential. Learn how to create responsive layouts that provide optimal experiences across all devices.</p>
      
      <h3>Progressive Enhancement</h3>
      <p>Start with a solid mobile foundation and progressively enhance for larger screens using media queries and flexible layouts.</p>
      
      <h3>Flexible Grids and Images</h3>
      <p>Use relative units and flexible grids to create layouts that adapt to any screen size while maintaining visual hierarchy.</p>
      
      <p>Mobile-first approach leads to better performance and user experience across all devices.</p>
    `,
    image: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: new Date('2023-12-15'),
    category: "Design",
    tags: ["Responsive Design", "Mobile", "CSS", "UI/UX"],
    readTime: 5,
    featured: false
  }
])

// Computed properties
const allTags = computed(() => {
  const tags = new Set(['All'])
  articles.forEach(article => {
    article.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
})

const featuredArticle = computed(() => {
  return articles.find(article => article.featured)
})

const filteredArticles = computed(() => {
  let filtered = articles.filter(article => !article.featured)
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  // Apply tag filter
  if (selectedTag.value !== 'All') {
    filtered = filtered.filter(article =>
      article.tags.includes(selectedTag.value)
    )
  }
  
  // Sort by date (newest first)
  return filtered.sort((a, b) => b.date.getTime() - a.date.getTime())
})

// Methods
const setSelectedTag = (tag: string) => {
  selectedTag.value = tag
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getArticlesSectionTitle = () => {
  if (searchQuery.value) {
    return `Search results for "${searchQuery.value}"`
  }
  if (selectedTag.value !== 'All') {
    return `Articles tagged with "${selectedTag.value}"`
  }
  return 'Latest Articles'
}

const openArticle = (article: Article) => {
  selectedArticle.value = article
  document.body.style.overflow = 'hidden'
}

const closeArticle = () => {
  selectedArticle.value = null
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
.blog-view {
  max-width: 1200px;
  margin: 0 auto;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.blog-title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 1rem 0;
}

.blog-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto 2rem auto;
  line-height: 1.6;
}

.blog-controls {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.search-box {
  position: relative;
  max-width: 400px;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 1.25rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.tag-filter {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  background: white;
  color: #6b7280;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.875rem;
}

.tag-filter:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.tag-filter.active {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border-color: transparent;
}

.featured-section {
  margin-bottom: 4rem;
  animation: fadeIn 0.8s ease-out 0.2s both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 2rem 0;
  text-align: center;
}

.featured-article {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 400px;
}

.featured-article:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.featured-image {
  position: relative;
  overflow: hidden;
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.featured-article:hover .featured-image img {
  transform: scale(1.05);
}

.featured-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.featured-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.article-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.article-date {
  color: #6b7280;
}

.article-category {
  background: #e0f2fe;
  color: #0277bd;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 500;
}

.featured-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.featured-excerpt {
  color: #6b7280;
  line-height: 1.7;
  margin: 0 0 1.5rem 0;
  font-size: 1.1rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.article-tag {
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.read-more {
  color: #3b82f6;
  font-weight: 600;
  font-size: 1.1rem;
}

.articles-section {
  margin-bottom: 3rem;
}

.no-articles {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.no-articles-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-articles h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: #374151;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  animation: fadeIn 0.8s ease-out;
}

.article-card {
  background: white;
  border-radius: 16px;
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

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.article-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .article-image img {
  transform: scale(1.1);
}

.article-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.article-content {
  padding: 1.5rem;
}

.article-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.article-excerpt {
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

.article-modal {
  background: white;
  border-radius: 20px;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideInUp 0.3s ease-out;
  width: 100%;
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

.modal-header {
  position: relative;
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.modal-excerpt {
  color: #6b7280;
  line-height: 1.7;
  margin: 0 0 1.5rem 0;
  font-size: 1.1rem;
}

.modal-content {
  padding: 2rem;
}

.article-body {
  color: #374151;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.article-body h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 2rem 0 1rem 0;
}

.article-body p {
  margin: 0 0 1.5rem 0;
}

.article-body ul {
  margin: 0 0 1.5rem 0;
  padding-left: 1.5rem;
}

.article-body li {
  margin-bottom: 0.5rem;
}

.article-body pre {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.article-body code {
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.95em;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.25rem;
}

.author-name {
  font-weight: 600;
  color: #1f2937;
}

.author-title {
  color: #6b7280;
  font-size: 0.875rem;
}

.article-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  background: white;
  color: #6b7280;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.action-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.read-time {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .blog-title {
    font-size: 2rem;
  }
  
  .featured-article {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  
  .featured-content {
    padding: 1.5rem;
  }
  
  .featured-title {
    font-size: 1.5rem;
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-overlay {
    padding: 1rem;
  }
  
  .modal-header,
  .modal-content {
    padding: 1.5rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .article-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .blog-controls {
    padding: 0 1rem;
  }
  
  .search-box {
    max-width: none;
  }
  
  .filter-tags {
    gap: 0.25rem;
  }
  
  .tag-filter {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .featured-content {
    padding: 1rem;
  }
  
  .article-content {
    padding: 1rem;
  }
}
</style>