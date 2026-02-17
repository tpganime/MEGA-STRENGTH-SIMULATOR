import React from 'react';
import { Play } from 'lucide-react';

const ROBLOX_LINK = "https://www.roblox.com/share?code=8d55194d5873e5459eeedd0980b6a2ea&type=ExperienceDetails&stamp=1771278749535";

interface HeroProps {
  bannerUrl: string;
  onOpenAdmin: () => void;
}

const Hero: React.FC<HeroProps> = ({ bannerUrl, onOpenAdmin }) => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden card-3d">
      <div className="relative z-20 text-center px-4 w-full max-w-5xl transform-style-3d">
        {/* Updated Join Simulation Button to open Admin Panel */}
        <div className="mb-12">
            <button 
                onClick={onOpenAdmin}
                className="liquid-glass inline-flex items-center gap-3 px-8 py-3 group hover:scale-110 active:scale-95 cursor-pointer z-30 outline-none border-white/40"
            >
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]"></span>
                </div>
                <span className="text-[14px] font-black tracking-[0.4em] uppercase text-[#1d1d1f]/80 group-hover:text-black transition-colors">JOIN SIMULATION</span>
            </button>
        </div>
        
        {/* Title Stack */}
        <div className="mb-16 transform-style-3d">
            <h1 className="text-[clamp(3rem,15vw,9rem)] font-bangers tracking-tight leading-[0.85] uppercase select-none transform-style-3d">
                <span className="block text-[#1d1d1f]/10 text-[clamp(1rem,4vw,3rem)] tracking-[0.8em] font-black mb-6">FUSIONHUB</span>
                <span className="block text-[#1d1d1f]" style={{ textShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>MEGA</span>
                <span className="block text-[#ff7b00]" style={{ filter: 'drop-shadow(0 10px 20px rgba(255,123,0,0.3))' }}>STRENGTH</span>
                <span className="block text-[#1d1d1f]/5 text-[clamp(1.5rem,6vw,5rem)] mt-4 tracking-[0.6em] font-black">SIMULATOR</span>
            </h1>
        </div>

        {/* Primary Action Button - Still points to Roblox */}
        <div className="flex justify-center mt-12 relative z-40">
          <a 
            href={ROBLOX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative liquid-glass !bg-[#1d1d1f] !border-transparent text-white font-black text-2xl md:text-4xl px-16 md:px-24 py-8 md:py-10 rounded-[40px] hover:scale-110 active:scale-95 transition-all shadow-[0_30px_60px_rgba(0,0,0,0.2)] uppercase italic flex items-center justify-center gap-6 cursor-pointer pointer-events-auto"
          >
            <Play fill="white" size={32} className="md:w-10 md:h-10 transition-transform group-hover:scale-125" />
            PLAY NOW
          </a>
        </div>
      </div>

      {/* Hero Visual Preview */}
      <div className="mt-24 w-full max-w-6xl px-4 relative z-10">
        <div 
          className="relative liquid-glass overflow-hidden aspect-video shadow-2xl transition-all duration-1000 transform hover:rotate-y-[5deg]"
          style={{ transform: 'rotateX(5deg)' }}
        >
           <img 
            src={bannerUrl} 
            alt="Gameplay Preview" 
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
        </div>
      </div>
      
      {/* Visual Decoration */}
      <div className="w-full max-w-md mt-20 px-8 opacity-50">
        <div className="spectral-bar w-full"></div>
      </div>
    </section>
  );
};

export default Hero;