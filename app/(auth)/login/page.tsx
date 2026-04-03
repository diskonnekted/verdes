'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] mb-4">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#10b981]">
            Sistem Verifikasi
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Pertanggungjawaban Keuangan Desa
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-200 mb-6 text-center">
            Masuk ke Akun Anda
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#0f172a] border border-[#334155] rounded-lg pl-10 pr-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981] transition-colors"
                  placeholder="nama@desa.go.id"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2 font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-[#0f172a] border border-[#334155] rounded-lg pl-10 pr-10 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981] transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400">
                <input type="checkbox" className="accent-[#10b981]" />
                <span>Ingat saya</span>
              </label>
              <a href="#" className="text-[#10b981] hover:text-[#059669]">
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
            >
              Masuk
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#334155] text-center">
            <p className="text-sm text-gray-400">
              Belum punya akun?{' '}
              <a href="#" className="text-[#10b981] hover:text-[#059669] font-medium">
                Hubungi Administrator
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © 2026 Sistem Verifikasi Keuangan Desa. All rights reserved.
        </p>
      </div>
    </div>
  );
}
