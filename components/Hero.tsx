
import React from 'react';
import { Play, Trophy, Zap } from 'lucide-react';

const ROBLOX_LINK = "https://www.roblox.com/share?code=8d55194d5873e5459eeedd0980b6a2ea&type=ExperienceDetails&stamp=1771278749535";

interface HeroProps {
  bannerUrl: string;
  onOpenAdmin: () => void;
}

const Hero: React.FC<HeroProps> = ({ bannerUrl, onOpenAdmin }) => {
  return (
    <section id="home" className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Dynamic Primary Game Banner */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
        style={{ 
          backgroundImage: `url('${bannerUrl}')`,
          filter: 'brightness(0.9) contrast(1.1)'
        }} 
      >
      </div>
      
      {/* Dynamic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"></div>
      
      {/* Decorative Neon Ring */}
      <div className="absolute inset-0 pointer-events-none border-[20px] border-neon-orange/5 rounded-full blur-3xl scale-150 animate-pulse"></div>

      <div className="relative z-10 text-center px-4 max-w-5xl">
        {/* Clickable Badge to open Admin Login */}
        <button 
          onClick={onOpenAdmin}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-black/80 backdrop-blur-xl border border-neon-orange/40 mb-8 animate-bounce shadow-[0_0_20px_rgba(255,140,0,0.3)] hover:border-neon-orange transition-colors group"
        >
          <Zap className="w-5 h-5 text-[#00BFFF] group-hover:scale-110 transition-transform" />
          <span className="text-sm font-black tracking-widest uppercase text-white">NOW LIVE ON ROBLOX</span>
        </button>
        
        <h1 className="text-7xl md:text-9xl font-bangers tracking-tight mb-4 drop-shadow-[0_0_20px_rgba(0,0,0,1)] uppercase">
          MEGA <span className="neon-orange underline decoration-[#00BFFF] decoration-4">STRENGTH</span> SIMULATOR
        </h1>
        
        <p className="text-xl md:text-3xl text-white font-bold mb-10 max-w-3xl mx-auto leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          TRAIN YOUR WAY TO THE TOP. UNLOCK GOD-LIKE POWER.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a 
            href={ROBLOX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 bg-neon-orange text-black font-black text-3xl px-14 py-7 rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,140,0,0.6)] border-b-8 border-orange-800 uppercase"
          >
            <Play className="w-10 h-10 fill-black" />
            PLAY NOW
          </a>
          <a
            href="#features"
            className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-2xl text-white font-black text-2xl px-12 py-6 rounded-2xl border-2 border-white/20 hover:bg-white/10 transition-all uppercase"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Trophy className="w-8 h-8 text-[#00BFFF]" />
            STATS
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-8 h-14 border-4 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
