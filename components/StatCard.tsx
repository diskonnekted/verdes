'use client';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color?: 'green' | 'blue' | 'yellow' | 'red';
}

export default function StatCard({ label, value, icon, color = 'green' }: StatCardProps) {
  const colorClasses = {
    green: 'text-[#10b981]',
    blue: 'text-[#60a5fa]',
    yellow: 'text-[#f59e0b]',
    red: 'text-[#f87171]',
  };

  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 text-center">
      <div className={`${colorClasses[color]} mb-2`}>{icon}</div>
      <div className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</div>
      <div className="text-gray-400 text-sm mt-2">{label}</div>
    </div>
  );
}
