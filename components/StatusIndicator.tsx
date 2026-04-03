'use client';

import { Circle } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'success' | 'warning' | 'error';
  label: string;
}

export default function StatusIndicator({ status, label }: StatusIndicatorProps) {
  const colors = {
    success: 'text-[#10b981]',
    warning: 'text-[#f59e0b]',
    error: 'text-[#f87171]',
  };

  return (
    <div className="flex items-center gap-2">
      <Circle className={`w-2.5 h-2.5 fill-current ${colors[status]}`} />
      <span className="text-sm text-gray-300">{label}</span>
    </div>
  );
}
