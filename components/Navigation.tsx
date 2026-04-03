'use client';

import { useState } from 'react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'documents', label: 'Dokumen' },
  { id: 'verification', label: 'Verifikasi' },
  { id: 'analysis', label: 'Analisis' },
  { id: 'reports', label: 'Laporan' },
  { id: 'settings', label: 'Pengaturan' },
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="nav" style={{
      display: 'flex',
      gap: '8px',
      padding: '16px 24px',
      background: '#1e293b',
      borderBottom: '1px solid #334155',
      flexWrap: 'wrap',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          style={{
            padding: '8px 16px',
            border: '1px solid #334155',
            background: activeTab === item.id ? '#10b981' : '#0f172a',
            color: activeTab === item.id ? '#fff' : '#94a3b8',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            transition: 'all 0.2s',
            fontWeight: 600,
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
