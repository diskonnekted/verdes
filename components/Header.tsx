'use client';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ 
  title = "Sistem Verifikasi Pertanggungjawaban Keuangan Desa", 
  subtitle = "Kabupaten Example" 
}: HeaderProps) {
  return (
    <div className="header" style={{
      background: 'linear-gradient(135deg, #1e3a5f, #0e4d3a)',
      borderBottom: '2px solid #10b981',
      overflow: 'hidden',
      padding: '20px 24px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <h1 style={{
          fontSize: '1.2rem',
          color: '#10b981',
          fontWeight: 700,
          lineHeight: 1.3,
          margin: 0,
        }}>{title}</h1>
        <p style={{
          color: '#94a3b8',
          fontSize: '0.85rem',
          marginTop: '4px',
        }}>{subtitle}</p>
      </div>
    </div>
  );
}
