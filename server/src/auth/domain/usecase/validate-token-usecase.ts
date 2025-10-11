import { Request } from 'express'
import { TokenValidationResultDto } from '../dto/token-validation-resultDto'

export const VALIDATE_TOKEN_USE_CASE = 'VALIDATE_TOKEN_USE_CASE'
export interface ValidateTokenUseCase {
  execute(token: Request): Promise<TokenValidationResultDto>
}
