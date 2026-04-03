'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { User, Shield, Bell, Database, Key } from 'lucide-react';

export default function SettingsPage() {
  const [settingsTab, setSettingsTab] = useState('profile');

  const sidebarMenuStyle = (active: boolean) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    background: active ? '#064e3b' : 'transparent',
    color: active ? '#10b981' : '#94a3b8',
    borderLeft: active ? '4px solid #10b981' : 'none',
    fontSize: '0.85rem',
    fontWeight: 600,
    transition: 'all 0.2s'
  });

  const inputStyle = {
    width: '100%',
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '10px 12px',
    color: '#e2e8f0',
    fontSize: '0.85rem',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    color: '#94a3b8',
    marginBottom: '6px',
    fontWeight: 600
  };

  const settingsItems = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Keamanan', icon: Shield },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'api', label: 'API Keys', icon: Key },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Header />
      <Navigation />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981', margin: 0 }}>Pengaturan</h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>Kelola pengaturan sistem dan akun</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          {/* Settings Menu */}
          <Card style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {settingsItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSettingsTab(item.id)}
                  style={sidebarMenuStyle(settingsTab === item.id)}
                >
                  <item.icon style={{ width: '16px', height: '16px' }} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Settings Content */}
          <Card style={{ padding: '24px' }}>
            {settingsTab === 'profile' && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '16px' }}>Pengaturan Profil</h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>Nama Lengkap</label>
                      <input
                        type="text"
                        defaultValue="Ahmad Sudirman"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input
                        type="email"
                        defaultValue="ahmad@desa.go.id"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Role</label>
                      <select style={inputStyle}>
                        <option>Admin</option>
                        <option>Verifier</option>
                        <option>Auditor</option>
                        <option>Kepala Desa</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Desa</label>
                      <input
                        type="text"
                        defaultValue="Desa Sukamaju"
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px' }}>
                    <Button variant="outline">Batal</Button>
                    <Button>Simpan Perubahan</Button>
                  </div>
                </form>
              </div>
            )}

            {settingsTab === 'security' && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '16px' }}>Pengaturan Keamanan</h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Password Saat Ini</label>
                    <input
                      type="password"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Password Baru</label>
                    <input
                      type="password"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Konfirmasi Password</label>
                    <input
                      type="password"
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ padding: '16px', background: '#1e3a5f', border: '1px solid rgba(59, 130, 246, 0.19)', borderRadius: '8px' }}>
                    <p style={{ fontSize: '0.85rem', color: '#60a5fa', margin: 0 }}>
                      <strong>Two-Factor Authentication (2FA)</strong>
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>Aktifkan 2FA untuk keamanan tambahan</p>
                    <button style={{ marginTop: '12px', padding: '6px 14px', background: 'transparent', border: '1px solid #334155', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>
                      Aktifkan 2FA
                    </button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px' }}>
                    <Button variant="outline">Batal</Button>
                    <Button>Ubah Password</Button>
                  </div>
                </form>
              </div>
            )}

            {settingsTab === 'database' && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '16px' }}>Pengaturan Database</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '16px', background: '#064e3b', borderRadius: '8px', border: '1px solid #10b981' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', margin: 0 }}>Status Koneksi</p>
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px', margin: 0 }}>PostgreSQL</p>
                      </div>
                      <span style={{ padding: '4px 12px', background: '#064e3b', color: '#10b981', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                        Terhubung
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>Host</p>
                        <p style={{ fontSize: '0.75rem', color: '#e2e8f0', fontFamily: 'monospace', margin: 0 }}>localhost:5432</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>Database</p>
                        <p style={{ fontSize: '0.75rem', color: '#e2e8f0', fontFamily: 'monospace', margin: 0 }}>verides_db</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="outline" size="sm">Backup Database</Button>
                    <Button variant="outline" size="sm">Restore Database</Button>
                    <Button variant="danger" size="sm">Reset Data</Button>
                  </div>
                </div>
              </div>
            )}

            {(settingsTab === 'notifications' || settingsTab === 'api') && (
              <div style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>
                <Bell style={{ width: '48px', height: '48px', margin: '0 auto 12px', opacity: 0.5 }} />
                <p style={{ fontSize: '0.85rem', margin: 0 }}>Fitur sedang dalam pengembangan</p>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
