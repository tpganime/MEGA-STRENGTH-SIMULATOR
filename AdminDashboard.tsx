import React, { useState, useEffect } from 'react';
import { 
  Plus, LogOut, Save, Code, FileText, Image as ImageIcon, 
  Upload, X, Database, Trash2, Layout, Settings, 
  ChevronRight, Activity, Globe, Zap, BarChart3, AlertCircle
} from 'lucide-react';
import { GameCode, UpdateLog, Branding } from './types.ts';
import { storageService } from './services/storageService.ts';

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
    // Keep error messages visible longer so the user can read the specific error
    const duration = type === 'error' ? 12000 : 5000;
    setTimeout(() => setStatus({ message: '', type: 'info' }), duration);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner' | 'gameplay') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      showStatus(`Transmitting ${type}...`, 'info');
      
      const result = await storageService.uploadFile(file, type);
      if (result.url) {
        if (type === 'gameplay') {
          setEditBranding(prev => ({ ...prev, gameplay_images: [...prev.gameplay_images, result.url!] }));
        } else {
          const field = type === 'logo' ? 'logo_url' : 'banner_url';
          setEditBranding(prev => ({ ...prev, [field]: result.url }));
        }
        showStatus(`${type.toUpperCase()} Synchronized!`, 'success');
      } else {
        showStatus(`Upload failed: ${result.error || 'Check permissions'}`, 'error');
      }
    } catch (err) {
      showStatus('Transmission failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveBranding = async () => {
    setIsProcessing(true);
    showStatus('Saving configuration...', 'info');
    try {
      const result = await storageService.saveBranding(editBranding);
      if (result.success) {
        showStatus('Global branding updated!', 'success');
        onRefresh();
      } else {
        // Log specifically what failed
        showStatus(`COMMIT FAILED: ${result.error || 'Check Console (F12)'}`, 'error');
      }
    } catch (err: any) {
      showStatus(`CRITICAL ERROR: ${err.message}`, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddCode = async () => {
    if (!newCode.code || !newCode.reward) return;
    setIsProcessing(true);
    try {
      const success = await storageService.saveCode({ ...newCode, code: newCode.code.toUpperCase() });
      if (success) {
        setNewCode({ code: '', reward: '' });
        onRefresh();
        showStatus('Reward code live!', 'success');
      } else {
        showStatus('Failed to add code. DB error.', 'error');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteCode = async (id: string) => {
    if (confirm('Decommission this reward node?')) {
      if (await storageService.deleteCode(id)) {
        onRefresh();
        showStatus('Node offline.', 'info');
      }
    }
  };

  const handleAddLog = async () => {
    if (!newLog.title || !newLog.content) return;
    setIsProcessing(true);
    if (await storageService.saveLog(newLog)) {
      setNewLog({ title: '', content: '' });
      onRefresh();
      showStatus('Broadcast successful!', 'success');
    }
    setIsProcessing(false);
  };

  const NavItem = ({ id, icon: Icon, label }: { id: Tab, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center justify-between px-6 py-5 rounded-[24px] transition-all group ${
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
    <div className="fixed inset-0 z-[110000] bg-[#f8f8fb] flex overflow-hidden font-sans text-[#1d1d1f]">
      <aside className="w-80 h-full bg-white border-r border-black/5 flex flex-col p-8 z-50">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-14 h-14 bg-black rounded-3xl flex items-center justify-center text-white shadow-2xl">
            <BarChart3 size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">CORE</h1>
            <p className="text-[10px] font-black text-[#ff7b00] uppercase tracking-[0.5em]">OPERATOR v4.2</p>
          </div>
        </div>

        <nav className="flex-1 space-y-4">
          <NavItem id="branding" icon={Layout} label="Asset Branding" />
          <NavItem id="codes" icon={Zap} label="In-Game Rewards" />
          <NavItem id="logs" icon={FileText} label="Patch Logs" />
          <NavItem id="stats" icon={Activity} label="Telemetry" />
        </nav>

        <div className="mt-auto pt-8 border-t border-black/5 space-y-4">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-5 text-red-500 hover:bg-red-50 rounded-3xl transition-all font-black text-xs uppercase tracking-widest italic"
          >
            <LogOut size={20} />
            SHUTDOWN SESSION
          </button>
          <div className="px-6 opacity-30 text-[9px] font-black uppercase tracking-widest">© 2025 FUSIONHUB OS</div>
        </div>
      </aside>

      <main className="flex-1 h-full overflow-y-auto relative bg-[#f8f8fb]">
        <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-2xl px-12 py-8 flex items-center justify-between border-b border-black/5">
          <div className="flex items-center gap-4">
             <Globe size={18} className="text-[#3a86ff]" />
             <span className="text-[12px] font-black uppercase tracking-[0.4em] text-[#86868b]">SIM_PROTO / {activeTab}</span>
          </div>

          <div className="flex items-center gap-6">
            {status.message && (
              <div className={`text-[10px] font-black uppercase tracking-[0.3em] px-8 py-3 rounded-full shadow-2xl flex items-center gap-3 ${
                status.type === 'error' ? 'bg-red-500 text-white animate-pulse' : 
                status.type === 'success' ? 'bg-[#34C759] text-white' : 'bg-[#1d1d1f] text-white'
              }`}>
                {status.type === 'error' && <AlertCircle size={14} />}
                {status.message}
              </div>
            )}
            {onClose && (
              <button onClick={onClose} className="p-4 bg-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl text-black border border-black/5">
                <X size={20} />
              </button>
            )}
          </div>
        </header>

        <div className="p-16 max-w-7xl mx-auto">
          {activeTab === 'branding' && (
            <div className="space-y-16">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-4 leading-none">ASSET BRANDING</h2>
                  <p className="text-[#86868b] font-bold text-xl uppercase tracking-widest">Synchronize your game's identity.</p>
                </div>
                <button 
                  onClick={handleSaveBranding}
                  disabled={isProcessing}
                  className="bg-[#ff7b00] text-white px-16 py-6 rounded-3xl font-black italic uppercase tracking-[0.2em] shadow-[0_30px_60px_rgba(255,123,0,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4 disabled:opacity-50"
                >
                  <Save size={24} />
                  {isProcessing ? 'COMMITING...' : 'COMMIT CHANGES'}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-12">
                  <div className="bg-white rounded-[48px] p-10 space-y-8 shadow-sm border border-black/5">
                    <label className="text-[12px] font-black uppercase tracking-widest text-[#86868b]">Main Experience Identity (1:1)</label>
                    <div className="relative group w-64 h-64 mx-auto">
                      <div className="w-full h-full bg-gray-50 rounded-[48px] border-4 border-dashed border-gray-100 flex items-center justify-center overflow-hidden">
                        <img src={editBranding.logo_url} alt="Logo" className="w-4/5 h-4/5 object-contain" />
                      </div>
                      <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 rounded-[48px] transition-all cursor-pointer text-white">
                        <Upload size={40} className="mb-2" />
                        <span className="font-black text-[10px] uppercase">Replace</span>
                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'logo')} />
                      </label>
                    </div>
                  </div>

                  <div className="bg-white rounded-[48px] p-10 space-y-8 shadow-sm border border-black/5">
                    <label className="text-[12px] font-black uppercase tracking-widest text-[#86868b]">Hero World Banner (16:9)</label>
                    <div className="relative group aspect-video">
                      <div className="w-full h-full bg-gray-50 rounded-[48px] border-4 border-dashed border-gray-100 overflow-hidden">
                        <img src={editBranding.banner_url} alt="Banner" className="w-full h-full object-cover" />
                      </div>
                      <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 rounded-[48px] transition-all cursor-pointer text-white">
                        <Upload size={40} className="mb-2" />
                        <span className="font-black text-[10px] uppercase">Replace</span>
                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'banner')} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[48px] p-10 space-y-10 shadow-sm border border-black/5">
                  <div className="flex items-center justify-between">
                     <label className="text-[12px] font-black uppercase tracking-widest text-[#86868b]">Showcase Gallery ({editBranding.gameplay_images.length})</label>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    {editBranding.gameplay_images.map((img, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-[32px] overflow-hidden border border-black/5">
                        <img src={img} alt="Showcase" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => setEditBranding(p => ({ ...p, gameplay_images: p.gameplay_images.filter((_, i) => i !== idx) }))}
                          className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-all shadow-xl"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                    <label className="aspect-square bg-gray-50 border-4 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white hover:border-[#ff7b00] transition-all text-[#86868b] hover:text-[#ff7b00]">
                      <Plus size={48} />
                      <span className="font-black text-[10px] uppercase tracking-widest">Add Frame</span>
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'gameplay')} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'codes' && (
            <div className="space-y-16">
              <div>
                <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-4 leading-none">REWARD CODES</h2>
                <p className="text-[#86868b] font-bold text-xl uppercase tracking-widest">Deploy in-game boosters and currency.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-1">
                  <div className="bg-white p-12 rounded-[48px] shadow-sm border border-black/5 space-y-10">
                    <h3 className="text-2xl font-black italic uppercase tracking-tight">Generate Node</h3>
                    <div className="space-y-8">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-[#86868b]">Code String</label>
                         <input 
                           value={newCode.code}
                           onChange={e => setNewCode(p => ({ ...p, code: e.target.value.toUpperCase() }))}
                           placeholder="MEGASTR_2025"
                           className="w-full bg-gray-50 border border-gray-100 p-6 rounded-2xl font-black font-mono text-2xl focus:ring-4 focus:ring-black/5"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-[#86868b]">Reward Value</label>
                         <input 
                           value={newCode.reward}
                           onChange={e => setNewCode(p => ({ ...p, reward: e.target.value }))}
                           placeholder="10,000 Energy"
                           className="w-full bg-gray-50 border border-gray-100 p-6 rounded-2xl font-bold text-lg"
                         />
                      </div>
                      <button onClick={handleAddCode} className="w-full bg-black text-white py-6 rounded-3xl font-black italic uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">Publish Code</button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                   <div className="flex items-center justify-between px-4">
                      <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#86868b]">Active Directory</span>
                      <div className="h-px flex-1 mx-8 bg-black/5"></div>
                   </div>
                   <div className="space-y-4">
                      {codes.map(c => (
                        <div key={c.id} className="bg-white p-10 rounded-[40px] border border-black/5 flex items-center justify-between hover:shadow-xl transition-all group">
                           <div className="flex items-center gap-10">
                             <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#ff7b00]">
                               <Zap size={32} />
                             </div>
                             <div>
                               <div className="text-3xl font-black font-mono italic">{c.code}</div>
                               <div className="text-sm font-bold text-[#86868b] uppercase tracking-widest">Payload: <span className="text-black">{c.reward}</span></div>
                             </div>
                           </div>
                           <button onClick={() => handleDeleteCode(c.id)} className="p-5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-3xl transition-all">
                             <Trash2 size={24} />
                           </button>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'logs' && (
            <div className="space-y-16">
              <div>
                <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-4">PATCH LOGS</h2>
                <p className="text-[#86868b] font-bold text-xl uppercase tracking-widest">Communicate updates to the player base.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="bg-white p-12 rounded-[48px] shadow-sm border border-black/5 space-y-10">
                  <h3 className="text-2xl font-black italic uppercase">Broadcast Transmission</h3>
                  <div className="space-y-8">
                    <input 
                      value={newLog.title}
                      onChange={e => setNewLog(p => ({ ...p, title: e.target.value }))}
                      placeholder="PATCH 2.5: THE TITAN AWAKENING"
                      className="w-full bg-gray-50 border border-gray-100 p-6 rounded-2xl font-black uppercase italic"
                    />
                    <textarea 
                      value={newLog.content}
                      onChange={e => setNewLog(p => ({ ...p, content: e.target.value }))}
                      placeholder="Transmission details..."
                      className="w-full bg-gray-50 border border-gray-100 p-8 rounded-[40px] min-h-[400px] font-medium text-lg leading-relaxed"
                    />
                    <button onClick={handleAddLog} className="w-full bg-[#3a86ff] text-white py-8 rounded-[32px] font-black italic uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-all">Transmit Log</button>
                  </div>
                </div>
                <div className="space-y-6">
                   {logs.map(l => (
                     <div key={l.id} className="bg-white p-12 rounded-[48px] border border-black/5 shadow-sm hover:shadow-2xl transition-all group">
                        <div className="flex items-center justify-between mb-6">
                          <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#ff7b00]">{l.date}</div>
                          <button onClick={() => storageService.deleteLog(l.id).then(onRefresh)} className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                            <Trash2 size={24} />
                          </button>
                        </div>
                        <h4 className="text-3xl font-black italic uppercase tracking-tight mb-4">{l.title}</h4>
                        <p className="text-[#86868b] text-sm leading-relaxed line-clamp-4">{l.content}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-16">
               <h2 className="text-6xl font-black italic uppercase tracking-tighter">TELEMETRY</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  <div className="bg-white p-12 rounded-[48px] border border-black/5 shadow-sm space-y-6">
                     <Globe size={48} className="mx-auto text-green-500" />
                     <h3 className="text-[12px] font-black uppercase tracking-widest text-[#86868b]">NETWORK STATUS</h3>
                     <div className="text-5xl font-black italic uppercase tracking-tighter text-[#1d1d1f]">ACTIVE</div>
                  </div>
                  <div className="bg-white p-12 rounded-[48px] border border-black/5 shadow-sm space-y-6">
                     <Database size={48} className="mx-auto text-blue-500" />
                     <h3 className="text-[12px] font-black uppercase tracking-widest text-[#86868b]">IO LATENCY</h3>
                     <div className="text-5xl font-black italic uppercase tracking-tighter text-[#1d1d1f]">12ms</div>
                  </div>
                  <div className="bg-white p-12 rounded-[48px] border border-black/5 shadow-sm space-y-6">
                     <Settings size={48} className="mx-auto text-orange-500" />
                     <h3 className="text-[12px] font-black uppercase tracking-widest text-[#86868b]">CORE VERSION</h3>
                     <div className="text-5xl font-black italic uppercase tracking-tighter text-[#1d1d1f]">v4.2.1</div>
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