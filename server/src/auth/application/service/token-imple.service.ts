import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { JwtPayloadDto } from 'src/auth/domain/dto/jwt-payload.dto'
import { TokenValidationResultDto } from 'src/auth/domain/dto/token-validation-resultDto'
import { TokenService } from 'src/auth/domain/service/token.service'

export interface AuthenticatedRequest extends Request {
  headers: {
    authorization?: string
  }
}

@Injectable()
export class TokenImplService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

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
