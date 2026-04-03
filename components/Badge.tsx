'use client';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
}

export default function Badge({ children, variant = 'info' }: BadgeProps) {
  const variants = {
    success: 'bg-[#064e3b] text-[#10b981]',
    warning: 'bg-[#451a03] text-[#f59e0b]',
    error: 'bg-[#4c0519] text-[#f87171]',
    info: 'bg-[#1e3a5f] text-[#60a5fa]',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
}
