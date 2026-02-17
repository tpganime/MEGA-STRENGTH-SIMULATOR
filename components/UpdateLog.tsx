
import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { UpdateLog as UpdateLogType } from '../types';

interface Props {
  logs: UpdateLogType[];
}

const UpdateLog: React.FC<Props> = ({ logs }) => {
  return (
    <section id="updates" className="py-24 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bangers tracking-wide text-white mb-12 text-center">PATCH NOTES & UPDATES</h2>
        
        <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-0 space-y-12">
          {logs.sort((a, b) => b.date.localeCompare(a.date)).map((log) => (
            <div key={log.id} className="relative pl-10">
              <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-neon-orange ring-4 ring-black"></div>
              
              <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                  <h3 className="text-2xl font-bold text-white">{log.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    {new Date(log.date).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="text-gray-400 leading-relaxed whitespace-pre-line">
                  {log.content}
                </div>
                
                <button className="mt-6 flex items-center gap-1 text-[#00BFFF] font-bold hover:underline">
                  Full Dev Log <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpdateLog;
