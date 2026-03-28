import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import journeyData from '../content/journey.json';
import JourneyStage from './JourneyStage';
import { GraduationCap, Briefcase, LineChart, Hexagon } from 'lucide-react';

const iconMap = {
  GraduationCap: GraduationCap,
  Briefcase: Briefcase,
  LineChart: LineChart,
  Hexagon: Hexagon
};

const Journey = () => {
  const targetRef = useRef(null);
  
  // The targetRef div will be 400vh tall to allow scrolling
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Calculate the horizontal translation.
  // There are 4 items. We want to move right enough to see all of them.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-transparent">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Horizontal Timeline Rail overlay */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[80vw] h-1 bg-blue-900/40 rounded-full z-20 hidden md:block">
           <motion.div 
             className="h-full bg-blue-400 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.8)]"
             style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
           />
           {/* Nodes on the rail */}
           <div className="absolute inset-0 flex justify-between w-[80vw] mx-auto">
             {journeyData.map((item, index) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <div key={index} className="flex flex-col items-center -mt-3.5 gap-2 relative">
                    <div className="w-8 h-8 rounded-full bg-[#030014] border-2 border-blue-500/50 flex items-center justify-center z-10 glass-panel">
                      {IconComponent && <IconComponent size={14} className="text-blue-300" />}
                    </div>
                  </div>
                )
             })}
           </div>
        </div>

        <motion.div style={{ x }} className="flex w-[400vw] h-full">
          {journeyData.map((stage, index) => (
            <div key={stage.id} className="w-screen h-full flex justify-center items-center px-4 md:px-12">
               <JourneyStage stage={stage} index={index} scrollYProgress={scrollYProgress} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;
