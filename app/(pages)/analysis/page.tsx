'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import { TrendingUp, BarChart3 } from 'lucide-react';

function getRiskBadgeVariant(level: string): 'ok' | 'warn' | 'err' {
  switch (level) {
    case 'LOW':
      return 'ok';
    case 'MEDIUM':
      return 'warn';
    case 'HIGH':
    case 'CRITICAL':
    default:
      return 'err';
  }
}

function getRiskColor(level: string): string {
  const colors: Record<string, string> = {
    LOW: '#10b981',
    MEDIUM: '#f59e0b',
    HIGH: '#f87171',
    CRITICAL: '#f87171',
  };
  return colors[level] || '#9ca3af';
}

function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    low: '#60a5fa',
    medium: '#f59e0b',
    high: '#f87171',
    critical: '#f87171',
  };
  return colors[severity] || '#9ca3af';
}

function getProgressGradient(level: string): string {
  const gradients: Record<string, string> = {
    LOW: 'linear-gradient(90deg, #10b981, #34d399)',
    MEDIUM: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
    HIGH: 'linear-gradient(90deg, #f87171, #fca5a5)',
    CRITICAL: 'linear-gradient(90deg, #dc2626, #ef4444)',
  };
  return gradients[level] || 'linear-gradient(90deg, #10b981, #34d399)';
}

function Badge({ children, variant }: { children: React.ReactNode; variant: 'ok' | 'warn' | 'err' }) {
  const bgColors: Record<string, string> = {
    ok: '#064e3b',
    warn: '#451a03',
    err: '#4c0519',
  };
  const textColors: Record<string, string> = {
    ok: '#10b981',
    warn: '#f59e0b',
    err: '#f87171',
  };
  return (
    <span style={{
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: 600,
      background: bgColors[variant],
      color: textColors[variant],
    }}>
      {children}
    </span>
  );
}

