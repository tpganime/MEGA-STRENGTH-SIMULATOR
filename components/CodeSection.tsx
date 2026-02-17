import React from 'react';
import { Copy, Check, Hash } from 'lucide-react';
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
    <div id="codes" className="w-full">
      <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 liquid-glass flex items-center justify-center">
            <Hash className="w-6 h-6 text-[#ff7b00]" />
          </div>
          <h2 className="text-5xl font-black tracking-tight text-[#1d1d1f] uppercase italic">IN GAME REWARD CODE</h2>
      </div>
      
      <div className="space-y-8">
        {activeCodes.length > 0 ? activeCodes.map((item) => (
          <div 
            key={item.id} 
            className="liquid-glass p-10 flex items-center justify-between gap-8 hover:scale-[1.02] transition-transform shadow-xl"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black font-mono tracking-tighter text-[#1d1d1f] italic uppercase">
                  {item.code}
                </span>
                {item.isNew && (
                  <span className="bg-[#34C759] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-green-200">NEW</span>
                )}
              </div>
              <p className="text-[#86868b] text-lg font-bold">REWARD: <span className="text-black uppercase italic">{item.reward}</span></p>
            </div>
            
            <button 
              onClick={() => handleCopy(item.code, item.id)}
              className={`p-6 rounded-full transition-all liquid-glass ${
                copiedId === item.id 
                ? '!bg-green-500 text-white border-transparent' 
                : 'bg-white text-[#1d1d1f] hover:bg-black hover:text-white border-white'
              }`}
              title="Copy Code"
            >
              {copiedId === item.id ? <Check size={28} /> : <Copy size={28} />}
            </button>
          </div>
        )) : (
          <div className="p-20 text-center liquid-glass !bg-transparent border-dashed border-gray-300 text-gray-400 font-black text-2xl uppercase italic">
            SCANNING FOR CODES...
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeSection;