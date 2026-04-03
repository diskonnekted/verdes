# API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

### POST /api/auth/login

Login user ke sistem.

**Request Body:**
```json
{
  "email": "admin@desa.go.id",
  "password": "password123"
}
```

**Response Success (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "email": "admin@desa.go.id",
    "name": "Administrator",
    "role": "ADMIN"
  }
}
```

**Response Error (401):**
```json
{
  "error": "Invalid credentials"
}
```

---

## Documents

### GET /api/documents

Mendapatkan semua dokumen dengan pagination dan filter.

**Query Parameters:**
- `page` (number, default: 1): Halaman saat ini
- `limit` (number, default: 10): Jumlah data per halaman
- `search` (string): Pencarian berdasarkan judul atau no. dokumen
- `status` (string): Filter berdasarkan status
- `type` (string): Filter berdasarkan tipe dokumen

**Example:**
```
GET /api/documents?page=1&limit=10&search=Pengadaan&status=PENDING
```

**Response Success (200):**
```json
{
  "data": [
    {
      "id": "doc_id",
      "documentNumber": "PKG/001/2026",
      "title": "Pengadaan Alat Kantor",
      "description": "Pengadaan komputer dan printer",
      "type": "PENGADAAN",
      "amount": 45000000,
      "date": "2026-03-01T00:00:00.000Z",
      "status": "APPROVED",
      "riskScore": 25,
      "riskLevel": "LOW",
      "createdAt": "2026-03-01T00:00:00.000Z",
      "updatedAt": "2026-03-01T00:00:00.000Z",
      "creator": {
        "id": "user_id",
        "name": "Administrator",
        "email": "admin@desa.go.id"
      }
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

---

### POST /api/documents

Membuat dokumen baru.

**Request Body:**
```json
{
  "documentNumber": "PKG/008/2026",
  "title": "Pengadaan Mebel Kantor",
  "description": "Pembelian meja dan kursi",
  "type": "PENGADAAN",
  "amount": 35000000,
  "date": "2026-03-15",
  "createdBy": "user_id"
}
```

**Response Success (201):**
```json
{
  "id": "new_doc_id",
  "documentNumber": "PKG/008/2026",
  "title": "Pengadaan Mebel Kantor",
  "description": "Pembelian meja dan kursi",
  "type": "PENGADAAN",
  "amount": 35000000,
  "date": "2026-03-15T00:00:00.000Z",
  "status": "PENDING",
  "riskScore": null,
  "riskLevel": null,
  "createdAt": "2026-03-15T00:00:00.000Z",
  "updatedAt": "2026-03-15T00:00:00.000Z",
  "createdBy": "user_id"
}
```

**Response Error (400):**
```json
{
  "error": "Missing required fields"
}
```

---

### GET /api/documents/:id

Mendapatkan detail dokumen berdasarkan ID.

**Response Success (200):**
```json
{
  "id": "doc_id",
  "documentNumber": "PKG/001/2026",
  "title": "Pengadaan Alat Kantor",
  "description": "Pengadaan komputer dan printer",
  "type": "PENGADAAN",
  "amount": 45000000,
  "date": "2026-03-01T00:00:00.000Z",
  "status": "APPROVED",
  "riskScore": 25,
  "riskLevel": "LOW",
  "notes": null,
  "filePath": null,
  "createdBy": "user_id",
  "createdAt": "2026-03-01T00:00:00.000Z",
  "updatedAt": "2026-03-01T00:00:00.000Z",
  "creator": {
    "id": "user_id",
    "name": "Administrator",
    "email": "admin@desa.go.id"
  },
  "verifications": [
    {
      "id": "verification_id",
      "status": "APPROVED",
      "comments": "Dokumen lengkap dan sesuai",
      "reviewedBy": "reviewer_name"
    }
  ],
  "checklistItems": [
    {
      "id": "checklist_id",
      "label": "Faktur Pajak",
      "isChecked": true,
      "isRequired": true
    }
  ]
}
```

**Response Error (404):**
```json
{
  "error": "Document not found"
}
```

---

### PUT /api/documents/:id

Mengupdate dokumen yang sudah ada.

**Request Body:**
```json
{
  "title": "Pengadaan Alat Kantor (Revisi)",
  "status": "IN_REVIEW",
  "riskScore": 45,
  "riskLevel": "MEDIUM",
  "notes": "Perlu klarifikasi tambahan"
}
```

**Response Success (200):**
```json
{
  "id": "doc_id",
  "documentNumber": "PKG/001/2026",
  "title": "Pengadaan Alat Kantor (Revisi)",
  "status": "IN_REVIEW",
  "riskScore": 45,
  "riskLevel": "MEDIUM",
  "notes": "Perlu klarifikasi tambahan",
  "updatedAt": "2026-03-16T00:00:00.000Z"
}
```

---

### DELETE /api/documents/:id

Menghapus dokumen.

**Response Success (200):**
```json
{
  "message": "Document deleted successfully"
}
```

**Response Error (404):**
```json
{
  "error": "Document not found"
}
```

---

## Enum Values

### DocumentType
- `PENGADAAN`
- `PEMBELIAN`
- `PEMBANGUNAN`
- `PERBAIKAN`
- `OPERASIONAL`
- `HIBAH`
- `BANTUAN_SOSIAL`

### DocumentStatus
- `PENDING`
- `IN_REVIEW`
- `APPROVED`
- `REJECTED`
- `REVISE`

### RiskLevel
- `LOW`
- `MEDIUM`
- `HIGH`
- `CRITICAL`

### Role
- `ADMIN`
- `VERIFIER`
- `AUDITOR`
- `KEPALA_DESA`

---

## Error Handling

Semua error response memiliki format:
```json
{
  "error": "Error message description"
}
```

HTTP Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error
