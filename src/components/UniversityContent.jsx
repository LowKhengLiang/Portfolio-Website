import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import SubSectionView from './SubSectionView';

const UniversityContent = ({ stage }) => {
  const [activeSub, setActiveSub] = useState(null);

  React.useEffect(() => {
    if (activeSub) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [activeSub]);

  const handleCardClick = (sub) => {
    setActiveSub(sub);
  };

  const handleClose = () => {
    setActiveSub(null);
  };

  return (
    <>
      <style>{`.custom-scrollbar::-webkit-scrollbar { display: none; } .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-colors text-left shadow-xl backdrop-blur-md">
        <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-2 block">{stage.year}</span>
        <h3 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{stage.title}</h3>
        
        <div className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed font-light space-y-4">
          {stage.description.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        
        <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 text-gray-200">Awards & Contributions</h4>
            <ul className="space-y-2">
              {stage.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-400">
                  <div className="w-1.5 h-1.5 mt-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] flex-shrink-0" />
                  <span className="font-light text-sm">{detail}</span>
                </li>
              ))}
            </ul>
        </div>

        {stage.subSections && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 border-t border-white/10 pt-6">
             {stage.subSections.map((sub) => (
                <motion.button 
                   key={sub.id}
                   whileHover={{ scale: 1.02, y: -2 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => handleCardClick(sub)}
                   layoutId={`card-container-${sub.id}`}
                   className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-900/40 hover:border-blue-500/50 transition-colors text-left group"
                >
                   <div>
                     <motion.h5 layoutId={`card-title-${sub.id}`} className="font-semibold text-base text-blue-200 mb-1">{sub.cardTitle}</motion.h5>
                     <p className="text-xs text-gray-400">{sub.cardDescription}</p>
                   </div>
                   <ChevronRight className="text-blue-400 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </motion.button>
             ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeSub && (
          <SubSectionView 
            key={activeSub.id}
            sub={activeSub} 
            onClose={handleClose} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default UniversityContent;
