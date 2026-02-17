import { Plus, LogOut, Save, Code, FileText, ImageIcon, Upload, X, Database } from 'lucide-react';
import React from 'react';
import { GameCode, UpdateLog, Branding } from './types.ts';
import { storageService } from './services/storageService.ts';

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
    <div className="fixed inset-0 z-[11000] bg-[#f5f5f7] overflow-y-auto pb-20">
      <nav className="bg-white/80 backdrop-blur-2xl border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Database className="text-[#1d1d1f]" />
          <h1 className="text-xl font-black tracking-tight text-[#1d1d1f] uppercase italic">SYSTEM DASHBOARD</h1>
        </div>
        <div className="flex items-center gap-6">
          {status.message && <div className={`text-xs font-bold uppercase tracking-widest ${status.type === 'error' ? 'text-red-500' : 'text-[#0066cc]'}`}>{status.message}</div>}
          <button onClick={onLogout} className="text-[#1d1d1f] hover:text-red-500 transition-colors font-bold text-xs flex items-center gap-2 uppercase tracking-widest">
            <LogOut size={16} />
            LOGOUT
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Branding Control */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between border-b border-gray-200 pb-8">
              <h2 className="text-4xl font-black text-[#1d1d1f] italic uppercase">BRANDING CORE</h2>
              <button onClick={handleSaveBranding} disabled={isUploading} className="bg-[#1d1d1f] text-white font-black px-12 py-5 rounded-3xl hover:bg-black transition-all uppercase italic shadow-2xl disabled:opacity-50">
                SAVE CHANGES
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-xs font-black text-[#86868b] uppercase tracking-widest">Logo Identity</label>
                  <div className="w-40 h-40 liquid-glass rounded-[40px] overflow-hidden relative group border-white">
                    <img src={editBranding.logo_url} className="w-full h-full object-contain p-6" />
                    <label className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all backdrop-blur-sm">
                      <Upload className="text-black" />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'logo')} />
                    </label>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black text-[#86868b] uppercase tracking-widest">Hero Surface</label>
                  <div className="aspect-video liquid-glass rounded-[40px] overflow-hidden relative group border-white">
                    <img src={editBranding.banner_url} className="w-full h-full object-cover" />
                    <label className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all backdrop-blur-sm">
                      <Upload className="text-black" />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'banner')} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-[#86868b] uppercase tracking-widest">Showcase Slides ({editBranding.gameplay_images.length})</label>
                <div className="grid grid-cols-3 gap-4">
                  {editBranding.gameplay_images.map((img, idx) => (
                    <div key={idx} className="aspect-square liquid-glass rounded-2xl overflow-hidden relative group border-white">
                      <img src={img} className="w-full h-full object-cover" />
                      <button onClick={() => removeShowcaseImage(idx)} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all"><X size={12} /></button>
                    </div>
                  ))}
                  <label className="aspect-square liquid-glass rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-white transition-all">
                    <Plus className="text-gray-400" />
                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'gameplay')} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Codes Management */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-[#1d1d1f] italic uppercase">CODES</h2>
            <div className="liquid-glass p-8 rounded-[40px] space-y-4 border-white">
              <input className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-black font-mono uppercase focus:border-black outline-none" placeholder="CODE NAME" value={newCode.code} onChange={e => setNewCode({...newCode, code: e.target.value})} />
              <input className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-black focus:border-black outline-none font-bold" placeholder="REWARD" value={newCode.reward} onChange={e => setNewCode({...newCode, reward: e.target.value})} />
              <button onClick={addCode} className="w-full bg-[#1d1d1f] text-white font-black py-5 rounded-2xl hover:scale-[1.02] transition-all uppercase italic">ACTIVATE</button>
            </div>
          </div>

          {/* Logs Management */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-black text-[#1d1d1f] italic uppercase">PATCH LOGS</h2>
            <div className="liquid-glass p-8 rounded-[40px] space-y-4 border-white">
              <input className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-black font-black uppercase focus:border-black outline-none" placeholder="VERSION TITLE" value={newLog.title} onChange={e => setNewLog({...newLog, title: e.target.value})} />
              <textarea className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-black focus:border-black outline-none h-40 font-medium" placeholder="Patch contents..." value={newLog.content} onChange={e => setNewLog({...newLog, content: e.target.value})} />
              <button onClick={addLog} className="w-full bg-[#0066cc] text-white font-black py-5 rounded-2xl hover:scale-[1.02] transition-all uppercase italic">TRANSMIT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;