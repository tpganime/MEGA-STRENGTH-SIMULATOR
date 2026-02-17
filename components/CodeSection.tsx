
import React from 'react';
import { Copy, Check, Gift, Sparkles, Zap } from 'lucide-react';
import { GameCode } from '../types.ts';

interface Props {
  codes: GameCode[];
}

const CodeSection: React.FC<Props> = ({ codes }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activeCodes = codes.filter(c => c.active);

  return (
    <section id="codes" className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4 text-[#00BFFF]" />
                <span className="text-[10px] font-black tracking-widest uppercase text-white/60">NETWORK DECRYPTION ACTIVE</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-bangers tracking-wider text-white mb-4 uppercase italic">DATA FRAGMENTS</h2>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-xs md:text-sm">AUTHORIZE POWER SEQUENCE REDEMPTION</p>
          </div>
        </div>
        
        <div className="grid gap-6">
          {activeCodes.length > 0 ? activeCodes.map((item) => (
            <div 
              key={item.id} 
              className="group liquid-glass p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 transition-all card-3d"
            >
              <div className="flex items-center gap-8 w-full md:w-auto">
                <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform shadow-2xl shrink-0">
                  <Gift className="text-[#FF8C00] w-10 h-10" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl md:text-5xl font-black font-mono tracking-tighter text-white uppercase group-hover:text-[#FF8C00] transition-colors">
                      {item.code}
                    </span>
                    {item.isNew && (
                      <span className="bg-[#FF8C00] text-black text-[10px] font-black px-4 py-1.5 rounded-full animate-pulse">NEW</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-zinc-500 font-bold tracking-widest uppercase text-xs">YIELD:</span>
                    <span className="text-[#00BFFF] font-black uppercase text-sm">{item.reward}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleCopy(item.code, item.id)}
                className={`w-full md:w-auto liquid-glass flex items-center justify-center gap-4 px-12 py-6 font-black text-xl transition-all border-none ${
                  copiedId === item.id 
                  ? '!bg-green-500 !text-black' 
                  : 'bg-white/5 hover:!bg-white !text-white hover:!text-black'
                }`}
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-6 h-6" />
                    COPIED
                  </>
                ) : (
                  <>
                    <Copy className="w-6 h-6" />
                    EXTRACT
                  </>
                )}
              </button>
            </div>
          )) : (
            <div className="text-center py-24 liquid-glass border-dashed border-2 border-white/5 text-zinc-700 font-black uppercase tracking-[0.8em]">
              Scanning dimensions for signal...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CodeSection;
