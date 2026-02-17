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
      loader.style.pointerEvents = 'none';
      setTimeout(() => {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 500);
    }
  };

  const fetchData = async () => {
    try {
      const [c, l, b] = await Promise.all([
        storageService.getCodes(),
        storageService.getLogs(),
        storageService.getBranding()
      ]);
      
      if (c && c.length) setCodes(c);
      if (l && l.length) setLogs(l);
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
        const parsed = JSON.parse(storedAuth);
        if (parsed && parsed.isLoggedIn) {
          setAuth(parsed);
        }
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
      // Once logged in, show the dashboard
      setIsAdminModalOpen(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, email: null });
    localStorage.removeItem('mss_admin_auth');
    setIsAdminModalOpen(false);
  };

  const handleOpenAdmin = () => {
    setIsAdminModalOpen(true);
  };

  const handleCloseAdmin = () => {
    setIsAdminModalOpen(false);
  };

  return (
    <div className="min-h-screen selection:bg-[#ff7b00] selection:text-white">
      <Navbar logoUrl={branding.logo_url} onOpenAdmin={handleOpenAdmin} />
      
      <main>
        <Hero 
          bannerUrl={branding.banner_url} 
          onOpenAdmin={handleOpenAdmin} 
        />

        <Features />

        <div className="max-w-7xl mx-auto px-4 py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <CodeSection codes={codes} />
            <UpdateLog logs={logs} />
          </div>
        </div>

        <section className="py-40 bg-white/30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4">
             <div className="liquid-glass p-16 md:p-24 rounded-[4rem] flex flex-col items-center text-center shadow-3xl">
                <div className="max-w-3xl">
                  <h2 className="text-6xl md:text-8xl font-black text-[#1d1d1f] mb-10 uppercase italic tracking-tighter">
                    JOIN THE <span className="text-[#ff7b00]">MEGA STRENGTH</span> SIMULATOR
                  </h2>
                  <p className="text-[#86868b] text-2xl font-bold mb-16 leading-relaxed uppercase tracking-widest">Connect with our core developer network and thousands of active titans.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-10">
                   <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="bg-[#5865F2] text-white px-16 py-8 rounded-[30px] font-black text-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-5 shadow-2xl italic uppercase tracking-widest cursor-pointer">
                      <MessageSquare size={32} />
                      DISCORD
                   </a>
                   <a href={ROBLOX_LINK} target="_blank" rel="noopener noreferrer" className="liquid-glass !bg-black text-white px-16 py-8 rounded-[30px] font-black text-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-5 shadow-2xl italic uppercase tracking-widest border-transparent cursor-pointer">
                      <ExternalLink size={32} />
                      GROUP
                   </a>
                </div>
             </div>
          </div>
        </section>
      </main>

      <footer className="py-40 px-4 text-center border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bangers text-[10vw] md:text-[8rem] text-black/5 select-none mb-16 leading-none uppercase">MEGA STRENGTH SIMULATOR</h2>
          <div className="flex justify-center flex-wrap gap-12 text-[#1d1d1f] font-black text-sm uppercase tracking-[0.4em] italic">
             <a href="#" className="hover:text-[#ff7b00] transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-[#ff7b00] transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-[#ff7b00] transition-colors">Support</a>
          </div>
          <p className="mt-20 text-[#86868b] text-xs font-black uppercase tracking-[0.6em]">© 2025 FUSIONHUB STUDIO DATA SYSTEMS</p>
        </div>
      </footer>
      
      <SecretTrigger onClick={handleOpenAdmin} />
      
      <AdminLogin 
        isOpen={isAdminModalOpen && !auth.isLoggedIn} 
        onClose={handleCloseAdmin} 
        onLogin={handleLogin} 
      />

      {isAdminModalOpen && auth.isLoggedIn && (
        <AdminDashboard 
          branding={branding} 
          codes={codes} 
          logs={logs} 
          onRefresh={fetchData} 
          onLogout={handleLogout} 
          onClose={handleCloseAdmin}
        />
      )}
    </div>
  );
};

export default App;