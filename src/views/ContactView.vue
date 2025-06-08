<template>
  <div class="contact-view">
    <!-- Header Section -->
    <div class="contact-header">
      <h1 class="contact-title">Get In Touch</h1>
      <p class="contact-subtitle">
        Have a project in mind or just want to chat? I'd love to hear from you!
      </p>
    </div>
    
    <div class="contact-content">
      <!-- Contact Information -->
      <div class="contact-info">
        <div class="info-card">
          <div class="info-icon">📧</div>
          <h3>Email</h3>
          <p>jayemaica@gmail.com</p>
          <a href="mailto:jayemaica@gmail.com" class="info-link">
            Send an email
          </a>
        </div>
        
        <div class="info-card">
          <div class="info-icon">📱</div>
          <h3>Phone</h3>
          <p>+639770439583</p>
          <a href="tel:+639770439583" class="info-link">
            Give me a call
          </a>
        </div>
        
        <div class="info-card">
          <div class="info-icon">📍</div>
          <h3>Location</h3>
          <p>Quezon City, Philippines</p>
          <span class="info-text">Available for remote work</span>
        </div>
        
        <div class="info-card">
          <div class="info-icon">⏰</div>
          <h3>Response Time</h3>
          <p>Within 24 hours</p>
          <span class="info-text">Usually much faster!</span>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div class="contact-form-container">
        <form @submit.prevent="handleSubmit" class="contact-form">
          <h2 class="form-title">Send Message</h2>
          
          <div class="form-grid">
            <div class="form-group">
              <label for="name">Name *</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                :class="{ 'error': errors.name }"
                placeholder="Your full name"
                @blur="validateName"
                @input="clearError('name')"
              />
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>
            
            <div class="form-group">
              <label for="email">Email *</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                :class="{ 'error': errors.email }"
                placeholder="your.email@example.com"
                @blur="validateEmail"
                @input="clearError('email')"
              />
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="subject">Subject *</label>
            <input
              id="subject"
              v-model="form.subject"
              type="text"
              :class="{ 'error': errors.subject }"
              placeholder="What's this about?"
              @blur="validateSubject"
              @input="clearError('subject')"
            />
            <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
          </div>
          
          <div class="form-group">
            <label for="message">Message *</label>
            <textarea
              id="message"
              v-model="form.message"
              :class="{ 'error': errors.message }"
              placeholder="Tell me about your project or just say hello!"
              rows="6"
              @blur="validateMessage"
              @input="clearError('message')"
            ></textarea>
            <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
          </div>
          
          <div class="form-group">
            <label for="projectType">Project Type</label>
            <select id="projectType" v-model="form.projectType">
              <option value="">Select project type (optional)</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-app">Mobile App</option>
              <option value="ui-ux-design">UI/UX Design</option>
              <option value="consultation">Consultation</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="form.newsletter"
              />
              <span class="checkmark"></span>
              Subscribe to my newsletter for updates and tech insights
            </label>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="loading-spinner"></span>
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
          
          <div v-if="submitStatus" class="submit-status" :class="submitStatus.type">
            {{ submitStatus.message }}
          </div>
        </form>
      </div>
    </div>
    
    <!-- Additional Contact Options -->
    <div class="additional-contact">
      <h3>Other Ways to Connect</h3>
      <div class="social-contacts">
        <a href="https://linkedin.com/in/jamaicaquitong" target="_blank" class="social-contact">
          <span class="social-icon">💼</span>
          <div>
            <div class="social-title">LinkedIn</div>
            <div class="social-subtitle">Professional network</div>
          </div>
        </a>
        
        <a href="https://twitter.com/jamaicaquitong" target="_blank" class="social-contact">
          <span class="social-icon">🐦</span>
          <div>
            <div class="social-title">Twitter</div>
            <div class="social-subtitle">Latest updates & thoughts</div>
          </div>
        </a>
        
        <a href="https://github.com/jamaicaquitong" target="_blank" class="social-contact">
          <span class="social-icon">💻</span>
          <div>
            <div class="social-title">GitHub</div>
            <div class="social-subtitle">Code repositories</div>
          </div>
        </a>
        
        <a href="#" class="social-contact">
          <span class="social-icon">📅</span>
          <div>
            <div class="social-title">Schedule a Meeting</div>
            <div class="social-subtitle">15-30 min chat</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Form data
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  projectType: '',
  newsletter: false
})

// Form state
const isSubmitting = ref(false)
const submitStatus = ref<{ type: 'success' | 'error', message: string } | null>(null)

// Validation errors
const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Validation functions
const validateName = () => {
  if (!form.name.trim()) {
    errors.name = 'Name is required'
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address'
  }
}

const validateSubject = () => {
  if (!form.subject.trim()) {
    errors.subject = 'Subject is required'
  } else if (form.subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters'
  }
}

const validateMessage = () => {
  if (!form.message.trim()) {
    errors.message = 'Message is required'
  } else if (form.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters'
  }
}

const clearError = (field: string) => {
  errors[field as keyof typeof errors] = ''
  submitStatus.value = null
}

// Form submission
const handleSubmit = async () => {
  // Reset errors and status
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
  submitStatus.value = null
  
  // Validate all fields
  validateName()
  validateEmail()
  validateSubject()
  validateMessage()
  
  // Check if there are any errors
  const hasErrors = Object.values(errors).some(error => error !== '')
  if (hasErrors) {
    submitStatus.value = {
      type: 'error',
      message: 'Please fix the errors above and try again.'
    }
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real app, you would send the form data to your backend
    console.log('Form submitted:', form)
    
    submitStatus.value = {
      type: 'success',
      message: 'Thank you for your message! I\'ll get back to you within 24 hours.'
    }
    
    // Reset form
    Object.keys(form).forEach(key => {
      if (key === 'newsletter') {
        form[key as keyof typeof form] = false
      } else {
        form[key as keyof typeof form] = ''
      }
    })
    
  } catch (error) {
    submitStatus.value = {
      type: 'error',
      message: 'Something went wrong. Please try again or email me directly.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-view {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-header {
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.contact-title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 1rem 0;
}

.contact-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  margin-bottom: 4rem;
  animation: fadeIn 0.8s ease-out 0.2s both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.contact-info {
  display: grid;
  gap: 1.5rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: slideInLeft 0.6s ease-out;
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.info-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.info-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.info-card p {
  color: #3b82f6;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.info-link {
  color: #6b7280;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.info-link:hover {
  color: #3b82f6;
}

.info-text {
  color: #6b7280;
  font-size: 0.875rem;
}

.contact-form-container {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  animation: slideInRight 0.6s ease-out;
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.form-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 2rem 0;
  text-align: center;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group input.error,
.form-group textarea.error {
  border-color: #ef4444;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  color: #6b7280;
  line-height: 1.5;
  font-weight: 400;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 2px;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: #3b82f6;
  border-color: #3b82f6;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::before {
  content: '✓';
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.submit-status {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
}

.submit-status.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #10b981;
}

.submit-status.error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #ef4444;
}

.additional-contact {
  text-align: center;
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

.additional-contact h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 2rem 0;
}

.social-contacts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.social-contact {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  text-decoration: none;
  color: #374151;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.social-contact:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.social-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.social-title {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.social-subtitle {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .contact-title {
    font-size: 2rem;
  }
  
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .contact-form-container {
    padding: 1.5rem;
  }
  
  .social-contacts {
    grid-template-columns: 1fr;
  }
  
  .social-contact {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .info-card {
    padding: 1.5rem;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
  
  .contact-form-container {
    padding: 1rem;
  }
}
</style>