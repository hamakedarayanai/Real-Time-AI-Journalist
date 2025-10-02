
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <ion-icon name="pulse" class="text-4xl text-cyan-400"></ion-icon>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">
            Real-Time AI Journalist
            </h1>
        </div>
        <a 
          href="https://github.com/google/aistudio-web" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors duration-200"
        >
          <ion-icon name="logo-github" class="text-2xl"></ion-icon>
          <span className="font-semibold">View Source</span>
        </a>
      </div>
    </header>
  );
};

export default Header;