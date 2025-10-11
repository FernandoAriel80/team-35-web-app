import { CreateAuthDto } from 'src/auth/domain/dto/create-auth.dto'
import { UserCreateValidatedDto } from 'src/auth/domain/dto/user-create-validated.dto'

export class RegisterResponseMapper {
  static toDto(
    createAuthDto: CreateAuthDto,
    hashedPassword: string,
  ): UserCreateValidatedDto {
    return {
      name: createAuthDto.name,
      email: createAuthDto.email,
      password: hashedPassword,
    }
  }
}
