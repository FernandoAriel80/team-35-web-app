import { AuthDto } from 'src/auth/domain/dto/auth.dto'
import { User } from '@prisma/client'
import { UserRole } from 'src/shared/domain/enums/user-role.enum'

export class AuthMapper {
  static toDto(user: User): AuthDto {
    return {
      id: user.id,
      name: user.name as string,
      email: user.email,
      role: user.role as UserRole,
      password: user.password,
    }
  }
}
