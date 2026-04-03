'use client';

export default function Badge({ children, variant }: { children: React.ReactNode; variant?: string }) {
  let bg = '#1e3a5f';
  let color = '#60a5fa';

  if (variant === 'ok') {
    bg = '#064e3b';
    color = '#10b981';
  } else if (variant === 'warn') {
    bg = '#451a03';
    color = '#f59e0b';
  } else if (variant === 'err') {
    bg = '#4c0519';
    color = '#f87171';
  }

  return (
    <span style={{
      padding: '3px 10px',
      borderRadius: '20px',
      fontSize: '0.7rem',
      fontWeight: 600,
      background: bg,
      color: color,
    }}>
      {children}
    </span>
  );
}
