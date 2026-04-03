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
    <header className="bg-gradient-to-r from-[#1e3a5f] to-[#0e4d3a] border-b-2 border-[#10b981] overflow-hidden">
      <div className="flex items-center justify-center gap-4 p-4">
        <div className="text-center flex-1">
          <h1 className="text-xl font-bold text-[#10b981] m-0">{title}</h1>
          <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
        </div>
      </div>
    </header>
  );
}
