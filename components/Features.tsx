
import React from 'react';
import { Weight, Map, TrendingUp, Users } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; index: number }> = ({ icon, title, desc, index }) => (
  <div className="group liquid-glass p-8 md:p-14 border border-white/5 card-3d h-full min-h-[360px] flex flex-col items-center text-center">
    <div className="absolute top-4 left-6 text-white/5 font-bangers text-4xl select-none group-hover:text-white/10 transition-colors">0{index + 1}</div>
    
    <div className="w-20 h-20 md:w-28 md:h-28 liquid-glass !bg-white/5 rounded-[2.5rem] flex items-center justify-center mb-10 group-hover:!bg-[#00BFFF]/10 transition-all shadow-xl group-hover:-translate-y-4" style={{ transform: 'translateZ(40px)' }}>
      {icon}
    </div>
    <h3 className="text-3xl md:text-5xl font-black mb-6 group-hover:text-[#00BFFF] transition-colors uppercase tracking-tighter italic" style={{ transform: 'translateZ(60px)' }}>{title}</h3>
    <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-medium max-w-sm" style={{ transform: 'translateZ(30px)' }}>{desc}</p>
    
    <div className="mt-auto pt-10 w-full">
        <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent transition-all duration-1000"></div>
        </div>
    </div>
  </div>
);

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 md:py-48 px-4 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative Blueprint Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 md:mb-40">
            <h2 className="text-5xl md:text-9xl font-bangers tracking-tight text-white mb-8 leading-[0.8] uppercase">
              TITAN <span className="text-[#FF8C00] italic">CORE</span> SPECS
            </h2>
            <p className="text-gray-500 text-xl md:text-3xl font-medium max-w-2xl mx-auto tracking-tight">
                Architecting the next generation of human performance simulation.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <FeatureCard 
            index={0}
            icon={<Weight className="w-10 h-10 md:w-14 md:h-14 text-[#FF8C00]" />}
            title="Max Loads"
            desc="Shatter limits with precision weighted assets. Real-time physics engine integration."
          />
          <FeatureCard 
            index={1}
            icon={<Map className="w-10 h-10 md:w-14 md:h-14 text-[#00BFFF]" />}
            title="Multi-D Warp"
            desc="Explore 4D environments from neon hubs to cosmic peaks. 10x strength multipliers."
          />
          <FeatureCard 
            index={2}
            icon={<TrendingUp className="w-10 h-10 md:w-14 md:h-14 text-[#FF8C00]" />}
            title="Apex Gains"
            desc="Linear progression models tuned for consistent dopamine and power spikes."
          />
          <FeatureCard 
            index={3}
            icon={<Users className="w-10 h-10 md:w-14 md:h-14 text-[#00BFFF]" />}
            title="Social Sync"
            desc="Compete in global hierarchy wars. Real-time titan ranking across all dimensions."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
