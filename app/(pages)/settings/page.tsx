'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { User, Shield, Bell, Database, Key } from 'lucide-react';

export default function SettingsPage() {
  const [settingsTab, setSettingsTab] = useState('profile');

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Header />
      <Navigation />
      
      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#10b981] m-0">Pengaturan</h2>
          <p className="text-sm text-gray-400 mt-1">Kelola pengaturan sistem dan akun</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Menu */}
          <Card className="lg:col-span-1">
            <div className="space-y-2">
              {[
                { id: 'profile', label: 'Profil', icon: User },
                { id: 'security', label: 'Keamanan', icon: Shield },
                { id: 'notifications', label: 'Notifikasi', icon: Bell },
                { id: 'database', label: 'Database', icon: Database },
                { id: 'api', label: 'API Keys', icon: Key },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSettingsTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    settingsTab === item.id
                      ? 'bg-[#064e3b] text-[#10b981] border-l-4 border-[#10b981]'
                      : 'text-gray-400 hover:bg-[#0f172a]'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Settings Content */}
          <Card className="lg:col-span-3">
            {settingsTab === 'profile' && (
              <div>
                <h3 className="text-base font-semibold text-gray-200 mb-4">Pengaturan Profil</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5 font-medium">Nama Lengkap</label>
                      <input
                        type="text"
                        defaultValue="Ahmad Sudirman"
                        className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5 font-medium">Email</label>
                      <input
                        type="email"
                        defaultValue="ahmad@desa.go.id"
                        className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5 font-medium">Role</label>
                      <select className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981]">
                        <option>Admin</option>
                        <option>Verifier</option>
                        <option>Auditor</option>
                        <option>Kepala Desa</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5 font-medium">Desa</label>
                      <input
                        type="text"
                        defaultValue="Desa Sukamaju"
                        className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline">Batal</Button>
                    <Button>Simpan Perubahan</Button>
                  </div>
                </form>
              </div>
            )}

            {settingsTab === 'security' && (
              <div>
                <h3 className="text-base font-semibold text-gray-200 mb-4">Pengaturan Keamanan</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5 font-medium">Password Saat Ini</label>
                    <input
                      type="password"
                      className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5 font-medium">Password Baru</label>
                    <input
                      type="password"
                      className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5 font-medium">Konfirmasi Password</label>
                    <input
                      type="password"
                      className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981]"
                    />
                  </div>
                  <div className="p-4 bg-[#1e3a5f] border border-[#3b82f630] rounded-lg">
                    <p className="text-sm text-[#60a5fa]">
                      <strong>Two-Factor Authentication (2FA)</strong>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Aktifkan 2FA untuk keamanan tambahan</p>
                    <Button variant="outline" className="mt-3" size="sm">
                      Aktifkan 2FA
                    </Button>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline">Batal</Button>
                    <Button>Ubah Password</Button>
                  </div>
                </form>
              </div>
            )}

            {settingsTab === 'database' && (
              <div>
                <h3 className="text-base font-semibold text-gray-200 mb-4">Pengaturan Database</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-[#0f172a] rounded-lg border border-[#334155]">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-200">Status Koneksi</p>
                        <p className="text-xs text-gray-400 mt-1">PostgreSQL</p>
                      </div>
                      <span className="px-3 py-1 bg-[#064e3b] text-[#10b981] rounded-full text-xs font-semibold">
                        Terhubung
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-400 text-xs">Host</p>
                        <p className="text-gray-200 font-mono text-xs">localhost:5432</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Database</p>
                        <p className="text-gray-200 font-mono text-xs">verides_db</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">Backup Database</Button>
                    <Button variant="outline" size="sm">Restore Database</Button>
                    <Button variant="danger" size="sm">Reset Data</Button>
                  </div>
                </div>
              </div>
            )}

            {(settingsTab === 'notifications' || settingsTab === 'api') && (
              <div className="text-center py-12 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Fitur sedang dalam pengembangan</p>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
