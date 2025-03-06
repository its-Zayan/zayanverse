"use client";

import React from 'react';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    title: 'The Future of AI Automation',
    category: 'AI & Technology',
    date: 'March 1, 2024',
    excerpt: 'Exploring how AI is revolutionizing automation and changing the way we work and live.',
    readTime: '5 min read',
    slug: 'future-of-ai-automation',
  },
  {
    title: 'My Journey in Martial Arts',
    category: 'Personal Growth',
    date: 'February 28, 2024',
    excerpt: 'How training at F.S Ninja Academy has shaped my discipline and focus in tech.',
    readTime: '4 min read',
    slug: 'martial-arts-journey',
  },
  {
    title: 'Building NextGen: A Case Study',
    category: 'Projects',
    date: 'February 25, 2024',
    excerpt: 'The development process and challenges behind creating a revolutionary productivity app.',
    readTime: '8 min read',
    slug: 'nextgen-case-study',
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Blog & Articles</h1>
          <p className="text-xl text-gray-300">
            Insights on AI, Technology, and Personal Development
          </p>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {['All', 'AI & Technology', 'Projects', 'Personal Growth'].map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts */}
        <div className="max-w-4xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              className="mb-12 bg-white/5 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-semibold mb-4 hover:text-blue-400 transition-colors">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h2>
                <p className="text-gray-400 mb-6">{post.excerpt}</p>
                <a
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 