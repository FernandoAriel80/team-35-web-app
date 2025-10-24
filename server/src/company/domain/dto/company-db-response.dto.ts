export interface CompanyDbResponseDto {
  id: number
  name: string
  type: string
  taxId: string
  activity: string
  employeeCount: number
  address: string
  webSite?: string
  email: string
}
