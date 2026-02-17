
import React from 'react';
import { Dumbbell, Menu, X } from 'lucide-react';

const ROBLOX_LINK = "https://www.roblox.com/share?code=8d55194d5873e5459eeedd0980b6a2ea&type=ExperienceDetails&stamp=1771278749535";

interface NavbarProps {
  logoUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({ logoUrl }) => {
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

  return (
    <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
              ) : (
                <Dumbbell className="text-[#FF8C00] w-6 h-6" />
              )}
            </div>
            <span className="font-bangers text-2xl tracking-wider neon-orange uppercase hidden sm:block">MEGA STRENGTH SIMULATOR</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-3 py-2 rounded-md text-sm font-bold uppercase tracking-widest hover:text-[#FF8C00] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={ROBLOX_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neon-orange text-black font-black px-6 py-2 rounded-xl hover:scale-105 transition-transform inline-block shadow-[0_0_15px_rgba(255,140,0,0.4)]"
              >
                PLAY NOW
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
        <div className="md:hidden bg-black/95 border-b border-white/10 px-2 pt-2 pb-3 space-y-1 sm:px-3 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block px-3 py-4 rounded-md text-base font-bold uppercase tracking-widest hover:bg-white/5 hover:text-neon-orange"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={ROBLOX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-4 bg-neon-orange text-black font-black py-4 rounded-xl text-center block text-lg"
          >
            PLAY NOW ON ROBLOX
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
