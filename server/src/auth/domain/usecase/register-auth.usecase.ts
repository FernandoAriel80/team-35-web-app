import { AuthDto } from '../dto/auth.dto'
import { CreateAuthDto } from '../dto/create-auth.dto'

export const REGISTER_AUTH_USE_CASE = 'REGISTER_AUTH_USE_CASE'
export interface RegisterAuthUseCase {
  execute(createAuthDeto: CreateAuthDto): Promise<AuthDto>
}
