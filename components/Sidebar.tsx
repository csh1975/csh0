import React from 'react';
import { NavItem } from '../types';

interface SidebarProps {
  navItems: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, activeId, onSelect }) => {
  return (
    <div className="w-full md:w-64 flex-shrink-0 md:h-screen md:sticky md:top-0 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          Upbit Webhook
        </h1>
        <p className="text-xs text-slate-500 mt-2">Serverless Generator</p>
      </div>
      
      <nav className="flex-1 px-4 pb-4 space-y-1 overflow-x-auto md:overflow-x-visible flex md:flex-col">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex items-center space-x-3 w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeId === item.id
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 mt-auto border-t border-slate-800 hidden md:block">
        <div className="text-xs text-slate-600">
          Generated for Next.js 14+
          <br />
          App Router
        </div>
      </div>
    </div>
  );
};

export default Sidebar;