import React from 'react';
import journeyData from '../content/journey.json';
import JourneyStage from './JourneyStage';

const Journey = () => {
  return (
    <section id="journey" className="relative w-full py-32 md:py-48 bg-transparent flex flex-col items-center justify-center overflow-visible">
        {/* Vertical Line Container */}
        <div className="absolute left-10 md:left-1/2 top-40 bottom-40 w-[2px] transform md:-translate-x-1/2">
           {/* Dark track */}
           <div className="absolute inset-0 bg-blue-900/30" />
           {/* Glow line */}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
        </div>

        <div className="relative w-full max-w-7xl px-4 md:px-8 mx-auto flex flex-col gap-24 md:gap-40">
          {journeyData.map((stage, index) => (
             <JourneyStage key={stage.id} stage={stage} index={index} />
          ))}
        </div>
    </section>
  );
};

export default Journey;
