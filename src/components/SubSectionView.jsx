import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';

const SubSectionView = ({ sub, onClose }) => {
  const scrollRef = useRef(null);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#030014]/95 backdrop-blur-3xl overflow-y-auto"
    >
        <div className="min-h-screen w-full flex flex-col items-center px-6 py-16">
            <div className="w-full max-w-4xl">
                {/* Header & Back Button */}
                <div className="flex items-center mb-12">
                    <button 
                      onClick={onClose}
                      className="flex items-center gap-2 text-blue-400 hover:text-white transition-colors group px-4 py-2 rounded-full glass-panel hover:bg-blue-900/40"
                    >
                      <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                      <span className="font-medium tracking-wide uppercase text-sm">Return</span>
                    </button>
                </div>

                <motion.div layoutId={`card-container-${sub.id}`} className="mb-10 text-center flex flex-col items-center">
                    <motion.h2 layoutId={`card-title-${sub.id}`} className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight text-center">{sub.title}</motion.h2>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light text-center max-w-3xl">
                        {sub.content.text}
                    </p>
                </motion.div>

                {/* Premium Horizontal Carousel Gallery */}
                {sub.content.gallery && sub.content.gallery.length > 0 && (
                   <div className="mb-16 mt-8 w-full flex flex-col items-center">
                     <h4 className="text-xl font-semibold mb-6 text-blue-300 border-b border-white/10 pb-2 inline-block mx-auto text-center">Visual Evidence</h4>
                     
                     <div className="relative w-full rounded-3xl overflow-hidden glass-panel p-2">
                         <div 
                           ref={scrollRef}
                           className="flex gap-6 overflow-x-auto snap-x snap-mandatory pt-2 pb-6 px-2 scroll-smooth"
                           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                         >
                            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                            {sub.content.gallery.map((imgUrl, i) => (
                               <div key={i} className="min-w-[80vw] md:min-w-[680px] h-[260px] md:h-[420px] snap-center shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group">
                                   <img src={imgUrl} alt={`Gallery frame ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                                   <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                               </div>
                            ))}
                         </div>
                     </div>
                   </div>
                )}

                {/* Documents Section */}
                 {sub.content.docs && sub.content.docs.length > 0 && (
                     <div className="mb-16 text-center">
                     <h4 className="text-xl font-semibold mb-6 text-blue-300 border-b border-white/10 pb-2 inline-block mx-auto">Linked Documents</h4>
                     <div className="flex flex-wrap justify-center gap-4">
                             {sub.content.docs.map((doc, i) => (
                                 <a 
                                   key={i} 
                                   href={doc.link} 
                                   target="_blank" 
                                   rel="noreferrer"
                                   className="flex items-center gap-3 px-6 py-4 glass-panel rounded-xl hover:bg-blue-900/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 group"
                                 >
                                     <FileText className="text-purple-400 group-hover:scale-110 group-hover:text-blue-300 transition-all" />
                                     <span className="font-medium text-gray-200">{doc.name}</span>
                                 </a>
                             ))}
                         </div>
                     </div>
                 )}
            </div>
        </div>
    </motion.div>
  );
};

export default SubSectionView;
