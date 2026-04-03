'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import { TrendingUp, BarChart3 } from 'lucide-react';

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

  const getRiskColor = (level: string) => {
    const colors: any = {
      LOW: 'text-[#10b981]',
      MEDIUM: 'text-[#f59e0b]',
      HIGH: 'text-[#f87171]',
      CRITICAL: 'text-[#f87171]',
    };
    return colors[level] || 'text-gray-400';
  };

  const getRiskBg = (level: string) => {
    const colors: any = {
      LOW: 'bg-[#064e3b]',
      MEDIUM: 'bg-[#451a03]',
      HIGH: 'bg-[#4c0519]',
      CRITICAL: 'bg-[#4c0519]',
    };
    return colors[level] || 'bg-gray-800';
  };

  const getSeverityColor = (severity: string) => {
    const colors: any = {
      low: 'text-[#60a5fa]',
      medium: 'text-[#f59e0b]',
      high: 'text-[#f87171]',
      critical: 'text-[#f87171]',
    };
    return colors[severity] || 'text-gray-400';
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Header />
      <Navigation />
      
      <main className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#10b981] m-0">Analisis Risiko</h2>
            <p className="text-sm text-gray-400 mt-1">Identifikasi dan evaluasi risiko dokumen keuangan</p>
          </div>
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981]"
          >
            <option value="2026">Tahun 2026</option>
            <option value="2025">Tahun 2025</option>
            <option value="2024">Tahun 2024</option>
          </select>
        </div>

        {/* Risk Stats */}
        <div className="grid-3" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '20px',
        }}>
          <StatCard label="Risiko Rendah" value={89} color="#10b981" />
          <StatCard label="Risiko Sedang" value={42} color="#60a5fa" />
          <StatCard label="Risiko Tinggi" value={18} color="#f59e0b" />
          <StatCard label="Risiko Kritis" value={7} color="#f87171" />
        </div>

        {/* Risk Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card title="Distribusi Tingkat Risiko" className="lg:col-span-2">
            <div className="space-y-4">
              {[
                { level: 'LOW', label: 'Risiko Rendah', count: 89, percent: 57, color: 'from-[#10b981] to-[#34d399]' },
                { level: 'MEDIUM', label: 'Risiko Sedang', count: 42, percent: 27, color: 'from-[#f59e0b] to-[#fbbf24]' },
                { level: 'HIGH', label: 'Risiko Tinggi', count: 18, percent: 11, color: 'from-[#f87171] to-[#fca5a5]' },
                { level: 'CRITICAL', label: 'Risiko Kritis', count: 7, percent: 5, color: 'from-[#dc2626] to-[#ef4444]' },
              ].map((item) => (
                <div key={item.level} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300 font-medium">{item.label}</span>
                    <span className="text-gray-500">{item.count} dokumen ({item.percent}%)</span>
                  </div>
                  <div className="bg-[#334155] rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-1000`} 
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Skor Risiko Rata-rata">
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-[#10b981] to-[#f59e0b] mb-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">68</div>
                  <div className="text-xs text-white/80">dari 100</div>
                </div>
              </div>
              <p className="text-sm text-gray-400">Skor risiko keseluruhan</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-[#10b981]">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">-12% dari bulan lalu</span>
              </div>
            </div>
          </Card>
        </div>

        {/* High Risk Documents */}
        <Card title="Dokumen Berisiko Tinggi">
          <div className="space-y-4">
            {riskDocuments.map((doc) => (
              <div key={doc.id} className="p-4 bg-[#0f172a] border border-[#334155] rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-gray-500">{doc.documentNumber}</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getRiskBg(doc.riskLevel)} ${getRiskColor(doc.riskLevel)}`}>
                        {doc.riskLevel}
                      </span>
                    </div>
                    <h4 className="text-base font-semibold text-gray-200">{doc.title}</h4>
                    <p className="text-sm text-gray-400">{doc.village} • {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(doc.amount)}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getRiskColor(doc.riskLevel)}`}>{doc.riskScore}</div>
                    <div className="text-xs text-gray-500">Skor Risiko</div>
                  </div>
                </div>

                {/* Risk Factors */}
                <div className="mt-3 pt-3 border-t border-[#334155]">
                  <p className="text-xs font-semibold text-gray-400 mb-2">Faktor Risiko:</p>
                  <div className="space-y-1.5">
                    {doc.factors.map((factor, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <span className={`w-1.5 h-1.5 rounded-full ${getSeverityColor(factor.severity)} bg-current`}></span>
                        <span className="text-gray-300 flex-1">{factor.label}</span>
                        <span className={`text-xs font-semibold ${getSeverityColor(factor.severity)}`}>
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
        <div className="mt-6 p-5 bg-gradient-to-r from-[#1e3a5f20] to-[#0e4d3a20] border border-[#10b98140] rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-[#10b981]" />
            <h3 className="text-sm font-bold text-[#10b981]">Rekomendasi Sistem</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3 p-3 bg-[#0f172a] rounded-lg">
              <span className="text-[#f59e0b] text-lg">⚠</span>
              <p>Perhatikan dokumen dengan risiko kritis - lakukan audit mendalam sebelum persetujuan</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[#0f172a] rounded-lg">
              <span className="text-[#10b981] text-lg">✓</span>
              <p>89 dokumen dengan risiko rendah dapat diproses dengan verifikasi standar</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[#0f172a] rounded-lg">
              <span className="text-[#60a5fa] text-lg">ℹ</span>
              <p>Pola risiko meningkat pada dokumen pembangunan - pertimbangkan review berkala</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
