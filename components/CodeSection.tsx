
import React from 'react';
import { Copy, Check, Gift, Zap, Square } from 'lucide-react';
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
    <section id="codes" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-20 gap-6">
          <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/10">
              <Zap className="w-4 h-4 text-[#00BFFF]" />
              <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">DATA FRAGMENTS 4.2.0</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-bangers tracking-wider text-white uppercase italic text-center">REDEEM CODES</h2>
        </div>
        
        <div className="grid gap-8">
          {activeCodes.length > 0 ? activeCodes.map((item) => (
            <div 
              key={item.id} 
              className="group liquid-glass p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 card-3d !rounded-[50px]"
            >
              <div className="flex items-center gap-10 w-full md:w-auto">
                <div className="w-20 h-20 bg-zinc-900/50 rounded-3xl flex items-center justify-center border border-white/5 shadow-2xl shrink-0 group-hover:scale-110 transition-transform">
                  <Square className="text-[#FF8C00] fill-[#FF8C00]/20 w-8 h-8" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl md:text-6xl font-black font-mono tracking-tighter text-white uppercase group-hover:text-[#FF8C00] transition-colors">
                      {item.code}
                    </span>
                    {item.isNew && (
                      <span className="bg-[#FF8C00] text-black text-[10px] font-black px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(255,140,0,0.3)]">NEW</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-zinc-500 font-bold tracking-[0.3em] uppercase text-xs">REWARD</span>
                    <span className="text-[#00BFFF] font-black uppercase text-lg italic tracking-tight">{item.reward}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleCopy(item.code, item.id)}
                className={`w-full md:w-auto liquid-glass !rounded-[30px] flex items-center justify-center gap-4 px-14 py-8 font-black text-xl transition-all border-white/5 ${
                  copiedId === item.id 
                  ? '!bg-green-500 !text-black shadow-[0_0_40px_rgba(34,197,94,0.3)]' 
                  : 'bg-white/5 hover:!bg-white !text-white hover:!text-black'
                }`}
              >
                {copiedId === item.id ? <Check size={24} /> : <Copy size={24} />}
                <span className="uppercase tracking-widest">{copiedId === item.id ? 'VERIFIED' : 'EXTRACT'}</span>
              </button>
            </div>
          )) : (
            <div className="text-center py-32 liquid-glass border-dashed border-2 border-white/5 !rounded-[60px] text-zinc-800 font-black uppercase tracking-[1em]">
              NO SIGNAL DETECTED
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CodeSection;
