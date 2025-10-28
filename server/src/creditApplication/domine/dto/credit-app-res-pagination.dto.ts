// dto/credit-application-response.dto.ts
export class UserResponseDto {
  id: number
  name: string
  email: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export class CompanyResponseDto {
  id: number
  userId: number
  name: string
  type: string
  taxId: string
  activity: string
  employeeCount: number
  address: string
  website?: string | null
  email: string
  user: UserResponseDto
}

/* export class DigitalSignatureResponseDto {
  id: number
  creditApplicationId: number
  documentId?: number | null
  userId: number
  signatureData: string
  signedAt: Date
  createdAt: Date
} */

export class DocumentResponseDto {
  id: number
  creditApplicationId: number
  url: string
  uploadedAt: Date
  //digitalSignatures: DigitalSignatureResponseDto[]
}

export class CreditApplicationResponseDto {
  id: number
  companyId: number
  requestedAmount: number
  status: string
  createdAt: Date
  updatedAt: Date
  company: CompanyResponseDto
  //digitalSignature: DigitalSignatureResponseDto[]
  documents: DocumentResponseDto[]
}

export class PaginationInfoDto {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNext: boolean
  hasPrev: boolean
}

export class CreditAppResPaginationDto {
  data: CreditApplicationResponseDto[]
  pagination: PaginationInfoDto
}
