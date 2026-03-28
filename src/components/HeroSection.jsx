import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import metadata from '../content/metadata.json';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center px-6 overflow-hidden">
      
      <div className="z-10 max-w-4xl mx-auto text-center">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {metadata.hero.headline}
        </motion.h1>

        <motion.h2 
          className="text-xl md:text-3xl text-blue-300 mb-8 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {metadata.hero.subheadline}
        </motion.h2>

        <motion.p 
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {metadata.hero.bio}
        </motion.p>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="text-sm font-medium tracking-widest uppercase">Scroll to Discover</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.div>

    </section>
  );
};

export default HeroSection;
