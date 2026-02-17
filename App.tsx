
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CodeSection from './components/CodeSection';
import UpdateLog from './components/UpdateLog';
import SecretTrigger from './components/SecretTrigger';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { GameCode, UpdateLog as UpdateLogType, AuthState, Branding } from './types';
import { storageService } from './services/storageService';
import { MousePointer2, Dumbbell, Globe, Anchor } from 'lucide-react';

const DEFAULT_BRANDING: Branding = {
  logo_url: 'https://r2.erweima.ai/i/qL7N00zRRaS0kQh_pG_W7A.png',
  banner_url: 'https://r2.erweima.ai/i/qL7N00zRRaS0kQh_pG_W7A.png',
  gameplay_images: ['https://r2.erweima.ai/i/0p9NfS4RR6aP4q0H-F7ZzA.png']
};

const App: React.FC = () => {
  const [codes, setCodes] = React.useState<GameCode[]>([]);
  const [logs, setLogs] = React.useState<UpdateLogType[]>([]);
  const [branding, setBranding] = React.useState<Branding>(DEFAULT_BRANDING);
  const [isAdminModalOpen, setIsAdminModalOpen] = React.useState(false);
  const [auth, setAuth] = React.useState<AuthState>({ isLoggedIn: false, email: null });
  
  // Slideshow state
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const fetchData = async () => {
    try {
      const [fetchedCodes, fetchedLogs, fetchedBranding] = await Promise.all([
        storageService.getCodes(),
        storageService.getLogs(),
        storageService.getBranding()
      ]);
      
      setCodes(fetchedCodes || []);
      setLogs(fetchedLogs || []);
      if (fetchedBranding) {
        setBranding({
          logo_url: fetchedBranding.logo_url || DEFAULT_BRANDING.logo_url,
          banner_url: fetchedBranding.banner_url || DEFAULT_BRANDING.banner_url,
          gameplay_images: fetchedBranding.gameplay_images?.length ? fetchedBranding.gameplay_images : DEFAULT_BRANDING.gameplay_images
        });
      }
    } catch (err) {
      console.error('Error in fetchData:', err);
    }
  };

  React.useEffect(() => {
    fetchData();
    const storedAuth = localStorage.getItem('mss_admin_auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  // Auto-slideshow effect
  React.useEffect(() => {
    if (branding.gameplay_images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % branding.gameplay_images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [branding.gameplay_images]);

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
    <div className="min-h-screen bg-[#050505] text-white selection:bg-neon-orange selection:text-black scroll-smooth">
      <Navbar logoUrl={branding.logo_url} />
      
      <main>
        <Hero 
          bannerUrl={branding.banner_url} 
          onOpenAdmin={() => setIsAdminModalOpen(true)} 
        />
        
        {/* How to Play Section - Multi-image Slideshow */}
        <section className="py-24 px-4 bg-gradient-to-b from-black via-[#080808] to-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-bangers tracking-widest text-white uppercase">THE GRIND <span className="neon-orange">NEVER STOPS</span></h2>
              <div className="w-32 h-2 bg-neon-orange mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-16 bg-zinc-900/40 border border-white/5 rounded-[4rem] p-8 lg:p-20 shadow-3xl">
              <div className="flex-1 space-y-10 order-2 lg:order-1">
                <div className="space-y-12">
                  <div className="flex items-start gap-6 group">
                    <div className="w-16 h-16 rounded-2xl bg-neon-orange/20 flex items-center justify-center shrink-0 border border-neon-orange/30 group-hover:scale-110 transition-transform">
                      <MousePointer2 className="w-8 h-8 text-neon-orange" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black mb-2 text-white uppercase italic tracking-wider">1. Train to Gain</h4>
                      <p className="text-gray-400 text-lg leading-relaxed">Every click increases your strength. Start with light weights and push your limits to become the ultimate powerhouse.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6 group">
                    <div className="w-16 h-16 rounded-2xl bg-[#00BFFF]/20 flex items-center justify-center shrink-0 border border-[#00BFFF]/30 group-hover:scale-110 transition-transform">
                      <Anchor className="w-8 h-8 text-[#00BFFF]" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black mb-2 text-white uppercase italic tracking-wider">2. Drag Massive Objects</h4>
                      <p className="text-gray-400 text-lg leading-relaxed">Harness your power to drag heavy objects like safes and tires across the gym. This is the fastest way to gain massive XP.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 relative group order-1 lg:order-2 w-full">
                <div className="absolute -inset-4 bg-gradient-to-r from-neon-orange to-neon-blue rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative z-10 rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] aspect-video">
                  {branding.gameplay_images.map((img, idx) => (
                    <div 
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <img 
                        src={img} 
                        alt={`Gameplay ${idx + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                     <span className="bg-neon-orange text-black font-black px-4 py-1 rounded text-sm uppercase">GAMEPLAY SHOWCASE</span>
                     <div className="flex gap-2">
                       {branding.gameplay_images.map((_, idx) => (
                         <div 
                           key={idx} 
                           className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-neon-orange' : 'w-2 bg-white/30'}`}
                         />
                       ))}
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Features />
        <CodeSection codes={codes} />
        <UpdateLog logs={logs} />
      </main>

      <footer className="bg-black py-16 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
               {branding.logo_url && (
                 <img src={branding.logo_url} alt="Logo" className="w-12 h-12 object-contain" />
               )}
               <span className="font-bangers text-4xl neon-orange tracking-widest uppercase">FUSIONHUB STUDIO</span>
            </div>
            <p className="text-gray-500 text-center md:text-left max-w-sm">
              Home of MEGA STRENGTH SIMULATOR. Join the elite group of strongest legends in the Roblox metaverse.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-16">
            <div className="space-y-4 text-center md:text-left">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Quick Links</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#home" className="hover:text-neon-orange transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-neon-orange transition-colors">Features</a></li>
                <li><a href="#codes" className="hover:text-neon-orange transition-colors">Codes</a></li>
                <li><a href="#updates" className="hover:text-neon-orange transition-colors">Updates</a></li>
              </ul>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Community</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="https://discord.gg/rEQkkq2sNc" target="_blank" rel="noopener noreferrer" className="hover:text-[#00BFFF] transition-colors">Discord Server</a></li>
                <li><span className="text-gray-600 block">Roblox Group</span><span className="text-[10px] text-neon-orange uppercase font-bold tracking-tighter">(Coming Soon)</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
           © {new Date().getFullYear()} FUSIONHUB STUDIO. Roblox is a trademark of Roblox Corporation.
        </div>
      </footer>

      {!auth.isLoggedIn && (
        <SecretTrigger onClick={() => setIsAdminModalOpen(true)} />
      )}
      <AdminLogin isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} onLogin={handleLogin} />
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
