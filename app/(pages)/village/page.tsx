'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';

export default function VillageProfilePage() {
  const [activeTab, setActiveTab] = useState('village');
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    namaDesa: '',
    kecamatan: '',
    namaKepalaDesa: '',
    namaSekdes: '',
    namaBendahara: '',
    pelaksanaKegiatan: ['', '', '', '', ''],
    nomorPerdes: '',
    nomorPerkades: '',
    nomorSKPKPKD: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePelaksanaChange = (index: number, value: string) => {
    setFormData(prev => {
      const newPelaksana = [...prev.pelaksanaKegiatan];
      newPelaksana[index] = value;
      return { ...prev, pelaksanaKegiatan: newPelaksana };
    });
  };

  const handleSave = () => {
    // TODO: Save to database
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '10px 12px',
    color: '#e2e8f0',
    fontSize: '0.85rem',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: '#94a3b8',
    fontSize: '0.82rem',
    marginBottom: '6px',
    fontWeight: 500,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Header />
      <Navigation />

      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981', margin: 0 }}>Identitas Desa & Aparatur</h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>Data desa dan aparatur pemerintah desa</p>
        </div>

        {/* Success Message */}
        {saved && (
          <div style={{
            padding: '12px 16px',
            background: '#064e3b',
            border: '1px solid #10b981',
            borderRadius: '8px',
            color: '#10b981',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '16px',
          }}>
            ✓ Data berhasil disimpan!
          </div>
        )}

        {/* Form */}
        <Card title="Identitas Desa & Aparatur Terpusat">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Nama Desa</label>
                <input
                  type="text"
                  value={formData.namaDesa}
                  onChange={(e) => handleInputChange('namaDesa', e.target.value)}
                  placeholder="Contoh: Desa Sijenggung"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Alamat / Kecamatan</label>
                <input
                  type="text"
                  value={formData.kecamatan}
                  onChange={(e) => handleInputChange('kecamatan', e.target.value)}
                  placeholder="Contoh: Kecamatan Banjarmangu"
                  style={inputStyle}
                />
              </div>

              <div style={{ paddingTop: '12px', borderTop: '1px solid #334155' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#10b981', marginBottom: '12px', marginTop: 0 }}>Aparatur Desa</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Nama Kepala Desa</label>
                    <input
                      type="text"
                      value={formData.namaKepalaDesa}
                      onChange={(e) => handleInputChange('namaKepalaDesa', e.target.value)}
                      placeholder="Nama Kepala Desa"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Nama Sekretaris Desa</label>
                    <input
                      type="text"
                      value={formData.namaSekdes}
                      onChange={(e) => handleInputChange('namaSekdes', e.target.value)}
                      placeholder="Nama Sekdes"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Nama Bendahara Desa</label>
                    <input
                      type="text"
                      value={formData.namaBendahara}
                      onChange={(e) => handleInputChange('namaBendahara', e.target.value)}
                      placeholder="Nama Bendahara"
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              <div style={{ paddingTop: '12px', borderTop: '1px solid #334155' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#10b981', marginBottom: '12px', marginTop: 0 }}>Pelaksana Kegiatan Anggaran (TPK)</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {formData.pelaksanaKegiatan.map((pelaksana, index) => (
                    <div key={index}>
                      <label style={labelStyle}>
                        Nama Pelaksana Kegiatan {index + 1}
                      </label>
                      <input
                        type="text"
                        value={pelaksana}
                        onChange={(e) => handlePelaksanaChange(index, e.target.value)}
                        placeholder={`Nama Pelaksana Kegiatan ${index + 1}`}
                        style={inputStyle}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ paddingTop: '12px' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#10b981', marginBottom: '16px', marginTop: 0 }}>Dokumen Peraturan</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Nomor Peraturan Desa (Perdes) APBDes</label>
                    <input
                      type="text"
                      value={formData.nomorPerdes}
                      onChange={(e) => handleInputChange('nomorPerdes', e.target.value)}
                      placeholder="Contoh: Perdes No. 01 Tahun 2025"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Nomor Perkades Penjabaran APBDes</label>
                    <input
                      type="text"
                      value={formData.nomorPerkades}
                      onChange={(e) => handleInputChange('nomorPerkades', e.target.value)}
                      placeholder="Contoh: Perkades No. 02 Tahun 2025"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>SK Kepala Desa tentang PKPKD dan PPKD</label>
                    <input
                      type="text"
                      value={formData.nomorSKPKPKD}
                      onChange={(e) => handleInputChange('nomorSKPKPKD', e.target.value)}
                      placeholder="Contoh: SK Kades No. 05 Tahun 2025"
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Preview Card */}
              <div style={{
                marginTop: '20px',
                padding: '20px',
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '12px',
              }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#60a5fa', marginBottom: '12px', marginTop: 0 }}>Preview Identitas Desa</h4>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.8 }}>
                  <p style={{ margin: '4px 0' }}><strong style={{ color: '#e2e8f0' }}>Desa:</strong> {formData.namaDesa || '-'}</p>
                  <p style={{ margin: '4px 0' }}><strong style={{ color: '#e2e8f0' }}>Kecamatan:</strong> {formData.kecamatan || '-'}</p>
                  <p style={{ margin: '4px 0' }}><strong style={{ color: '#e2e8f0' }}>Kepala Desa:</strong> {formData.namaKepalaDesa || '-'}</p>
                  <p style={{ margin: '4px 0' }}><strong style={{ color: '#e2e8f0' }}>Sekretaris Desa:</strong> {formData.namaSekdes || '-'}</p>
                  <p style={{ margin: '4px 0' }}><strong style={{ color: '#e2e8f0' }}>Bendahara:</strong> {formData.namaBendahara || '-'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #334155' }}>
            <button
              onClick={() => setFormData({
                namaDesa: '',
                kecamatan: '',
                namaKepalaDesa: '',
                namaSekdes: '',
                namaBendahara: '',
                pelaksanaKegiatan: ['', '', '', '', ''],
                nomorPerdes: '',
                nomorPerkades: '',
                nomorSKPKPKD: '',
              })}
              style={{
                padding: '10px 20px',
                background: 'transparent',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              Reset Form
            </button>
            <button
              onClick={handleSave}
              style={{
                padding: '10px 24px',
                background: '#10b981',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              Simpan Data
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
