import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { CreateAuthDto } from 'src/auth/domain/dto/create-auth.dto'
import type { AuthRepository } from 'src/auth/domain/repository/auth.repository'
import { AUTH_PG_REPOSITORY } from 'src/auth/domain/repository/auth.repository'
import { RegisterAuthUseCase } from 'src/auth/domain/usecase/register-auth.usecase'
import { PasswordService } from '../service/password-impl.service'
import { JwtService } from '@nestjs/jwt'
import { CreateRegisterResponseDto } from 'src/auth/domain/dto/create-register-response.dto'
import { RegisterResponseMapper } from 'src/auth/infraestructure/mapper/register-response.mapper'

@Injectable()
export class RegisterAuthImplUseCase implements RegisterAuthUseCase {
  constructor(
    @Inject(AUTH_PG_REPOSITORY)
    private readonly authPgRepository: AuthRepository,
    private readonly passwordImplService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}
  async execute(
    createAuthDto: CreateAuthDto,
  ): Promise<CreateRegisterResponseDto> {
    const existing = await this.authPgRepository.findByEmail(
      createAuthDto.email,
    )
    if (existing) throw new ConflictException('Email already registered')
    const hashedPassword = await this.passwordImplService.hashPassword(
      createAuthDto.password,
    )
    const userCreated = await this.authPgRepository.create(
      RegisterResponseMapper.toDto(createAuthDto, hashedPassword),
    )

    const payload = {
      sub: userCreated.id,
      email: userCreated.email,
      role: userCreated.role,
      name: userCreated.name,
    }

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
      secret: process.env.JWT_ACCESS_SECRET,
    })
    return {
      access_token: accessToken,
      user: {
        id: userCreated.id,
        email: userCreated.email,
        name: userCreated.name,
        role: userCreated.role,
      },
      expires_in: 3600,
    }
  }
}
