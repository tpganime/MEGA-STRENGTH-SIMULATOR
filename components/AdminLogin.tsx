
import React from 'react';
import { X, Lock, Mail, AlertCircle } from 'lucide-react';

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
    
    const success = await onLogin(email, password);
    if (!success) {
      setError('Invalid admin credentials. Access Denied.');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative liquid-glass !rounded-[50px] w-full max-w-md p-10 md:p-12 shadow-2xl card-3d">
        <button onClick={onClose} className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-10">
          <div className="w-20 h-20 liquid-glass !bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-[#FF8C00]" />
          </div>
          <h2 className="text-4xl font-bangers tracking-wide text-white">ADMIN TERMINAL</h2>
          <p className="text-white/40 text-xs font-black uppercase tracking-[0.3em] mt-2">Authorized Personnel Only</p>
        </div>

        {error && (
          <div className="mb-8 p-5 liquid-glass !bg-red-500/10 !border-red-500/20 text-red-500 rounded-2xl text-sm flex items-start gap-4">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="font-bold">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em] ml-2">Secure Link ID</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-white focus:outline-none focus:border-[#FF8C00]/50 transition-all"
                placeholder="developer@studio.com"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em] ml-2">Access Key</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-white focus:outline-none focus:border-[#FF8C00]/50 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-black text-xl py-6 rounded-2xl hover:scale-[1.05] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 uppercase tracking-widest italic"
          >
            {loading ? 'SYNCING...' : 'INITIATE SESSION'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
