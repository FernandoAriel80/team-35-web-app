export interface UserPayload {
  id: number
  email: string
  role: string
  name?: string
  iat?: number
  exp?: number
}
