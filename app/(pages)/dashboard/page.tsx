'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import StatCard from '@/components/StatCard';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import DataTable from '@/components/DataTable';

// Dummy data
const mockDocuments = [
  { id: 1, documentNumber: 'PKG/001/2026', title: 'Pengadaan Alat Kantor', type: 'PENGADAAN', amount: 45000000, status: 'APPROVED', date: '2026-03-01', riskLevel: 'LOW' },
  { id: 2, documentNumber: 'PEM/002/2026', title: 'Pembelian Bahan Bangunan', type: 'PEMBELIAN', amount: 78000000, status: 'IN_REVIEW', date: '2026-03-02', riskLevel: 'MEDIUM' },
  { id: 3, documentNumber: 'PBG/003/2026', title: 'Pembangunan Jalan Desa', type: 'PEMBANGUNAN', amount: 250000000, status: 'PENDING', date: '2026-03-03', riskLevel: 'HIGH' },
  { id: 4, documentNumber: 'PRB/004/2026', title: 'Perbaikan Jembatan', type: 'PERBAIKAN', amount: 125000000, status: 'REVISE', date: '2026-03-04', riskLevel: 'MEDIUM' },
  { id: 5, documentNumber: 'OPS/005/2026', title: 'Operasional Kantor Desa', type: 'OPERASIONAL', amount: 15000000, status: 'APPROVED', date: '2026-03-05', riskLevel: 'LOW' },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    minimumFractionDigits: 0 
  }).format(value);
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
      render: (value: number) => (
        <span style={{ color: '#e2e8f0' }}>{formatCurrency(value)}</span>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => {
        const variants: any = {
          APPROVED: 'ok',
          IN_REVIEW: 'info',
          PENDING: 'warn',
          REJECTED: 'err',
          REVISE: 'warn',
        };
        return <Badge variant={variants[value]}>{value}</Badge>;
      }
    },
    { 
      key: 'riskLevel', 
      label: 'Risiko',
      render: (value: string) => {
        const variants: any = {
          LOW: 'ok',
          MEDIUM: 'warn',
          HIGH: 'err',
          CRITICAL: 'err',
        };
        return <Badge variant={variants[value]}>{value}</Badge>;
      }
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
    }}>
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px',
      }}>
        {/* Stats Grid - 4 columns */}
        <div className="grid-3" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '20px',
        }}>
          <StatCard label="Total Dokumen" value={156} color="#10b981" />
          <StatCard label="Disetujui" value={89} color="#10b981" />
          <StatCard label="Dalam Review" value={42} color="#f59e0b" />
          <StatCard label="Ditolak/Revisi" value={25} color="#f87171" />
        </div>

        {/* Additional Stats - 3 columns */}
        <div className="grid-3" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '20px',
        }}>
          <StatCard label="Total Nilai Dokumen" value="Rp 2.4M" color="#10b981" />
          <StatCard label="Risiko Tinggi" value={12} color="#f59e0b" />
          <StatCard label="Terverifikasi" value="87%" color="#60a5fa" />
        </div>

        {/* Recent Documents */}
        <Card title="Dokumen Terbaru">
          <DataTable columns={columns} data={mockDocuments} />
        </Card>

        {/* Activity Summary - 2 columns */}
        <div className="grid-2" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginTop: '16px',
        }}>
          <Card title="Aktivitas Verifikasi">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: '#0f172a',
                borderRadius: '8px',
                border: '1px solid #334155',
              }}>
                <div>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>Dokumen diverifikasi hari ini</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0' }}>15 dokumen</p>
                </div>
                <span style={{ fontSize: '1.2rem' }}>✓</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: '#0f172a',
                borderRadius: '8px',
                border: '1px solid #334155',
              }}>
                <div>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>Menunggu review</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0' }}>8 dokumen</p>
                </div>
                <span style={{ fontSize: '1.2rem' }}>⏰</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: '#0f172a',
                borderRadius: '8px',
                border: '1px solid #334155',
              }}>
                <div>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>Perlu tindak lanjut</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0' }}>5 dokumen</p>
                </div>
                <span style={{ fontSize: '1.2rem' }}>⚠</span>
              </div>
            </div>
          </Card>

          <Card title="Distribusi Tipe Dokumen">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { type: 'PENGADAAN', count: 35, percent: 22 },
                { type: 'PEMBELIAN', count: 48, percent: 31 },
                { type: 'PEMBANGUNAN', count: 42, percent: 27 },
                { type: 'PERBAIKAN', count: 18, percent: 12 },
                { type: 'OPERASIONAL', count: 13, percent: 8 },
              ].map((item) => (
                <div key={item.type}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '0.82rem',
                    marginBottom: '4px',
                  }}>
                    <span style={{ color: '#94a3b8' }}>{item.type}</span>
                    <span style={{ color: '#64748b' }}>{item.count} ({item.percent}%)</span>
                  </div>
                  <div style={{
                    background: '#334155',
                    borderRadius: '20px',
                    height: '8px',
                  }}>
                    <div 
                      style={{
                        background: 'linear-gradient(90deg, #10b981, #34d399)',
                        height: '8px',
                        borderRadius: '20px',
                        width: `${item.percent}%`,
                        transition: 'width 1s',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
