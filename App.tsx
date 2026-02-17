import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Features from './components/Features.tsx';
import CodeSection from './components/CodeSection.tsx';
import UpdateLog from './components/UpdateLog.tsx';
import SecretTrigger from './components/SecretTrigger.tsx';
import AdminLogin from './components/AdminLogin.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import { MessageSquare, ExternalLink } from 'lucide-react';
import { GameCode, UpdateLog as UpdateLogType, AuthState, Branding } from './types.ts';
import { storageService } from './services/storageService.ts';

const DEFAULT_BRANDING: Branding = {
  logo_url: 'https://r2.erweima.ai/i/qL7N00zRRaS0kQh_pG_W7A.png',
  banner_url: 'https://r2.erweima.ai/i/qL7N00zRRaS0kQh_pG_W7A.png',
  gameplay_images: ['https://r2.erweima.ai/i/0p9NfS4RR6aP4q0H-F7ZzA.png']
};

const ROBLOX_LINK = "https://www.roblox.com/share?code=8d55194d5873e5459eeedd0980b6a2ea&type=ExperienceDetails&stamp=1771278749535";
const DISCORD_LINK = "https://discord.gg/rEQkkq2sNc";

const App: React.FC = () => {
  const [codes, setCodes] = useState<GameCode[]>([]);
  const [logs, setLogs] = useState<UpdateLogType[]>([]);
  const [branding, setBranding] = useState<Branding>(DEFAULT_BRANDING);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [auth, setAuth] = useState<AuthState>({ isLoggedIn: false, email: null });

  const hideLoader = () => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      setTimeout(() => loader.remove(), 600);
    }
  };

  const fetchData = async () => {
    try {
      const [c, l, b] = await Promise.all([
        storageService.getCodes(),
        storageService.getLogs(),
        storageService.getBranding()
      ]);
      
      setCodes(c || []);
      setLogs(l || []);
      if (b) setBranding(b);
    } catch (err) {
      console.warn('Data fetch issue:', err);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchData();
    const storedAuth = localStorage.getItem('mss_admin_auth');
    if (storedAuth) {
      try {
        setAuth(JSON.parse(storedAuth));
      } catch (e) {
        localStorage.removeItem('mss_admin_auth');
      }
    }
  }, []);

  const handleLogin = async (email: string, pass: string): Promise<boolean> => {
    const ADMIN_EMAIL = 'fusionhub122@gmail.com';
    const ADMIN_PASS = 'Tanmay@2008';
    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
      const session = { isLoggedIn: true, email };
      setAuth(session);
      localStorage.setItem('mss_admin_auth', JSON.stringify(session));
      setIsAdminModalOpen(false);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, email: null });
    localStorage.removeItem('mss_admin_auth');
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF8C00] selection:text-black">
      <Navbar logoUrl={branding.logo_url} onOpenAdmin={() => setIsAdminModalOpen(true)} />
      
      <main>
        <Hero 
          bannerUrl={branding.banner_url} 
          onOpenAdmin={() => setIsAdminModalOpen(true)} 
        />

        <Features />

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 md:py-24">
          <CodeSection codes={codes} />
          <UpdateLog logs={logs} />
        </div>

        {/* Community & Socials - Renamed to Game Name */}
        <section className="py-16 md:py-24 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4">
             <div className="liquid-glass p-8 md:p-16 rounded-[2rem] md:rounded-[4rem] flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-xl text-center lg:text-left">
                  <h2 className="text-4xl md:text-6xl font-bangers tracking-wider text-white mb-6 uppercase">JOIN THE <span className="text-[#FF8C00]">MEGA STRENGTH</span> SIMULATOR</h2>
                  <p className="text-gray-400 text-lg md:text-xl font-medium">Get exclusive sneak peeks and chat with the devs in our official community hubs.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                   <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] px-6 md:px-10 py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl transition-all hover:scale-105">
                      <MessageSquare size={24} />
                      DISCORD
                   </a>
                   <a href={ROBLOX_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 px-6 md:px-10 py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl transition-all hover:scale-105">
                      <ExternalLink size={24} />
                      ROBLOX GROUP
                   </a>
                </div>
             </div>
          </div>
        </section>
      </main>

      <footer className="py-16 md:py-20 px-4 border-t border-white/5 bg-black text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#FF8C00]/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bangers text-4xl md:text-6xl opacity-10 select-none mb-8 tracking-[1em]">FUSION HUB</h2>
          <p className="text-zinc-500 font-bold tracking-widest uppercase text-xs md:text-sm">© 2025 FUSIONHUB STUDIO</p>
          <div className="flex justify-center flex-wrap gap-6 md:gap-8 mt-12 text-zinc-600 font-black text-[10px] uppercase tracking-[0.4em]">
             <a href="#" className="hover:text-[#FF8C00] transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-[#00BFFF] transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-white transition-colors">Support</a>
             <button 
                onClick={() => setIsAdminModalOpen(true)}
                className="hover:text-red-500 transition-colors uppercase tracking-[0.4em]"
             >
                Admin Access
             </button>
          </div>
        </div>
      </footer>
      
      <SecretTrigger onClick={() => setIsAdminModalOpen(true)} />
      
      <AdminLogin 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
        onLogin={handleLogin} 
      />

      {auth.isLoggedIn && (
        <AdminDashboard 
          branding={branding} 
          codes={codes} 
          logs={logs} 
          onRefresh={fetchData} 
          onLogout={handleLogout} 
        />
      )}
    </div>
  );
};

export default App;