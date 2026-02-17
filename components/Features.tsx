import React from 'react';
import { Circle, Triangle, Square, Plus } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="group liquid-glass p-12 flex flex-col items-start text-left hover:scale-[1.05] card-3d">
    <div className="text-[#1d1d1f] mb-10 w-16 h-16 liquid-glass !rounded-2xl flex items-center justify-center shadow-inner" style={{ transform: 'translateZ(40px)' }}>
      {icon}
    </div>
    <h3 className="text-3xl font-black text-[#1d1d1f] mb-6 tracking-tight uppercase italic" style={{ transform: 'translateZ(20px)' }}>{title}</h3>
    <p className="text-xl text-[#86868b] font-medium leading-relaxed">{desc}</p>
    
    <div className="mt-10 w-full opacity-30 group-hover:opacity-100 transition-opacity">
        <div className="spectral-bar w-2/3 h-1"></div>
    </div>
  </div>
);

const Features: React.FC = () => {
  return (
    <section id="features" className="py-40 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32 card-3d">
            <h2 className="text-5xl md:text-8xl font-black text-[#1d1d1f] mb-10 uppercase tracking-tight" style={{ transform: 'translateZ(100px)' }}>
              CORE <span className="text-[#ff7b00]">MECHANICS</span>
            </h2>
            <div className="h-1 w-24 bg-[#ff7b00] mx-auto mb-10"></div>
            <p className="text-xl md:text-3xl text-[#86868b] max-w-3xl mx-auto font-semibold">
                Engineered for performance. Tuned for precision.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <FeatureCard 
            icon={<Circle className="w-10 h-10 text-[#3a86ff]" fill="currentColor" />}
            title="Stability"
            desc="Advanced physics engine ensuring every lift is grounded in reality."
          />
          <FeatureCard 
            icon={<Triangle className="w-10 h-10 text-[#8338ec]" fill="currentColor" />}
            title="Expansion"
            desc="Three distinct worlds designed with procedural generation logic."
          />
          <FeatureCard 
            icon={<Square className="w-10 h-10 text-[#ff006e]" fill="currentColor" />}
            title="Authority"
            desc="Global leaderboard integration with real-time ranking synchronization."
          />
          <FeatureCard 
            icon={<Plus className="w-10 h-10 text-[#34C759]" strokeWidth={4} />}
            title="Synthesis"
            desc="Combine abilities to unlock unique performance multipliers."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;