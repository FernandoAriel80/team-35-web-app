import { AuthDto } from 'src/auth/domain/dto/auth.dto'
import { User } from '@prisma/client'
import { Role } from 'src/auth/domain/enums/role.enum'

export class AuthMapper {
  static toDto(user: User): AuthDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role as Role,
    }
  }
}
