import React from 'react';
import { Terminal, Clock } from 'lucide-react';
import { UpdateLog as UpdateLogType } from '../types.ts';

interface Props {
  logs: UpdateLogType[];
}

const UpdateLog: React.FC<Props> = ({ logs }) => {
  return (
    <div id="updates" className="w-full">
      <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 liquid-glass flex items-center justify-center">
            <Terminal className="w-6 h-6 text-[#3a86ff]" />
          </div>
          <h2 className="text-5xl font-black tracking-tight text-[#1d1d1f] uppercase italic">PATCH LOGS</h2>
      </div>
      
      <div className="space-y-16 relative">
        {logs.sort((a, b) => b.date.localeCompare(a.date)).map((log, idx) => (
          <div key={log.id} className="relative card-3d">
            <div className="flex flex-col gap-4 mb-6">
              <span className="text-xs font-black text-[#86868b] uppercase tracking-[0.4em] flex items-center gap-2">
                <Clock size={14} />
                {new Date(log.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <h3 className="text-3xl font-black text-[#1d1d1f] uppercase italic tracking-tight">{log.title}</h3>
            </div>
            
            <div className="liquid-glass p-10 text-[#555] text-lg leading-relaxed whitespace-pre-line border-white/50 shadow-2xl">
              {log.content}
              <div className="mt-8 pt-8 border-t border-black/5">
                <div className="spectral-bar w-20 h-0.5 opacity-40"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateLog;