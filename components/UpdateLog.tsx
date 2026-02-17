
import React from 'react';
import { Clock, Terminal, ChevronRight, Activity } from 'lucide-react';
import { UpdateLog as UpdateLogType } from '../types.ts';

interface Props {
  logs: UpdateLogType[];
}

const UpdateLog: React.FC<Props> = ({ logs }) => {
  return (
    <section id="updates" className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
                <Activity className="w-4 h-4 text-[#FF8C00]" />
                <span className="text-[10px] font-black tracking-widest uppercase text-white/60">VERSION 4.2.0-TITAN STABLE</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-bangers tracking-wider text-white mb-6 uppercase italic">PATCH DATA</h2>
        </div>
        
        <div className="relative space-y-12">
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00BFFF]/50 via-white/10 to-transparent hidden md:block"></div>
          
          {logs.sort((a, b) => b.date.localeCompare(a.date)).map((log, idx) => (
            <div key={log.id} className={`relative flex flex-col md:flex-row items-center gap-8 transform-style-3d ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full bg-[#0a0a0a] border-4 border-[#00BFFF] z-10 shadow-[0_0_20px_rgba(0,191,255,0.4)]"></div>
              
              <div className="w-full md:w-[45%]">
                <div className="liquid-glass p-10 md:p-14 border border-white/5 card-3d">
                  <div className="flex flex-col gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <Terminal className="text-[#00BFFF] w-7 h-7" />
                      <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase">{log.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                      <Clock className="w-4 h-4" />
                      {new Date(log.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                  
                  <div className="text-zinc-400 text-lg leading-relaxed whitespace-pre-line font-medium border-l-2 border-[#00BFFF]/20 pl-6">
                    {log.content}
                  </div>
                  
                  <div className="mt-10 flex justify-end">
                      <div className="liquid-glass !bg-white/5 !px-4 !py-2 !rounded-full text-[10px] font-black tracking-widest text-[#00BFFF] flex items-center gap-2 group cursor-pointer hover:!bg-white/10 transition-colors">
                          VERIFY INTEGRITY <ChevronRight size={14} />
                      </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block w-[45%]"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpdateLog;
