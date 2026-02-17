
import React from 'react';
import { Dumbbell, Menu, X, Book, MessageCircle } from 'lucide-react';

const ROBLOX_LINK = "https://www.roblox.com/share?code=8d55194d5873e5459eeedd0980b6a2ea&type=ExperienceDetails&stamp=1771278749535";
const DISCORD_LINK = "https://discord.gg/rEQkkq2sNc";

interface NavbarProps {
  logoUrl: string;
  onOpenAdmin?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ logoUrl, onOpenAdmin }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Codes', href: '#codes' },
    { name: 'Updates', href: '#updates' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenAdmin) {
      onOpenAdmin();
    } else {
      const element = document.querySelector('#home');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={handleLogoClick}>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
              ) : (
                <Dumbbell className="text-[#FF8C00] w-6 h-6 md:w-7 md:h-7" />
              )}
            </div>
            <span className="font-bangers text-2xl md:text-3xl tracking-wider text-white uppercase hidden sm:block group-hover:text-[#FF8C00] transition-colors">MEGA STRENGTH</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-2 py-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-6 w-px bg-white/10 mx-2"></div>
              <a href="#" className="p-2 text-zinc-500 hover:text-[#00BFFF] transition-colors" title="Wiki">
                <Book size={20} />
              </a>
              <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-500 hover:text-[#5865F2] transition-colors" title="Discord">
                <MessageCircle size={22} />
              </a>
              <a 
                href={ROBLOX_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF8C00] text-black font-black px-6 py-2.5 rounded-xl hover:scale-105 transition-transform inline-block shadow-[0_0_20px_rgba(255,140,0,0.3)] uppercase text-xs md:text-sm tracking-widest"
              >
                PLAY
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-2 pt-2 pb-6 space-y-1 sm:px-3 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block px-3 py-5 text-lg font-black uppercase tracking-[0.3em] hover:text-[#FF8C00]"
            >
              {link.name}
            </a>
          ))}
          <div className="flex gap-4 px-3 py-4 border-t border-white/5 mt-4">
             <a href="#" className="flex-1 bg-zinc-900 py-4 rounded-xl flex items-center justify-center gap-2">
                <Book size={18} /> WIKI
             </a>
             <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="flex-1 bg-zinc-900 py-4 rounded-xl flex items-center justify-center gap-2">
                <MessageCircle size={18} /> DISCORD
             </a>
          </div>
          <a 
            href={ROBLOX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 mt-6 bg-[#FF8C00] text-black font-black py-5 rounded-xl text-center block text-xl tracking-widest uppercase"
          >
            PLAY ON ROBLOX
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
