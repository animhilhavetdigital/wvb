import React from 'react';
import { Button } from './Button';
import { getWhatsAppUrl } from '../lib/constants';

export const BottomNav: React.FC = () => {
  return (
    <aside aria-label="Quick Actions" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-none px-6 py-2 sm:px-8 sm:py-2 flex items-center gap-5 sm:gap-6 shadow-[0_12px_36px_-6px_rgba(5,26,36,0.2),0_0_0_1px_rgba(5,26,36,0.06)] border border-slate-100">
        <a
          href="#"
          aria-label="Nimhil Studio Home"
          className="font-serif text-2xl font-semibold text-[#051A24] select-none hover:opacity-80 transition-opacity"
        >
          N
        </a>
        <Button
          variant="primary"
          href={getWhatsAppUrl("Salam l-équipe, bghit n-hdro 3la site web pro.")}
          target="_blank"
          className="!px-5 !py-2 text-xs sm:text-sm font-medium"
        >
          WhatsApp
        </Button>
      </div>
    </aside>
  );
};

export default BottomNav;
