
import React from 'react';
import { Weight, Map, TrendingUp, Users } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-3xl hover:border-[#00BFFF]/50 transition-all group">
    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#00BFFF]/20 transition-colors">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#00BFFF] transition-colors">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bangers tracking-wide neon-orange mb-4">GAME FEATURES</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to know about your journey to peak performance.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Weight className="w-8 h-8 text-[#FF8C00]" />}
            title="Train Strength"
            desc="Use dumbbells, bench presses, and deadlifts to gain muscle and unlock new abilities."
          />
          <FeatureCard 
            icon={<Map className="w-8 h-8 text-[#00BFFF]" />}
            title="Unlock New Zones"
            desc="Explore diverse maps from the Desert Gym to the Neon City, each with unique challenges."
          />
          <FeatureCard 
            icon={<TrendingUp className="w-8 h-8 text-[#FF8C00]" />}
            title="Addictive Progression"
            desc="Experience the rush of seeing your character grow from a shrimp to a titan in real-time."
          />
          <FeatureCard 
            icon={<Users className="w-8 h-8 text-[#00BFFF]" />}
            title="Global Leaderboards"
            desc="Compete with millions of players worldwide for the title of the World's Strongest."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
