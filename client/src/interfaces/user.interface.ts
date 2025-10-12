type Role = 'USER' | 'ADMIN' | 'OPERATOR'

export interface User {
  id: string
  email: string
  name: string
  role: Role
}