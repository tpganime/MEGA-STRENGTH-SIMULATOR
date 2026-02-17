
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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-zinc-900 border border-white/10 w-full max-w-md rounded-3xl p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-neon-orange"></div>
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-neon-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-neon-orange/30">
            <Lock className="w-8 h-8 text-neon-orange" />
          </div>
          <h2 className="text-3xl font-bangers tracking-wide text-white">ADMIN TERMINAL</h2>
          <p className="text-gray-500 text-sm">Authorized Personnel Only</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-orange transition-colors"
                placeholder="developer@studio.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Secure Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-orange transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-neon-orange text-black font-black text-lg py-4 rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100"
          >
            {loading ? 'AUTHENTICATING...' : 'ACCESS DASHBOARD'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
