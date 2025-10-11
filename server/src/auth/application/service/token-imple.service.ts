import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { JwtPayloadDto } from 'src/auth/domain/dto/jwt-payload.dto'
import { TokenValidationResultDto } from 'src/auth/domain/dto/token-validation-resultDto'
import type { AuthRepository } from 'src/auth/domain/repository/auth.repository'
import { AUTH_PG_REPOSITORY } from 'src/auth/domain/repository/auth.repository'
import { TokenService } from 'src/auth/domain/service/token.service'

export interface AuthenticatedRequest extends Request {
  headers: {
    authorization?: string
  }
}

@Injectable()
export class TokenImplService implements TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(AUTH_PG_REPOSITORY)
    private authPgRepository: AuthRepository,
  ) {}

  async validateAndRenewToken(
    token: string,
  ): Promise<TokenValidationResultDto> {
    // Verificar el token actual
    const userPayload = await this.jwtService.verifyAsync<JwtPayloadDto>(
      token,
      {
        secret: process.env.JWT_ACCESS_SECRET,
      },
    )

    if (!userPayload) throw new UnauthorizedException('Token is invalid')

    // Obtener datos completos del usuario desde la base de datos
    const user = await this.authPgRepository.findByEmail(userPayload.email)
    if (!user) {
      throw new UnauthorizedException('User not found')
    }
    const payload = {
      sub: userPayload.userId,
      email: userPayload.email,
    }
    const newToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
      secret: process.env.JWT_ACCESS_SECRET,
    })
    return {
      new_access_token: newToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      expires_in: 3600,
      valid: true,
    }
  }

  extractToken(request: AuthenticatedRequest): string {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header')
    }

    // Verifica que empiece con "Bearer "
    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token format')
    }

    return authHeader.substring(7)
  }
}
