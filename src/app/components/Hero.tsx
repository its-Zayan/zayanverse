"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const bioSections = [
  {
    side: 'left',
    title: "AI Development",
    content: `I'm deeply passionate about AI development, focusing on creating intelligent solutions that enhance daily life. My journey in AI includes developing productivity tools, educational systems, and automation frameworks that push the boundaries of what's possible.`
  },
  {
    side: 'right',
    title: "Martial Arts Journey",
    content: `As a Green Belt holder at F.S Ninja Academy, I've mastered advanced self-defense techniques, traditional weapon training, and developed mental discipline. This journey has taught me the importance of patience, focus, and continuous self-improvement.`
  },
  {
    side: 'left',
    title: "NextGen Founder",
    content: `I founded NextGen, a revolutionary productivity app that combines AI-powered automation with intelligent task management. The app helps users enforce timetables, block distractions, and optimize their daily routines with DeepSeek AI integration.`
  },
  {
    side: 'right',
    title: "Content Creation",
    content: `I share my knowledge and experiences through various platforms, creating educational content about coding, AI, and technology. My goal is to inspire others and contribute to the tech community while documenting my journey.`
  }
];

const sections = [
  {
    title: "🚀 About Me",
    points: [
      "O/Levels Student passionate about technology",
      "Founder of NextGen Productivity App",
      "Advanced Web Developer specializing in AI",
      "Content Creator sharing tech insights",
      "Green Belt holder at F.S Ninja Academy"
    ]
  },
  {
    title: "💡 AI Expertise",
    points: [
      "AI-Powered Productivity Automation",
      "Deep Learning & Neural Networks",
      "AI in Education & Homework Checking",
      "Health & Behavior Tracking Systems",
      "DeepSeek AI Website Integration"
    ]
  },
  {
    title: "💻 Projects & Work",
    points: [
      "NextGen - Revolutionary Productivity App",
      "AI-Driven Task Management System",
      "Automated Homework Checker",
      "Interactive 3D Web Experiences",
      "Educational Content Creation"
    ]
  },
  {
    title: "🥷 Ninja Skills",
    points: [
      "Green Belt - F.S Ninja Academy",
      "Advanced Self-Defense Techniques",
      "Traditional Weapon Training",
      "Stealth & Agility Mastery",
      "Mental Discipline & Focus"
    ]
  },
  {
    title: "⚡ Vision & Goals",
    points: [
      "Revolutionize Productivity with AI",
      "Create Intelligent Digital Companions",
      "Blend Technology with Martial Arts",
      "Share Knowledge Through Content",
      "Push Boundaries in AI Development"
    ]
  }
];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sphereRef = useRef<THREE.Mesh>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const textRefs = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!sceneRef.current || typeof window === 'undefined') return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // Create main sphere with more complex geometry
    const geometry = new THREE.IcosahedronGeometry(2, 4);
    const material = new THREE.MeshPhongMaterial({
      color: 0x3366ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphereRef.current = sphere;
    scene.add(sphere);

    // Add ambient and point lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3366ff, 1);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3366ff, 1);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Create rotating rings
    const ringGeometry = new THREE.TorusGeometry(3, 0.1, 16, 100);
    const ringMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a1a1a,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / (i + 2);
      ring.rotation.y = Math.PI / (i + 2);
      textRefs.current.push(ring);
      scene.add(ring);
    }

    camera.position.z = 8;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (sphereRef.current) {
        sphereRef.current.rotation.x += 0.001;
        sphereRef.current.rotation.y += 0.002;
        sphereRef.current.rotation.x += (mousePosition.y * 0.0005);
        sphereRef.current.rotation.y += (mousePosition.x * 0.0005);
      }

      textRefs.current.forEach((ring, i) => {
        ring.rotation.x += 0.001 * (i + 1);
        ring.rotation.y += 0.001 * (i + 1);
      });

      renderer.render(scene, camera);
    };

    animate();

    // GSAP Scroll Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
      }
    });

    // Camera animation
    tl.to(camera.position, {
      z: 4,
      duration: 2,
      ease: "power2.inOut"
    })
    .to(camera.position, {
      x: 2,
      y: 1,
      duration: 3,
      ease: "power2.inOut"
    })
    .to(camera.position, {
      x: -2,
      y: -1,
      duration: 3,
      ease: "power2.inOut"
    })
    .to(camera.position, {
      x: 0,
      y: 0,
      z: 8,
      duration: 2,
      ease: "power2.inOut"
    });

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX - window.innerWidth / 2) / 50,
        y: (event.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Change section every 5 seconds
    const sectionInterval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % sections.length);
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      sceneRef.current?.removeChild(renderer.domElement);
      clearInterval(sectionInterval);
    };
  }, [mousePosition]);

  return (
    <div ref={containerRef} className="relative min-h-[400vh]">
      {/* Fixed 3D Scene */}
      <div ref={sceneRef} className="fixed inset-0 z-0" />
      
      {/* Initial Hero Content */}
      <div className="relative h-screen w-full flex flex-col items-center justify-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.h1 
            className="mb-4 text-5xl md:text-7xl font-bold"
            animate={{ 
              backgroundImage: [
                "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                "linear-gradient(45deg, #8b5cf6, #ec4899)",
                "linear-gradient(45deg, #ec4899, #3b82f6)"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ WebkitBackgroundClip: "text", color: "transparent" }}
          >
            Hi, I'm Zayan Naveed
          </motion.h1>
          <motion.p className="text-xl text-gray-300">
            Scroll to explore my journey
          </motion.p>
        </motion.div>
      </div>

      {/* Biography Sections */}
      {bioSections.map((section, index) => (
        <div
          key={section.title}
          className={`relative h-screen w-full flex items-center ${
            section.side === 'left' ? 'justify-start' : 'justify-end'
          }`}
        >
          <div className={`w-full max-w-lg ${section.side === 'left' ? 'ml-8 md:ml-24' : 'mr-8 md:mr-24'}`}>
            <div
              className="bg-black/40 backdrop-blur-lg rounded-lg p-8"
              data-scroll
              data-scroll-speed="2"
            >
              <h2 className="text-3xl font-bold text-blue-400 mb-4">{section.title}</h2>
              <p className="text-gray-200 text-lg leading-relaxed">{section.content}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Final CTA Section */}
      <div className="relative h-screen w-full flex flex-col items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-8">Let's Connect</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="/projects"
              className="rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold text-white"
              whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="/notes"
              className="rounded-full border border-white/20 px-8 py-3 text-lg font-semibold text-white"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Study Materials
            </motion.a>
          </div>
          <div className="mt-8 flex justify-center gap-6 text-gray-400">
            <motion.a
              href="#instagram"
              whileHover={{ scale: 1.1, color: "#fff" }}
              className="hover:text-white transition-colors"
            >
              Instagram
            </motion.a>
            <motion.a
              href="#youtube"
              whileHover={{ scale: 1.1, color: "#fff" }}
              className="hover:text-white transition-colors"
            >
              YouTube
            </motion.a>
            <motion.a
              href="#facebook"
              whileHover={{ scale: 1.1, color: "#fff" }}
              className="hover:text-white transition-colors"
            >
              Facebook
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 