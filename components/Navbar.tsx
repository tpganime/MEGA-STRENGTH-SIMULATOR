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
    { name: 'MECHANICS', href: '#features' },
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
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
      <div className="liquid-glass px-8 py-4 flex items-center justify-between shadow-2xl border-white/40">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={onOpenAdmin}>
          <div className="w-10 h-10 rounded-xl overflow-hidden liquid-glass flex items-center justify-center p-1 border-white">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
            ) : (
              <div className="w-4 h-4 rounded-full bg-black"></div>
            )}
          </div>
          <span className="font-black text-xl tracking-tighter text-[#1d1d1f] italic uppercase whitespace-nowrap">MEGA STRENGTH SIMULATOR</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[11px] font-black text-[#86868b] hover:text-black tracking-[0.3em] transition-all"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={ROBLOX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1d1d1f] text-white text-[11px] font-black px-8 py-3 rounded-full hover:scale-110 active:scale-95 transition-all tracking-[0.2em] italic"
          >
            PLAY
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#1d1d1f] p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 liquid-glass p-8 space-y-6 animate-in slide-in-from-top-10 duration-500 shadow-3xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block text-4xl font-black italic tracking-tighter text-[#1d1d1f] uppercase"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={ROBLOX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#1d1d1f] text-white font-black py-6 rounded-3xl text-center text-xl italic uppercase"
          >
            PLAY ON ROBLOX
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;