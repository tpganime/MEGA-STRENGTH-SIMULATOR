
import React from 'react';
import { Copy, Check, Gift } from 'lucide-react';
import { GameCode } from '../types';

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
    <section id="codes" className="py-24 px-4 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bangers tracking-wide neon-blue mb-2">LATEST CODES</h2>
            <p className="text-gray-400">Redeem these in-game for exclusive boosts and gems!</p>
          </div>
          <div className="bg-neon-orange/10 border border-neon-orange/20 rounded-lg px-4 py-2 flex items-center gap-2">
            <Gift className="w-5 h-5 text-neon-orange" />
            <span className="text-neon-orange font-bold text-sm">UPDATED TODAY</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {activeCodes.length > 0 ? activeCodes.map((item) => (
            <div 
              key={item.id} 
              className="group bg-zinc-900 border border-white/5 p-6 rounded-2xl flex items-center justify-between hover:border-neon-orange/30 transition-all shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black font-mono tracking-tighter text-white uppercase group-hover:text-neon-orange transition-colors">
                      {item.code}
                    </span>
                    {item.isNew && (
                      <span className="bg-neon-orange text-black text-[10px] font-black px-2 py-0.5 rounded pulse-orange">NEW</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">Reward: <span className="text-neon-blue">{item.reward}</span></span>
                </div>
              </div>
              
              <button 
                onClick={() => handleCopy(item.code, item.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  copiedId === item.id 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/5 text-gray-300 hover:bg-neon-orange hover:text-black'
                }`}
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-5 h-5" />
                    COPIED
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    COPY
                  </>
                )}
              </button>
            </div>
          )) : (
            <div className="text-center py-12 text-gray-500 italic">No active codes available. Check back soon!</div>
          )}
        </div>
        
        <p className="mt-8 text-center text-gray-500 text-sm">
          How to redeem: Open game &rarr; Click 'Codes' icon &rarr; Type code &rarr; Click Redeem
        </p>
      </div>
    </section>
  );
};

export default CodeSection;
