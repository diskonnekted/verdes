# Database Schema Documentation

## Overview

Aplikasi menggunakan PostgreSQL sebagai database dengan Prisma sebagai ORM.

## Tables

### 1. User

Menyimpan data pengguna sistem.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String (CUID) | PRIMARY KEY | Unique identifier |
| email | String | UNIQUE, NOT NULL | Email pengguna |
| name | String | NOT NULL | Nama lengkap |
| password | String | NOT NULL | Password (hashed) |
| role | Enum | NOT NULL | Role pengguna |
| createdAt | DateTime | DEFAULT now() | Waktu pembuatan |
| updatedAt | DateTime | UPDATED | Waktu update terakhir |

**Role Enum:**
- `ADMIN`: Administrator sistem
- `VERIFIER`: Petugas verifikasi
- `AUDITOR`: Auditor
- `KEPALA_DESA`: Kepala desa

**Relations:**
- One-to-Many dengan `Document` (createdBy)
- One-to-Many dengan `Verification` (reviewerId)

---

### 2. Document

Menyimpan dokumen pertanggungjawaban keuangan.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String (CUID) | PRIMARY KEY | Unique identifier |
| documentNumber | String | UNIQUE, NOT NULL | Nomor dokumen |
| title | String | NOT NULL | Judul dokumen |
| description | String | NULL | Deskripsi |
| type | Enum | NOT NULL | Tipe dokumen |
| amount | Float | NOT NULL | Jumlah uang |
| date | DateTime | NOT NULL | Tanggal dokumen |
| status | Enum | DEFAULT PENDING | Status verifikasi |
| riskScore | Float | NULL | Skor risiko (0-100) |
| riskLevel | Enum | NULL | Tingkat risiko |
| notes | String | NULL | Catatan |
| filePath | String | NULL | Path file dokumen |
| createdBy | String | FK → User.id | Pembuat dokumen |
| createdAt | DateTime | DEFAULT now() | Waktu pembuatan |
| updatedAt | DateTime | UPDATED | Waktu update terakhir |

**DocumentType Enum:**
- `PENGADAAN`: Pengadaan barang
- `PEMBELIAN`: Pembelian
- `PEMBANGUNAN`: Pembangunan infrastruktur
- `PERBAIKAN`: Perbaikan
- `OPERASIONAL`: Biaya operasional
- `HIBAH`: Hibah
- `BANTUAN_SOSIAL`: Bantuan sosial

**DocumentStatus Enum:**
- `PENDING`: Menunggu review
- `IN_REVIEW`: Sedang direview
- `APPROVED`: Disetujui
- `REJECTED`: Ditolak
- `REVISE`: Perlu revisi

**RiskLevel Enum:**
- `LOW`: Risiko rendah (0-30)
- `MEDIUM`: Risiko sedang (31-60)
- `HIGH`: Risiko tinggi (61-85)
- `CRITICAL`: Risiko kritis (86-100)

**Relations:**
- Many-to-One dengan `User` (creator)
- One-to-Many dengan `Verification`
- One-to-Many dengan `ChecklistItem`

**Indexes:**
- `type`: Untuk filter berdasarkan tipe
- `status`: Untuk filter berdasarkan status
- `createdBy`: Untuk query dokumen by user

---

### 3. Verification

Menyimpan hasil verifikasi dokumen.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String (CUID) | PRIMARY KEY | Unique identifier |
| documentId | String | FK → Document.id | Dokumen yang direview |
| reviewerId | String | FK → User.id | Reviewer |
| status | Enum | NOT NULL | Hasil verifikasi |
| comments | String | NULL | Komentar |
| findings | String | NULL | Temuan |
| reviewedAt | DateTime | DEFAULT now() | Waktu review |
| createdAt | DateTime | DEFAULT now() | Waktu pembuatan |

**VerificationStatus Enum:**
- `APPROVED`: Disetujui
- `REJECTED`: Ditolak
- `NEEDS_REVISION`: Perlu revisi

**Relations:**
- Many-to-One dengan `Document`
- Many-to-One dengan `User` (reviewer)

**Indexes:**
- `documentId`: Untuk query by document
- `reviewerId`: Untuk query by reviewer

---

### 4. ChecklistItem

Menyimpan item checklist kelengkapan dokumen.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String (CUID) | PRIMARY KEY | Unique identifier |
| documentId | String | FK → Document.id | Dokumen terkait |
| label | String | NOT NULL | Nama item |
| isChecked | Boolean | DEFAULT false | Status checked |
| isRequired | Boolean | DEFAULT true | Apakah wajib |
| category | String | NULL | Kategori item |
| createdAt | DateTime | DEFAULT now() | Waktu pembuatan |

**Relations:**
- Many-to-One dengan `Document`

**Indexes:**
- `documentId`: Untuk query by document

---

## Example Queries

### Get all documents with risk level HIGH or CRITICAL

```sql
SELECT * FROM "Document"
WHERE "riskLevel" IN ('HIGH', 'CRITICAL')
ORDER BY "riskScore" DESC;
```

### Get documents pending verification

```sql
SELECT * FROM "Document"
WHERE "status" = 'PENDING'
ORDER BY "createdAt" DESC;
```

### Get user with their documents

```sql
SELECT 
  u.name,
  u.email,
  COUNT(d.id) as total_documents,
  SUM(d.amount) as total_amount
FROM "User" u
LEFT JOIN "Document" d ON u.id = d."createdBy"
GROUP BY u.id, u.name, u.email;
```

### Get document with verification details

```sql
SELECT 
  d."documentNumber",
  d.title,
  d.amount,
  d.status,
  u.name as reviewer_name,
  v.status as verification_status,
  v.comments
FROM "Document" d
LEFT JOIN "Verification" v ON d.id = v."documentId"
LEFT JOIN "User" u ON v."reviewerId" = u.id
WHERE d.id = 'document_id';
```

---

## Database Diagram

```
User (1) ──────< (M) Document
   │                     │
   │                     │
   │                     └────> (M) Verification
   │                              │
   └──────────────────────────────┘
               (M)
   
Document (1) ──────< (M) ChecklistItem
```

---

## Migrations

Untuk membuat migration baru:

```bash
npx prisma migrate dev --name <migration_name>
```

Untuk reset database:

```bash
npx prisma migrate reset
```

Untuk seed data:

```bash
npm run db:seed
```

---

## Best Practices

1. **Selalu gunakan transaksi** untuk operasi yang melibatkan multiple tables
2. **Index columns** yang sering di-query untuk performa
3. **Validate input** sebelum insert/update ke database
4. **Use soft deletes** untuk data penting (tambahkan kolom `deletedAt`)
5. **Audit trail** - catat siapa yang melakukan perubahan
6. **Backup database** secara berkala

---

## Connection Pooling

Untuk production, gunakan connection pooling:

```typescript
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `${process.env.DATABASE_URL}&pgbouncer=true&connection_limit=1`
    }
  }
});
```

---

© 2026 Verides Documentation
