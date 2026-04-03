'use client';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'ok' | 'warn' | 'err' | 'info';
}

export default function Badge({ children, variant = 'info' }: BadgeProps) {
  const variants = {
    ok: { background: '#064e3b', color: '#10b981' },
    warn: { background: '#451a03', color: '#f59e0b' },
    err: { background: '#4c0519', color: '#f87171' },
    info: { background: '#1e3a5f', color: '#60a5fa' },
  };

  return (
    <span className="badge" style={{
      padding: '3px 10px',
      borderRadius: '20px',
      fontSize: '0.7rem',
      fontWeight: 600,
      background: variants[variant].background,
      color: variants[variant].color,
    }}>
      {children}
    </span>
  );
}
