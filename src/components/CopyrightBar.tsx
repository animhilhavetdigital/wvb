import React from 'react';

export const CopyrightBar: React.FC = () => {
  return (
    <div className="w-full px-6 py-4 border-t border-slate-100">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-[#051A24] select-none">
        <span>Nimhil Digital Studio • Création de Sites Web Professionnels</span>
        <span>Marrakech, Maroc</span>
      </div>
    </div>
  );
};

export default CopyrightBar;
