import { LoginResponse } from '../dto/login-response.dto'

export const LOGOUT_AUTH_USE_CASE = 'LOGOUT_AUTH_USE_CASE'
export interface LogoutAuthUseCase {
  execute(password: string, email: string): Promise<LoginResponse>
}
