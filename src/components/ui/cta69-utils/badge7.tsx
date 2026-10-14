import React from 'react';
import { cn } from '@/lib/utils';

export interface Badge7Props {
  label: string;
  className?: string;
}

export function Badge7({ label, className }: Badge7Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-slate-300/80 bg-white px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#273C46] shadow-xs rounded-none select-none",
        className
      )}
    >
      <span className="h-1.5 w-1.5 bg-emerald-500 rounded-none animate-pulse" />
      {label}
    </span>
  );
}

export default Badge7;
