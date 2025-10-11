import { CreateAuthDto } from '../dto/create-auth.dto'
import { CreateRegisterResponseDto } from '../dto/create-register-response.dto'

export const REGISTER_AUTH_USE_CASE = 'REGISTER_AUTH_USE_CASE'
export interface RegisterAuthUseCase {
  execute(createAuthDeto: CreateAuthDto): Promise<CreateRegisterResponseDto>
}
