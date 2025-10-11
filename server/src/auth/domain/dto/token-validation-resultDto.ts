export interface TokenValidationResultDto {
  new_access_token: string
  refresh_token?: string
  expires_in: number
  valid: boolean
}
