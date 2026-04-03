'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';
import { FileText, Plus, Trash2, Eye, Download } from 'lucide-react';

export default function TemplateBuilderPage() {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const templates = [
    {
      id: 1,
      name: 'Berita Acara Serah Terima',
      type: 'berita_acara',
      category: 'Administrasi',
      fields: 12,
      lastModified: '2026-03-15',
    },
    {
      id: 2,
      name: 'Rencana Anggaran Biaya (RAB)',
      type: 'rab',
      category: 'Keuangan',
      fields: 8,
      lastModified: '2026-03-14',
    },
    {
      id: 3,
      name: 'Kwitansi Pembayaran',
      type: 'kwitansi',
      category: 'Keuangan',
      fields: 7,
      lastModified: '2026-03-13',
    },
    {
      id: 4,
      name: 'Surat Pertanggungjawaban (SPJ)',
      type: 'spj',
      category: 'Laporan',
      fields: 15,
      lastModified: '2026-03-12',
    },
    {
      id: 5,
      name: 'Berita Acara Pemeriksaan',
      type: 'pemeriksaan',
      category: 'Administrasi',
      fields: 10,
      lastModified: '2026-03-11',
    },
  ];

  const categories = ['Semua', 'Administrasi', 'Keuangan', 'Laporan'];
  const [filterCategory, setFilterCategory] = useState('Semua');

  const filteredTemplates = filterCategory === 'Semua' 
    ? templates 
    : templates.filter(t => t.category === filterCategory);

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Header />
      <Navigation />

      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981', margin: 0 }}>Template Builder</h2>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>Kelola template dokumen keuangan desa</p>
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
            <Plus style={{ width: '16px', height: '16px' }} />
            Buat Template
          </button>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              style={{
                padding: '8px 16px',
                background: filterCategory === cat ? '#10b981' : '#1e293b',
                color: filterCategory === cat ? '#fff' : '#94a3b8',
                border: '1px solid #334155',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {filteredTemplates.map(template => (
            <Card key={template.id} style={{ cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <FileText style={{ width: '20px', height: '20px', color: '#10b981' }} />
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#e2e8f0', margin: 0 }}>{template.name}</h3>
                  </div>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: '20px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    background: '#1e3a5f',
                    color: '#60a5fa',
                  }}>
                    {template.category}
                  </span>
                </div>
              </div>
              
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '12px' }}>
                <p style={{ margin: '4px 0' }}>📋 {template.fields} fields</p>
                <p style={{ margin: '4px 0' }}>🕒 Terakhir diubah: {template.lastModified}</p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setSelectedTemplate(template)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: 'transparent',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    color: '#60a5fa',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  <Eye style={{ width: '14px', height: '14px' }} />
                  Preview
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: '#10b981',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  <Download style={{ width: '14px', height: '14px' }} />
                  Export PDF
                </button>
                <button
                  style={{
                    padding: '8px 12px',
                    background: 'transparent',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                  }}
                >
                  <Trash2 style={{ width: '14px', height: '14px' }} />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <Card>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <FileText style={{ width: '48px', height: '48px', color: '#64748b', margin: '0 auto 16px' }} />
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Tidak ada template dalam kategori ini</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
