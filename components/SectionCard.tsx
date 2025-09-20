
import React from 'react';

interface SectionCardProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ icon, title, children }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-slate-700">
        <h3 className="text-lg md:text-xl font-semibold text-slate-200 flex items-center">
          <ion-icon name={icon} class="mr-3 text-2xl text-cyan-400"></ion-icon>
          {title}
        </h3>
      </div>
      <div className="p-4 md:p-6">
        {children}
      </div>
    </div>
  );
};

export default SectionCard;
