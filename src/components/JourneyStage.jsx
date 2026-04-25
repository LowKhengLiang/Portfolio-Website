import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, LineChart, Hexagon } from 'lucide-react';
import UniversityContent from './UniversityContent';

const iconMap = {
  GraduationCap: GraduationCap,
  Briefcase: Briefcase,
  LineChart: LineChart,
  Hexagon: Hexagon
};

const JourneyStage = ({ stage, index }) => {
  const isEven = index % 2 === 0;
  const IconComponent = iconMap[stage.icon];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative w-full flex flex-col md:flex-row items-stretch md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} z-10`}
    >
      {/* Node / Center Icon */}
      <div className="absolute left-10 md:left-1/2 top-0 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center z-20">
         <motion.div 
           className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-[#030014] border-[3px] border-blue-500/80 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.6)] backdrop-blur-md"
           whileInView={{ scale: [0.8, 1.1, 1], boxShadow: ["0 0 10px rgba(59,130,246,0.4)", "0 0 30px rgba(59,130,246,0.9)", "0 0 20px rgba(59,130,246,0.6)"] }}
           transition={{ duration: 1.5 }}
           viewport={{ once: false, margin: '-30%' }}
         >
           {IconComponent && <IconComponent size={24} className="text-blue-300 drop-shadow-[0_0_8px_rgba(147,197,253,0.8)]" />}
         </motion.div>
      </div>

      {/* Content wrapper taking exactly 50% width on Desktop, leaving opposite side empty */}
      <div className="w-full md:w-1/2 flex flex-col">
          <div className={`w-full pl-24 md:pl-0 ${isEven ? 'md:pr-20 lg:pr-32' : 'md:pl-20 lg:pl-32'}`}>
              
            {stage.subSections && stage.subSections.length > 0 ? (
              <UniversityContent stage={stage} />
            ) : (
              <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all text-left shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_40px_rgba(59,130,246,0.2)] backdrop-blur-md bg-opacity-40 bg-gray-900 overflow-hidden">
                <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-2 block">{stage.year}</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{stage.title}</h3>
                <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed font-light">{stage.description}</p>
                
                {stage.details && (
                   <ul className="space-y-3">
                     {stage.details.map((detail, i) => (
                       <li key={i} className="flex items-start gap-3 text-gray-400">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] flex-shrink-0 mt-2" />
                         <span className="font-light text-sm md:text-base leading-relaxed">{detail}</span>
                       </li>
                     ))}
                   </ul>
                )}
              </div>
            )}
            
          </div>
      </div>
      
      {/* Spacer taking up the other 50% side */}
      <div className="hidden md:block md:w-1/2" />
      
    </motion.div>
  );
};

export default JourneyStage;
