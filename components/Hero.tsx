
import React from 'react';
import { Play, Info } from 'lucide-react';

const ROBLOX_LINK = "https://www.roblox.com/share?code=8d55194d5873e5459eeedd0980b6a2ea&type=ExperienceDetails&stamp=1771278749535";

interface HeroProps {
  bannerUrl: string;
  onOpenAdmin: () => void;
}

const Hero: React.FC<HeroProps> = ({ bannerUrl, onOpenAdmin }) => {
  return (
    <section id="home" className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-black">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[60s] scale-125 animate-subtle-zoom"
        style={{ backgroundImage: `url('${bannerUrl}')`, filter: 'brightness(0.3) contrast(1.2)' }} 
      />
      
      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/80"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>
      
      <div className="relative z-10 text-center px-4 max-w-7xl">
        {/* Top Status Capsule */}
        <div className="mb-6 md:mb-8">
            <button 
                onClick={onOpenAdmin}
                className="bg-zinc-950/80 backdrop-blur-xl px-4 md:px-6 py-2 rounded-full border border-white/5 hover:border-[#FF8C00]/40 transition-all flex items-center gap-2 md:gap-3 mx-auto group"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[8px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.4em] uppercase text-zinc-400 group-hover:text-white">SERVERS ONLINE V4.2</span>
            </button>
        </div>
        
        {/* Massive Branding - Smaller font sizes as requested */}
        <div className="mb-8 md:mb-12">
            <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[7.5rem] font-bangers tracking-tight leading-[0.9] uppercase select-none">
                <span className="block text-white">MEGA</span>
                <span className="block text-[#FF8C00] animate-titan-glow italic">STRENGTH</span>
                <span className="block text-white/10 text-[1.8rem] sm:text-[2.5rem] md:text-[4rem] mt-1 tracking-[0.3em] md:tracking-[0.5em]">SIMULATOR</span>
            </h1>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mt-6 md:mt-10">
          <a 
            href={ROBLOX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-[#FF8C00] text-black font-black text-lg md:text-2xl px-8 md:px-12 py-4 md:py-6 rounded-xl md:rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,140,0,0.3)] uppercase italic flex items-center justify-center gap-3"
          >
            <Play fill="black" size={20} className="md:w-6 md:h-6" />
            PLAY NOW
          </a>
          <a
            href="#features"
            className="bg-white/5 backdrop-blur-xl text-white font-black text-base md:text-xl px-8 md:px-10 py-4 md:py-6 rounded-xl md:rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest border border-white/10 flex items-center justify-center gap-3"
          >
            <Info size={20} className="md:w-6 md:h-6" />
            GAME DATA
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
