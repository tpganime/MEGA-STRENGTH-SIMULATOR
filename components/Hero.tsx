import React from 'react';
import { Play, Info, ShieldCheck, Zap } from 'lucide-react';

const ROBLOX_LINK = "https://www.roblox.com/share?code=8d55194d5873e5459eeedd0980b6a2ea&type=ExperienceDetails&stamp=1771278749535";

interface HeroProps {
  bannerUrl: string;
  onOpenAdmin: () => void;
}

const MetadataBadge: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="liquid-glass px-6 py-3 flex items-center gap-3 border-white/50 transition-all hover:scale-105">
    <div className="text-[#1d1d1f]">{icon}</div>
    <div className="flex flex-col items-start leading-none">
      <span className="text-[9px] font-black text-[#86868b] uppercase tracking-widest mb-1">{label}</span>
      <span className="text-xs font-black text-[#1d1d1f] uppercase italic">{value}</span>
    </div>
  </div>
);

const Hero: React.FC<HeroProps> = ({ bannerUrl, onOpenAdmin }) => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-12 overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
      <div className="relative z-20 text-center px-4 w-full max-w-5xl" style={{ transformStyle: 'preserve-3d' }}>
        <div className="mb-12 flex flex-col items-center gap-8" style={{ transform: 'translateZ(40px)' }}>
            <button 
                onClick={onOpenAdmin}
                className="liquid-glass inline-flex items-center gap-3 px-8 py-3 group hover:scale-110 active:scale-95 cursor-pointer z-30 outline-none border-white/40 pointer-events-auto"
            >
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]"></span>
                </div>
                <span className="text-[14px] font-black tracking-[0.4em] uppercase text-[#1d1d1f]/80 group-hover:text-black transition-colors">JOIN SIMULATION</span>
            </button>

            {/* Game Metadata Row */}
            <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <MetadataBadge 
                icon={<Info size={14} />} 
                label="Genre" 
                value="Simulation" 
              />
              <MetadataBadge 
                icon={<Zap size={14} />} 
                label="Subgenre" 
                value="Physics Sim" 
              />
              <MetadataBadge 
                icon={<ShieldCheck size={14} />} 
                label="Maturity" 
                value="Minimal" 
              />
            </div>
        </div>
        
        <div className="mb-16" style={{ transform: 'translateZ(80px)' }}>
            <h1 className="text-[clamp(3rem,15vw,9rem)] font-bangers tracking-tight leading-[0.85] uppercase select-none">
                <span className="block text-[#1d1d1f]/10 text-[clamp(1rem,4vw,3rem)] tracking-[0.8em] font-black mb-6">FUSIONHUB</span>
                <span className="block text-[#1d1d1f] drop-shadow-2xl">MEGA</span>
                <span className="block text-[#ff7b00]" style={{ filter: 'drop-shadow(0 10px 30px rgba(255,123,0,0.4))' }}>STRENGTH</span>
                <span className="block text-[#1d1d1f]/5 text-[clamp(1.5rem,6vw,5rem)] mt-4 tracking-[0.6em] font-black">SIMULATOR</span>
            </h1>
        </div>

        <div className="flex justify-center mt-12 relative z-40" style={{ transform: 'translateZ(120px)' }}>
          <a 
            href={ROBLOX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative liquid-glass !bg-[#1d1d1f] !border-transparent text-white font-black text-2xl md:text-4xl px-16 md:px-24 py-8 md:py-10 rounded-[40px] hover:scale-110 hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)] active:scale-95 transition-all shadow-[0_30px_60px_rgba(0,0,0,0.2)] uppercase italic flex items-center justify-center gap-6 cursor-pointer pointer-events-auto"
          >
            <Play fill="white" size={32} className="md:w-10 md:h-10 transition-transform group-hover:scale-125" />
            PLAY NOW
          </a>
        </div>
      </div>

      <div className="mt-24 w-full max-w-6xl px-4 relative z-10" style={{ transform: 'rotateX(8deg) translateZ(-50px)', transformStyle: 'preserve-3d' }}>
        <div 
          className="relative liquid-glass overflow-hidden aspect-video shadow-3xl transition-all duration-1000 group hover:rotate-y-[2deg] hover:rotate-x-[2deg]"
        >
           <img 
            src={bannerUrl} 
            alt="Gameplay Preview" 
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-2000"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
           
           {/* 4D Glow Overlay */}
           <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-[#ff7b00]/20 via-transparent to-[#3a86ff]/20"></div>
        </div>
      </div>
      
      <div className="w-full max-w-md mt-20 px-8 opacity-40" style={{ transform: 'translateZ(10px)' }}>
        <div className="spectral-bar w-full"></div>
      </div>
    </section>
  );
};

export default Hero;