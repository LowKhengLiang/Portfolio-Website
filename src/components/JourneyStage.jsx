import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { GraduationCap, Briefcase, LineChart, Hexagon } from 'lucide-react';
import UniversityContent from './UniversityContent';

const iconMap = {
  GraduationCap: GraduationCap,
  Briefcase: Briefcase,
  LineChart: LineChart,
  Hexagon: Hexagon
};

const JourneyStage = ({ stage, index, scrollYProgress }) => {
  const isEven = index % 2 === 0;
  
  const start = Math.max(0, index * 0.333 - 0.333);
  const center = index * 0.333;
  const end = Math.min(1, index * 0.333 + 0.333);

  const opacity = useTransform(scrollYProgress, [start, center, end], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [start, center, end], [0.8, 1, 0.8]);

  const yOffset = useTransform(scrollYProgress, [start, center, end], [300, 0, -300]);
  const xOffset = useTransform(
    scrollYProgress, 
    [start, center, end], 
    isEven ? [300, 0, -300] : [-300, 0, 300]
  );

  const IconComponent = iconMap[stage.icon];

  return (
    <motion.div 
      className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12"
      style={{ opacity, scale, y: yOffset, x: xOffset }}
    >
      
      {/* Visual / Motif */}
      <div className={`w-full md:w-1/2 flex justify-center ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <div className="w-48 h-48 md:w-96 md:h-96 rounded-full glass-panel flex items-center justify-center relative shadow-[0_0_50px_rgba(0,100,255,0.1)] border-blue-500/20 group hover:shadow-[0_0_80px_rgba(0,100,255,0.2)] transition-shadow duration-500">
          <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-pulse opacity-20" style={{ animationDuration: '3s' }}></div>
          {IconComponent && <IconComponent size={64} className="text-blue-400 md:w-24 md:h-24" />}
          <div className="absolute inset-4 rounded-full border border-purple-500/20 rotate-45 group-hover:rotate-90 transition-transform duration-1000"></div>
        </div>
      </div>

      {/* Content */}
      <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:order-2 text-left' : 'md:order-1 md:text-right'}`}>
        {stage.id === 'university' ? (
          <UniversityContent stage={stage} />
        ) : (
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-colors text-left shadow-xl backdrop-blur-md">
            <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-2 block">{stage.year}</span>
            <h3 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{stage.title}</h3>
            <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed font-light">
              {stage.description}
            </p>
            
            <ul className="space-y-3">
              {stage.details.map((detail, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] flex-shrink-0" />
                  <span className="font-light">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </motion.div>
  );
};

export default JourneyStage;
