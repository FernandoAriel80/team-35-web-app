import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { UsersService } from '../../users/users.service'
import { Payload } from '../dto/payload.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET!, // ← Usar ! para afirmar que existe
    })
  }

  async validate(payload: Payload) {
    const user = await this.usersService.findById(payload.sub)
    if (!user) return null
    return { id: user.id, email: user.email }
  }
}
