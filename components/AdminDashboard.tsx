import React, { useState, useEffect } from 'react';
import { 
  Plus, LogOut, Save, Code, FileText, Image as ImageIcon, 
  Upload, X, Database, Trash2, Layout, Settings, 
  ChevronRight, Activity, Globe, Zap
} from 'lucide-react';
import { GameCode, UpdateLog, Branding } from '../types.ts';
import { storageService } from '../services/storageService.ts';

interface Props {
  branding: Branding;
  codes: GameCode[];
  logs: UpdateLog[];
  onRefresh: () => void;
  onLogout: () => void;
  onClose?: () => void;
}

type Tab = 'branding' | 'codes' | 'logs' | 'stats';

const AdminDashboard: React.FC<Props> = ({ branding, codes, logs, onRefresh, onLogout, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('branding');
  const [newCode, setNewCode] = useState({ code: '', reward: '' });
  const [newLog, setNewLog] = useState({ title: '', content: '' });
  const [editBranding, setEditBranding] = useState<Branding>(branding);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState({ message: '', type: 'info' });

  useEffect(() => {
    setEditBranding(branding);
  }, [branding]);

  const showStatus = (msg: string, type: 'info' | 'success' | 'error' = 'info') => {
    setStatus({ message: msg, type });
    setTimeout(() => setStatus({ message: '', type: 'info' }), 4000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner' | 'gameplay') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      showStatus(`Uploading ${type}...`, 'info');
      
      const result = await storageService.uploadFile(file, type);
      if (result.url) {
        if (type === 'gameplay') {
          setEditBranding(prev => ({ ...prev, gameplay_images: [...prev.gameplay_images, result.url!] }));
        } else {
          const field = type === 'logo' ? 'logo_url' : 'banner_url';
          setEditBranding(prev => ({ ...prev, [field]: result.url }));
        }
        showStatus(`${type.toUpperCase()} uploaded!`, 'success');
      }
    } catch {
      showStatus('Upload failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveBranding = async () => {
    setIsProcessing(true);
    const success = await storageService.saveBranding(editBranding);
    setIsProcessing(false);
    if (success) {
      showStatus('Global branding updated!', 'success');
      onRefresh();
    }
  };

  const handleAddCode = async () => {
    if (!newCode.code || !newCode.reward) return;
    setIsProcessing(true);
    if (await storageService.saveCode({ ...newCode, code: newCode.code.toUpperCase() })) {
      setNewCode({ code: '', reward: '' });
      onRefresh();
      showStatus('New code synchronized!', 'success');
    }
    setIsProcessing(false);
  };

  const handleDeleteCode = async (id: string) => {
    if (confirm('Permanently decommission this reward code?')) {
      if (await storageService.deleteCode(id)) {
        onRefresh();
        showStatus('Code removed.', 'info');
      }
    }
  };

  const handleAddLog = async () => {
    if (!newLog.title || !newLog.content) return;
    setIsProcessing(true);
    if (await storageService.saveLog(newLog)) {
      setNewLog({ title: '', content: '' });
      onRefresh();
      showStatus('Patch notes transmitted!', 'success');
    }
    setIsProcessing(false);
  };

  const handleDeleteLog = async (id: string) => {
    if (confirm('Permanently delete this update log?')) {
      if (await storageService.deleteLog(id)) {
        onRefresh();
        showStatus('Log removed.', 'info');
      }
    }
  };

  const NavItem = ({ id, icon: Icon, label }: { id: Tab, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${
        activeTab === id 
        ? 'bg-[#1d1d1f] text-white shadow-2xl scale-105' 
        : 'text-[#86868b] hover:bg-black/5 hover:text-black'
      }`}
    >
      <div className="flex items-center gap-4">
        <Icon size={20} className={activeTab === id ? 'text-[#ff7b00]' : ''} />
        <span className="font-black text-xs uppercase tracking-[0.2em] italic">{label}</span>
      </div>
      <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${activeTab === id ? 'opacity-100' : ''}`} />
    </button>
  );

  return (
    <div className="fixed inset-0 z-[20000] bg-[#f2f2f7] flex overflow-hidden font-sans">
      {/* Sidebar navigation */}
      <aside className="w-80 h-full bg-white border-r border-black/5 flex flex-col p-8 z-50">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl">
            <Database size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black italic uppercase tracking-tighter leading-none">STUDIO</h1>
            <p className="text-[10px] font-black text-[#ff7b00] uppercase tracking-[0.4em]">ADMIN v4.0</p>
          </div>
        </div>

        <nav className="flex-1 space-y-3">
          <NavItem id="branding" icon={Layout} label="Branding" />
          <NavItem id="codes" icon={Code} label="Reward Codes" />
          <NavItem id="logs" icon={FileText} label="Update Logs" />
          <NavItem id="stats" icon={Activity} label="System Status" />
        </nav>

        <div className="mt-auto pt-8 border-t border-black/5 space-y-4">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-black text-xs uppercase tracking-widest italic"
          >
            <LogOut size={20} />
            TERMINATE SESSION
          </button>
          
          <div className="flex items-center justify-between px-6 opacity-40">
            <span className="text-[10px] font-black uppercase tracking-widest">© 2025 FUSIONHUB</span>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 h-full overflow-y-auto relative bg-[#f2f2f7]">
        <header className="sticky top-0 z-40 bg-white/50 backdrop-blur-md px-12 py-6 flex items-center justify-between border-b border-black/5">
          <div className="flex items-center gap-3">
             <Globe size={16} className="text-[#3a86ff]" />
             <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#86868b]">CORE PROTOCOL / {activeTab}</span>
          </div>

          <div className="flex items-center gap-6">
            {status.message && (
              <div className={`text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2.5 rounded-full shadow-lg ${
                status.type === 'error' ? 'bg-red-500 text-white' : 
                status.type === 'success' ? 'bg-[#34C759] text-white' : 'bg-[#1d1d1f] text-white'
              }`}>
                {status.message}
              </div>
            )}
            {onClose && (
              <button onClick={onClose} className="p-3 bg-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-md text-black">
                <X size={20} />
              </button>
            )}
          </div>
        </header>

        <div className="p-12 max-w-6xl mx-auto">
          {activeTab === 'branding' && (
            <div className="space-y-12">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-2">STUDIO BRANDING</h2>
                  <p className="text-[#86868b] font-bold text-lg">Define your game's visual identity.</p>
                </div>
                <button 
                  onClick={handleSaveBranding}
                  disabled={isProcessing}
                  className="bg-[#ff7b00] text-white px-12 py-5 rounded-2xl font-black italic uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
                >
                  <Save size={20} />
                  PUBLISH
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="bg-white rounded-[40px] p-8 space-y-6 shadow-sm border border-black/5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[#86868b]">Logo (1:1)</label>
                    <div className="relative group w-fit">
                      <div className="w-48 h-48 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                        <img src={editBranding.logo_url} alt="Logo" className="w-3/4 h-3/4 object-contain" />
                      </div>
                      <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 rounded-[40px] transition-all cursor-pointer">
                        <Upload className="text-white" size={32} />
                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'logo')} />
                      </label>
                    </div>
                  </div>

                  <div className="bg-white rounded-[40px] p-8 space-y-6 shadow-sm border border-black/5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[#86868b]">Banner (16:9)</label>
                    <div className="relative group aspect-video">
                      <div className="w-full h-full bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200 overflow-hidden">
                        <img src={editBranding.banner_url} alt="Banner" className="w-full h-full object-cover" />
                      </div>
                      <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 rounded-[40px] transition-all cursor-pointer">
                        <Upload className="text-white" size={32} />
                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'banner')} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[40px] p-8 space-y-8 h-fit shadow-sm border border-black/5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-[#86868b]">Gameplay Screenshots</label>
                  <div className="grid grid-cols-2 gap-6">
                    {editBranding.gameplay_images.map((img, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-3xl overflow-hidden border border-black/5">
                        <img src={img} alt="Showcase" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => setEditBranding(p => ({ ...p, gameplay_images: p.gameplay_images.filter((_, i) => i !== idx) }))}
                          className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <label className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white transition-all text-[#86868b] hover:text-[#ff7b00]">
                      <Plus size={32} />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'gameplay')} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'codes' && (
            <div className="space-y-12">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter">GAME CODES</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                  <div className="bg-white p-10 rounded-[40px] shadow-sm border border-black/5 space-y-6">
                    <input 
                      value={newCode.code}
                      onChange={e => setNewCode(p => ({ ...p, code: e.target.value.toUpperCase() }))}
                      placeholder="NEWCODE"
                      className="w-full bg-gray-50 border border-gray-100 p-5 rounded-xl font-black font-mono text-xl"
                    />
                    <input 
                      value={newCode.reward}
                      onChange={e => setNewCode(p => ({ ...p, reward: e.target.value }))}
                      placeholder="5,000 Gems"
                      className="w-full bg-gray-50 border border-gray-100 p-5 rounded-xl font-bold"
                    />
                    <button onClick={handleAddCode} className="w-full bg-black text-white py-5 rounded-xl font-black italic uppercase">Add Code</button>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-4">
                  {codes.map(c => (
                    <div key={c.id} className="bg-white p-6 rounded-3xl border border-black/5 flex items-center justify-between">
                       <div className="font-mono font-black text-xl italic">{c.code}</div>
                       <button onClick={() => handleDeleteCode(c.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'logs' && (
            <div className="space-y-12">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter">PATCH LOGS</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-black/5 space-y-6">
                  <input 
                    value={newLog.title}
                    onChange={e => setNewLog(p => ({ ...p, title: e.target.value }))}
                    placeholder="Update v1.0"
                    className="w-full bg-gray-50 border border-gray-100 p-5 rounded-xl font-black"
                  />
                  <textarea 
                    value={newLog.content}
                    onChange={e => setNewLog(p => ({ ...p, content: e.target.value }))}
                    placeholder="Patch notes..."
                    className="w-full bg-gray-50 border border-gray-100 p-5 rounded-xl min-h-[300px]"
                  />
                  <button onClick={handleAddLog} className="w-full bg-black text-white py-5 rounded-xl font-black italic uppercase">Publish Log</button>
                </div>
                <div className="space-y-4">
                   {logs.map(l => (
                     <div key={l.id} className="bg-white p-8 rounded-3xl border border-black/5 flex items-center justify-between">
                        <div className="font-black italic">{l.title}</div>
                        <button onClick={() => handleDeleteLog(l.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 /></button>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;