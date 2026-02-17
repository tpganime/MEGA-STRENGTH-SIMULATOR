
import { Plus, Trash2, LogOut, Save, Code, FileText, Wand2, Image as ImageIcon, CheckCircle2, Upload, Loader2, AlertCircle, Info, Copy, X } from 'lucide-react';
import React from 'react';
import { GameCode, UpdateLog, Branding } from '../types';
import { GoogleGenAI } from '@google/genai';
import { storageService } from '../services/storageService';

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
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [status, setStatus] = React.useState({ message: '', type: 'info' });
  const [setupError, setSetupError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setEditBranding(branding);
  }, [branding]);

  const showStatus = (msg: string, type: 'info' | 'success' | 'error' = 'info') => {
    setStatus({ message: msg, type });
    setTimeout(() => setStatus({ message: '', type: 'info' }), 5000);
  };

  const copySqlFix = () => {
    const sql = `-- Run this in Supabase SQL Editor to fix Table Structure
ALTER TABLE branding ADD COLUMN IF NOT EXISTS gameplay_images JSONB DEFAULT '[]'::jsonb;
ALTER TABLE branding ADD COLUMN IF NOT EXISTS gameplay_image_url TEXT;
INSERT INTO branding (id, logo_url, banner_url, gameplay_images, gameplay_image_url) 
VALUES (1, '', '', '[]', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('game-assets', 'game-assets', true) ON CONFLICT (id) DO NOTHING;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'game-assets');
CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'game-assets');`;
    navigator.clipboard.writeText(sql);
    showStatus('Comprehensive SQL Fix copied!', 'success');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner' | 'gameplay') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setSetupError(null);
      showStatus(`Uploading ${type}...`, 'info');
      
      const result = await storageService.uploadFile(file, type);
      
      if (result.url) {
        if (type === 'gameplay') {
          setEditBranding(prev => ({
            ...prev,
            gameplay_images: [...prev.gameplay_images, result.url!]
          }));
        } else {
          setEditBranding(prev => ({
            ...prev,
            [`${type}_url`]: result.url
          }));
        }
        showStatus(`${type.toUpperCase()} uploaded! Click PUBLISH to save.`, 'success');
      } else if (result.error === 'BUCKET_NOT_FOUND') {
        setSetupError('STORAGE BUCKET MISSING: Please run the SQL fix below.');
        showStatus('Upload failed: Bucket not found.', 'error');
      } else {
        showStatus(`Upload failed: ${result.error}`, 'error');
      }
    } catch (err) {
      showStatus('An unexpected error occurred during upload.', 'error');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const removeShowcaseImage = (index: number) => {
    setEditBranding(prev => ({
      ...prev,
      gameplay_images: prev.gameplay_images.filter((_, i) => i !== index)
    }));
  };

  const suggestCode = async () => {
    try {
      setIsGenerating(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Generate 1 cool short uppercase code name for a strength training game. Return ONLY the code."
      });
      if (response.text) {
        setNewCode({ ...newCode, code: response.text.trim().toUpperCase() });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveBranding = async () => {
    setIsUploading(true);
    const success = await storageService.saveBranding(editBranding);
    setIsUploading(false);
    if (success) {
      showStatus('Game branding published successfully!', 'success');
      onRefresh();
    } else {
      setSetupError('Database structure mismatch. Run the SQL fix to add the "gameplay_images" column.');
      showStatus('Failed to save. Check database column.', 'error');
    }
  };

  const addCode = async () => {
    if (!newCode.code || !newCode.reward) return;
    const success = await storageService.saveCode(newCode);
    if (success) {
      setNewCode({ code: '', reward: '' });
      onRefresh();
      showStatus('Code published!', 'success');
    }
  };

  const deleteCode = async (id: string) => {
    if (await storageService.deleteCode(id)) onRefresh();
  };

  const addLog = async () => {
    if (!newLog.title || !newLog.content) return;
    const success = await storageService.saveLog(newLog);
    if (success) {
      setNewLog({ title: '', content: '' });
      onRefresh();
      showStatus('Patch notes posted!', 'success');
    }
  };

  const deleteLog = async (id: string) => {
    if (await storageService.deleteLog(id)) onRefresh();
  };

  return (
    <div className="fixed inset-0 z-[11000] bg-[#050505] overflow-y-auto">
      <nav className="bg-zinc-900/50 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neon-orange rounded-lg flex items-center justify-center font-black text-black shadow-[0_0_15px_rgba(255,140,0,0.3)]">FH</div>
          <h1 className="text-xl font-bold tracking-tight text-white uppercase font-bangers">MANAGEMENT HUB</h1>
        </div>
        <div className="flex items-center gap-4">
          {status.message && (
            <div className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full animate-fade-in ${
              status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
              status.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}>
              {status.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {status.message}
            </div>
          )}
          <button onClick={onLogout} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/5">
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline font-bold">EXIT</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 md:p-12">
        {setupError && (
          <div className="mb-8 p-6 bg-red-500/10 border border-red-500/30 rounded-3xl flex flex-col md:flex-row items-start gap-4 animate-pulse">
            <AlertCircle className="w-8 h-8 text-red-500 shrink-0" />
            <div className="flex-1">
              <h3 className="text-red-500 font-black text-xl mb-1 uppercase">DATABASE FIX REQUIRED</h3>
              <p className="text-red-400/80 mb-4 text-sm">{setupError}</p>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <button 
                  onClick={copySqlFix}
                  className="bg-red-500 text-white font-black px-4 py-2 rounded-lg text-xs flex items-center gap-2 hover:bg-red-600 transition-colors shrink-0"
                >
                  <Copy className="w-3 h-3" /> COPY SQL REPAIR SCRIPT
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ImageIcon className="w-8 h-8 text-[#00BFFF]" />
                <h2 className="text-3xl font-bangers text-white tracking-widest uppercase">BRANDING CONTROL</h2>
              </div>
              <button 
                  onClick={handleSaveBranding} 
                  disabled={isUploading}
                  className="bg-neon-orange text-black font-black px-8 py-3 rounded-2xl flex items-center gap-3 hover:scale-105 transition-all shadow-lg disabled:opacity-50"
                >
                  <Save className="w-5 h-5" /> PUBLISH ALL CHANGES
                </button>
            </div>

            <div className="bg-zinc-900/40 p-8 rounded-[3rem] border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-xs text-gray-500 uppercase font-black tracking-[0.2em] ml-2">Logo (1:1)</label>
                  <div className="relative group w-32 aspect-square bg-black rounded-3xl border-2 border-dashed border-white/10 overflow-hidden hover:border-neon-orange/50 transition-all shadow-inner">
                    <img src={editBranding.logo_url} className="w-full h-full object-contain p-4" />
                    <label className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity backdrop-blur-md">
                      <Upload className="w-6 h-6 text-neon-orange" />
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'logo')} />
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs text-gray-500 uppercase font-black tracking-[0.2em] ml-2">Main Banner (Hero)</label>
                  <div className="relative group aspect-video bg-black rounded-3xl border-2 border-dashed border-white/10 overflow-hidden hover:border-[#00BFFF]/50 transition-all shadow-inner">
                    <img src={editBranding.banner_url} className="w-full h-full object-cover" />
                    <label className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity backdrop-blur-md">
                      <Upload className="w-10 h-10 text-[#00BFFF] mb-2" />
                      <span className="text-[10px] font-black text-white tracking-widest uppercase">CHANGE BANNER</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'banner')} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs text-gray-500 uppercase font-black tracking-[0.2em] ml-2">Showcase Slideshow ({editBranding.gameplay_images.length} Images)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {editBranding.gameplay_images.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
                      <img src={img} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => removeShowcaseImage(idx)}
                        className="absolute top-1 right-1 p-1.5 bg-red-500/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-video rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-white/30 transition-all bg-white/5">
                    <Plus className="w-6 h-6 text-gray-500 mb-1" />
                    <span className="text-[9px] font-black text-gray-500 uppercase">ADD SLIDE</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'gameplay')} />
                  </label>
                </div>
                <p className="text-[10px] text-zinc-500 italic mt-2">Images will cycle every 3 seconds on the website.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bangers text-white tracking-widest uppercase flex items-center gap-3">
              <Code className="text-neon-orange" /> GAME CODES
            </h2>
            <div className="bg-zinc-900/50 p-6 rounded-[2rem] border border-white/5 space-y-4 backdrop-blur-sm">
              <div className="flex gap-2">
                <input 
                  className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-neon-orange outline-none uppercase font-mono text-white" 
                  placeholder="NEW_CODE" 
                  value={newCode.code} 
                  onChange={(e) => setNewCode({ ...newCode, code: e.target.value })} 
                />
                <button 
                  onClick={suggestCode} 
                  className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition-colors border border-white/5"
                  title="Generate AI Code"
                >
                  <Wand2 className={`w-5 h-5 text-neon-orange ${isGenerating ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <input 
                className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-neon-orange outline-none text-white" 
                placeholder="REWARD" 
                value={newCode.reward} 
                onChange={(e) => setNewCode({ ...newCode, reward: e.target.value })} 
              />
              <button onClick={addCode} className="w-full bg-white text-black font-black py-4 rounded-xl hover:scale-105 transition-transform active:scale-95">ADD CODE</button>
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {codes.map(c => (
                <div key={c.id} className="bg-zinc-900 border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:border-neon-orange/30 transition-colors">
                  <div className="flex flex-col">
                    <span className="font-mono font-black text-white uppercase tracking-tighter">{c.code}</span>
                    <span className="text-[10px] text-[#00BFFF] font-bold uppercase tracking-widest">{c.reward}</span>
                  </div>
                  <button onClick={() => deleteCode(c.id)} className="text-zinc-600 hover:text-red-500 p-2 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-bangers text-white tracking-widest uppercase flex items-center gap-3">
              <FileText className="text-[#00BFFF]" /> PATCH NOTES
            </h2>
            <div className="bg-zinc-900/50 p-8 rounded-[2rem] border border-white/5 space-y-4 backdrop-blur-sm">
              <input 
                className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-[#00BFFF] outline-none font-bold text-white" 
                placeholder="UPDATE TITLE" 
                value={newLog.title} 
                onChange={(e) => setNewLog({ ...newLog, title: e.target.value })} 
              />
              <textarea 
                className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-[#00BFFF] outline-none h-32 text-gray-300" 
                placeholder="Description..." 
                value={newLog.content} 
                onChange={(e) => setNewLog({ ...newLog, content: e.target.value })} 
              />
              <button onClick={addLog} className="w-full bg-[#00BFFF] text-black font-black py-5 rounded-xl hover:scale-[1.02] transition-transform active:scale-95">POST UPDATE</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {logs.map(l => (
                <div key={l.id} className="bg-zinc-900/80 p-6 rounded-3xl border border-white/5 flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-white uppercase italic">{l.title}</h4>
                    <p className="text-gray-500 text-xs line-clamp-2 mt-1">{l.content}</p>
                  </div>
                  <button onClick={() => deleteLog(l.id)} className="text-zinc-700 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
