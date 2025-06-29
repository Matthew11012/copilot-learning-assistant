# 🎓 Copilot Learning Assistant

A modern, AI-powered educational assistant built with Next.js that provides personalized learning support through intelligent conversations and curated material recommendations.

## 🚀 Live Demo

**Try it now:** [https://copilot-learning-assistant.vercel.app/](https://copilot-learning-assistant.vercel.app/)

![Copilot Learning Assistant](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google)
![Live Demo](https://img.shields.io/badge/Live_Demo-Available-success?style=for-the-badge&logo=vercel)

## 🌟 Features

### 🤖 Intelligent Chat Interface
- **Real-time Streaming Responses** - ChatGPT-style streaming for immediate feedback
- **Multimodal Support** - Text and image input capabilities
- **Mathematical Rendering** - LaTeX/KaTeX support for complex equations
- **Markdown Formatting** - Rich content rendering with proper typography

### 📚 Smart Material Recommendations
- **RAG Implementation** - Retrieval-Augmented Generation with curated educational content
- **Contextual Search** - Intelligent keyword matching across 14+ subjects
- **42+ Learning Materials** - Comprehensive database covering Math, Physics, Chemistry, Biology, Economics, and more
- **Relevance Scoring** - Advanced algorithm prevents cross-subject contamination

### 💬 Advanced Chat Management
- **Multiple Chat Sessions** - Create, edit, and manage multiple conversations
- **Persistent History** - localStorage-based persistence across browser sessions
- **Auto-titling** - Automatic chat naming based on conversation content
- **Responsive Sidebar** - Clean, organized chat history with Indonesian UI

### 🎨 Modern User Experience
- **Dark Theme Design** - Elegant gradient-based interface
- **Responsive Layout** - Optimized for desktop and mobile devices
- **Drag & Drop Upload** - Intuitive image upload with clipboard support
- **Auto-scrolling** - Smooth scrolling during streaming responses
- **Clean Typography** - Optimized for readability with proper spacing

## 🛠️ Technical Stack

### Frontend
- **Next.js 15.3.4** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4.0** - Utility-first styling
- **React Context** - State management for chat data

### AI & Content
- **Google Gemini API** - Advanced language model with vision capabilities
- **React Markdown** - Markdown rendering with plugins
- **KaTeX** - Mathematical notation rendering
- **Custom RAG System** - Educational content retrieval

### Development
- **ESLint** - Code linting and formatting
- **UUID** - Unique identifier generation
- **Image Processing** - Compression and optimization utilities

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/copilot-learning-assistant.git
   cd copilot-learning-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   echo "GEMINI_API_KEY=your_actual_gemini_api_key_here" > .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Core Functionality

### Chat Interface
```tsx
// Streaming responses with real-time updates
const handleSendMessage = async (content: string, imageFile?: File) => {
  // Multimodal processing with image compression
  // Server-Sent Events for streaming
  // Context-aware conversations
}
```

### Material Recommendations
```tsx
// Intelligent search algorithm
const searchMaterials = (query: string, context: string[]) => {
  // Subject-specific keyword extraction
  // Relevance scoring with anti-contamination
  // Contextual follow-up understanding
}
```

### Persistent Storage
```tsx
// Browser-based persistence
localStorage.setItem('copilot-chats', JSON.stringify(chats));
localStorage.setItem('copilot-messages', JSON.stringify(messages));
```

## 📖 Educational Content

The system includes **42 curated learning materials** across **14 subjects**:

- **Mathematics** - Calculus, Linear Algebra, Statistics
- **Physics** - Mechanics, Thermodynamics, Quantum Physics
- **Chemistry** - Organic, Inorganic, Physical Chemistry
- **Biology** - Cell Biology, Genetics, Ecology
- **Economics** - Microeconomics, Macroeconomics, Econometrics
- **Computer Science** - Programming, Algorithms, Data Structures
- **And more...**

## 🌐 Deployment

### Live Production App
The application is deployed and running at: **[https://copilot-learning-assistant.vercel.app/](https://copilot-learning-assistant.vercel.app/)**

### Vercel Deployment (Recommended)

1. **Deploy to Vercel**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

2. **Set environment variables in Vercel Dashboard**
   - Add `GEMINI_API_KEY` in Project Settings > Environment Variables

3. **Automatic deployments**
   - Every push to `main` branch triggers a new deployment
   - Preview deployments for pull requests

### Environment Variables
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

## 🔧 Configuration

### API Configuration
The application uses Google Gemini for:
- Text generation with conversation context
- Image analysis and multimodal responses
- Structured educational content generation

### Material Search Algorithm
- Subject-specific keyword mapping
- Context-aware follow-up queries
- Relevance scoring to prevent false matches
- Support for Indonesian language queries

## 📱 Mobile Experience

- Responsive sidebar with overlay navigation
- Touch-friendly interface elements
- Optimized message bubbles for mobile screens
- Drag & drop file upload with mobile support

## 🎓 Educational Use Cases

- **Concept Explanation** - Break down complex topics
- **Problem Solving** - Step-by-step solution guidance
- **Material Discovery** - Find relevant learning resources
- **Visual Learning** - Upload images for analysis
- **Study Planning** - Personalized learning paths

