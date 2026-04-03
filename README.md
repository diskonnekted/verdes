# Verides - Sistem Verifikasi Pertanggungjawaban Keuangan Desa

Aplikasi web untuk memverifikasi dokumen pertanggungjawaban keuangan desa terkait pengadaan, pembelian, pembangunan, dan jenis pengeluaran desa lainnya.

## 🚀 Tech Stack

- **Frontend:** Next.js 16 (App Router) + React 19
- **Styling:** TailwindCSS 4
- **Language:** TypeScript
- **Database ORM:** Prisma 6
- **Database:** PostgreSQL
- **Icons:** Lucide React
- **Authentication:** bcryptjs (ready for JWT)

## 📁 Struktur Project

```
verides/
├── app/
│   ├── (auth)/
│   │   └── login/          # Halaman login
│   ├── (pages)/
│   │   ├── dashboard/      # Dashboard dengan statistik
│   │   ├── documents/      # Manajemen dokumen + upload
│   │   ├── verification/   # Verifikasi dokumen dengan checklist
│   │   ├── analysis/       # Analisis risiko
│   │   ├── reports/        # Laporan & output (print-ready)
│   │   └── settings/       # Pengaturan sistem
│   ├── api/
│   │   ├── documents/      # REST API untuk dokumen
│   │   └── auth/           # API authentication
│   ├── types/              # TypeScript interfaces
│   └── layout.tsx          # Root layout
├── components/             # Reusable UI components
│   ├── Header.tsx
│   ├── Navigation.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── StatCard.tsx
│   ├── DataTable.tsx
│   └── StatusIndicator.tsx
├── lib/
│   └── prisma.ts           # Prisma client instance
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data
└── package.json
```

## 🎨 Fitur Utama

### 1. **Dashboard**
- Statistik dokumen (total, disetujui, review, ditolak)
- Total nilai dokumen dan distribusi tipe
- Aktivitas verifikasi terkini
- Dokumen terbaru dengan status

### 2. **Manajemen Dokumen**
- Upload dokumen dengan drag & drop
- Form input lengkap (no. dokumen, tipe, jumlah, dll)
- Daftar dokumen dengan filter dan pencarian
- Status tracking (Pending, In Review, Approved, Rejected, Revise)

### 3. **Verifikasi Dokumen**
- Checklist kelengkapan dokumen
- Indikator progress kelengkapan
- Temuan dan catatan reviewer
- Aksi: Setujui, Tolak, atau Minta Revisi

### 4. **Analisis Risiko**
- Skor risiko per dokumen (LOW, MEDIUM, HIGH, CRITICAL)
- Faktor-faktor risiko dengan severity level
- Distribusi risiko keseluruhan
- Rekomendasi sistem berbasis AI

### 5. **Laporan & Output**
- Generate laporan verifikasi
- Preview laporan dengan format resmi
- Print-ready dengan kop surat
- Tanda tangan digital (placeholder)

### 6. **Pengaturan**
- Manajemen profil pengguna
- Pengaturan keamanan (password, 2FA)
- Monitoring status database
- Backup & restore (placeholder)

## 🛠️ Instalasi

### Prerequisites
- Node.js 20+
- PostgreSQL 14+
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**
```bash
cd I:\dokumen\GitHub\verides\verides
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Buat file `.env` di root directory:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/verides"
```

4. **Setup database**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations (akan membuat tabel)
npx prisma migrate dev --name init

# Seed database dengan data awal
npm run db:seed
```

5. **Run development server**
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 📊 Default Users (Setelah Seed)

| Email | Password | Role |
|-------|----------|------|
| admin@desa.go.id | password123 | ADMIN |
| verifier@desa.go.id | password123 | VERIFIER |
| auditor@desa.go.id | password123 | AUDITOR |

## 🏗️ Database Schema

### Models:
- **User**: Pengguna sistem (Admin, Verifier, Auditor, Kepala Desa)
- **Document**: Dokumen keuangan dengan berbagai tipe
  - PENGADAAN, PEMBELIAN, PEMBANGUNAN, PERBAIKAN
  - OPERASIONAL, HIBAH, BANTUAN_SOSIAL
- **Verification**: Hasil verifikasi oleh reviewer
- **ChecklistItem**: Item kelengkapan dokumen

### Status & Levels:
- DocumentStatus: PENDING, IN_REVIEW, APPROVED, REJECTED, REVISE
- RiskLevel: LOW, MEDIUM, HIGH, CRITICAL
- VerificationStatus: APPROVED, REJECTED, NEEDS_REVISION

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/login` | Halaman login |
| `/dashboard` | Dashboard utama |
| `/documents` | Manajemen dokumen |
| `/verification` | Verifikasi dokumen |
| `/analysis` | Analisis risiko |
| `/reports` | Laporan & output |
| `/settings` | Pengaturan |

## 🔌 API Endpoints

### Documents
```
GET    /api/documents          # Get all documents (with pagination)
POST   /api/documents          # Create new document
GET    /api/documents/:id      # Get document by ID
PUT    /api/documents/:id      # Update document
DELETE /api/documents/:id      # Delete document
```

### Authentication
```
POST   /api/auth/login         # Login user
```

## 🎨 Design System

Aplikasi menggunakan dark theme dengan palet warna:
- **Background:** `#0f172a` (slate-900)
- **Cards:** `#1e293b` (slate-800)
- **Primary:** `#10b981` (emerald-500)
- **Success:** `#10b981`
- **Warning:** `#f59e0b`
- **Error:** `#f87171`
- **Info:** `#60a5fa`

## 🚀 Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Seed database
npm run db:seed

# Generate Prisma client
npx prisma generate

# Create new migration
npx prisma migrate dev --name <migration_name>

# Reset database
npx prisma migrate reset
```

## 📝 Next Steps (TODO)

Fitur yang bisa ditambahkan:
- [ ] JWT Authentication & session management
- [ ] File upload handler (AWS S3, Cloudinary)
- [ ] Email notifications
- [ ] Role-based access control (RBAC)
- [ ] Export to Excel/PDF
- [ ] Advanced filtering & search
- [ ] Audit trail & activity logs
- [ ] Two-factor authentication (2FA)
- [ ] Real-time updates (WebSockets)
- [ ] Mobile responsive improvements
- [ ] Internationalization (i18n)
- [ ] Unit & integration tests

## 📄 License

MIT License

## 👥 Contributors

Dibangun sebagai sistem verifikasi keuangan desa untuk meningkatkan transparansi dan akuntabilitas pengelolaan anggaran desa.

---

© 2026 Sistem Verifikasi Pertanggungjawaban Keuangan Desa
