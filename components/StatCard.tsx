'use client';

interface StatCardProps {
  label: string;
  value: number | string;
  color?: string;
}

export default function StatCard({ label, value, color = '#10b981' }: StatCardProps) {
  return (
    <div className="stat-box" style={{
      background: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: '2rem',
        fontWeight: 700,
        color: color,
      }}>{value}</div>
      <div style={{
        color: '#94a3b8',
        fontSize: '0.8rem',
        marginTop: '4px',
      }}>{label}</div>
    </div>
  );
}
