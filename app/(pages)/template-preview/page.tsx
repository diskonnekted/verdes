'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';
import { ArrowLeft, Download, Eye, FileText } from 'lucide-react';

// PDF Preview Component using simple HTML/CSS
const PDFPreview = ({ data }: { data: any }) => (
  <div style={{
    background: '#fff',
    color: '#000',
    fontFamily: 'Times New Roman, serif',
    padding: '40px',
    minHeight: '800px',
    fontSize: '12px',
    lineHeight: 1.6,
  }}>
    {/* Kop Surat */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      borderBottom: '3px solid #000',
      paddingBottom: '10px',
      marginBottom: '20px',
    }}>
      <div style={{ width: '80px', height: '80px', marginRight: '15px' }}>
        <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '3px' }}>PEMERINTAH KABUPATEN BANJARNEGARA</div>
        <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '3px' }}>KECAMATAN {(data.kecamatan || 'BANJARMANGU').toUpperCase()}</div>
        <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '3px' }}>DESA {(data.namaDesa || 'SIJENGUNG').toUpperCase()}</div>
        <div style={{ fontSize: '10px' }}>{data.alamat || 'Kabupaten Banjarnegara, Jawa Tengah'}</div>
      </div>
    </div>

    {/* Judul */}
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <div style={{ fontWeight: 'bold', fontSize: '14px', textDecoration: 'underline', marginBottom: '5px' }}>
        BERITA ACARA SERAH TERIMA
      </div>
      <div style={{ fontSize: '11px' }}>
        Nomor: {data.nomorDokumen || '001/BA/2026'}
      </div>
    </div>

    {/* Content */}
    <div style={{ marginBottom: '15px' }}>
      <p>
        Pada hari ini <strong>{data.hari || 'Senin'}</strong>, tanggal <strong>{data.tanggal || '15'}</strong> bulan <strong>{data.bulan || 'Maret'}</strong> tahun <strong>{data.tahun || '2026'}</strong>, telah dilaksanakan serah terima:
      </p>
    </div>

    <div style={{ marginBottom: '15px' }}>
      <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>A. PIHAK PERTAMA (Yang Menyerahkan):</p>
      <p style={{ marginLeft: '20px' }}>Nama: {data.pihakPertamaNama || 'Ahmad Sudirman'}</p>
      <p style={{ marginLeft: '20px' }}>Jabatan: {data.pihakPertamaJabatan || 'Kepala Desa'}</p>
    </div>

    <div style={{ marginBottom: '15px' }}>
      <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>B. PIHAK KEDUA (Yang Menerima):</p>
      <p style={{ marginLeft: '20px' }}>Nama: {data.pihakKeduaNama || 'Budi Santoso'}</p>
      <p style={{ marginLeft: '20px' }}>Jabatan: {data.pihakKeduaJabatan || 'Sekretaris Desa'}</p>
    </div>

    <div style={{ marginBottom: '20px' }}>
      <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>C. BARANG/JASA YANG DISERAHKAN:</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
        <thead>
          <tr style={{ backgroundColor: '#e5e5e5' }}>
            <th style={{ border: '1px solid #000', padding: '6px', fontSize: '11px', width: '5%' }}>No</th>
            <th style={{ border: '1px solid #000', padding: '6px', fontSize: '11px' }}>Uraian Barang/Jasa</th>
            <th style={{ border: '1px solid #000', padding: '6px', fontSize: '11px', width: '15%' }}>Volume</th>
            <th style={{ border: '1px solid #000', padding: '6px', fontSize: '11px', width: '25%' }}>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {(data.items || [
            { uraian: 'Komputer PC', volume: '2 Unit', keterangan: 'Untuk kantor desa' },
            { uraian: 'Printer LaserJet', volume: '1 Unit', keterangan: 'Untuk pelayanan' },
            { uraian: 'Meja Kantor', volume: '5 Unit', keterangan: 'Untuk ruang pelayanan' },
          ]).map((item: any, i: number) => (
            <tr key={i}>
              <td style={{ border: '1px solid #000', padding: '5px', fontSize: '11px', textAlign: 'center' }}>{i + 1}</td>
              <td style={{ border: '1px solid #000', padding: '5px', fontSize: '11px' }}>{item.uraian}</td>
              <td style={{ border: '1px solid #000', padding: '5px', fontSize: '11px' }}>{item.volume}</td>
              <td style={{ border: '1px solid #000', padding: '5px', fontSize: '11px' }}>{item.keterangan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div style={{ marginBottom: '30px' }}>
      <p>
        Demikian berita acara serah terima ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.
      </p>
    </div>

    {/* Tanda Tangan */}
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
      <div style={{ width: '40%', textAlign: 'center' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '60px' }}>PIHAK PERTAMA</div>
        <div style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{data.pihakPertamaNama || 'Ahmad Sudirman'}</div>
        <div style={{ fontSize: '10px' }}>NIP. 198001012000011001</div>
      </div>
      <div style={{ width: '40%', textAlign: 'center' }}>
        <div style={{ marginBottom: '10px' }}>{data.tempat || 'Sijenggung'}, {data.tanggal || '15'} {data.bulan || 'Maret'} {data.tahun || '2026'}</div>
        <div style={{ fontWeight: 'bold', marginBottom: '60px' }}>PIHAK KEDUA</div>
        <div style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{data.pihakKeduaNama || 'Budi Santoso'}</div>
        <div style={{ fontSize: '10px' }}>NIP. 198505152005011002</div>
      </div>
    </div>

    {/* Footer */}
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '40px',
      right: '40px',
      textAlign: 'center',
      fontSize: '9px',
      color: '#666',
    }}>
      Dokumen ini dicetak oleh Sistem Verifikasi Keuangan Desa
    </div>
  </div>
);

export default function TemplatePreviewPage() {
  const [activeTab, setActiveTab] = useState('templates');
  const [formData, setFormData] = useState({
    namaDesa: 'Sijenggung',
    kecamatan: 'Banjarmangu',
    alamat: 'Kabupaten Banjarnegara, Jawa Tengah',
    nomorDokumen: '001/BA/2026',
    hari: 'Senin',
    tanggal: '15',
    bulan: 'Maret',
    tahun: '2026',
    tempat: 'Sijenggung',
    pihakPertamaNama: 'Ahmad Sudirman',
    pihakPertamaJabatan: 'Kepala Desa',
    pihakKeduaNama: 'Budi Santoso',
    pihakKeduaJabatan: 'Sekretaris Desa',
    items: [
      { uraian: 'Komputer PC', volume: '2 Unit', keterangan: 'Untuk kantor desa' },
      { uraian: 'Printer LaserJet', volume: '1 Unit', keterangan: 'Untuk pelayanan' },
      { uraian: 'Meja Kantor', volume: '5 Unit', keterangan: 'Untuk ruang pelayanan' },
    ],
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Header />
      <Navigation />

      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => window.location.href = '/templates'}
              style={{
                padding: '8px 12px',
                background: 'transparent',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <ArrowLeft style={{ width: '16px', height: '16px' }} />
              Kembali
            </button>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981', margin: 0 }}>Preview Template</h2>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>Berita Acara Serah Terima</p>
            </div>
          </div>
          
          <button
            onClick={handlePrint}
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
            <Download style={{ width: '16px', height: '16px' }} />
            Cetak / Simpan PDF
          </button>
        </div>

        {/* Content */}
        <div className="print-content" style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '20px' }}>
          {/* Form Input - No Print */}
          <div className="no-print">
            <Card style={{ maxHeight: '700px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#10b981', marginBottom: '16px', marginTop: 0 }}>
              <FileText style={{ width: '16px', height: '16px', display: 'inline', marginRight: '8px' }} />
              Input Data Dokumen
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Identitas Desa */}
              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '4px', fontWeight: 600 }}>Nama Desa</label>
                <input
                  type="text"
                  value={formData.namaDesa}
                  onChange={(e) => handleInputChange('namaDesa', e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    color: '#e2e8f0',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '4px', fontWeight: 600 }}>Kecamatan</label>
                <input
                  type="text"
                  value={formData.kecamatan}
                  onChange={(e) => handleInputChange('kecamatan', e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    color: '#e2e8f0',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '4px', fontWeight: 600 }}>Nomor Dokumen</label>
                <input
                  type="text"
                  value={formData.nomorDokumen}
                  onChange={(e) => handleInputChange('nomorDokumen', e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    color: '#e2e8f0',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem', marginBottom: '4px', fontWeight: 600 }}>Hari</label>
                  <input
                    type="text"
                    value={formData.hari}
                    onChange={(e) => handleInputChange('hari', e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '6px',
                      padding: '8px 10px',
                      color: '#e2e8f0',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem', marginBottom: '4px', fontWeight: 600 }}>Tanggal</label>
                  <input
                    type="text"
                    value={formData.tanggal}
                    onChange={(e) => handleInputChange('tanggal', e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '6px',
                      padding: '8px 10px',
                      color: '#e2e8f0',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem', marginBottom: '4px', fontWeight: 600 }}>Bulan</label>
                  <input
                    type="text"
                    value={formData.bulan}
                    onChange={(e) => handleInputChange('bulan', e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '6px',
                      padding: '8px 10px',
                      color: '#e2e8f0',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Pihak Pertama */}
              <div style={{ borderTop: '1px solid #334155', paddingTop: '12px' }}>
                <label style={{ display: 'block', color: '#10b981', fontSize: '0.8rem', marginBottom: '8px', fontWeight: 600 }}>Pihak Pertama (Penyerah)</label>
                <input
                  type="text"
                  value={formData.pihakPertamaNama}
                  onChange={(e) => handleInputChange('pihakPertamaNama', e.target.value)}
                  placeholder="Nama"
                  style={{
                    width: '100%',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    color: '#e2e8f0',
                    fontSize: '0.85rem',
                    outline: 'none',
                    marginBottom: '8px',
                  }}
                />
                <input
                  type="text"
                  value={formData.pihakPertamaJabatan}
                  onChange={(e) => handleInputChange('pihakPertamaJabatan', e.target.value)}
                  placeholder="Jabatan"
                  style={{
                    width: '100%',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    color: '#e2e8f0',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Pihak Kedua */}
              <div style={{ borderTop: '1px solid #334155', paddingTop: '12px' }}>
                <label style={{ display: 'block', color: '#10b981', fontSize: '0.8rem', marginBottom: '8px', fontWeight: 600 }}>Pihak Kedua (Penerima)</label>
                <input
                  type="text"
                  value={formData.pihakKeduaNama}
                  onChange={(e) => handleInputChange('pihakKeduaNama', e.target.value)}
                  placeholder="Nama"
                  style={{
                    width: '100%',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    color: '#e2e8f0',
                    fontSize: '0.85rem',
                    outline: 'none',
                    marginBottom: '8px',
                  }}
                />
                <input
                  type="text"
                  value={formData.pihakKeduaJabatan}
                  onChange={(e) => handleInputChange('pihakKeduaJabatan', e.target.value)}
                  placeholder="Jabatan"
                  style={{
                    width: '100%',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    color: '#e2e8f0',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Items */}
              <div style={{ borderTop: '1px solid #334155', paddingTop: '12px' }}>
                <label style={{ display: 'block', color: '#10b981', fontSize: '0.8rem', marginBottom: '8px', fontWeight: 600 }}>Barang/Jasa</label>
                {formData.items.map((item: any, index: number) => (
                  <div key={index} style={{ marginBottom: '8px', padding: '8px', background: '#0f172a', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: 600 }}>#{index + 1}</span>
                      <input
                        type="text"
                        value={item.uraian}
                        onChange={(e) => handleItemChange(index, 'uraian', e.target.value)}
                        placeholder="Uraian"
                        style={{
                          flex: 1,
                          background: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '4px',
                          padding: '6px 8px',
                          color: '#e2e8f0',
                          fontSize: '0.8rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        value={item.volume}
                        onChange={(e) => handleItemChange(index, 'volume', e.target.value)}
                        placeholder="Volume"
                        style={{
                          flex: 1,
                          background: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '4px',
                          padding: '6px 8px',
                          color: '#e2e8f0',
                          fontSize: '0.8rem',
                          outline: 'none',
                        }}
                      />
                      <input
                        type="text"
                        value={item.keterangan}
                        onChange={(e) => handleItemChange(index, 'keterangan', e.target.value)}
                        placeholder="Keterangan"
                        style={{
                          flex: 1,
                          background: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '4px',
                          padding: '6px 8px',
                          color: '#e2e8f0',
                          fontSize: '0.8rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </Card>
          </div>

          {/* PDF Preview */}
          <div className="print-preview-only pdf-document" style={{ height: '700px', overflow: 'auto', borderRadius: '12px', border: '1px solid #334155' }}>
            <PDFPreview data={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}
