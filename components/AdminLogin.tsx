import React from 'react';
import { X, AlertCircle } from 'lucide-react';

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
        setError('Invalid admin credentials.');
      }
    } catch (err) {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* High contrast overlay to prevent "blurry grey mess" */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-[32px] w-full max-w-md p-10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/20 animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors">
          <X size={24} />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#1d1d1f] uppercase italic tracking-tighter">ADMIN ACCESS</h2>
          <p className="text-[#86868b] text-sm mt-2 font-bold uppercase tracking-widest">Core Protocol Authentication</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl text-sm flex items-center gap-3 border border-red-100">
            <AlertCircle size={20} />
            <span className="font-bold">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-[#86868b] uppercase tracking-[0.3em] ml-1">Email Terminal</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-6 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium"
              placeholder="admin@studio.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-[#86868b] uppercase tracking-[0.3em] ml-1">Secure Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-6 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#1d1d1f] text-white font-black text-xl py-5 rounded-2xl hover:bg-black transition-all disabled:opacity-50 uppercase italic tracking-widest shadow-xl active:scale-95"
          >
            {loading ? 'AUTHENTICATING...' : 'SIGN IN'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;