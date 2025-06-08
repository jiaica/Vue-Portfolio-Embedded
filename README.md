# Vue.js Portfolio Web App

A modern, responsive portfolio web application built with Vue.js 3, TypeScript, and Vue Router. Features a comprehensive dashboard layout with authentication, multiple portfolio pages, and a creative blog section.

## 🚀 Features

### Authentication
- **Secure Login System**: Custom login page with form validation
- **Route Protection**: Authenticated routes with automatic redirects
- **Demo Credentials**: 
  - Username: `admin`
  - Password: `password123`

### Portfolio Dashboard
- **Profile Page**: Personal details, skills, experience timeline, and social media links
- **Project Showcase**: Interactive project gallery with filtering, modal views, and detailed project information
- **Contact Form**: Comprehensive contact form with validation and multiple contact options
- **Creative Blog**: Full-featured blog with search, filtering, and article modal views
- **Responsive Sidebar**: Collapsible navigation that adapts to mobile devices

### Design & User Experience
- **Modern UI**: Clean, professional design with gradient themes and glass-morphism effects
- **Smooth Animations**: Page transitions, hover effects, and micro-interactions
- **Mobile-First**: Fully responsive design optimized for all device sizes
- **Accessibility**: Proper focus management, semantic HTML, and keyboard navigation
- **Performance**: Optimized images, lazy loading, and efficient component structure

## 🛠️ Technologies Used

- **Frontend Framework**: Vue.js 3 with Composition API
- **Language**: TypeScript for type safety
- **Routing**: Vue Router 4 with route guards
- **Styling**: Modern CSS with custom properties and animations
- **Build Tool**: Vite for fast development and optimized builds
- **Icons**: Emoji-based icons for universal compatibility

## 📁 Project Structure

```
src/
├── components/
│   └── DashboardLayout.vue    # Main dashboard layout with sidebar
├── router/
│   └── index.ts              # Vue Router configuration with guards
├── views/
│   ├── LoginView.vue         # Authentication page
│   ├── ProfileView.vue       # Personal profile and experience
│   ├── ShowcaseView.vue      # Project portfolio gallery
│   ├── ContactView.vue       # Contact form and information
│   └── BlogView.vue          # Creative blog with articles
├── App.vue                   # Root application component
├── main.ts                   # Application entry point
└── style.css                 # Global styles and utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vue-portfolio-webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

### Preview Production Build

```bash
npm run preview
```

## 🔐 Authentication

The application uses a simple authentication system with hardcoded credentials for demonstration purposes:

- **Username**: `admin`
- **Password**: `password123`

Authentication state is managed using localStorage and protected by Vue Router guards.

## 📱 Responsive Design

The application is built with a mobile-first approach and includes:

- **Mobile (< 768px)**: Collapsible sidebar, stacked layouts, touch-optimized interactions
- **Tablet (768px - 1024px)**: Adaptive grid layouts, optimized spacing
- **Desktop (> 1024px)**: Full sidebar navigation, multi-column layouts, hover effects

## 🎨 Customization

### Color Scheme
The application uses a modern color palette defined in CSS custom properties:
- **Primary**: Blue gradient (#3b82f6 to #8b5cf6)
- **Secondary**: Teal accents (#14b8a6)
- **Neutral**: Gray scale for text and backgrounds
- **Status**: Success (green), warning (orange), error (red)

### Content Customization
To customize the portfolio content:

1. **Profile Information**: Edit the `profileData` object in `ProfileView.vue`
2. **Projects**: Modify the `projects` array in `ShowcaseView.vue`
3. **Blog Articles**: Update the `articles` array in `BlogView.vue`
4. **Contact Details**: Change contact information in `ContactView.vue`

## 🔧 Development

### Code Organization
- **Components**: Reusable UI components
- **Views**: Page-level components for each route
- **Router**: Navigation and route protection logic
- **Styles**: Global styles and component-specific styling

### Best Practices
- TypeScript for type safety and better developer experience
- Composition API for better code organization and reusability
- Semantic HTML for accessibility
- CSS custom properties for consistent theming
- Responsive design patterns for all screen sizes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help with the project, please open an issue in the repository.

---

**Built with ❤️ using Vue.js 3 and TypeScript**