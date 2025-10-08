import { Role } from '../enums/role.enum'

export class AuthDto {
  id: string
  firstName: string
  lastName: string
  email: string
  role: Role
}
