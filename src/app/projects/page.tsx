"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Star, Lock } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  blog: string;
  price?: number;
}

const projects: Project[] = [
  {
    title: "Jarvis - AI Assistant",
    description: "Jarvis is a highly advanced AI chatbot designed for real-time interactions, supporting both voice input and output. It can instantly respond to any question with intelligent and accurate answers. Equipped with multiple features, Jarvis enhances user experience by making conversations more natural, efficient, and interactive.",
    tags: ["Python", "API Keys", "Voice Recognition", "Natural Language Processing"],
    image: "/assets/3.png",
    price: 35.99,
    blog: `
# **Jarvis: The Future of AI Assistants**

## Introduction
In an era where artificial intelligence (AI) is revolutionizing human-computer interactions, the development of **Jarvis** marks a significant leap forward. Inspired by Marvel's iconic AI assistant, Jarvis is more than just a chatbot—it is an intelligent system capable of real-time responses, voice interaction, and advanced automation features. This article explores the capabilities, applications, and potential future advancements of **Jarvis** as an AI assistant.

![Jarvis AI Interface](/assets/1.png)

## **What is Jarvis?**
Jarvis is an AI-powered chatbot designed to provide real-time responses to any query. Unlike traditional chatbots, which rely solely on text-based interactions, **Jarvis integrates voice input and output**, making conversations feel more natural and human-like. With a robust architecture, it can process information swiftly, analyze complex queries, and offer intelligent suggestions based on user preferences.

## **Key Features of Jarvis**

### 1. **Real-Time AI Responses**
One of Jarvis's standout features is its ability to process and respond to queries instantly. Whether you're asking factual questions, seeking advice, or engaging in casual conversation, Jarvis provides **accurate and intelligent replies** within seconds.

### 2. **Voice Input and Output**
To enhance user experience, Jarvis supports **speech recognition and voice synthesis**. This allows users to **speak naturally** instead of typing and receive spoken responses, mimicking a real assistant.

### 3. **Context Awareness & Memory**
Jarvis is designed to **remember previous interactions**, making conversations **more personalized**. It can recall past queries, adjust responses based on user preferences, and even provide reminders for scheduled tasks.

### 4. **Task Automation**
Beyond answering questions, **Jarvis can automate tasks** such as:
- Setting reminders and alarms
- Managing to-do lists
- Controlling smart home devices
- Sending emails and messages

### 5. **Advanced AI Model Integration**
Jarvis utilizes cutting-edge AI models, possibly leveraging frameworks like **OpenAI's GPT, DeepSeek, or custom machine learning models**. This makes it adaptable for various tasks, including:
- **Homework checking and problem-solving**
- **Providing research-based insights**
- **Translating languages**

![J.A.R.V.I.S System](/assets/2.png)

## **Applications of Jarvis**

### **1. Personal Assistant**
Jarvis can manage daily tasks efficiently, acting as a virtual secretary by handling schedules, reminders, and routine activities.

### **2. Smart Home Integration**
By connecting with IoT devices, **Jarvis can control home automation systems**, including lights, security cameras, and climate settings, all through voice commands.

### **3. AI-Powered Customer Support**
Businesses can use **Jarvis as an intelligent customer support system**, capable of resolving queries, guiding users, and troubleshooting issues without human intervention.

### **4. Educational Assistance**
Students can benefit from **Jarvis's AI-driven tutoring capabilities**, helping them with assignments, exam preparation, and concept explanations across multiple subjects.

### **5. AI-Driven Research Companion**
Professionals and researchers can use **Jarvis to analyze data, summarize reports, and generate insights based on real-time information.**

![Futuristic AI Interface](/assets/3.png)

## **The Future of Jarvis**
As AI technology evolves, the future possibilities for Jarvis are limitless. Some potential advancements include:

- **Enhanced Emotional Intelligence:** Understanding user emotions and responding empathetically.
- **Augmented Reality (AR) Integration:** Allowing users to interact with **Jarvis via holographic displays**.
- **Deeper Personalization:** Adapting voice tone, language, and responses to suit individual users.
- **Autonomous Decision-Making:** Assisting in complex decision-making based on data-driven insights.

## **Conclusion**
Jarvis is not just another chatbot—it is an intelligent **AI assistant designed to revolutionize the way we interact with technology**. Whether for personal use, business automation, or futuristic applications, Jarvis is paving the way for a smarter, more efficient digital future. With ongoing advancements in AI, **the dream of having a fully autonomous AI companion is closer than ever.**
    `
  },
  {
    title: "AI-Powered Productivity Suite",
    description: "A comprehensive productivity application combining AI-driven task management, smart scheduling, and automated workflow optimization. Features intelligent time tracking and personalized insights.",
    tags: ["Next.js", "Python", "AI/ML", "TensorFlow"],
    image: "/projects/productivity-suite.png",
    blog: "" // You'll add the blog content here
  },
  {
    title: "Educational AI Assistant",
    description: "An intelligent tutoring system that helps students with their studies using natural language processing and personalized learning paths. Integrates with various educational resources.",
    tags: ["React", "OpenAI", "Node.js", "MongoDB"],
    image: "/projects/edu-assistant.png",
    blog: "" // You'll add the blog content here
  },
  {
    title: "Smart Content Generator",
    description: "AI-powered content generation tool that creates high-quality, SEO-optimized content for blogs, social media, and marketing materials. Includes plagiarism checking and tone adjustment.",
    tags: ["GPT-3", "React", "FastAPI", "PostgreSQL"],
    image: "/projects/content-gen.png",
    blog: "" // You'll add the blog content here
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'payment' | 'confirmation'>('payment');

  const handlePurchase = async (project: Project) => {
    setSelectedProject(project);
    setPaymentStep('payment');
  };

  // Function to convert markdown to HTML (basic version)
  const markdownToHtml = (markdown: string) => {
    return markdown
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-10 mb-6">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-lg w-full my-6 border border-white/10">')
      .replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>')
      .split('\n\n').map(paragraph => 
        paragraph.startsWith('<') ? paragraph : `<p class="mb-4 text-gray-300">${paragraph}</p>`
      ).join('\n');
  };

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            My Projects
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore my collection of AI-powered applications and tools. Each project represents my passion for combining artificial intelligence with practical solutions.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              onClick={() => handlePurchase(project)}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                {project.image && (
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} />
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4 text-sm">{project.description}</p>

                {/* Price */}
                {project.price && (
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-blue-400">${project.price.toFixed(2)}</span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-white/10 text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
              
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-900/95 rounded-2xl p-6 md:p-8 z-50 border border-white/10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                {/* Project Details */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                    <div className="flex items-center gap-4">
                      {selectedProject.price && (
                        <>
                          <span className="text-3xl font-bold text-blue-400">
                            ${selectedProject.price.toFixed(2)}
                          </span>
                          <motion.button
                            onClick={() => handlePurchase(selectedProject)}
                            disabled={isLoading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold
                              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                          >
                            {isLoading ? 'Processing...' : 'Buy Now'}
                          </motion.button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Project Image */}
                  <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    {selectedProject.image && (
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${selectedProject.image})` }} />
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-white/10 text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Blog Content */}
                  <div className="prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ 
                      __html: selectedProject?.blog ? markdownToHtml(selectedProject.blog) : '<p class="text-gray-300">Detailed blog content will be added soon...</p>'
                    }} />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
} 