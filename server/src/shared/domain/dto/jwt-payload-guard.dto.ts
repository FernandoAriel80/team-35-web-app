import { UserRole } from '../enums/user-role.enum'

export interface JwtPayloadGuardDto {
  id: number
  name: string
  role: UserRole
}
