import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayloadGuardDto } from 'src/shared/domain/dto/jwt-payload-guard.dto'
import { USER_REPOSITORY } from 'src/users/domain/repository/user.repository'
import type { UserRepository } from 'src/users/domain/repository/user.repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET!,
    })
  }

  async validate({ id }: JwtPayloadGuardDto) {
    const user = await this.userRepository.findOne(id)

    if (!user) throw new UnauthorizedException('Token not valid')
    return user
  }
}
