'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import StatCard from '@/components/StatCard';
import Card from '@/components/Card';
import Badge from '@/components/Button';
import DataTable from '@/components/DataTable';
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  TrendingUp,
  DollarSign,
  Clock,
  Shield
} from 'lucide-react';

// Dummy data
const mockDocuments = [
  { id: 1, documentNumber: 'PKG/001/2026', title: 'Pengadaan Alat Kantor', type: 'PENGADAAN', amount: 45000000, status: 'APPROVED', date: '2026-03-01', riskLevel: 'LOW' },
  { id: 2, documentNumber: 'PEM/002/2026', title: 'Pembelian Bahan Bangunan', type: 'PEMBELIAN', amount: 78000000, status: 'IN_REVIEW', date: '2026-03-02', riskLevel: 'MEDIUM' },
  { id: 3, documentNumber: 'PBG/003/2026', title: 'Pembangunan Jalan Desa', type: 'PEMBANGUNAN', amount: 250000000, status: 'PENDING', date: '2026-03-03', riskLevel: 'HIGH' },
  { id: 4, documentNumber: 'PRB/004/2026', title: 'Perbaikan Jembatan', type: 'PERBAIKAN', amount: 125000000, status: 'REVISE', date: '2026-03-04', riskLevel: 'MEDIUM' },
  { id: 5, documentNumber: 'OPS/005/2026', title: 'Operasional Kantor Desa', type: 'OPERASIONAL', amount: 15000000, status: 'APPROVED', date: '2026-03-05', riskLevel: 'LOW' },
];

const statusColors: any = {
  APPROVED: 'success',
  IN_REVIEW: 'info',
  PENDING: 'warning',
  REJECTED: 'error',
  REVISE: 'warning',
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const columns = [
    { key: 'documentNumber', label: 'No. Dokumen' },
    { key: 'title', label: 'Judul' },
    { key: 'type', label: 'Tipe' },
    { 
      key: 'amount', 
      label: 'Jumlah',
      render: (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => {
        const variants: any = {
          APPROVED: 'bg-[#064e3b] text-[#10b981]',
          IN_REVIEW: 'bg-[#1e3a5f] text-[#60a5fa]',
          PENDING: 'bg-[#451a03] text-[#f59e0b]',
          REJECTED: 'bg-[#4c0519] text-[#f87171]',
          REVISE: 'bg-[#451a03] text-[#f59e0b]',
        };
        return (
          <span className={`px-2 py-1 rounded text-xs font-semibold ${variants[value]}`}>
            {value}
          </span>
        );
      }
    },
    { 
      key: 'riskLevel', 
      label: 'Risiko',
      render: (value: string) => {
        const variants: any = {
          LOW: 'bg-[#064e3b] text-[#10b981]',
          MEDIUM: 'bg-[#451a03] text-[#f59e0b]',
          HIGH: 'bg-[#4c0519] text-[#f87171]',
          CRITICAL: 'bg-[#4c0519] text-[#f87171]',
        };
        return (
          <span className={`px-2 py-1 rounded text-xs font-semibold ${variants[value]}`}>
            {value}
          </span>
        );
      }
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            label="Total Dokumen" 
            value={156} 
            icon={<FileText className="w-8 h-8" />} 
            color="blue"
          />
          <StatCard 
            label="Disetujui" 
            value={89} 
            icon={<CheckCircle className="w-8 h-8" />} 
            color="green"
          />
          <StatCard 
            label="Dalam Review" 
            value={42} 
            icon={<Clock className="w-8 h-8" />} 
            color="yellow"
          />
          <StatCard 
            label="Ditolak/Revisi" 
            value={25} 
            icon={<XCircle className="w-8 h-8" />} 
            color="red"
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard 
            label="Total Nilai Dokumen" 
            value="Rp 2.4M" 
            icon={<DollarSign className="w-8 h-8" />} 
            color="green"
          />
          <StatCard 
            label="Risiko Tinggi" 
            value={12} 
            icon={<AlertTriangle className="w-8 h-8" />} 
            color="yellow"
          />
          <StatCard 
            label="Terverifikasi" 
            value="87%" 
            icon={<Shield className="w-8 h-8" />} 
            color="blue"
          />
        </div>

        {/* Recent Documents */}
        <Card title="Dokumen Terbaru">
          <DataTable columns={columns} data={mockDocuments} />
        </Card>

        {/* Activity Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <Card title="Aktivitas Verifikasi">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
                <div>
                  <p className="text-sm text-gray-300">Dokumen diverifikasi hari ini</p>
                  <p className="text-xs text-gray-500">15 dokumen</p>
                </div>
                <TrendingUp className="w-5 h-5 text-[#10b981]" />
              </div>
              <div className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
                <div>
                  <p className="text-sm text-gray-300">Menunggu review</p>
                  <p className="text-xs text-gray-500">8 dokumen</p>
                </div>
                <Clock className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
                <div>
                  <p className="text-sm text-gray-300">Perlu tindak lanjut</p>
                  <p className="text-xs text-gray-500">5 dokumen</p>
                </div>
                <AlertTriangle className="w-5 h-5 text-[#f87171]" />
              </div>
            </div>
          </Card>

          <Card title="Distribusi Tipe Dokumen">
            <div className="space-y-3">
              {[
                { type: 'PENGADAAN', count: 35, percent: 22 },
                { type: 'PEMBELIAN', count: 48, percent: 31 },
                { type: 'PEMBANGUNAN', count: 42, percent: 27 },
                { type: 'PERBAIKAN', count: 18, percent: 12 },
                { type: 'OPERASIONAL', count: 13, percent: 8 },
              ].map((item) => (
                <div key={item.type} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{item.type}</span>
                    <span className="text-gray-500">{item.count} ({item.percent}%)</span>
                  </div>
                  <div className="bg-[#334155] rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#10b981] to-[#34d399] h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
