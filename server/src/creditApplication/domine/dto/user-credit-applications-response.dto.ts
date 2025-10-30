export interface UserCreditApplicationsResponseDto {
  id: number
  requestedAmount: number
  status: string
  createdAt: Date
  updatedAt: Date
  company: {
    id: number
    name: string
    type: string
    taxId: string
    activity: string
    employeeCount: number
    address: string
    website?: string
    email: string
  }
  documents: {
    id: number
    url: string
    uploadedAt: Date
  }[]
  digitalSignature: {
    id: number
    url: string
    uploadedAt: Date
    // Agrega los campos específicos de DigitalSignature según tu schema
  }[]
}
