'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  X,
  Eye,
  Trash2
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'success' | 'error';
  type: string;
}

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('documents');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    documentNumber: '',
    title: '',
    type: 'PENGADAAN',
    amount: '',
    date: '',
    description: '',
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: 'success',
      type: file.type,
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const mockDocuments = [
    { id: 1, documentNumber: 'PKG/001/2026', title: 'Pengadaan Alat Kantor', type: 'PENGADAAN', amount: 45000000, status: 'APPROVED', date: '2026-03-01', files: 3 },
    { id: 2, documentNumber: 'PEM/002/2026', title: 'Pembelian Bahan Bangunan', type: 'PEMBELIAN', amount: 78000000, status: 'IN_REVIEW', date: '2026-03-02', files: 5 },
    { id: 3, documentNumber: 'PBG/003/2026', title: 'Pembangunan Jalan Desa', type: 'PEMBANGUNAN', amount: 250000000, status: 'PENDING', date: '2026-03-03', files: 8 },
    { id: 4, documentNumber: 'PRB/004/2026', title: 'Perbaikan Jembatan', type: 'PERBAIKAN', amount: 125000000, status: 'REVISE', date: '2026-03-04', files: 4 },
    { id: 5, documentNumber: 'OPS/005/2026', title: 'Operasional Kantor Desa', type: 'OPERASIONAL', amount: 15000000, status: 'APPROVED', date: '2026-03-05', files: 2 },
    { id: 6, documentNumber: 'HIB/006/2026', title: 'Hibah UMKM', type: 'HIBAH', amount: 35000000, status: 'APPROVED', date: '2026-03-06', files: 3 },
    { id: 7, documentNumber: 'BSO/007/2026', title: 'Bantuan Sosial Tunai', type: 'BANTUAN_SOSIAL', amount: 95000000, status: 'IN_REVIEW', date: '2026-03-07', files: 6 },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto p-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#10b981] m-0">Manajemen Dokumen</h2>
            <p className="text-sm text-gray-400 mt-1">Kelola dokumen keuangan desa</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Upload className="w-4 h-4 inline mr-2" />
            Tambah Dokumen
          </Button>
        </div>

        {/* Upload Form */}
        {showForm && (
          <Card title="Tambah Dokumen Baru" className="mb-6">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5 font-medium">No. Dokumen</label>
                  <input
                    type="text"
                    value={formData.documentNumber}
                    onChange={(e) => setFormData({...formData, documentNumber: e.target.value})}
                    className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981] transition-colors"
                    placeholder="PKG/001/2026"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5 font-medium">Judul Dokumen</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981] transition-colors"
                    placeholder="Pengadaan Alat Kantor"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5 font-medium">Tipe Dokumen</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981] transition-colors"
                  >
                    <option value="PENGADAAN">Pengadaan</option>
                    <option value="PEMBELIAN">Pembelian</option>
                    <option value="PEMBANGUNAN">Pembangunan</option>
                    <option value="PERBAIKAN">Perbaikan</option>
                    <option value="OPERASIONAL">Operasional</option>
                    <option value="HIBAH">Hibah</option>
                    <option value="BANTUAN_SOSIAL">Bantuan Sosial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5 font-medium">Jumlah (Rp)</label>
                  <input
                    type="text"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981] transition-colors"
                    placeholder="45000000"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5 font-medium">Tanggal</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5 font-medium">Deskripsi</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10b981] transition-colors resize-none h-20"
                  placeholder="Deskripsi singkat dokumen..."
                />
              </div>

              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  dragActive 
                    ? 'border-[#10b981] bg-[#064e3b20]' 
                    : 'border-[#334155] hover:border-[#10b981]'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-10 h-10 text-[#10b981] mx-auto mb-3" />
                <p className="text-sm text-gray-400 mb-2">Drag & drop file di sini atau klik untuk browse</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG, DOCX (Max. 10MB)</p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileInput}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" className="mt-3" onClick={() => document.getElementById('file-upload')?.click()}>
                    Pilih File
                  </Button>
                </label>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-300">File Terupload:</p>
                  {uploadedFiles.map(file => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg border border-[#334155]">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#60a5fa]" />
                        <div>
                          <p className="text-sm text-gray-200">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {file.status === 'success' && <CheckCircle className="w-4 h-4 text-[#10b981]" />}
                        {file.status === 'error' && <AlertCircle className="w-4 h-4 text-[#f87171]" />}
                        <button onClick={() => removeFile(file.id)} className="text-gray-500 hover:text-red-400">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Batal
                </Button>
                <Button type="submit">
                  Simpan Dokumen
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Documents List */}
        <Card title="Daftar Dokumen">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#0f172a]">
                  <th className="px-3 py-2.5 text-left text-[#60a5fa] font-semibold border-b-2 border-[#334155]">No. Dokumen</th>
                  <th className="px-3 py-2.5 text-left text-[#60a5fa] font-semibold border-b-2 border-[#334155]">Judul</th>
                  <th className="px-3 py-2.5 text-left text-[#60a5fa] font-semibold border-b-2 border-[#334155]">Tipe</th>
                  <th className="px-3 py-2.5 text-right text-[#60a5fa] font-semibold border-b-2 border-[#334155]">Jumlah</th>
                  <th className="px-3 py-2.5 text-center text-[#60a5fa] font-semibold border-b-2 border-[#334155]">File</th>
                  <th className="px-3 py-2.5 text-center text-[#60a5fa] font-semibold border-b-2 border-[#334155]">Status</th>
                  <th className="px-3 py-2.5 text-center text-[#60a5fa] font-semibold border-b-2 border-[#334155]">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mockDocuments.map((doc) => {
                  const statusVariants: any = {
                    APPROVED: 'bg-[#064e3b] text-[#10b981]',
                    IN_REVIEW: 'bg-[#1e3a5f] text-[#60a5fa]',
                    PENDING: 'bg-[#451a03] text-[#f59e0b]',
                    REJECTED: 'bg-[#4c0519] text-[#f87171]',
                    REVISE: 'bg-[#451a03] text-[#f59e0b]',
                  };
                  return (
                    <tr key={doc.id} className="border-b border-[#1e293b] hover:bg-[#0f172a40]">
                      <td className="px-3 py-2.5 text-gray-300 font-mono text-xs">{doc.documentNumber}</td>
                      <td className="px-3 py-2.5 text-gray-300">{doc.title}</td>
                      <td className="px-3 py-2.5 text-gray-300">
                        <span className="px-2 py-1 bg-[#1e3a5f] text-[#60a5fa] rounded text-xs font-semibold">
                          {doc.type}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-300 text-right">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(doc.amount)}
                      </td>
                      <td className="px-3 py-2.5 text-gray-300 text-center">{doc.files}</td>
                      <td className="px-3 py-2.5 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${statusVariants[doc.status]}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <div className="flex justify-center gap-2">
                          <button className="text-[#60a5fa] hover:text-[#3b82f6]">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-[#f87171] hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
