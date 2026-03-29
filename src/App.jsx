import React from 'react';
import Background from './components/Background';
import HeroSection from './components/HeroSection';
import SkillsetSection from './components/SkillsetSection';
import Journey from './components/Journey';

function App() {
  return (
    <main className="relative w-full h-full text-white selection:bg-blue-500/30">
      <Background />
      
      {/* Scene 1 & 2 */}
      <HeroSection />

      {/* Skills Section */}
      <SkillsetSection />
      
      {/* Scene 3 - 7 */}
      <Journey />
      
      {/* Footer Buffer */}
      <div className="h-40 flex items-center justify-center text-gray-500 font-light text-sm">
        <p>© {new Date().getFullYear()} Kheng Liang | AI Engineer . Designed with Agentic AI.</p>
      </div>
    </main>
  );
}

export default App;
