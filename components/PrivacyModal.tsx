import React from 'react';
import { X, Shield } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[12000] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative bg-white liquid-glass !bg-white/95 rounded-[40px] w-full max-w-2xl max-h-[85vh] overflow-y-auto p-12 shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-white animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 p-3 hover:bg-black/5 rounded-full transition-all">
          <X size={28} />
        </button>

        <div className="flex items-center gap-6 mb-12">
          <div className="w-16 h-16 bg-[#ff7b00]/10 rounded-2xl flex items-center justify-center">
            <Shield className="text-[#ff7b00]" size={32} />
          </div>
          <div>
            <h2 className="text-4xl font-black text-[#1d1d1f] uppercase italic tracking-tighter">Privacy Policy</h2>
            <p className="text-[#86868b] text-xs font-bold uppercase tracking-[0.4em]">FusionHub Protocol</p>
          </div>
        </div>

        <div className="space-y-10 text-[#555] font-medium leading-relaxed">
          <section>
            <h3 className="text-[#1d1d1f] font-black uppercase text-lg mb-4 italic tracking-tight">1. Data Collection</h3>
            <p>
              Mega Strength Simulator does not collect or store any personal identification information (PII) from players directly through this website. We do not use cookies for tracking or advertising purposes.
            </p>
          </section>

          <section>
            <h3 className="text-[#1d1d1f] font-black uppercase text-lg mb-4 italic tracking-tight">2. Third Party Services</h3>
            <p>
              This website is a community hub. By interacting with buttons like "PLAY" or "DISCORD", you will be redirected to third-party platforms (Roblox, Discord). These platforms have their own privacy policies which we recommend you review.
            </p>
          </section>

          <section>
            <h3 className="text-[#1d1d1f] font-black uppercase text-lg mb-4 italic tracking-tight">3. Game Codes</h3>
            <p>
              The codes provided on this site are for in-game use only and are provided as a service to our community. No personal data is required to view or copy these codes.
            </p>
          </section>

          <section>
            <h3 className="text-[#1d1d1f] font-black uppercase text-lg mb-4 italic tracking-tight">4. Security</h3>
            <p>
              We prioritize the security of our community. This site is protected by modern encryption and hosted on secure infrastructure to ensure a safe browsing experience.
            </p>
          </section>

          <section>
            <h3 className="text-[#1d1d1f] font-black uppercase text-lg mb-4 italic tracking-tight">5. Contact</h3>
            <p>
              If you have any questions regarding these protocols, please reach out to our core team at <a href="mailto:fusionhub122@gmail.com" className="text-[#ff7b00] font-black underline">fusionhub122@gmail.com</a>.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-black/5">
          <button 
            onClick={onClose}
            className="w-full bg-[#1d1d1f] text-white font-black py-6 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase italic tracking-widest"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;