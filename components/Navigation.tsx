'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Search, 
  BarChart3, 
  FileOutput, 
  Settings,
  LogOut 
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'documents', label: 'Dokumen', icon: FileText },
  { id: 'verification', label: 'Verifikasi', icon: Search },
  { id: 'analysis', label: 'Analisis', icon: BarChart3 },
  { id: 'reports', label: 'Laporan', icon: FileOutput },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="flex gap-2 p-4 bg-[#1e293b] border-b border-[#334155] flex-wrap">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex items-center gap-2 px-4 py-2 border border-[#334155] rounded-lg cursor-pointer text-sm transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-[#10b981] text-white border-[#10b981]'
                : 'bg-[#0f172a] text-gray-400 hover:bg-[#334155]'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        );
      })}
      <button className="flex items-center gap-2 px-4 py-2 border border-[#334155] rounded-lg cursor-pointer text-sm transition-all duration-200 bg-[#0f172a] text-red-400 hover:bg-red-900 ml-auto">
        <LogOut className="w-4 h-4" />
        <span>Keluar</span>
      </button>
    </nav>
  );
}
