import { Plus, LogOut, Code, FileText, Image as ImageIcon, Upload, X, Database, Save } from 'lucide-react';
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
          const field = type === 'logo' ? 'logo_url' : 'banner_url';
          setEditBranding(prev => ({ ...prev, [field]: result.url }));
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
    <div className="fixed inset-0 z-[11000] bg-[#f8f9fa] overflow-y-auto pb-20 font-sans animate-in fade-in duration-500">
      <nav className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <Database className="text-[#1d1d1f]" />
          <h1 className="text-xl font-black tracking-tight text-[#1d1d1f] uppercase italic">SYSTEM DASHBOARD</h1>
        </div>
        <div className="flex items-center gap-6">
          {status.message && (
            <div className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full ${
              status.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
            }`}>
              {status.message}
            </div>
          )}
          <button onClick={onLogout} className="text-[#1d1d1f] hover:text-red-500 transition-colors font-black text-xs flex items-center gap-2 uppercase tracking-widest">
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
              <h2 className="text-3xl font-black text-[#1d1d1f] italic uppercase">BRANDING CORE</h2>
              <button 
                onClick={handleSaveBranding} 
                disabled={isUploading} 
                className="bg-[#1d1d1f] text-white font-black px-10 py-4 rounded-2xl hover:bg-black transition-all uppercase italic shadow-xl disabled:opacity-50"
              >
                SAVE CHANGES
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Identity Logo</label>
                  <div className="w-32 h-32 bg-white rounded-[24px] border border-gray-200 flex items-center justify-center relative group overflow-hidden">
                    <img src={editBranding.logo_url} alt="Logo" className="w-full h-full object-contain p-4" />
                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all">
                      <Upload className="text-white" />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'logo')} />
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hero Surface</label>
                  <div className="aspect-video bg-white rounded-[24px] border border-gray-200 flex items-center justify-center relative group overflow-hidden">
                    <img src={editBranding.banner_url} alt="Banner" className="w-full h-full object-cover" />
                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all">
                      <Upload className="text-white" />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'banner')} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showcase Slides ({editBranding.gameplay_images.length})</label>
                <div className="grid grid-cols-3 gap-4">
                  {editBranding.gameplay_images.map((img, idx) => (
                    <div key={idx} className="aspect-square bg-white rounded-[16px] border border-gray-200 flex items-center justify-center relative group overflow-hidden">
                      <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-cover" />
                      <button onClick={() => removeShowcaseImage(idx)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-all"><X size={12} /></button>
                    </div>
                  ))}
                  <label className="aspect-square bg-gray-50 rounded-[16px] border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:bg-white transition-all">
                    <Plus className="text-gray-400" />
                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'gameplay')} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Codes Management */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#1d1d1f] italic uppercase">CODES</h2>
            <div className="bg-white border border-gray-200 p-8 rounded-[32px] space-y-4 shadow-sm">
              <input className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-black font-mono uppercase focus:ring-1 focus:ring-black outline-none" placeholder="CODE NAME" value={newCode.code} onChange={e => setNewCode({...newCode, code: e.target.value})} />
              <input className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-black focus:ring-1 focus:ring-black outline-none font-bold" placeholder="REWARD" value={newCode.reward} onChange={e => setNewCode({...newCode, reward: e.target.value})} />
              <button onClick={addCode} className="w-full bg-[#1d1d1f] text-white font-black py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all uppercase italic shadow-lg">ACTIVATE</button>
            </div>
          </div>

          {/* Logs Management */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black text-[#1d1d1f] italic uppercase">PATCH LOGS</h2>
            <div className="bg-white border border-gray-200 p-8 rounded-[32px] space-y-4 shadow-sm">
              <input className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-black font-black uppercase focus:ring-1 focus:ring-black outline-none" placeholder="VERSION TITLE" value={newLog.title} onChange={e => setNewLog({...newLog, title: e.target.value})} />
              <textarea className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-black focus:ring-1 focus:ring-black outline-none h-40 font-medium" placeholder="Patch contents..." value={newLog.content} onChange={e => setNewLog({...newLog, content: e.target.value})} />
              <button onClick={addLog} className="w-full bg-[#0066cc] text-white font-black py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all uppercase italic shadow-lg">TRANSMIT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;