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

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Header />
      <Navigation />
      
      <main className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#10b981] m-0">Laporan & Output</h2>
            <p className="text-sm text-gray-400 mt-1">Generate dan cetak laporan verifikasi</p>
          </div>
        </div>

        {/* Report Type Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { id: 'verification', label: 'Laporan Verifikasi', icon: FileText },
            { id: 'analysis', label: 'Laporan Analisis', icon: Eye },
            { id: 'summary', label: 'Laporan Ringkasan', icon: Printer },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setReportType(type.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${
                reportType === type.id
                  ? 'border-[#10b981] bg-[#052e16]'
                  : 'border-[#334155] bg-[#0f172a] hover:border-[#10b981]'
              }`}
            >
              <type.icon className="w-6 h-6 text-[#10b981]" />
              <span className="text-sm font-semibold text-gray-200">{type.label}</span>
            </button>
          ))}
        </div>

        {/* Reports List */}
        <Card title="Daftar Laporan Tersedia">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#0f172a]">
                  <th className="px-3 py-2.5 text-left text-[#60a5fa] font-semibold border-b-2 border-[#334155]">Judul Laporan</th>
                  <th className="px-3 py-2.5 text-left text-[#60a5fa] font-semibold border-b-2 border-[#334155]">Tipe</th>
                  <th className="px-3 py-2.5 text-left text-[#60a5fa] font-semibold border-b-2 border-[#334155]">Tanggal</th>
                  <th className="px-3 py-2.5 text-center text-[#60a5fa] font-semibold border-b-2 border-[#334155]">Dokumen</th>
                  <th className="px-3 py-2.5 text-center text-[#60a5fa] font-semibold border-b-2 border-[#334155]">Status</th>
                  <th className="px-3 py-2.5 text-center text-[#60a5fa] font-semibold border-b-2 border-[#334155]">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mockReports.map((report) => (
                  <tr key={report.id} className="border-b border-[#1e293b] hover:bg-[#0f172a40]">
                    <td className="px-3 py-2.5 text-gray-300 font-medium">{report.title}</td>
                    <td className="px-3 py-2.5 text-gray-300">
                      <span className="px-2 py-1 bg-[#1e3a5f] text-[#60a5fa] rounded text-xs font-semibold capitalize">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-gray-400">{report.date}</td>
                    <td className="px-3 py-2.5 text-gray-300 text-center">{report.documents}</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        report.status === 'Selesai' 
                          ? 'bg-[#064e3b] text-[#10b981]' 
                          : 'bg-[#451a03] text-[#f59e0b]'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => setSelectedReport(report.id === selectedReport ? null : report.id)}
                          className="text-[#60a5fa] hover:text-[#3b82f6]"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-[#10b981] hover:text-[#059669]" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                        <button onClick={handlePrint} className="text-[#f59e0b] hover:text-[#d97706]" title="Print">
                          <Printer className="w-4 h-4" />
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
          <Card title="Preview Laporan" className="mt-6">
            <div className="bg-white text-gray-900 rounded-lg p-8 font-sans">
              {/* Kop Surat */}
              <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
                <h2 className="text-lg font-bold uppercase m-0">PEMERINTAH KABUPATEN EXAMPLE</h2>
                <h3 className="text-base font-bold uppercase m-0">KECAMATAN CONTOH</h3>
                <h3 className="text-base font-bold uppercase m-0">DESA SUKAMAJU</h3>
                <p className="text-xs text-gray-600 mt-2">Jl. Contoh No. 123, Kecamatan Contoh, Kabupaten Example</p>
              </div>

              {/* Judul Laporan */}
              <div className="text-center mb-6">
                <h2 className="text-base font-bold uppercase m-0">BERITA ACARA VERIFIKASI</h2>
                <h3 className="text-sm text-gray-600 mt-1">Pertanggungjawaban Keuangan Desa Tahun Anggaran 2026</h3>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="text-sm leading-relaxed mb-4">
                  Yang bertanda tangan di bawah ini, Tim Verifikasi Keuangan Desa menerangkan bahwa setelah melakukan 
                  pemeriksaan terhadap dokumen pertanggungjawaban keuangan desa dengan rincian sebagai berikut:
                </p>

                <table className="w-full border-collapse text-sm mb-4">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 px-3 py-2 text-center font-bold">No</th>
                      <th className="border border-gray-400 px-3 py-2 text-center font-bold">No. Dokumen</th>
                      <th className="border border-gray-400 px-3 py-2 text-center font-bold">Judul</th>
                      <th className="border border-gray-400 px-3 py-2 text-center font-bold">Jumlah</th>
                      <th className="border border-gray-400 px-3 py-2 text-center font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 text-center">1</td>
                      <td className="border border-gray-400 px-3 py-2 font-mono text-xs">PKG/001/2026</td>
                      <td className="border border-gray-400 px-3 py-2">Pengadaan Alat Kantor</td>
                      <td className="border border-gray-400 px-3 py-2 text-right">Rp 45.000.000</td>
                      <td className="border border-gray-400 px-3 py-2 text-center text-green-700 font-bold">✓ Sesuai</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-400 px-3 py-2 text-center">2</td>
                      <td className="border border-gray-400 px-3 py-2 font-mono text-xs">PEM/002/2026</td>
                      <td className="border border-gray-400 px-3 py-2">Pembelian Bahan Bangunan</td>
                      <td className="border border-gray-400 px-3 py-2 text-right">Rp 78.000.000</td>
                      <td className="border border-gray-400 px-3 py-2 text-center text-green-700 font-bold">✓ Sesuai</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 text-center">3</td>
                      <td className="border border-gray-400 px-3 py-2 font-mono text-xs">PBG/003/2026</td>
                      <td className="border border-gray-400 px-3 py-2">Pembangunan Jalan Desa</td>
                      <td className="border border-gray-400 px-3 py-2 text-right">Rp 250.000.000</td>
                      <td className="border border-gray-400 px-3 py-2 text-center text-yellow-700 font-bold">⚠ Perlu Klarifikasi</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-200 font-bold">
                      <td colSpan={3} className="border border-gray-400 px-3 py-2 text-right">Total</td>
                      <td className="border border-gray-400 px-3 py-2 text-right">Rp 373.000.000</td>
                      <td className="border border-gray-400 px-3 py-2"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Tanda Tangan */}
              <div className="grid grid-cols-2 gap-8 mt-8">
                <div className="text-center">
                  <p className="text-sm font-bold mb-1">Mengetahui,</p>
                  <p className="text-sm font-bold mb-16">Kepala Desa</p>
                  <p className="text-sm font-bold underline">AHMAD SUDIRMAN</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold mb-1">Contoh, 15 Maret 2026</p>
                  <p className="text-sm font-bold mb-16">Tim Verifikasi</p>
                  <p className="text-sm font-bold underline">BUDI SANTOSO</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setSelectedReport(null)}>
                Tutup
              </Button>
              <Button onClick={handlePrint}>
                <Printer className="w-4 h-4 inline mr-2" />
                Cetak Laporan
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
