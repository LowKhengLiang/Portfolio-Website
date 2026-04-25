import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, ExternalLink } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
};

const renderMarkdown = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const ProjectCard = ({ project }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all flex flex-col h-full group bg-white/5 relative overflow-hidden text-left"
  >
    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    <div className="flex justify-between items-start mb-4 relative z-10 gap-4">
      <h5 className="text-lg font-semibold text-blue-200 leading-tight group-hover:text-blue-300 transition-colors">{project.title}</h5>
      {project.link && (
        <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors shrink-0">
          <GithubIcon className="w-5 h-5" />
        </a>
      )}
    </div>
    <p className="text-sm text-gray-300 flex-grow font-light leading-relaxed relative z-10">{project.description}</p>
  </motion.div>
);

const SectionContainer = ({ title, children }) => (
  <div className="mb-16 w-full text-left">
    <h4 className="text-xl md:text-2xl font-bold mb-8 text-blue-300 border-b border-white/10 pb-4 inline-block">{title}</h4>
    {children}
  </div>
);

const SubSectionView = ({ sub, onClose }) => {
  const scrollRef = useRef(null);

  const modalContent = (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] bg-[#030014]/95 backdrop-blur-3xl overflow-y-auto"
    >
        <div className="min-h-screen w-full flex flex-col items-center px-4 md:px-6 py-16">
            <div className="w-full max-w-4xl">
                {/* Header & Back Button */}
                <div className="flex items-center mb-12">
                    <button 
                      onClick={onClose}
                      className="flex items-center gap-2 text-blue-400 hover:text-white transition-colors group px-4 py-2 rounded-full glass-panel hover:bg-blue-900/40 shadow-lg"
                    >
                      <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                      <span className="font-medium tracking-wide uppercase text-sm">Return</span>
                    </button>
                </div>

                <motion.div layoutId={`card-container-${sub.id}`} className="mb-14 flex flex-col items-center text-center">
                    <motion.h2 layoutId={`card-title-${sub.id}`} className="text-4xl md:text-6xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight">{sub.title}</motion.h2>
                    {sub.content.text && (
                      <div className="text-gray-300 text-base md:text-lg leading-relaxed font-light text-left w-full space-y-6">
                          {sub.content.text.split('\n\n').map((para, i) => (
                            <p key={i}>{renderMarkdown(para)}</p>
                          ))}
                      </div>
                    )}
                </motion.div>

                {/* Segments Display (e.g. Academic Skillsets) */}
                {sub.content.segments && (
                  <div className="w-full flex flex-col items-start mt-10">
                     
                     {/* Machine Learning & Deep Learning Segment */}
                     {sub.content.segments.machineLearning && (
                        <SectionContainer title={sub.content.segments.machineLearning.title}>
                           <div className="space-y-12 w-full">
                               <div>
                                 <h5 className="text-lg font-semibold text-gray-200 mb-6 flex items-center gap-3">
                                     <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                     Machine Learning Projects
                                 </h5>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                    {sub.content.segments.machineLearning.mlProjects.map((proj, i) => (
                                       <ProjectCard key={i} project={proj} />
                                    ))}
                                 </div>
                               </div>

                               <div>
                                 <h5 className="text-lg font-semibold text-gray-200 mb-6 flex items-center gap-3">
                                     <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                                     Deep Learning Projects
                                 </h5>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                    {sub.content.segments.machineLearning.dlProjects.map((proj, i) => (
                                       <ProjectCard key={i} project={proj} />
                                    ))}
                                 </div>
                               </div>
                           </div>
                        </SectionContainer>
                     )}

                     {/* Data Processing & SQL Segment */}
                     {sub.content.segments.dataProcessing && (
                        <SectionContainer title={sub.content.segments.dataProcessing.title}>
                           <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 w-full flex flex-col items-center bg-white/5">
                              <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative mb-8">
                                  <img src={getAssetUrl(sub.content.segments.dataProcessing.image)} alt="SQL Progress" className="w-full h-auto max-h-[500px] object-cover drop-shadow-2xl" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/60 to-transparent opacity-50" />
                              </div>
                              <p className="text-gray-300 text-center mb-8 font-light text-lg">{sub.content.segments.dataProcessing.caption}</p>
                              {sub.content.segments.dataProcessing.link && (
                                <a 
                                  href={sub.content.segments.dataProcessing.link} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/40 hover:border-blue-500 transition-all font-medium"
                                >
                                  View StrataScratch Profile
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                           </div>
                        </SectionContainer>
                     )}

                     {/* Report Showcase Segment */}
                     {sub.content.segments.reportShowcase && (
                        <SectionContainer title={sub.content.segments.reportShowcase.title}>
                           <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 w-full relative overflow-hidden group bg-gradient-to-br from-white/5 to-[#030014] text-left">
                              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                 <FileText className="w-40 h-40 text-blue-400" />
                              </div>
                              <div className="relative z-10 w-full max-w-2xl">
                                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">Data Programming Assignment</h4>
                                  <div className="text-gray-300 leading-relaxed font-light mb-10 space-y-4 text-base md:text-lg">
                                     {sub.content.segments.reportShowcase.description.split('\n\n').map((para, i) => (
                                        <p key={i}>{renderMarkdown(para)}</p>
                                     ))}
                                  </div>
                                  
                                  {sub.content.segments.reportShowcase.link && (
                                     <a 
                                        href={sub.content.segments.reportShowcase.link} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all font-medium"
                                     >
                                        <FileText className="w-5 h-5" />
                                        Read Full Report
                                        <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                                     </a>
                                  )}
                              </div>
                           </div>
                        </SectionContainer>
                     )}

                     {/* Generic Bullet Points Segment */}
                     {sub.content.segments.bulletPoints && (
                        <SectionContainer title={sub.content.segments.bulletPoints.title}>
                            <ul className="space-y-4">
                              {sub.content.segments.bulletPoints.items.map((item, i) => (
                                 <li key={i} className="flex items-start gap-4 text-gray-300">
                                   <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] flex-shrink-0" />
                                   <span className="leading-relaxed font-light text-base md:text-lg">{renderMarkdown(item)}</span>
                                 </li>
                              ))}
                            </ul>
                        </SectionContainer>
                     )}

                     {/* Generic Tags/Skills Segment */}
                     {sub.content.segments.tags && (
                        <SectionContainer title={sub.content.segments.tags.title}>
                           {Object.entries(sub.content.segments.tags.groups).map(([groupName, tags], idx) => (
                              <div key={idx} className="mb-8 last:mb-0">
                                 <h5 className="text-lg font-semibold text-gray-200 mb-4">{groupName}</h5>
                                 <div className="flex flex-wrap gap-3">
                                    {tags.map((tag, i) => (
                                       <span key={i} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-900/30 hover:border-blue-500/50 transition-all text-blue-200 text-sm font-medium tracking-wide">
                                          {tag}
                                       </span>
                                    ))}
                                 </div>
                              </div>
                           ))}
                        </SectionContainer>
                     )}

                     {/* Personal Projects Segment (Cards with Writeup + 2 Buttons) */}
                     {sub.content.segments.personalProjects && (
                        <SectionContainer title={sub.content.segments.personalProjects.title}>
                           <div className="space-y-6 w-full">
                              {sub.content.segments.personalProjects.items.map((proj, i) => (
                                 <div key={i} className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all text-left bg-white/5 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    <div className="relative z-10 w-full flex flex-col h-full">
                                      <h4 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-blue-300 transition-colors">{proj.title}</h4>
                                      <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light flex-grow mb-8">
                                         {renderMarkdown(proj.description)}
                                      </p>
                                      <div className="flex flex-wrap gap-4 mt-auto">
                                         {proj.previewSite && proj.previewSite !== "#" && (
                                            <a href={proj.previewSite} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/40 hover:border-blue-500 transition-all font-medium text-sm">
                                               Live Preview
                                               <ExternalLink className="w-4 h-4 ml-1" />
                                            </a>
                                         )}
                                         {proj.github && proj.github !== "#" && (
                                            <a href={proj.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all font-medium text-sm">
                                               <GithubIcon className="w-4 h-4" />
                                               Repository
                                            </a>
                                         )}
                                      </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </SectionContainer>
                     )}
                     
                  </div>
                )}

                {/* Premium Horizontal Carousel Gallery (Backward compatibility) */}
                {sub.content.gallery && sub.content.gallery.length > 0 && (
                   <div className="mb-16 mt-8 w-full flex flex-col items-center">
                     <h4 className="text-xl font-semibold mb-6 text-blue-300 border-b border-white/10 pb-2 inline-block mx-auto text-center">Contents</h4>
                     
                     <div className="relative w-full rounded-3xl overflow-hidden glass-panel p-2">
                         <div 
                           ref={scrollRef}
                           className="flex gap-6 overflow-x-auto snap-x snap-mandatory pt-2 pb-6 px-2 scroll-smooth"
                           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                         >
                            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                            {sub.content.gallery.map((item, i) => {
                               const isObj = typeof item === 'object' && item !== null;
                               const url = isObj ? item.url : item;
                               const caption = isObj ? item.caption : null;
                               return (
                                 <React.Fragment key={i}>
                                   {(() => {
                                      const link = isObj ? item.link : null;
                                      
                                      const CardContent = (
                                        <div className="min-w-[85vw] md:min-w-[680px] snap-center shrink-0 flex flex-col gap-3 group translate-z-0">
                                            <div className="w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative bg-[#010108]/60 flex items-center justify-center p-4">
                                               <img src={getAssetUrl(url)} alt={`Gallery frame ${i}`} className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-700 ease-out drop-shadow-lg" />
                                               <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                            </div>
                                            {caption && (
                                               <p className={`text-center text-sm font-light tracking-wide px-4 transition-colors ${link && link !== "#" ? 'text-blue-400 group-hover:text-blue-300 underline decoration-blue-400/30 underline-offset-4 group-hover:decoration-blue-400/80 cursor-pointer' : 'text-gray-400'}`}>
                                                 {caption}
                                               </p>
                                            )}
                                        </div>
                                      );

                                      return link && link !== "#" ? (
                                         <a href={link} target="_blank" rel="noreferrer" className="block outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl cursor-pointer">
                                            {CardContent}
                                         </a>
                                      ) : CardContent;
                                   })()}
                                 </React.Fragment>
                               );
                            })}
                         </div>
                     </div>
                   </div>
                )}

                {/* Documents Section (Backward compatibility) */}
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

  return typeof window !== "undefined" ? createPortal(modalContent, document.body) : null;
};

export default SubSectionView;
