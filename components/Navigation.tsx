'use client';

import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'documents', label: 'Dokumen', href: '/documents' },
  { id: 'verification', label: 'Verifikasi', href: '/verification' },
  { id: 'analysis', label: 'Analisis', href: '/analysis' },
  { id: 'reports', label: 'Laporan', href: '/reports' },
  { id: 'settings', label: 'Pengaturan', href: '/settings' },
];

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  // Determine active tab from current pathname
  const getActiveTab = () => {
    const path = pathname.replace('/', '');
    if (!path || path === '') return 'dashboard';
    return path;
  };

  const activeTab = getActiveTab();

  const handleNav = (href: string) => {
    router.push(href);
  };

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
          onClick={() => handleNav(item.href)}
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
