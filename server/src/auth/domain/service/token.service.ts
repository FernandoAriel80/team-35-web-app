import { TokenValidationResultDto } from '../dto/token-validation-resultDto'
import { Request } from 'express'

export const TOKEN_SERVICE = 'TOKEN_SERVICE'
export interface TokenService {
  validateAndRenewToken(token: string): Promise<TokenValidationResultDto>
  extractToken(request: Request): string
}
