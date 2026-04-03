'use client';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function Card({ title, children, className = '', style = {} }: CardProps) {
  return (
    <div className={`card ${className}`} style={{
      background: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '16px',
      ...style,
    }}>
      {title && (
        <div className="card-title" style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: '#10b981',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>{title}</div>
      )}
      {children}
    </div>
  );
}
