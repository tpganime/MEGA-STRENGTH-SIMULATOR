import React from 'react';
import { Play, Info, ShieldCheck, Zap } from 'lucide-react';

const ROBLOX_LINK = "https://www.roblox.com/share?code=8d55194d5873e5459eeedd0980b6a2ea&type=ExperienceDetails&stamp=1771278749535";

interface HeroProps {
  bannerUrl: string;
  onOpenAdmin: () => void;
}

const StyledMetadataBadge: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="bg-white/80 backdrop-blur-md px-6 md:px-8 py-4 rounded-full flex items-center gap-4 border border-black/5 shadow-sm transition-all hover:scale-105 active:scale-95 group">
    <div className="text-[#1d1d1f] shrink-0 opacity-80 group-hover:text-[#ff7b00] transition-colors">
      {icon}
    </div>
    <div className="flex flex-col items-start leading-none">
      <span className="text-[9px] md:text-[10px] font-black text-[#86868b] uppercase tracking-widest mb-1.5">{label}</span>
      <span className="text-[13px] md:text-[15px] font-black text-[#1d1d1f] uppercase italic">{value}</span>
    </div>
  </div>
);

const Hero: React.FC<HeroProps> = ({ bannerUrl, onOpenAdmin }) => {
  return (
    <section id="home" className="relative pt-48 pb-12 flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-20 text-center px-6 w-full max-w-7xl mx-auto">
        <div className="mb-14 flex flex-col items-center gap-12">
            <button 
                onClick={onOpenAdmin}
                className="liquid-glass inline-flex items-center gap-4 px-8 py-3.5 group hover:scale-105 active:scale-95 cursor-pointer z-30 outline-none border-white/50 shadow-lg"
            >
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <span className="text-[11px] font-black tracking-[0.4em] uppercase text-[#1d1d1f]">SYNCED ONLINE</span>
            </button>

            {/* Exact Metadata Badges from Screenshot */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <StyledMetadataBadge 
                icon={<Info size={20} />} 
                label="GENRE" 
                value="SIMULATION" 
              />
              <StyledMetadataBadge 
                icon={<Zap size={20} />} 
                label="SUBGENRE" 
                value="PHYSICS SIM" 
              />
              <StyledMetadataBadge 
                icon={<ShieldCheck size={20} />} 
                label="MATURITY" 
                value="MINIMAL" 
              />
            </div>
        </div>
        
        <div className="mb-14">
            <h1 className="text-7xl md:text-[9rem] font-bangers tracking-tight leading-[0.85] uppercase select-none">
                <span className="block text-[#1d1d1f]/10 text-xl md:text-2xl tracking-[0.6em] font-black mb-8 italic">FUSIONHUB</span>
                <span className="block text-[#1d1d1f]">MEGA</span>
                <span className="block text-[#ff7b00]">STRENGTH</span>
                <span className="block text-[#1d1d1f]">SIMULATOR</span>
            </h1>
        </div>

        <div className="flex justify-center mb-20 relative z-40">
          <a 
            href={ROBLOX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-[#1d1d1f] text-white font-black text-2xl md:text-4xl px-16 py-8 md:px-20 md:py-10 rounded-[40px] hover:scale-105 transition-all shadow-[0_40px_80px_rgba(0,0,0,0.3)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.4)] uppercase italic flex items-center justify-center gap-6 cursor-pointer border-4 border-white/10"
          >
            <Play fill="white" size={36} className="transition-transform group-hover:scale-125" />
            PLAY NOW
          </a>
        </div>
      </div>

      <div className="w-full px-6 max-w-7xl mx-auto relative z-10">
        <div className="relative liquid-glass overflow-hidden aspect-video shadow-[0_60px_120px_rgba(0,0,0,0.1)] rounded-[3rem] md:rounded-[4rem] border-white/60 group">
           <img 
            src={bannerUrl} 
            alt="Gameplay Preview" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
      
      <div className="w-full max-w-[200px] mt-24 px-8 opacity-10">
        <div className="spectral-bar w-full h-2"></div>
      </div>
    </section>
  );
};

export default Hero;