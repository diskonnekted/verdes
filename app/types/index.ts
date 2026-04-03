// types/index.ts

export type Role = 'ADMIN' | 'VERIFIER' | 'AUDITOR' | 'KEPALA_DESA';

export type DocumentType = 
  | 'PENGADAAN' 
  | 'PEMBELIAN' 
  | 'PEMBANGUNAN' 
  | 'PERBAIKAN' 
  | 'OPERASIONAL' 
  | 'HIBAH' 
  | 'BANTUAN_SOSIAL';

export type DocumentStatus = 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'REVISE';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type VerificationStatus = 'APPROVED' | 'REJECTED' | 'NEEDS_REVISION';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  documentNumber: string;
  title: string;
  description?: string;
  type: DocumentType;
  amount: number;
  date: Date;
  status: DocumentStatus;
  riskScore?: number;
  riskLevel?: RiskLevel;
  notes?: string;
  filePath?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  verifications?: Verification[];
  checklistItems?: ChecklistItem[];
}

export interface Verification {
  id: string;
  documentId: string;
  reviewerId: string;
  status: VerificationStatus;
  comments?: string;
  findings?: string;
  reviewedAt: Date;
  createdAt: Date;
}

export interface ChecklistItem {
  id: string;
  documentId: string;
  label: string;
  isChecked: boolean;
  isRequired: boolean;
  category?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export interface StatCard {
  label: string;
  value: number | string;
  icon: string;
  color: 'green' | 'blue' | 'yellow' | 'red';
}
