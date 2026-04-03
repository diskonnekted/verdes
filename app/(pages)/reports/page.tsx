'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Printer, Download, FileText, Eye } from 'lucide-react';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [reportType, setReportType] = useState('verification');

  const handlePrint = () => {
    window.print();
  };

  const mockReports = [
    { id: 1, title: 'Laporan Verifikasi Q1 2026', type: 'verification', date: '2026-03-15', documents: 45, status: 'Selesai' },
    { id: 2, title: 'Laporan Pengadaan Barang', type: 'pengadaan', date: '2026-03-10', documents: 23, status: 'Selesai' },
    { id: 3, title: 'Laporan Pembangunan Desa', type: 'pembangunan', date: '2026-03-08', documents: 18, status: 'Draft' },
    { id: 4, title: 'Laporan Analisis Risiko', type: 'analysis', date: '2026-03-05', documents: 156, status: 'Selesai' },
    { id: 5, title: 'Laporan Bantuan Sosial', type: 'bantuan', date: '2026-03-01', documents: 32, status: 'Selesai' },
  ];

  const containerStyle = { maxWidth: '1200px', margin: '0 auto', padding: '24px' };

  const reportTypes = [
    { id: 'verification', label: 'Laporan Verifikasi', icon: FileText },
    { id: 'analysis', label: 'Laporan Analisis', icon: Eye },
    { id: 'summary', label: 'Laporan Ringkasan', icon: Printer },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Header />
      <Navigation />

      <main style={containerStyle}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ color: '#10b981', fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>Laporan & Output</h2>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '4px', marginBottom: 0 }}>Generate dan cetak laporan verifikasi</p>
        </div>

        {/* Report Type Selection */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {reportTypes.map((type) => {
            const selected = reportType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setReportType(type.id)}
                style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: `2px solid ${selected ? '#10b981' : '#334155'}`,
                  background: selected ? '#052e16' : '#0f172a',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s',
                }}
              >
                <type.icon style={{ width: '24px', height: '24px', color: '#10b981' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#e5e7eb' }}>{type.label}</span>
              </button>
            );
          })}
        </div>

        {/* Reports List */}
        <Card title="Daftar Laporan Tersedia">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#0f172a' }}>
                  <th style={{ padding: '10px 12px', textAlign: 'left', color: '#60a5fa', fontWeight: '600', borderBottom: '2px solid #334155' }}>Judul Laporan</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', color: '#60a5fa', fontWeight: '600', borderBottom: '2px solid #334155' }}>Tipe</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', color: '#60a5fa', fontWeight: '600', borderBottom: '2px solid #334155' }}>Tanggal</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center', color: '#60a5fa', fontWeight: '600', borderBottom: '2px solid #334155' }}>Dokumen</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center', color: '#60a5fa', fontWeight: '600', borderBottom: '2px solid #334155' }}>Status</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center', color: '#60a5fa', fontWeight: '600', borderBottom: '2px solid #334155' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mockReports.map((report) => (
                  <tr key={report.id} style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '10px 12px', color: '#d1d5db', fontWeight: '500' }}>{report.title}</td>
                    <td style={{ padding: '10px 12px', color: '#d1d5db' }}>
                      <span style={{ padding: '4px 8px', background: '#1e3a5f', color: '#60a5fa', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'capitalize' }}>
                        {report.type}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', color: '#9ca3af' }}>{report.date}</td>
                    <td style={{ padding: '10px 12px', color: '#d1d5db', textAlign: 'center' }}>{report.documents}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background: report.status === 'Selesai' ? '#064e3b' : '#451a03',
                        color: report.status === 'Selesai' ? '#10b981' : '#f59e0b',
                      }}>
                        {report.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        <button
                          onClick={() => setSelectedReport(report.id === selectedReport ? null : report.id)}
                          style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', padding: '4px' }}
                          title="Preview"
                        >
                          <Eye style={{ width: '16px', height: '16px' }} />
                        </button>
                        <button
                          style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', padding: '4px' }}
                          title="Download"
                        >
                          <Download style={{ width: '16px', height: '16px' }} />
                        </button>
                        <button
                          onClick={handlePrint}
                          style={{ background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer', padding: '4px' }}
                          title="Print"
                        >
                          <Printer style={{ width: '16px', height: '16px' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Report Preview */}
        {selectedReport && (
          <div style={{ marginTop: '24px' }}>
            <Card title="Preview Laporan">
              <div style={{ background: '#ffffff', color: '#111827', borderRadius: '8px', padding: '32px', fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif' }}>
                {/* Kop Surat */}
                <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '2px solid #1f2937', paddingBottom: '16px' }}>
                  <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>PEMERINTAH KABUPATEN EXAMPLE</h2>
                  <h3 style={{ fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>KECAMATAN CONTOH</h3>
                  <h3 style={{ fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>DESA SUKAMAJU</h3>
                  <p style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '8px', marginBottom: 0 }}>Jl. Contoh No. 123, Kecamatan Contoh, Kabupaten Example</p>
                </div>

                {/* Judul Laporan */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>BERITA ACARA VERIFIKASI</h2>
                  <h3 style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '4px', marginBottom: 0 }}>Pertanggungjawaban Keuangan Desa Tahun Anggaran 2026</h3>
                </div>

                {/* Content */}
                <div style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '16px' }}>
                    Yang bertanda tangan di bawah ini, Tim Verifikasi Keuangan Desa menerangkan bahwa setelah melakukan
                    pemeriksaan terhadap dokumen pertanggungjawaban keuangan desa dengan rincian sebagai berikut:
                  </p>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', marginBottom: '16px' }}>
                    <thead>
                      <tr style={{ background: '#e5e7eb' }}>
                        <th style={{ border: '1px solid #9ca3af', padding: '8px 12px', textAlign: 'center', fontWeight: 'bold' }}>No</th>
                        <th style={{ border: '1px solid #9ca3af', padding: '8px 12px', textAlign: 'center', fontWeight: 'bold' }}>No. Dokumen</th>
                        <th style={{ border: '1px solid #9ca3af', padding: '8px 12px', textAlign: 'center', fontWeight: 'bold' }}>Judul</th>
                        <th style={{ border: '1px solid #9ca3af', padding: '8px 12px', textAlign: 'center', fontWeight: 'bold' }}>Jumlah</th>
                        <th style={{ border: '1px solid #9ca3af', padding: '8px 12px', textAlign: 'center', fontWeight: 'bold' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px', textAlign: 'center' }}>1</td>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px', fontFamily: 'ui-monospace, monospace', fontSize: '0.75rem' }}>PKG/001/2026</td>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px' }}>Pengadaan Alat Kantor</td>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px', textAlign: 'right' }}>Rp 45.000.000</td>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px', textAlign: 'center', color: '#15803d', fontWeight: 'bold' }}>&#10003; Sesuai</td>
                      </tr>
                      <tr style={{ background: '#f9fafb' }}>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px', textAlign: 'center' }}>2</td>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px', fontFamily: 'ui-monospace, monospace', fontSize: '0.75rem' }}>PEM/002/2026</td>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px' }}>Pembelian Bahan Bangunan</td>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px', textAlign: 'right' }}>Rp 78.000.000</td>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px', textAlign: 'center', color: '#15803d', fontWeight: 'bold' }}>&#10003; Sesuai</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px', textAlign: 'center' }}>3</td>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px', fontFamily: 'ui-monospace, monospace', fontSize: '0.75rem' }}>PBG/003/2026</td>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px' }}>Pembangunan Jalan Desa</td>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px', textAlign: 'right' }}>Rp 250.000.000</td>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px', textAlign: 'center', color: '#a16207', fontWeight: 'bold' }}>&#9888; Perlu Klarifikasi</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr style={{ background: '#e5e7eb', fontWeight: 'bold' }}>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px', textAlign: 'right' }} colSpan={3}>Total</td>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px', textAlign: 'right' }}>Rp 373.000.000</td>
                        <td style={{ border: '1px solid #9ca3af', padding: '8px 12px' }}></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Tanda Tangan */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '32px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '4px' }}>Mengetahui,</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '64px' }}>Kepala Desa</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 'bold', textDecoration: 'underline' }}>AHMAD SUDIRMAN</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '4px' }}>Contoh, 15 Maret 2026</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '64px' }}>Tim Verifikasi</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 'bold', textDecoration: 'underline' }}>BUDI SANTOSO</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <Button variant="outline" onClick={() => setSelectedReport(null)}>
                  Tutup
                </Button>
                <Button onClick={handlePrint}>
                  <Printer style={{ width: '16px', height: '16px', display: 'inline', marginRight: '8px' }} />
                  Cetak Laporan
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
