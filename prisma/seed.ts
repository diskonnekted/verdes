import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@desa.go.id' },
    update: {},
    create: {
      email: 'admin@desa.go.id',
      name: 'Administrator',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const verifier = await prisma.user.upsert({
    where: { email: 'verifier@desa.go.id' },
    update: {},
    create: {
      email: 'verifier@desa.go.id',
      name: 'Budi Santoso',
      password: hashedPassword,
      role: 'VERIFIER',
    },
  });

  const auditor = await prisma.user.upsert({
    where: { email: 'auditor@desa.go.id' },
    update: {},
    create: {
      email: 'auditor@desa.go.id',
      name: 'Siti Aminah',
      password: hashedPassword,
      role: 'AUDITOR',
    },
  });

  console.log('✅ Users created');

  // Create sample documents
  const sampleDocuments = [
    {
      documentNumber: 'PKG/001/2026',
      title: 'Pengadaan Alat Kantor',
      description: 'Pengadaan komputer dan printer untuk kantor desa',
      type: 'PENGADAAN',
      amount: 45000000,
      date: new Date('2026-03-01'),
      status: 'APPROVED',
      riskScore: 25,
      riskLevel: 'LOW',
      createdBy: admin.id,
    },
    {
      documentNumber: 'PEM/002/2026',
      title: 'Pembelian Bahan Bangunan',
      description: 'Pembelian semen, pasir, dan batu untuk pembangunan',
      type: 'PEMBELIAN',
      amount: 78000000,
      date: new Date('2026-03-02'),
      status: 'IN_REVIEW',
      riskScore: 62,
      riskLevel: 'MEDIUM',
      createdBy: admin.id,
    },
    {
      documentNumber: 'PBG/003/2026',
      title: 'Pembangunan Jalan Desa',
      description: 'Pembangunan jalan rabat beton sepanjang 500m',
      type: 'PEMBANGUNAN',
      amount: 250000000,
      date: new Date('2026-03-03'),
      status: 'PENDING',
      riskScore: 85,
      riskLevel: 'HIGH',
      createdBy: admin.id,
    },
    {
      documentNumber: 'PRB/004/2026',
      title: 'Perbaikan Jembatan',
      description: 'Perbaikan jembatan desa yang rusak',
      type: 'PERBAIKAN',
      amount: 125000000,
      date: new Date('2026-03-04'),
      status: 'REVISE',
      riskScore: 58,
      riskLevel: 'MEDIUM',
      createdBy: admin.id,
    },
    {
      documentNumber: 'OPS/005/2026',
      title: 'Operasional Kantor Desa',
      description: 'Biaya operasional kantor desa bulan Maret',
      type: 'OPERASIONAL',
      amount: 15000000,
      date: new Date('2026-03-05'),
      status: 'APPROVED',
      riskScore: 15,
      riskLevel: 'LOW',
      createdBy: admin.id,
    },
    {
      documentNumber: 'HIB/006/2026',
      title: 'Hibah UMKM',
      description: 'Bantuan hibah untuk pengembangan UMKM desa',
      type: 'HIBAH',
      amount: 35000000,
      date: new Date('2026-03-06'),
      status: 'APPROVED',
      riskScore: 30,
      riskLevel: 'LOW',
      createdBy: admin.id,
    },
    {
      documentNumber: 'BSO/007/2026',
      title: 'Bantuan Sosial Tunai',
      description: 'Distribusi bantuan sosial untuk warga kurang mampu',
      type: 'BANTUAN_SOSIAL',
      amount: 95000000,
      date: new Date('2026-03-07'),
      status: 'IN_REVIEW',
      riskScore: 45,
      riskLevel: 'MEDIUM',
      createdBy: admin.id,
    },
  ];

  for (const doc of sampleDocuments) {
    await prisma.document.create({
      data: doc,
    });
  }

  console.log('✅ Sample documents created');
  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
