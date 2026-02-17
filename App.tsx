
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import CodeSection from './components/CodeSection.tsx';
import UpdateLog from './components/UpdateLog.tsx';
import SecretTrigger from './components/SecretTrigger.tsx';
import AdminLogin from './components/AdminLogin.tsx';
import AdminDashboard from './AdminDashboard.tsx';
import PrivacyModal from './components/PrivacyModal.tsx';
import { MessageSquare, ExternalLink, Activity, Trophy } from 'lucide-react';
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
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [auth, setAuth] = useState<AuthState>({ isLoggedIn: false, email: null });

  const fetchData = async () => {
    try {
      const b = await storageService.getBranding();
      const c = await storageService.getCodes();
      const l = await storageService.getLogs();
      
      if (b) setBranding(b);
      if (c && c.length) setCodes(c);
      if (l && l.length) setLogs(l);
    } catch (err) {
      console.warn('Data sync issue:', err);
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

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const handleLogin = async (email: string, pass: string): Promise<boolean> => {
    const ADMIN_EMAIL = 'fusionhub122@gmail.com';
    const ADMIN_PASS = 'Tanmay@2008';
    
    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
      const session = { isLoggedIn: true, email };
      setAuth(session);
      localStorage.setItem('mss_admin_auth', JSON.stringify(session));
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, email: null });
    localStorage.removeItem('mss_admin_auth');
    setIsAdminModalOpen(false);
  };

  return (
    <div className="min-h-screen selection:bg-[#ff7b00] selection:text-white transition-colors">
      <Navbar logoUrl={branding.logo_url} onOpenAdmin={() => setIsAdminModalOpen(true)} />
      
      <main className="relative z-10 flex-1">
        <div className="reveal">
          <Hero 
            bannerUrl={branding.banner_url} 
            onOpenAdmin={() => setIsAdminModalOpen(true)} 
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 space-y-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
            <div className="reveal relative" style={{ transitionDelay: '0.1s' }}>
              <div className="absolute -inset-20 bg-[#ff7b00]/5 blur-[100px] -z-10 rounded-full"></div>
              <CodeSection codes={codes} />
            </div>
            <div className="reveal relative" style={{ transitionDelay: '0.3s' }}>
              <div className="absolute -inset-20 bg-[#3a86ff]/5 blur-[100px] -z-10 rounded-full"></div>
              <UpdateLog logs={logs} />
            </div>
          </div>
        </div>

        <section className="py-24 md:py-32 reveal px-6">
           <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-2xl rounded-[3rem] p-10 md:p-20 flex flex-col items-center text-center shadow-2xl border border-white relative overflow-hidden group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-[#ff7b00]/10 to-transparent pointer-events-none opacity-50"></div>
              
              <div className="relative z-10 w-full">
                <div className="flex flex-col items-center justify-center gap-2 mb-10 text-[#ff7b00]">
                  <Trophy size={48} className="md:size-64 drop-shadow-[0_0_20px_rgba(255,123,0,0.4)]" />
                  <span className="text-xs md:text-sm font-black uppercase tracking-[0.5em]">WORLD CLASS STRENGTH</span>
                </div>
                
                <h2 className="flex flex-col gap-0 text-6xl md:text-9xl font-black text-[#1d1d1f] mb-12 uppercase italic tracking-tighter leading-none select-none">
                  <span className="block">MEGA</span>
                  <span className="block text-[#ff7b00]">STRENGTH</span>
                  <span className="block">SIMULATOR</span>
                </h2>

                <div className="flex flex-col items-center gap-2 mb-16">
                  <span className="bg-[#ff7b00] text-white px-6 py-2 font-black text-lg md:text-2xl uppercase italic shadow-[0_10px_30px_rgba(255,123,0,0.3)]">PUSH PAST ALL</span>
                  <span className="bg-[#ff7b00] text-white px-6 py-2 font-black text-lg md:text-2xl uppercase italic shadow-[0_10px_30px_rgba(255,123,0,0.3)]">HUMAN LIMITS NOW</span>
                  <span className="bg-[#ff7b00] text-white px-6 py-2 font-black text-lg md:text-2xl uppercase italic shadow-[0_10px_30px_rgba(255,123,0,0.3)]">JOIN THE GROUP</span>
                </div>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row w-full max-w-2xl gap-6">
                 <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#5865F2] text-white py-6 md:py-8 rounded-3xl font-black text-xl md:text-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(88,101,242,0.3)] italic uppercase tracking-widest border border-white/20">
                    <MessageSquare size={28} />
                    COMMUNITY
                 </a>
                 <a href={ROBLOX_LINK} target="_blank" rel="noopener noreferrer" className="flex-1 bg-black text-white py-6 md:py-8 rounded-3xl font-black text-xl md:text-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.3)] italic uppercase tracking-widest border border-white/10">
                    <ExternalLink size={28} />
                    PLAY HUB
                 </a>
              </div>
           </div>
        </section>
      </main>

      <footer className="py-32 px-6 text-center reveal relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bangers text-[20vw] md:text-[12rem] text-black/5 select-none mb-14 leading-none uppercase">MEGA STRENGTH</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 text-[#1d1d1f] font-black text-xs md:text-sm uppercase tracking-[0.4em] italic">
             <a href="#" onClick={(e) => { e.preventDefault(); setIsPrivacyModalOpen(true); }} className="hover:text-[#ff7b00] transition-colors border-b-2 border-transparent hover:border-[#ff7b00]">Privacy Protocol</a>
             <a href="mailto:fusionhub122@gmail.com" className="hover:text-[#ff7b00] transition-colors border-b-2 border-transparent hover:border-[#ff7b00]">Direct Support</a>
          </div>
          <p className="mt-20 text-[#86868b] text-[10px] font-black uppercase tracking-[0.6em] opacity-40">© 2025 FUSIONHUB OS</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-4 bg-[#5865F2] shadow-[0_-10px_30px_rgba(88,101,242,0.2)]"></div>
      </footer>
      
      <SecretTrigger onClick={() => setIsAdminModalOpen(true)} />
      
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-[200000]">
          {!auth.isLoggedIn ? (
            <AdminLogin 
              isOpen={true} 
              onClose={() => setIsAdminModalOpen(false)} 
              onLogin={handleLogin} 
            />
          ) : (
            <AdminDashboard 
              branding={branding} 
              codes={codes} 
              logs={logs} 
              onRefresh={fetchData} 
              onLogout={handleLogout} 
              onClose={() => setIsAdminModalOpen(false)}
            />
          )}
        </div>
      )}

      <PrivacyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
    </div>
  );
};

export default App;
