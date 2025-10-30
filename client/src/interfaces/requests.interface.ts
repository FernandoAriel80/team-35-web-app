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

export interface RequestResponse {
  data: Data[];
  // pagination: Pagination;
}

export interface Data {
  id: number;
  companyId: number;
  requestedAmount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  company: CompanyResponse;
  documents: DigitalSignature[];
  digitalSignature: DigitalSignature[];
}

export interface CompanyResponse {
  id: number;
  userId: number;
  name: string;
  type: string;
  taxId: string;
  activity: Date;
  employeeCount: number;
  address: string;
  website: string;
  email: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DigitalSignature {
  id: number;
  creditApplicationId: number;
  url: string;
  uploadedAt: Date;
}

// export interface Pagination {
//   currentPage: number;
//   totalPages: number;
//   totalItems: number;
//   itemsPerPage: number;
//   hasNext: boolean;
//   hasPrev: boolean;
// }
