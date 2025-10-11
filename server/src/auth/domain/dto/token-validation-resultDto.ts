export interface TokenValidationResultDto {
  new_access_token: string
  refresh_token?: string
  user: {
    id: number
    email: string
    name?: string
    role?: string
  }
  expires_in: number
  valid: boolean
}
