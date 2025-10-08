import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
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
import { LoginResponse } from 'src/auth/domain/dto/login-response.dto'
import { LoginAuthImplUseCase } from 'src/auth/application/usecase/login-auth-impl.usecase'
import { LOGIN_AUTH_USE_CASE } from 'src/auth/domain/usecase/login-auth.usecase'

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
    @Inject(LOGIN_AUTH_USE_CASE)
    private readonly loginAuthImplUseCase: LoginAuthImplUseCase,
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
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return await this.loginAuthImplUseCase.execute(
      loginDto.password,
      loginDto.email,
    )
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
