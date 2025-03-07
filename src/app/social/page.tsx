"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

export default function SocialPage() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/yourusername",
      description: "Check out my code repositories and projects",
      color: "hover:text-gray-400"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/yourusername",
      description: "Follow me for tech updates and AI insights",
      color: "hover:text-blue-400"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/yourusername",
      description: "Connect with me professionally",
      color: "hover:text-blue-500"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/yourchannel",
      description: "Watch my tutorials and tech videos",
      color: "hover:text-red-500"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/yourusername",
      description: "Follow my daily life and behind-the-scenes",
      color: "hover:text-pink-500"
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Connect With Me
          </h1>
          <p className="text-xl text-gray-300">
            Follow me on social media for updates and insights
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/10 p-3 rounded-full group-hover:bg-white/20 transition-colors">
                  <social.icon className={`h-6 w-6 ${social.color} transition-colors`} />
                </div>
                <h3 className="text-xl font-semibold">{social.name}</h3>
              </div>
              <p className="text-gray-300">{social.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </main>
  );
} 