'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const getProgressColor = (completeness: number) => {
    if (completeness >= 80) return '#10b981';
    if (completeness >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const statusVariants: Record<string, { variant: 'ok' | 'warn' | 'err' | 'info'; label: string }> = {
    APPROVED: { variant: 'ok', label: 'APPROVED' },
    IN_REVIEW: { variant: 'info', label: 'IN REVIEW' },
    PENDING: { variant: 'warn', label: 'PENDING' },
    REJECTED: { variant: 'err', label: 'REJECTED' },
    REVISE: { variant: 'warn', label: 'REVISE' },
  };

  // Shared input styles
  const inputStyle: React.CSSProperties = {
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '0.875rem',
    color: '#e5e7eb',
    outline: 'none',
    transition: 'border-color 0.15s',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Header />
      <Navigation />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981', margin: 0 }}>Verifikasi Dokumen</h2>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '4px', marginBottom: 0 }}>Periksa kelengkapan dan keabsahan dokumen</p>
        </div>

        {/* Search & Filter */}
        <Card style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <div style={{ position: 'relative' }}>
                <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#6b7280' }} />
                <input
                  type="text"
                  placeholder="Cari no. dokumen, judul, atau desa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ ...inputStyle, width: '100%', paddingLeft: '40px' }}
                />
              </div>
            </div>
            <select style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value="">Semua Status</option>
              <option value="PENDING">Pending</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <select style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value="">Semua Tipe</option>
              <option value="PENGADAAN">Pengadaan</option>
              <option value="PEMBELIAN">Pembelian</option>
              <option value="PEMBANGUNAN">Pembangunan</option>
            </select>
          </div>
        </Card>

        {/* Documents List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mockDocuments.map((doc) => {
            const status = statusVariants[doc.status] || { variant: 'info' as const, label: doc.status };
            const isExpanded = expandedDoc === doc.id;

            return (
              <Card key={doc.id} style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#6b7280' }}>{doc.documentNumber}</span>
                      <span style={{
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        background: status.variant === 'ok' ? '#064e3b' : 
                                   status.variant === 'warn' ? '#451a03' :
                                   status.variant === 'err' ? '#4c0519' : '#1e3a5f',
                        color: status.variant === 'ok' ? '#10b981' : 
                              status.variant === 'warn' ? '#f59e0b' :
                              status.variant === 'err' ? '#f87171' : '#60a5fa',
                      }}>{status.label}</span>
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#e5e7eb', marginBottom: '4px', marginTop: 0 }}>{doc.title}</h3>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.875rem', color: '#9ca3af' }}>
                      <span>{doc.village}</span>
                      <span>•</span>
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{formatCurrency(doc.amount)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleExpand(doc.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '4px', display: 'flex', alignItems: 'center' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#e5e7eb')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
                  >
                    {isExpanded ? <ChevronUp style={{ width: '20px', height: '20px' }} /> : <ChevronDown style={{ width: '20px', height: '20px' }} />}
                  </button>
                </div>

                {/* Progress Bar */}
                <div style={{ marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9ca3af', marginBottom: '4px' }}>
                    <span>Kelengkapan Dokumen</span>
                    <span>{doc.completeness}%</span>
                  </div>
                  <div style={{ background: '#334155', borderRadius: '9999px', height: '8px' }}>
                    <div
                      style={{
                        height: '8px',
                        borderRadius: '9999px',
                        background: getProgressColor(doc.completeness),
                        width: `${doc.completeness}%`,
                        transition: 'width 1s',
                      }}
                    />
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #334155' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                      {/* Checklist */}
                      <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#d1d5db', marginBottom: '12px', marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FileCheck style={{ width: '16px', height: '16px', color: '#10b981' }} />
                          Checklist Dokumen
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {checklistItems.map((item) => (
                            <label
                              key={item.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '8px',
                                borderRadius: '8px',
                                background: item.checked ? '#064e3b20' : '#0f172a',
                                cursor: 'pointer',
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={item.checked}
                                style={{ width: '16px', height: '16px', accentColor: '#10b981' }}
                                readOnly
                              />
                              <span style={{ fontSize: '0.875rem', color: '#d1d5db', flex: 1 }}>{item.label}</span>
                              {item.required && !item.checked && (
                                <AlertTriangle style={{ width: '14px', height: '14px', color: '#f59e0b' }} />
                              )}
                              {item.checked && (
                                <CheckCircle style={{ width: '14px', height: '14px', color: '#10b981' }} />
                              )}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Findings & Actions */}
                      <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#d1d5db', marginBottom: '12px', marginTop: 0 }}>Temuan & Catatan</h4>
                        {doc.findings.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                            {doc.findings.map((finding, idx) => (
                              <div key={idx} style={{ padding: '12px', background: '#451a0320', border: '1px solid #f59e0b50', borderRadius: '8px' }}>
                                <p style={{ fontSize: '0.875rem', color: '#d1d5db', margin: 0 }}>{finding}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ padding: '12px', background: '#064e3b20', border: '1px solid #10b98150', borderRadius: '8px', marginBottom: '16px' }}>
                            <p style={{ fontSize: '0.875rem', color: '#10b981', margin: 0 }}>✓ Tidak ada temuan</p>
                          </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', color: '#9ca3af', marginBottom: '6px', fontWeight: 500 }}>Catatan Reviewer</label>
                            <textarea
                              style={{
                                ...inputStyle,
                                width: '100%',
                                resize: 'none',
                                minHeight: '80px',
                                boxSizing: 'border-box',
                              }}
                              placeholder="Tambahkan catatan..."
                            />
                          </div>
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{ flex: 1, padding: '10px 20px', background: '#1e40af', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Eye style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                              Lihat Detail
                            </button>
                            <button style={{ flex: 1, padding: '10px 20px', background: '#10b981', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <CheckCircle style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                              Setujui
                            </button>
                            <button style={{ flex: 1, padding: '10px 20px', background: '#dc2626', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <XCircle style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                              Tolak
                            </button>
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
