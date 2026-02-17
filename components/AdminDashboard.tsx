
import { Plus, Trash2, LogOut, Save, Code, FileText, Wand2, Image as ImageIcon, CheckCircle2, Upload, Loader2, AlertCircle, Info, Copy, X, Database } from 'lucide-react';
import React from 'react';
import { GameCode, UpdateLog, Branding } from '../types.ts';
import { storageService } from '../services/storageService.ts';

interface Props {
  branding: Branding;
  codes: GameCode[];
  logs: UpdateLog[];
  onRefresh: () => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<Props> = ({ branding, codes, logs, onRefresh, onLogout }) => {
  const [newCode, setNewCode] = React.useState({ code: '', reward: '' });
  const [newLog, setNewLog] = React.useState({ title: '', content: '' });
  const [editBranding, setEditBranding] = React.useState<Branding>(branding);
  const [isUploading, setIsUploading] = React.useState(false);
  const [status, setStatus] = React.useState({ message: '', type: 'info' });

  React.useEffect(() => {
    setEditBranding(branding);
  }, [branding]);

  const showStatus = (msg: string, type: 'info' | 'success' | 'error' = 'info') => {
    setStatus({ message: msg, type });
    setTimeout(() => setStatus({ message: '', type: 'info' }), 5000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner' | 'gameplay') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      showStatus(`Uploading ${type}...`, 'info');
      
      const result = await storageService.uploadFile(file, type);
      if (result.url) {
        if (type === 'gameplay') {
          setEditBranding(prev => ({ ...prev, gameplay_images: [...prev.gameplay_images, result.url!] }));
        } else {
          // @ts-ignore
          setEditBranding(prev => ({ ...prev, [`${type}_url`]: result.url }));
        }
        showStatus(`${type.toUpperCase()} uploaded!`, 'success');
      }
    } catch {
      showStatus('Upload failed.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const removeShowcaseImage = (index: number) => {
    setEditBranding(prev => ({ ...prev, gameplay_images: prev.gameplay_images.filter((_, i) => i !== index) }));
  };

  const handleSaveBranding = async () => {
    setIsUploading(true);
    const success = await storageService.saveBranding(editBranding);
    setIsUploading(false);
    if (success) {
      showStatus('Branding published!', 'success');
      onRefresh();
    }
  };

  const addCode = async () => {
    if (!newCode.code || !newCode.reward) return;
    if (await storageService.saveCode(newCode)) {
      setNewCode({ code: '', reward: '' });
      onRefresh();
      showStatus('Code published!', 'success');
    }
  };

  const addLog = async () => {
    if (!newLog.title || !newLog.content) return;
    if (await storageService.saveLog(newLog)) {
      setNewLog({ title: '', content: '' });
      onRefresh();
      showStatus('Log posted!', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-[11000] bg-[#020202] overflow-y-auto pb-20">
      <nav className="bg-zinc-900/80 backdrop-blur-2xl border-b border-white/10 px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between sticky top-0 z-20 gap-4">
        <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-neon-orange rounded-xl md:rounded-2xl flex items-center justify-center font-black text-black text-lg md:text-xl shadow-lg shrink-0">FH</div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase font-bangers truncate">MANAGEMENT PORTAL</h1>
        </div>
        <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
          {status.message && <div className="text-[10px] md:text-sm font-black text-neon-orange animate-pulse truncate max-w-[150px] md:max-w-none">{status.message}</div>}
          <button onClick={onLogout} className="bg-white/5 border border-white/10 px-4 md:px-6 py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black hover:bg-white/10 transition-all uppercase tracking-widest shrink-0">LOGOUT</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-12 space-y-8 md:space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-3 space-y-6 md:space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <h2 className="text-3xl md:text-4xl font-bangers neon-blue tracking-widest uppercase">CORE BRANDING</h2>
              <button onClick={handleSaveBranding} disabled={isUploading} className="w-full md:w-auto bg-neon-orange text-black font-black px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl text-lg md:text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">PUBLISH SYSTEM-WIDE</button>
            </div>

            <div className="liquid-glass p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] md:text-xs text-zinc-500 uppercase font-black tracking-widest ml-4">Icon Identity</label>
                  <div className="w-32 h-32 md:w-40 md:h-40 liquid-glass rounded-2xl md:rounded-3xl overflow-hidden relative group">
                    <img src={editBranding.logo_url} className="w-full h-full object-contain p-4 md:p-6" />
                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all backdrop-blur-md">
                      <Upload className="text-neon-orange" />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'logo')} />
                    </label>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] md:text-xs text-zinc-500 uppercase font-black tracking-widest ml-4">Hero Surface</label>
                  <div className="aspect-video liquid-glass rounded-2xl md:rounded-3xl overflow-hidden relative group">
                    <img src={editBranding.banner_url} className="w-full h-full object-cover" />
                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all backdrop-blur-md">
                      <Upload className="text-neon-blue" />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'banner')} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-[10px] md:text-xs text-zinc-500 uppercase font-black tracking-widest ml-4">Showcase Slide Array ({editBranding.gameplay_images.length})</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                  {editBranding.gameplay_images.map((img, idx) => (
                    <div key={idx} className="aspect-square liquid-glass rounded-xl md:rounded-2xl overflow-hidden relative group">
                      <img src={img} className="w-full h-full object-cover" />
                      <button onClick={() => removeShowcaseImage(idx)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-100 md:opacity-0 group-hover:opacity-100 transition-all"><X size={12} /></button>
                    </div>
                  ))}
                  <label className="aspect-square liquid-glass rounded-xl md:rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all">
                    <Plus className="text-zinc-600" />
                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'gameplay')} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <h2 className="text-2xl md:text-3xl font-bangers neon-orange uppercase tracking-widest">COSMIC CODES</h2>
            <div className="liquid-glass p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] space-y-4 md:space-y-6">
              <input className="w-full bg-black border border-white/10 rounded-xl p-4 text-white font-mono uppercase focus:border-neon-orange outline-none" placeholder="CODE_NAME" value={newCode.code} onChange={e => setNewCode({...newCode, code: e.target.value})} />
              <input className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-neon-orange outline-none" placeholder="REWARD VALUE" value={newCode.reward} onChange={e => setNewCode({...newCode, reward: e.target.value})} />
              <button onClick={addCode} className="w-full bg-white text-black font-black py-4 rounded-xl hover:scale-[1.02] transition-all shadow-xl uppercase italic">ACTIVATE CODE</button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <h2 className="text-2xl md:text-3xl font-bangers neon-blue uppercase tracking-widest">TITAN PATCH NOTES</h2>
            <div className="liquid-glass p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] space-y-4 md:space-y-6">
              <input className="w-full bg-black border border-white/10 rounded-xl p-4 text-white font-bold uppercase focus:border-neon-blue outline-none" placeholder="UPDATE VERSION / TITLE" value={newLog.title} onChange={e => setNewLog({...newLog, title: e.target.value})} />
              <textarea className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-neon-blue outline-none h-32 md:h-40" placeholder="Describe the changes..." value={newLog.content} onChange={e => setNewLog({...newLog, content: e.target.value})} />
              <button onClick={addLog} className="w-full bg-[#00BFFF] text-black font-black py-4 md:py-5 rounded-xl hover:scale-[1.02] transition-all shadow-xl uppercase italic">TRANSMIT UPDATE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
