import React from 'react';
import { motion } from 'framer-motion';
import skillsData from '../content/skills.json';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 15 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 12 }
  },
};

const SkillsetSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 px-6 z-10">
      <div className="max-w-5xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Core Expertise</h2>
          <p className="text-gray-400 text-lg">Specialized skills driving intelligent system development.</p>
        </motion.div>

        <div className="flex flex-col gap-12">
          {[...skillsData].sort((a,b) => a.priority - b.priority).map((categoryObj, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="md:w-1/3 flex-shrink-0">
                <h3 className="text-xl font-semibold text-blue-300 border-b border-blue-900/50 pb-2 mb-4">
                  {categoryObj.category}
                </h3>
              </div>
              <motion.div 
                className="md:w-2/3 flex flex-wrap gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px" }}
              >
                {categoryObj.skills.map((skill, i) => (
                  <motion.div 
                    key={i} 
                    variants={itemVariants}
                    className="px-5 py-2.5 rounded-full bg-[#0d1326]/60 backdrop-blur-md border border-white/5 text-sm font-medium text-gray-200 transition-all duration-300 hover:scale-105 hover:bg-blue-900/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:border-blue-400/40 hover:text-white cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsetSection;
