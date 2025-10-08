import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayloadDto } from 'src/shared/domain/dto/jwt-payload.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET!, // ← Usar ! para afirmar que existe
    })
  }

  validate(jwtPayloadDto: JwtPayloadDto): JwtPayloadDto {
    return jwtPayloadDto
  }
}
