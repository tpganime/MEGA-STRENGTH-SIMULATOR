import React from 'react';
import { X, ShieldAlert, Key } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, pass: string) => Promise<boolean>;
}

const AdminLogin: React.FC<Props> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const success = await onLogin(email, password);
      if (!success) {
        setError('UNAUTHORIZED: ACCESS DENIED');
      }
    } catch (err) {
      setError('SYNC ERROR');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-[210000]">
      {/* Heavy Backdrop */}
      <div 
        className="absolute inset-0 bg-[#000]/95 backdrop-blur-[40px]" 
        onClick={onClose}
      ></div>
      
      {/* Modal - Forcing Solid White and high visibility */}
      <div className="relative bg-white rounded-[48px] w-full max-w-md p-10 sm:p-14 shadow-[0_80px_160px_rgba(0,0,0,0.8)] border border-white/20 z-[210001]">
        <button onClick={onClose} className="absolute top-10 right-10 text-gray-400 hover:text-black transition-all">
          <X size={32} />
        </button>

        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-black rounded-[32px] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl">
             <ShieldAlert size={48} className="text-[#ff7b00]" />
          </div>
          <h2 className="text-4xl font-black text-[#1d1d1f] uppercase italic tracking-tighter leading-none">TERMINAL</h2>
          <p className="text-[#86868b] text-[10px] mt-3 font-black uppercase tracking-[0.5em] opacity-80">AUTHENTICATION REQUIRED</p>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-50 text-red-600 rounded-3xl text-xs font-black flex items-center gap-4 border border-red-100 animate-pulse">
            <ShieldAlert size={20} className="shrink-0" />
            <span className="uppercase tracking-widest">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-[#86868b] uppercase tracking-[0.3em] ml-2">IDENTITY ID</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-[24px] py-6 px-8 text-[#1d1d1f] focus:outline-none focus:ring-4 focus:ring-black/5 font-bold text-xl"
              placeholder="operator@studio.io"
              autoFocus
              required
            />
          </div>
          
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-[#86868b] uppercase tracking-[0.3em] ml-2">ACCESS KEY</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-[24px] py-6 px-8 text-[#1d1d1f] focus:outline-none focus:ring-4 focus:ring-black/5 font-bold text-xl"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#1d1d1f] text-white font-black text-2xl py-8 rounded-[32px] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 uppercase italic tracking-[0.3em] shadow-2xl mt-4"
          >
            {loading ? 'SYNCING...' : 'INITIALIZE'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;