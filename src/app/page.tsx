"use client";

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Brain, Code, Zap, Shield, BookOpen, Cpu, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const bioRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const ninjaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Bio section animation
    if (bioRef.current) {
      gsap.from(bioRef.current.querySelectorAll('.animate-item'), {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bioRef.current,
          start: "top 80%",
        }
      });
    }
    
    // AI section animation
    if (aiRef.current) {
      gsap.from(aiRef.current.querySelectorAll('.animate-item'), {
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aiRef.current,
          start: "top 80%",
        }
      });
    }
    
    // Work section animation
    if (workRef.current) {
      gsap.from(workRef.current.querySelectorAll('.animate-item'), {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: workRef.current,
          start: "top 80%",
        }
      });
    }
    
    // Ninja section animation
    if (ninjaRef.current) {
      gsap.from(ninjaRef.current.querySelectorAll('.animate-item'), {
        x: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ninjaRef.current,
          start: "top 80%",
        }
      });
    }

    // Create floating stars
    const stars = Array.from({ length: 20 }).map(() => {
      const star = document.createElement('div') as HTMLDivElement;
      star.className = 'star';
      star.style.position = 'absolute';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      document.querySelector('.hero-section')?.appendChild(star);
      return star;
    });

    stars.forEach(star => {
      gsap.to(star, {
        y: -100,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'none'
      });
    });

    return () => {
      stars.forEach(star => {
        if (star && star.parentElement) {
          star.parentElement.removeChild(star);
        }
      });
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="hero-section h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated stars background */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="star absolute w-1 h-1 bg-white rounded-full opacity-70"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        <div className="hero-content container mx-auto px-4 md:px-6 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-gradient"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Zayan Naveed
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white mb-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              AI Developer | O/Levels Student | Ninja
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.a
                href="#about"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(37, 99, 235, 0.9)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600/80 backdrop-blur-sm hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg button-hover"
              >
                Discover My Work
              </motion.a>
              <motion.a
                href="#ai"
                whileHover={{ scale: 1.05, borderColor: "rgba(37, 99, 235, 0.9)" }}
                whileTap={{ scale: 0.95 }}
                className="border border-blue-600 text-blue-400 hover:bg-blue-600/10 font-medium py-3 px-6 rounded-lg button-hover backdrop-blur-sm"
              >
                AI Projects
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white z-10"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </section>

      {/* About Me Section */}
      <section id="about" className="section-dark py-20" ref={bioRef}>
        <div className="section-content">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title">
              <span className="text-gradient">About Me</span>
            </h2>
            
            <div className="space-y-8">
              <p className="text-xl text-white leading-relaxed card">
                👋 Hi, I'm <span className="text-blue-500 font-semibold">Zayan Naveed</span>, a 14-year-old AI enthusiast and developer from Pakistan. Currently in O/Levels, I'm passionate about leveraging AI to create innovative solutions. I've achieved recognition as one of the youngest AI developers, with a strong foundation in Python, JavaScript, and web development.
              </p>
              
              {/* Bio Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="card">
                  <div className="bg-blue-600/20 p-4 rounded-full w-fit mb-4">
                    <Brain className="h-6 w-6 text-blue-500 icon-hover" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Academic Excellence</h3>
                  <p className="text-gray-200">Maintaining straight A*s in O/Levels while pursuing my passion for technology and AI development.</p>
                </div>

                <div className="card">
                  <div className="bg-blue-600/20 p-4 rounded-full w-fit mb-4">
                    <Code className="h-6 w-6 text-blue-500 icon-hover" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Tech Stack</h3>
                  <p className="text-gray-200">Proficient in Python, JavaScript, React, Next.js, and various AI/ML frameworks.</p>
                </div>

                <div className="card">
                  <div className="bg-blue-600/20 p-4 rounded-full w-fit mb-4">
                    <Shield className="h-6 w-6 text-blue-500 icon-hover" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Achievements</h3>
                  <p className="text-gray-200">Recognized as one of the youngest AI developers, with multiple successful projects and innovations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section id="ai" className="section-darker py-20" ref={aiRef}>
        <div className="section-content">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title">
              <span className="text-gradient">My Passion for AI</span>
            </h2>
            
            <p className="text-xl text-white mb-10 card">
              My journey with AI began at age 13, driven by a fascination with how machines could learn and adapt. I've developed multiple AI-powered applications, from productivity tools to educational platforms, always pushing the boundaries of what's possible with artificial intelligence.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* AI Feature Cards */}
              <div className="card">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600/20 p-3 rounded-full mr-4">
                    <Zap className="h-6 w-6 text-blue-500 icon-hover" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">AI Development</h3>
                </div>
                <p className="text-gray-200">Created multiple AI applications including chatbots, automation tools, and intelligent assistants using Python and modern AI frameworks.</p>
              </div>

              <div className="card">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600/20 p-3 rounded-full mr-4">
                    <Brain className="h-6 w-6 text-blue-500 icon-hover" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Machine Learning</h3>
                </div>
                <p className="text-gray-200">Experienced in implementing ML models for real-world applications, focusing on practical solutions for everyday challenges.</p>
              </div>

              <div className="card">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600/20 p-3 rounded-full mr-4">
                    <BookOpen className="h-6 w-6 text-blue-500 icon-hover" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Research & Learning</h3>
                </div>
                <p className="text-gray-200">Continuously exploring new AI technologies and methodologies, staying updated with the latest developments in the field.</p>
              </div>

              <div className="card">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600/20 p-3 rounded-full mr-4">
                    <Cpu className="h-6 w-6 text-blue-500 icon-hover" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Full-Stack Integration</h3>
                </div>
                <p className="text-gray-200">Combining AI with web development to create seamless, intelligent applications using Next.js and modern frameworks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="section-dark py-20" ref={workRef}>
        <div className="section-content">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title">
              <span className="text-gradient">My Work & Projects</span>
            </h2>
            
            <div className="space-y-8">
              <div className="card">
                <h3 className="text-2xl font-semibold mb-4 text-white">AI-Powered Productivity Suite</h3>
                <p className="text-gray-200 mb-6">
                  A comprehensive productivity application that combines AI-driven task management, smart scheduling, and automated workflow optimization. Features include intelligent time tracking, distraction blocking, and personalized productivity insights.
                </p>
                <div className="flex justify-end">
                  <a href="/projects" className="text-blue-500 hover:text-blue-400 font-medium flex items-center group button-hover">
                    Learn more 
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>

              <div className="card">
                <h3 className="text-2xl font-semibold mb-4 text-white">Educational AI Assistant</h3>
                <p className="text-gray-200 mb-6">
                  An intelligent tutoring system that helps students with their studies using natural language processing and personalized learning paths. Integrates with various educational resources and adapts to individual learning styles.
                </p>
                <div className="flex justify-end">
                  <a href="/projects" className="text-blue-500 hover:text-blue-400 font-medium flex items-center group button-hover">
                    Learn more 
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>

              <div className="card">
                <h3 className="text-2xl font-semibold mb-4 text-white">AI-Enhanced Web Applications</h3>
                <p className="text-gray-200 mb-6">
                  A collection of web applications powered by AI, including chatbots, content generators, and automated data analysis tools. Built using Next.js, React, and modern AI frameworks to create seamless user experiences.
                </p>
                <div className="flex justify-end">
                  <a href="/projects" className="text-blue-500 hover:text-blue-400 font-medium flex items-center group button-hover">
                    Learn more 
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ninja Section */}
      <section id="ninja" className="section-darker py-20" ref={ninjaRef}>
        <div className="section-content">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title">
              <span className="text-gradient">The Ninja Journey</span>
            </h2>
            
            <p className="text-xl text-white mb-10 card">
              Besides tech, I am also a trained ninja 🏆! I have been training in martial arts and have achieved my <span className="text-blue-500 font-semibold">Green Belt at F.S Ninja Academy</span>. This discipline complements my technical skills and shapes my approach to challenges.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-2xl font-semibold mb-4 text-white flex items-center">
                  <span className="inline-block w-8 h-8 bg-blue-600 rounded-full mr-3 flex-shrink-0"></span>
                  Advanced Self-Defense
                </h3>
                <p className="text-gray-200 text-lg">Practical combat skills for self-protection, including strikes, blocks, and evasive maneuvers.</p>
              </div>
              
              <div className="card">
                <h3 className="text-2xl font-semibold mb-4 text-white flex items-center">
                  <span className="inline-block w-8 h-8 bg-blue-600 rounded-full mr-3 flex-shrink-0"></span>
                  Weapon Training
                </h3>
                <p className="text-gray-200 text-lg">Mastery in traditional ninja weapons, developing precision and discipline.</p>
              </div>
              
              <div className="card">
                <h3 className="text-2xl font-semibold mb-4 text-white flex items-center">
                  <span className="inline-block w-8 h-8 bg-blue-600 rounded-full mr-3 flex-shrink-0"></span>
                  Stealth & Agility
                </h3>
                <p className="text-gray-200 text-lg">Fast reflexes, silent movements, and high endurance training.</p>
              </div>
              
              <div className="card">
                <h3 className="text-2xl font-semibold mb-4 text-white flex items-center">
                  <span className="inline-block w-8 h-8 bg-blue-600 rounded-full mr-3 flex-shrink-0"></span>
                  Mental Discipline
                </h3>
                <p className="text-gray-200 text-lg">Focus, patience, and strategic thinking through meditation and mindfulness.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-dark py-20">
        <div className="section-content">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title">
              <span className="text-gradient">
                My Vision
              </span>
              <div className="h-1 w-24 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            </h2>
            
            <p className="text-xl text-white mb-12 leading-relaxed card p-6 rounded-xl">
              As a young developer at the forefront of AI innovation, my vision is to revolutionize how we interact with technology. I aim to create AI solutions that not only enhance productivity but also make advanced technology accessible to everyone. Through my work, I want to inspire other young minds to explore the endless possibilities of AI and contribute to a future where technology serves humanity in more meaningful ways.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg text-lg button-hover"
              >
                Explore My Projects
              </motion.a>
              <motion.a
                href="/social"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-blue-600 text-blue-500 hover:bg-blue-600/10 font-medium py-3 px-8 rounded-lg shadow-lg text-lg button-hover"
              >
                Connect With Me
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-darker py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-blue-500" />
                <Zap className="h-8 w-8 text-blue-400 -ml-2" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">ZayanVerse</h2>
            <p className="text-gray-200 mb-8">AI Developer | O/Levels Student | Ninja</p>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a href="/social" className="text-gray-400 hover:text-blue-500 transition-colors duration-300 social-icon">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="/social" className="text-gray-400 hover:text-blue-500 transition-colors duration-300 social-icon">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="/social" className="text-gray-400 hover:text-blue-500 transition-colors duration-300 social-icon">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            <p className="text-gray-200">© 2024 ZayanVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