export default function AnalysisPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('2026');

  const riskDocuments = [
    {
      id: 1,
      documentNumber: 'PBG/003/2026',
      title: 'Pembangunan Jalan Desa',
      village: 'Desa Harapan Mulya',
      amount: 250000000,
      riskScore: 85,
      riskLevel: 'HIGH',
      factors: [
        { label: 'Anggaran melebihi rata-rata', severity: 'high' },
        { label: 'Dokumen pendukung tidak lengkap', severity: 'medium' },
        { label: 'Belum ada SPJ sebelumnya', severity: 'high' },
        { label: 'Penyedia baru terdaftar', severity: 'low' },
      ]
    },
    {
      id: 2,
      documentNumber: 'PEM/002/2026',
      title: 'Pembelian Bahan Bangunan',
      village: 'Desa Mekar Jaya',
      amount: 78000000,
      riskScore: 62,
      riskLevel: 'MEDIUM',
      factors: [
        { label: 'Harga satuan di atas HET', severity: 'medium' },
        { label: 'Volume tidak sesuai RAB', severity: 'medium' },
        { label: 'Faktur tidak lengkap', severity: 'low' },
      ]
    },
    {
      id: 3,
      documentNumber: 'PKG/008/2026',
      title: 'Pengadaan Komputer Desa',
      village: 'Desa Sukamakmur',
      amount: 125000000,
      riskScore: 45,
      riskLevel: 'MEDIUM',
      factors: [
        { label: 'Spesifikasi tidak jelas', severity: 'medium' },
        { label: 'Garansi tidak disebutkan', severity: 'low' },
      ]
    },
    {
      id: 4,
      documentNumber: 'PRB/009/2026',
      title: 'Perbaikan Gedung Sekolah',
      village: 'Desa Bakti Nusa',
      amount: 180000000,
      riskScore: 92,
      riskLevel: 'CRITICAL',
      factors: [
        { label: 'Kontraktor tidak terdaftar', severity: 'high' },
        { label: 'RAB tidak realistis', severity: 'high' },
        { label: 'Tidak ada foto kondisi awal', severity: 'medium' },
        { label: 'Timeline tidak masuk akal', severity: 'high' },
        { label: 'Anggaran dari sumber tidak jelas', severity: 'critical' },
      ]
    },
  ];

  const riskDistribution = [
    { level: 'LOW', label: 'Risiko Rendah', count: 89, percent: 57 },
    { level: 'MEDIUM', label: 'Risiko Sedang', count: 42, percent: 27 },
    { level: 'HIGH', label: 'Risiko Tinggi', count: 18, percent: 11 },
    { level: 'CRITICAL', label: 'Risiko Kritis', count: 7, percent: 5 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Header />
      <Navigation />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ color: '#10b981', fontSize: '1.2rem', marginBottom: '4px', fontWeight: 700 }}>Analisis Risiko</h2>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>Identifikasi dan evaluasi risiko dokumen keuangan</p>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '10px 12px',
              fontSize: '0.875rem',
              color: '#e5e7eb',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="2026">Tahun 2026</option>
            <option value="2025">Tahun 2025</option>
            <option value="2024">Tahun 2024</option>
          </select>
        </div>

        {/* Risk Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '24px',
        }}>
          <StatCard label="Risiko Rendah" value={89} color="#10b981" />
          <StatCard label="Risiko Sedang" value={42} color="#60a5fa" />
          <StatCard label="Risiko Tinggi" value={18} color="#f59e0b" />
          <StatCard label="Risiko Kritis" value={7} color="#f87171" />
        </div>

        {/* Risk Distribution + Average Score */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '16px',
          marginBottom: '24px',
        }}>
          <Card title="Distribusi Tingkat Risiko">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {riskDistribution.map((item) => (
                <div key={item.level}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.875rem', color: '#d1d5db', fontWeight: 500 }}>{item.label}</span>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{item.count} dokumen ({item.percent}%)</span>
                  </div>
                  <div style={{ background: '#334155', borderRadius: '20px', height: '8px' }}>
                    <div style={{
                      background: getProgressGradient(item.level),
                      height: '8px',
                      borderRadius: '20px',
                      width: `${item.percent}%`,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Skor Risiko Rata-rata">
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '128px',
                height: '128px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #f59e0b)',
                marginBottom: '16px',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.25rem', fontWeight: 700, color: '#fff' }}>68</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>dari 100</div>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>Skor risiko keseluruhan</p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '16px',
                color: '#10b981',
              }}>
                <TrendingUp style={{ width: '16px', height: '16px' }} />
                <span style={{ fontSize: '0.875rem' }}>-12% dari bulan lalu</span>
              </div>
            </div>
          </Card>
        </div>

        {/* High Risk Documents */}
        <Card title="Dokumen Berisiko Tinggi">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {riskDocuments.map((doc) => (
              <div key={doc.id} style={{
                padding: '16px',
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '8px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#6b7280' }}>{doc.documentNumber}</span>
                      <Badge variant={getRiskBadgeVariant(doc.riskLevel)}>{doc.riskLevel}</Badge>
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#e5e7eb', margin: '0 0 4px 0' }}>{doc.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>{doc.village} &bull; {formatCurrency(doc.amount)}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.875rem', fontWeight: 700, color: getRiskColor(doc.riskLevel) }}>{doc.riskScore}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Skor Risiko</div>
                  </div>
                </div>

                {/* Risk Factors */}
                <div style={{
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid #334155',
                }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9ca3af', margin: '0 0 8px 0' }}>Faktor Risiko:</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {doc.factors.map((factor, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: getSeverityColor(factor.severity),
                          flexShrink: 0,
                        }} />
                        <span style={{ fontSize: '0.875rem', color: '#d1d5db', flex: 1 }}>{factor.label}</span>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: getSeverityColor(factor.severity),
                        }}>
                          {factor.severity.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Recommendations */}
        <div style={{
          background: 'linear-gradient(135deg, #1e3a5f20, #0e4d3a20)',
          border: '1px solid #10b98140',
          borderRadius: '12px',
          padding: '16px',
          marginTop: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <BarChart3 style={{ width: '20px', height: '20px', color: '#10b981' }} />
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#10b981', margin: 0 }}>Rekomendasi Sistem</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '12px',
              background: '#0f172a',
              borderRadius: '8px',
            }}>
              <span style={{ color: '#f59e0b', fontSize: '1.125rem', lineHeight: 1 }}>&#9888;</span>
              <p style={{ fontSize: '0.875rem', color: '#d1d5db', margin: 0 }}>Perhatikan dokumen dengan risiko kritis - lakukan audit mendalam sebelum persetujuan</p>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '12px',
              background: '#0f172a',
              borderRadius: '8px',
            }}>
              <span style={{ color: '#10b981', fontSize: '1.125rem', lineHeight: 1 }}>&#10003;</span>
              <p style={{ fontSize: '0.875rem', color: '#d1d5db', margin: 0 }}>89 dokumen dengan risiko rendah dapat diproses dengan verifikasi standar</p>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '12px',
              background: '#0f172a',
              borderRadius: '8px',
            }}>
              <span style={{ color: '#60a5fa', fontSize: '1.125rem', lineHeight: 1 }}>&#8505;</span>
              <p style={{ fontSize: '0.875rem', color: '#d1d5db', margin: 0 }}>Pola risiko meningkat pada dokumen pembangunan - pertimbangkan review berkala</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
