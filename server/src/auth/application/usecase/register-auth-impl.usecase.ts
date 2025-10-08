import { Inject, Injectable } from '@nestjs/common'
import { AuthDto } from 'src/auth/domain/dto/auth.dto'
import { CreateAuthDto } from 'src/auth/domain/dto/create-auth.dto'
import type { AuthRepository } from 'src/auth/domain/repository/auth.repository'
import { AUTH_PG_REPOSITORY } from 'src/auth/domain/repository/auth.repository'
import { RegisterAuthUseCase } from 'src/auth/domain/usecase/register-auth.usecase'

@Injectable()
export class RegisterAuthImplUseCase implements RegisterAuthUseCase {
  constructor(
    @Inject(AUTH_PG_REPOSITORY)
    private readonly authPgRepository: AuthRepository,
  ) {}
  execute(createAuthDto: CreateAuthDto): Promise<AuthDto> {
    return this.authPgRepository.create(createAuthDto)
  }
}
