export interface NewCompany {
  name: string
  type: string
  taxId: string
  activity: string
  employeeCount: number | '' // Usamos '' para el estado inicial del input de tipo number
  address: string
  website: string
  email: string
}
