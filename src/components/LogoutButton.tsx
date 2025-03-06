"use client";

import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <motion.button
      onClick={logout}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium px-6 py-2 rounded-full transition-all duration-300 border border-red-500/20"
    >
      Logout
    </motion.button>
  );
} 