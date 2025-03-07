"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      description: "Perfect for students getting started",
      features: [
        "Access to basic notes",
        "Email support",
        "Basic AI features",
        "Community access"
      ]
    },
    {
      name: "Pro",
      price: "$19.99",
      description: "Best for serious learners",
      features: [
        "Access to all notes",
        "Priority email support",
        "Advanced AI features",
        "Exclusive community access",
        "1-on-1 mentoring",
        "Early access to new content"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations and teams",
      features: [
        "Everything in Pro",
        "Custom AI solutions",
        "Dedicated support",
        "Team management",
        "API access",
        "Custom integrations"
      ]
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
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300">
            Select the perfect plan for your learning journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white/5 backdrop-blur-sm rounded-xl p-8 border ${
                plan.popular ? 'border-blue-500' : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-4">{plan.price}</div>
                <p className="text-gray-300">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                plan.popular
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
} 