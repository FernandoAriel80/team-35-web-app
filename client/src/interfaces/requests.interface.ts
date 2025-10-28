export interface Request {
  id: number;
  userId: number;
  name: string;
  type: string;
  taxId: string;
  activity: string;
  employeeCount: number;
  address: string;
  website: null | string;
  email: string;
}