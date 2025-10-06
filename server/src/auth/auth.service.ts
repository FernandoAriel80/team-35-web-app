import {
  Injectable,
  ConflictException,
  //UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'
//import { JwtService } from '@nestjs/jwt'
//import { RegisterTokenDto } from './dto/register.token.dto'
//import { Payload } from './dto/payload.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    //private jwtService: JwtService,
  ) {}

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const existing = await this.usersService.findByEmail(email)
    if (existing) throw new ConflictException('Email ya registrado')

    const hashed = await bcrypt.hash(password, 12)
    const user = await this.usersService.createUser(
      firstName,
      lastName,
      email,
      hashed,
    )

    return { id: user.id, email: user.email, createdAt: user.createdAt }
  }

  /**
   *
   * @param email
   * @param password
   * @returns
   */
  /* async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (!user) return null
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return null
    return user
  }
 */
  /**
   *
   * @param user RegisterTokenDto
   * @returns // devuelve token
   */
  /* login(user: RegisterTokenDto) {
    const accessToken = this.jwtService.sign(
      { sub: user.id },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || '15m',
      },
    )
    const refreshToken = this.jwtService.sign(
      { sub: user.id, tokenVersion: user.tokenVersion },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
      },
    )
    return { accessToken, refreshToken }
  } */

  /**
   *
   *@param refreshTokenPayload Payload
   *@returns // genera nuevos tokens
   *payload ya decodificado en controller (o aquí con verify)
   */

  /* async refreshTokens(refreshTokenPayload: Payload) {
    const user = await this.usersService.findById(refreshTokenPayload.sub)
    if (!user) throw new UnauthorizedException()
    if (user.tokenVersion !== refreshTokenPayload.tokenVersion)
      throw new UnauthorizedException()
    const tokens = this.login(user)
    return tokens
  } */

  /**
   *
   * @param userId string
   * invalidar refresh tokens incrementando tokenVersion
   */
  /* async logout(userId: string) {
    await this.usersService.incrementTokenVersion(userId)
  } */
}
