import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { LoginAuthUseCase } from 'src/auth/domain/usecase/login-auth.usecase'
import type { AuthRepository } from 'src/auth/domain/repository/auth.repository'
import { AUTH_PG_REPOSITORY } from 'src/auth/domain/repository/auth.repository'
import { PasswordService } from '../service/password-impl.service'
import { JwtService } from '@nestjs/jwt'
import { LoginResponse } from 'src/auth/domain/dto/login-response.dto'

@Injectable()
export class LoginAuthImplUseCase implements LoginAuthUseCase {
  constructor(
    @Inject(AUTH_PG_REPOSITORY)
    private readonly authPgRepository: AuthRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}
  async execute(password: string, email: string): Promise<LoginResponse> {
    const user = await this.authPgRepository.findByEmail(email)

    if (!user) throw new ConflictException('Email is incorrect')
    const isPassword = await this.passwordService.comparePassword(
      password,
      user.password,
    )
    if (!isPassword) throw new ConflictException('Password is incorrect')

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    }

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_ACCESS_SECRET,
    })
    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      expires_in: 3600,
    }
  }
}
