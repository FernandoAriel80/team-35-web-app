import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import type { Response, Request } from 'express'
import { LoginDto } from '../../domain/dto/login.dto'
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard'
import { UserEntity } from 'src/users/domain/entity/user.entity'
import type { RegisterAuthUseCase } from 'src/auth/domain/usecase/register-auth.usecase'
import { REGISTER_AUTH_USE_CASE } from 'src/auth/domain/usecase/register-auth.usecase'
import { CreateAuthDto } from 'src/auth/domain/dto/create-auth.dto'
import { AuthDto } from 'src/auth/domain/dto/auth.dto'

/**
 * Represents cookies used for authentication.
 * `jid` stores the refresh token in an HttpOnly cookie.
 */
export interface MyCookies {
  jid?: string
}

/**
 * AuthController
 *
 * Handles user authentication flow: register, login, refresh and logout.
 * Uses JWT access/refresh tokens and stores the refresh token in a secure cookie.
 */
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(REGISTER_AUTH_USE_CASE)
    private readonly registerAuthImplUseCase: RegisterAuthUseCase,
  ) {}

  /**
   * Register a new user.
   * @param dto - User registration data.
   * @returns Created user data.
   */
  @Post('register')
  async register(@Body() dto: CreateAuthDto): Promise<AuthDto> {
    return await this.registerAuthImplUseCase.execute(dto)
  }

  /**
   * Authenticate user credentials and issue access/refresh tokens.
   * The refresh token is set in an HttpOnly cookie.
   */
  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(dto.email, dto.password)
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const { accessToken, refreshToken } = this.authService.login(user)

    // Store refresh token securely in cookie
    res.cookie('jid', refreshToken, {
      httpOnly: true,
      path: '/auth/refresh-token',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    return { accessToken }
  }

  /**
   * Refresh access and refresh tokens using the existing refresh token cookie.
   */
  @Post('refresh-token')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = (req.cookies as MyCookies).jid
    if (!token) throw new UnauthorizedException()

    const payload = this.authService.verifyRefreshToken(token)
    const tokens = await this.authService.refreshTokens(payload)

    res.cookie('jid', tokens.refreshToken, {
      httpOnly: true,
      path: '/auth/refresh-token',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    return { accessToken: tokens.accessToken }
  }

  /**
   * Logout user and clear the refresh token cookie.
   * Requires a valid access token (JWT).
   */
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as UserEntity
    await this.authService.logout(user.id)
    res.clearCookie('jid', { path: '/auth/refresh-token' })
    return { status: 'ok' }
  }
}
