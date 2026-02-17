
import React from 'react';
import { Play, Info, Sparkles } from 'lucide-react';

const ROBLOX_LINK = "https://www.roblox.com/share?code=8d55194d5873e5459eeedd0980b6a2ea&type=ExperienceDetails&stamp=1771278749535";

interface HeroProps {
  bannerUrl: string;
  onOpenAdmin: () => void;
}

const Hero: React.FC<HeroProps> = ({ bannerUrl, onOpenAdmin }) => {
  return (
    <section id="home" className="relative h-[90vh] md:h-screen min-h-[600px] flex items-center justify-center overflow-hidden" style={{ perspective: '2000px' }}>
      {/* Immersive Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[60s] scale-110 animate-subtle-zoom opacity-40 mix-blend-screen"
        style={{ backgroundImage: `url('${bannerUrl}')`, filter: 'brightness(0.6) contrast(1.2)' }} 
      />
      
      {/* Depth Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/80"></div>
      
      <div className="relative z-10 text-center px-4 w-full max-w-7xl transform-style-3d">
        {/* Status Bubble - Refractive Glass */}
        <div className="mb-12 md:mb-16">
            <button 
                onClick={onOpenAdmin}
                className="liquid-glass inline-flex items-center gap-4 px-8 py-3 group hover:scale-105"
            >
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                <span className="text-[12px] md:text-[14px] font-black tracking-[0.6em] uppercase text-white/90 group-hover:text-[#FF8C00] transition-colors">JOIN NOW</span>
                <Sparkles className="w-4 h-4 text-[#FF8C00] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
        </div>
        
        {/* Cinematic Branding */}
        <div className="mb-12 md:mb-20 transform-style-3d">
            <h1 className="text-[4rem] sm:text-[7rem] md:text-[10rem] font-bangers tracking-tight leading-[0.8] uppercase select-none transform-style-3d">
                <span className="block text-white/20 text-[1.5rem] sm:text-[2rem] md:text-[3rem] tracking-[0.8em] font-black mb-4" style={{ transform: 'translateZ(20px)' }}>FUSIONHUB</span>
                <span className="block text-white text-4d" style={{ transform: 'translateZ(60px)' }}>MEGA</span>
                <span className="block text-[#FF8C00] animate-titan-glow italic relative" style={{ transform: 'translateZ(100px)' }}>
                  STRENGTH
                  <span className="absolute -inset-x-8 -inset-y-4 bg-[#FF8C00]/5 blur-3xl rounded-full -z-10 animate-pulse"></span>
                </span>
                <span className="block text-white/5 text-[2rem] sm:text-[3.5rem] md:text-[6rem] mt-2 tracking-[0.3em] md:tracking-[0.5em] font-black" style={{ transform: 'translateZ(10px)' }}>SIMULATOR</span>
            </h1>
        </div>

        {/* Action Center - High Precision Glass Controls */}
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center mt-12 transform-style-3d px-4">
          <a 
            href={ROBLOX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative liquid-glass !bg-[#FF8C00]/80 !border-[#FF8C00]/40 text-black font-black text-xl md:text-3xl px-12 md:px-24 py-6 md:py-9 rounded-[32px] hover:scale-105 active:scale-95 transition-all shadow-[0_20px_80px_rgba(255,140,0,0.3)] uppercase italic flex items-center justify-center gap-4"
            style={{ transform: 'translateZ(80px)' }}
          >
            <Play fill="black" size={24} className="md:w-8 md:h-8" />
            PLAY NOW
          </a>
          <a
            href="#features"
            className="liquid-glass text-white font-black text-lg md:text-2xl px-10 md:px-16 py-6 md:py-9 rounded-[32px] hover:bg-white/10 transition-all uppercase tracking-[0.3em] flex items-center justify-center gap-4"
            style={{ transform: 'translateZ(40px)' }}
          >
            <Info size={24} className="md:w-7 md:h-7 opacity-70" />
            SPECS
          </a>
        </div>
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 opacity-20">
          <div className="w-px h-20 bg-gradient-to-b from-white to-transparent"></div>
          <span className="text-[10px] font-black tracking-widest uppercase">INITIALIZING ASCENT</span>
      </div>
    </section>
  );
};

export default Hero;
