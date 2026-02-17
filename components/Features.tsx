
import React from 'react';
import { Weight, Map, TrendingUp, Users } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="p-6 md:p-10 liquid-glass border border-white/5 rounded-[2rem] md:rounded-[3rem] card-3d group h-full">
    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-[#00BFFF]/20 transition-all border border-white/10 group-hover:scale-110">
      {icon}
    </div>
    <h3 className="text-2xl md:text-3xl font-black mb-3 md:mb-4 group-hover:text-[#00BFFF] transition-colors uppercase tracking-tighter italic">{title}</h3>
    <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium">{desc}</p>
    <div className="mt-6 md:mt-8 h-1 w-0 bg-gradient-to-r from-neon-orange to-neon-blue group-hover:w-full transition-all duration-700"></div>
  </div>
);

const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 md:py-32 px-4 bg-[#020202]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-24 gap-6 md:gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-bangers tracking-wider text-[#FF8C00] mb-4 md:mb-6 leading-none">UNSTOPPABLE <br className="hidden sm:block"/>CORE SPECS</h2>
            <p className="text-gray-500 text-lg md:text-xl font-medium">Engineered for pure progression. Master the arts of the simulator dimension.</p>
          </div>
          <div className="h-px flex-1 bg-white/5 mx-12 hidden lg:block"></div>
          <div className="text-zinc-800 font-bangers text-6xl md:text-9xl leading-none select-none opacity-20">01-04</div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-12">
          <FeatureCard 
            icon={<Weight className="w-8 h-8 md:w-10 md:h-10 text-[#FF8C00]" />}
            title="Titan Training"
            desc="Wield massive dumbbells and set personal records on deadlifts to unlock god-tier muscles."
          />
          <FeatureCard 
            icon={<Map className="w-8 h-8 md:w-10 md:h-10 text-[#00BFFF]" />}
            title="Vortex Zones"
            desc="Unlock mystical regions from Neon City to Ancient Ruins, each providing 10x strength multipliers."
          />
          <FeatureCard 
            icon={<TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-[#FF8C00]" />}
            title="Ultra Rewards"
            desc="A progression loop so satisfying you'll watch your avatar evolve from a shrimp into a galactic titan."
          />
          <FeatureCard 
            icon={<Users className="w-8 h-8 md:w-10 md:h-10 text-[#00BFFF]" />}
            title="Global Apex"
            desc="Compete in real-time on global leaderboards to prove you are the strongest entity in existence."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
