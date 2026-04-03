'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import {
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileCheck,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function VerificationPage() {
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const checklistItems = [
    { id: 1, label: 'Surat Permintaan Pembayaran', checked: true, required: true },
    { id: 2, label: 'Faktur Pajak', checked: true, required: true },
    { id: 3, label: 'Berita Acara Serah Terima', checked: true, required: true },
    { id: 4, label: 'Rincian Anggaran', checked: false, required: true },
    { id: 5, label: 'Dokumentasi Foto', checked: true, required: false },
    { id: 6, label: 'Tanda Terima Pembayaran', checked: false, required: true },
    { id: 7, label: 'Laporan Pelaksanaan', checked: false, required: false },
    { id: 8, label: 'Nota Pembelian', checked: true, required: true },
  ];

  const mockDocuments = [
    { 
      id: '1', 
      documentNumber: 'PKG/001/2026', 
      title: 'Pengadaan Alat Kantor', 
      type: 'PENGADAAN', 
      amount: 45000000, 
      status: 'IN_REVIEW', 
      date: '2026-03-01',
      village: 'Desa Sukamaju',
      submitter: 'Ahmad Sudirman',
      completeness: 75,
      findings: ['Faktur pajak tidak sesuai dengan jumlah', 'Tanda terima belum ditandatangani']
    },
    { 
      id: '2', 
      documentNumber: 'PEM/002/2026', 
      title: 'Pembelian Bahan Bangunan', 
      type: 'PEMBELIAN', 
      amount: 78000000, 
      status: 'PENDING', 
      date: '2026-03-02',
      village: 'Desa Mekar Jaya',
      submitter: 'Budi Santoso',
      completeness: 60,
      findings: ['Rincian anggaran kurang detail']
    },
    { 
      id: '3', 
      documentNumber: 'PBG/003/2026', 
      title: 'Pembangunan Jalan Desa', 
      type: 'PEMBANGUNAN', 
      amount: 250000000, 
      status: 'IN_REVIEW', 
      date: '2026-03-03',
      village: 'Desa Harapan Mulya',
      submitter: 'Eko Prasetyo',
      completeness: 90,
      findings: []
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedDoc(expandedDoc === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Header />
      <Navigation />
      
      <main className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#10b981] m-0">Verifikasi Dokumen</h2>
            <p className="text-sm text-gray-400 mt-1">Periksa kelengkapan dan keabsahan dokumen</p>
          </div>
        </div>

        {/* Search & Filter */}
        <Card className="mb-6">
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Cari no. dokumen, judul, atau desa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0f172a] border border-[#334155] rounded-lg pl-10 pr-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981] transition-colors"
                />
              </div>
            </div>
            <select className="bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981]">
              <option value="">Semua Status</option>
              <option value="PENDING">Pending</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <select className="bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981]">
              <option value="">Semua Tipe</option>
              <option value="PENGADAAN">Pengadaan</option>
              <option value="PEMBELIAN">Pembelian</option>
              <option value="PEMBANGUNAN">Pembangunan</option>
            </select>
          </div>
        </Card>

        {/* Documents List */}
        <div className="space-y-4">
          {mockDocuments.map((doc) => {
            const statusVariants: any = {
              APPROVED: { variant: 'ok' as const, label: 'APPROVED' },
              IN_REVIEW: { variant: 'info' as const, label: 'IN REVIEW' },
              PENDING: { variant: 'warn' as const, label: 'PENDING' },
              REJECTED: { variant: 'err' as const, label: 'REJECTED' },
            };
            const status = statusVariants[doc.status];
            const isExpanded = expandedDoc === doc.id;

            return (
              <Card key={doc.id} className="overflow-hidden">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-gray-500">{doc.documentNumber}</span>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                    <h3 className="text-base font-semibold text-gray-200 mb-1">{doc.title}</h3>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>{doc.village}</span>
                      <span>•</span>
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(doc.amount)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleExpand(doc.id)}
                    className="text-gray-400 hover:text-gray-200"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Kelengkapan Dokumen</span>
                    <span>{doc.completeness}%</span>
                  </div>
                  <div className="bg-[#334155] rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        doc.completeness >= 80 ? 'bg-gradient-to-r from-[#10b981] to-[#34d399]' :
                        doc.completeness >= 60 ? 'bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]' :
                        'bg-gradient-to-r from-[#ef4444] to-[#f87171]'
                      }`}
                      style={{ width: `${doc.completeness}%` }}
                    />
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[#334155]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Checklist */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                          <FileCheck className="w-4 h-4 text-[#10b981]" />
                          Checklist Dokumen
                        </h4>
                        <div className="space-y-2">
                          {checklistItems.map((item) => (
                            <label 
                              key={item.id} 
                              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                                item.checked ? 'bg-[#064e3b20]' : 'bg-[#0f172a]'
                              }`}
                            >
                              <input 
                                type="checkbox" 
                                checked={item.checked}
                                className="w-4 h-4 accent-[#10b981]"
                                readOnly
                              />
                              <span className="text-sm text-gray-300 flex-1">{item.label}</span>
                              {item.required && !item.checked && (
                                <AlertTriangle className="w-3.5 h-3.5 text-[#f59e0b]" />
                              )}
                              {item.checked && (
                                <CheckCircle className="w-3.5 h-3.5 text-[#10b981]" />
                              )}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Findings & Actions */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-300 mb-3">Temuan & Catatan</h4>
                        {doc.findings.length > 0 ? (
                          <div className="space-y-2 mb-4">
                            {doc.findings.map((finding, idx) => (
                              <div key={idx} className="p-3 bg-[#451a0320] border border-[#f59e0b50] rounded-lg">
                                <p className="text-sm text-gray-300">{finding}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-3 bg-[#064e3b20] border border-[#10b98150] rounded-lg mb-4">
                            <p className="text-sm text-[#10b981]">✓ Tidak ada temuan</p>
                          </div>
                        )}

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-gray-400 mb-1.5 font-medium">Catatan Reviewer</label>
                            <textarea 
                              className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981] transition-colors resize-none h-20"
                              placeholder="Tambahkan catatan..."
                            />
                          </div>
                          <div className="flex gap-3">
                            <Button variant="secondary" className="flex-1">
                              <Eye className="w-4 h-4 inline mr-1" />
                              Lihat Detail
                            </Button>
                            <Button variant="primary" className="flex-1">
                              <CheckCircle className="w-4 h-4 inline mr-1" />
                              Setujui
                            </Button>
                            <Button variant="danger" className="flex-1">
                              <XCircle className="w-4 h-4 inline mr-1" />
                              Tolak
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
