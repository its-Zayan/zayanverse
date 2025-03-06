"use client";

import React from 'react';
import { motion } from 'framer-motion';

const notes = [
  {
    title: 'I-Level Mathematics',
    subject: 'Mathematics',
    level: 'I-Level',
    description: 'Comprehensive mathematics notes covering all I-Level topics with practice problems.',
    price: '$24.99',
    preview: '#',
  },
  {
    title: 'IGCSE Physics',
    subject: 'Physics',
    level: 'IGCSE',
    description: 'Complete physics study guide with experiments and exam preparation materials.',
    price: '$19.99',
    preview: '#',
  },
  {
    title: 'Federal Board Chemistry',
    subject: 'Chemistry',
    level: 'Federal Board',
    description: 'Detailed chemistry notes aligned with Federal Board curriculum.',
    price: '$14.99',
    preview: '#',
  },
];

const categories = ['All', 'I-Level', 'IGCSE', 'Federal Board'];
const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];

const NotesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Study Materials</h1>
          <p className="text-xl text-gray-300">
            High-quality notes and study guides for I-Level, IGCSE, and Federal Board
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Level</label>
              <select className="bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()} className="bg-gray-900">
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Subject</label>
              <select className="bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                {subjects.map((subject) => (
                  <option key={subject} value={subject.toLowerCase()} className="bg-gray-900">
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note, index) => (
            <motion.div
              key={note.title}
              className="bg-white/5 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{note.title}</h3>
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm">
                    {note.level}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">{note.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-400 font-semibold">{note.price}</span>
                  <div className="space-x-4">
                    <a
                      href={note.preview}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Preview
                    </a>
                    <button className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded">
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesPage; 