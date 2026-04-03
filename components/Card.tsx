'use client';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`bg-[#1e293b] border border-[#334155] rounded-xl p-5 ${className}`}>
      {title && (
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-base font-semibold text-[#10b981]">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}
