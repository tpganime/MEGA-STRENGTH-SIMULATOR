import React from 'react';
import { Menu, X } from 'lucide-react';

const ROBLOX_LINK = "https://www.roblox.com/share?code=8d55194d5873e5459eeedd0980b6a2ea&type=ExperienceDetails&stamp=1771278749535";

interface NavbarProps {
  logoUrl: string;
  onOpenAdmin?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ logoUrl, onOpenAdmin }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'CODES', href: '#codes' },
    { name: 'LOGS', href: '#updates' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 z-50">
      <div className="liquid-glass px-6 md:px-10 py-4 flex items-center justify-between shadow-2xl border-white/60">
        <div className="flex items-center gap-4 cursor-pointer group shrink-0" onClick={onOpenAdmin}>
          <div className="w-10 h-10 rounded-xl overflow-hidden liquid-glass flex items-center justify-center p-1 border-white shadow-inner transition-transform group-hover:scale-110">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
            ) : (
              <div className="w-4 h-4 rounded-full bg-black"></div>
            )}
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-sm tracking-tighter text-[#1d1d1f] italic uppercase whitespace-nowrap">MEGA STRENGTH</span>
            <span className="text-[8px] font-black text-[#ff7b00] tracking-[0.3em] uppercase">STUDIO HUB</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[11px] font-black text-[#86868b] hover:text-[#ff7b00] tracking-widest transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ff7b00] transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href={ROBLOX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1d1d1f] text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#ff7b00] transition-all shadow-lg shadow-black/10"
          >
            PLAY
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#1d1d1f] p-2 hover:bg-black/5 rounded-full transition-all">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-6 right-6 mt-4 liquid-glass p-8 space-y-6 shadow-2xl border-white animate-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block text-4xl font-black italic tracking-tighter text-[#1d1d1f] uppercase hover:text-[#ff7b00] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={ROBLOX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#1d1d1f] text-white font-black py-6 rounded-3xl text-center text-xl italic uppercase tracking-widest shadow-xl"
          >
            PLAY ROBLOX
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;