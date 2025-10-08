import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { AuthDto } from 'src/auth/domain/dto/auth.dto'
import { CreateAuthDto } from 'src/auth/domain/dto/create-auth.dto'
import type { AuthRepository } from 'src/auth/domain/repository/auth.repository'
import { AUTH_PG_REPOSITORY } from 'src/auth/domain/repository/auth.repository'
import { RegisterAuthUseCase } from 'src/auth/domain/usecase/register-auth.usecase'
import { PasswordService } from '../service/password-impl.service'

@Injectable()
export class RegisterAuthImplUseCase implements RegisterAuthUseCase {
  constructor(
    @Inject(AUTH_PG_REPOSITORY)
    private readonly authPgRepository: AuthRepository,
    private readonly passwordImplService: PasswordService,
  ) {}
  async execute(createAuthDto: CreateAuthDto): Promise<AuthDto> {
    const existing = await this.authPgRepository.findByEmail(
      createAuthDto.email,
    )
    if (!existing) throw new ConflictException('Email already registered')
    const hashedPassword = await this.passwordImplService.hashPassword(
      createAuthDto.password,
    )
    return await this.authPgRepository.create({
      ...createAuthDto,
      password: hashedPassword,
    })
  }
}
