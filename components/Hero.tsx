
import React from 'react';
import { Play, Info, Circle } from 'lucide-react';

const ROBLOX_LINK = "https://www.roblox.com/share?code=8d55194d5873e5459eeedd0980b6a2ea&type=ExperienceDetails&stamp=1771278749535";

interface HeroProps {
  bannerUrl: string;
  onOpenAdmin: () => void;
}

const Hero: React.FC<HeroProps> = ({ bannerUrl, onOpenAdmin }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" style={{ perspective: '2000px' }}>
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[60s] scale-110 opacity-30 mix-blend-plus-lighter"
        style={{ backgroundImage: `url('${bannerUrl}')`, filter: 'brightness(0.5) contrast(1.1)' }} 
      />
      
      <div className="relative z-10 text-center px-4 w-full max-w-7xl transform-style-3d">
        {/* Glass Status - Now links to Roblox game */}
        <div className="mb-10 md:mb-16">
            <a 
                href={ROBLOX_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass inline-flex items-center gap-4 px-10 py-4 group hover:scale-110 active:scale-95"
            >
                <Circle size={10} className="fill-green-500 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                <span className="text-[12px] md:text-[14px] font-black tracking-[0.6em] uppercase text-white/80 group-hover:text-white transition-colors">JOIN NOW</span>
            </a>
        </div>
        
        {/* Title Stack */}
        <div className="mb-16 md:mb-24 transform-style-3d">
            <h1 className="text-[clamp(3.5rem,15vw,11rem)] font-bangers tracking-tight leading-[0.8] uppercase select-none transform-style-3d">
                <span className="block text-white/10 text-[clamp(1rem,4vw,3rem)] tracking-[0.8em] font-black mb-6" style={{ transform: 'translateZ(20px)' }}>FUSIONHUB</span>
                <span className="block text-white" style={{ transform: 'translateZ(60px)', textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>MEGA</span>
                <span className="block text-[#FF8C00] animate-titan-glow italic" style={{ transform: 'translateZ(120px)' }}>STRENGTH</span>
                <span className="block text-white/5 text-[clamp(1.5rem,6vw,5rem)] mt-4 tracking-[0.4em] md:tracking-[0.6em] font-black" style={{ transform: 'translateZ(10px)' }}>SIMULATOR</span>
            </h1>
        </div>

        {/* Action Controls - Styled as thick glass bars */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center mt-12 transform-style-3d">
          <a 
            href={ROBLOX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative liquid-glass !bg-[#FF8C00] !border-transparent text-black font-black text-xl md:text-3xl px-16 md:px-28 py-8 md:py-10 rounded-[40px] hover:scale-105 active:scale-95 transition-all shadow-[0_40px_100px_rgba(255,140,0,0.3)] uppercase italic flex items-center justify-center gap-6"
            style={{ transform: 'translateZ(100px)' }}
          >
            <Play fill="black" size={28} className="md:w-10 md:h-10" />
            PLAY NOW
          </a>
          <a
            href="#features"
            className="liquid-glass text-white font-black text-lg md:text-2xl px-12 md:px-20 py-8 md:py-10 rounded-[40px] transition-all uppercase tracking-[0.4em] flex items-center justify-center gap-6 border-white/10"
            style={{ transform: 'translateZ(50px)' }}
          >
            <Info size={26} className="md:w-8 md:h-8 opacity-40" />
            CORE
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF8C00]/20 to-transparent"></div>
    </section>
  );
};

export default Hero;
