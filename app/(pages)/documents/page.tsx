'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import DataTable from '@/components/DataTable';
import { Upload, Eye, Trash2, FileText, CheckCircle, X } from 'lucide-react';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    minimumFractionDigits: 0 
  }).format(value);
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
};

export default function DocumentsPage() {
  const [showForm, setShowForm] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{id: string; name: string; size: number}>>([]);
  const [dragActive, setDragActive] = useState(false);

  const mockDocuments = [
    { id: 1, documentNumber: 'PKG/001/2026', title: 'Pengadaan Alat Kantor', type: 'PENGADAAN', amount: 45000000, status: 'APPROVED', date: '2026-03-01', files: 3 },
    { id: 2, documentNumber: 'PEM/002/2026', title: 'Pembelian Bahan Bangunan', type: 'PEMBELIAN', amount: 78000000, status: 'IN_REVIEW', date: '2026-03-02', files: 5 },
    { id: 3, documentNumber: 'PBG/003/2026', title: 'Pembangunan Jalan Desa', type: 'PEMBANGUNAN', amount: 250000000, status: 'PENDING', date: '2026-03-03', files: 8 },
    { id: 4, documentNumber: 'PRB/004/2026', title: 'Perbaikan Jembatan', type: 'PERBAIKAN', amount: 125000000, status: 'REVISE', date: '2026-03-04', files: 4 },
    { id: 5, documentNumber: 'OPS/005/2026', title: 'Operasional Kantor Desa', type: 'OPERASIONAL', amount: 15000000, status: 'APPROVED', date: '2026-03-05', files: 2 },
    { id: 6, documentNumber: 'HIB/006/2026', title: 'Hibah UMKM', type: 'HIBAH', amount: 35000000, status: 'APPROVED', date: '2026-03-06', files: 3 },
    { id: 7, documentNumber: 'BSO/007/2026', title: 'Bantuan Sosial Tunai', type: 'BANTUAN_SOSIAL', amount: 95000000, status: 'IN_REVIEW', date: '2026-03-07', files: 6 },
  ];

  const columns = [
    { key: 'documentNumber', label: 'No. Dokumen', width: '15%' },
    { key: 'title', label: 'Judul' },
    { key: 'type', label: 'Tipe', width: '12%' },
    { 
      key: 'amount', 
      label: 'Jumlah', 
      width: '15%',
      render: (value: number) => <span style={{ color: '#e2e8f0' }}>{formatCurrency(value)}</span>
    },
    { key: 'files', label: 'File', width: '8%', render: (value: number) => <span style={{ textAlign: 'center', display: 'block' }}>{value}</span> },
    { 
      key: 'status', 
      label: 'Status', 
      width: '12%',
      render: (value: string) => {
        const variants: any = { APPROVED: 'ok', IN_REVIEW: 'info', PENDING: 'warn', REVISE: 'warn' };
        return <Badge variant={variants[value]}>{value}</Badge>;
      }
    },
    { 
      key: 'actions', 
      label: 'Aksi', 
      width: '10%',
      render: (_: any, row: any) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#60a5fa' }} title="Lihat">
            <Eye className="w-4 h-4" style={{ width: '16px', height: '16px' }} />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f87171' }} title="Hapus">
            <Trash2 className="w-4 h-4" style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      )
    },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map(f => ({ id: Math.random().toString(36), name: f.name, size: f.size }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Header />
      <Navigation />
      
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981', margin: 0 }}>Manajemen Dokumen</h2>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>Kelola dokumen keuangan desa</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '10px 20px',
              background: '#10b981',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Upload style={{ width: '16px', height: '16px' }} />
            Tambah Dokumen
          </button>
        </div>

        {/* Upload Form */}
        {showForm && (
          <Card title="Tambah Dokumen Baru" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.82rem', marginBottom: '6px', fontWeight: 500 }}>No. Dokumen</label>
                <input type="text" placeholder="PKG/001/2026" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px 12px', color: '#e2e8f0', fontSize: '0.85rem', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.82rem', marginBottom: '6px', fontWeight: 500 }}>Judul Dokumen</label>
                <input type="text" placeholder="Pengadaan Alat Kantor" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px 12px', color: '#e2e8f0', fontSize: '0.85rem', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.82rem', marginBottom: '6px', fontWeight: 500 }}>Tipe Dokumen</label>
                <select style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px 12px', color: '#e2e8f0', fontSize: '0.85rem', outline: 'none' }}>
                  <option>PENGADAAN</option>
                  <option>PEMBELIAN</option>
                  <option>PEMBANGUNAN</option>
                  <option>PERBAIKAN</option>
                  <option>OPERASIONAL</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.82rem', marginBottom: '6px', fontWeight: 500 }}>Jumlah (Rp)</label>
                <input type="text" placeholder="45000000" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px 12px', color: '#e2e8f0', fontSize: '0.85rem', outline: 'none' }} />
              </div>
            </div>

            {/* Upload Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragActive ? '#10b981' : '#334155'}`,
                borderRadius: '12px',
                padding: '32px',
                textAlign: 'center',
                cursor: 'pointer',
                background: dragActive ? '#064e3b20' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              <Upload style={{ width: '40px', height: '40px', color: '#10b981', margin: '0 auto 12px' }} />
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '4px' }}>Drag & drop file di sini atau klik untuk browse</p>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>PDF, JPG, PNG, DOCX (Max. 10MB)</p>
            </div>

            {uploadedFiles.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, marginBottom: '8px' }}>File Terupload:</p>
                {uploadedFiles.map(f => (
                  <div key={f.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#0f172a', borderRadius: '8px', marginBottom: '8px', border: '1px solid #334155' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText style={{ width: '16px', height: '16px', color: '#60a5fa' }} />
                      <span style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>{f.name}</span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{formatFileSize(f.size)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle style={{ width: '14px', height: '14px', color: '#10b981' }} />
                      <button onClick={() => setUploadedFiles(prev => prev.filter(x => x.id !== f.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                        <X style={{ width: '14px', height: '14px' }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button onClick={() => setShowForm(false)} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #334155', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>Batal</button>
              <button style={{ padding: '10px 20px', background: '#10b981', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>Simpan Dokumen</button>
            </div>
          </Card>
        )}

        {/* Documents Table */}
        <Card title="Daftar Dokumen">
          <DataTable columns={columns} data={mockDocuments} />
        </Card>
      </div>
    </div>
  );
}
