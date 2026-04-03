# Quick Start Guide

Panduan cepat untuk memulai aplikasi Verides.

## 📋 Prerequisites

Sebelum memulai, pastikan Anda telah menginstall:

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))

---

## 🚀 Step-by-Step Setup

### Step 1: Install Dependencies

```bash
cd I:\dokumen\GitHub\verides\verides
npm install
```

### Step 2: Setup PostgreSQL

1. Install PostgreSQL
2. Buat database baru:

```bash
# Masuk ke PostgreSQL
psql -U postgres

# Buat database
CREATE DATABASE verides;

# Keluar
\q
```

### Step 3: Configure Environment

Buat file `.env` di root directory:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/verides"
```

Ganti `YOUR_PASSWORD` dengan password PostgreSQL Anda.

### Step 4: Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations (buat tabel)
npx prisma migrate dev --name init

# Seed database (data awal)
npm run db:seed
```

Output yang diharapkan:
```
🌱 Seeding database...
✅ Users created
✅ Sample documents created
🎉 Seeding completed!
```

### Step 5: Start Development Server

```bash
npm run dev
```

Server akan berjalan di: **http://localhost:3000**

---

## 🔐 Login Credentials

Gunakan salah satu akun berikut:

| Email | Password | Role |
|-------|----------|------|
| `admin@desa.go.id` | `password123` | Admin |
| `verifier@desa.go.id` | `password123` | Verifier |
| `auditor@desa.go.id` | `password123` | Auditor |

---

## 📱 Navigasi Aplikasi

Setelah login, Anda akan melihat navigasi di bagian atas:

1. **Dashboard** - Lihat statistik dan ringkasan
2. **Dokumen** - Kelola dan upload dokumen
3. **Verifikasi** - Verifikasi kelengkapan dokumen
4. **Analisis** - Lihat analisis risiko
5. **Laporan** - Generate dan cetak laporan
6. **Pengaturan** - Pengaturan akun dan sistem

---

## 🎯 Coba Fitur Utama

### 1. Upload Dokumen
- Klik menu **Dokumen**
- Klik tombol **Tambah Dokumen**
- Isi form yang tersedia
- Drag & drop file atau klik untuk browse
- Klik **Simpan Dokumen**

### 2. Verifikasi Dokumen
- Klik menu **Verifikasi**
- Klik ikon **expand** (▼) pada dokumen
- Centang item checklist
- Tambahkan catatan
- Klik **Setujui** atau **Tolak**

### 3. Lihat Analisis Risiko
- Klik menu **Analisis**
- Lihat distribusi risiko
- Klik dokumen untuk lihat detail faktor risiko

### 4. Generate Laporan
- Klik menu **Laporan**
- Pilih jenis laporan
- Klik ikon **Eye** untuk preview
- Klik **Cetak Laporan** untuk print

---

## 🛠️ Useful Commands

```bash
# Development
npm run dev              # Start dev server

# Database
npx prisma studio        # Open Prisma GUI
npx prisma migrate dev   # Create & apply migration
npx prisma migrate reset # Reset database
npm run db:seed          # Seed data

# Production
npm run build            # Build for production
npm run start            # Start production server
```

---

## 🎨 UI Components

Aplikasi menyediakan komponen reusable di folder `components/`:

- `Header` - Header aplikasi
- `Navigation` - Tab navigation
- `Card` - Card container
- `Badge` - Status badge
- `Button` - Button dengan variants
- `StatCard` - Statistics card
- `DataTable` - Table component
- `StatusIndicator` - Status indicator

---

## 📊 Sample Data

Setelah seed, database akan berisi:

- **3 Users** (Admin, Verifier, Auditor)
- **7 Documents** dengan berbagai tipe dan status
- **0 Verifications** (bisa ditambahkan via UI)
- **0 ChecklistItems** (bisa ditambahkan via UI)

---

## ❓ Troubleshooting

### Error: "Database connection failed"
- Pastikan PostgreSQL berjalan
- Cek `DATABASE_URL` di `.env`
- Pastikan database `verides` sudah dibuat

### Error: "Port 3000 already in use"
- Ubah port: `npm run dev -- -p 3001`
- Atau kill process yang menggunakan port 3000

### Error: "Prisma Client not generated"
- Run: `npx prisma generate`

### TypeScript errors
- Delete `.next` folder
- Run: `npm run build`

---

## 🎓 Next Steps

Setelah berhasil setup, Anda bisa:

1. **Tambah User Baru** - Via halaman Settings atau langsung ke database
2. **Customize Schema** - Edit `prisma/schema.prisma` lalu run `npx prisma migrate dev`
3. **Add Features** - Tambah halaman atau API routes baru
4. **Deploy** - Deploy ke Vercel, Railway, atau server sendiri

---

## 📚 Documentation

- [README.md](./README.md) - Dokumentasi utama
- [API.md](./API.md) - API documentation
- [DATABASE.md](./DATABASE.md) - Database schema

---

## 💡 Tips

- Gunakan **Prisma Studio** (`npx prisma studio`) untuk lihat/edit data via GUI
- Gunakan **Postman** atau **Insomnia** untuk test API endpoints
- Check browser console untuk error di development mode
- Gunakan React DevTools untuk debugging components

---

## 🆘 Need Help?

Jika mengalami masalah:

1. Check console logs untuk error messages
2. Baca dokumentasi di folder `docs/`
3. Check Prisma docs: https://www.prisma.io/docs
4. Check Next.js docs: https://nextjs.org/docs

---

Happy coding! 🚀

© 2026 Verides
