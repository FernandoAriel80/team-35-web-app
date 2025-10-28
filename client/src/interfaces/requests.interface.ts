import type { Company } from "./company.interface";

export type StatusRequest = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface Request {
  id: number;
  requestedAmount: number;
  status: StatusRequest
  createdAt: Date;
  updatedAt: Date;
  company: Company;
  documents: Document[];
}

export interface Document {
  id: number;
  url: string;
  uploadedAt: Date;
}