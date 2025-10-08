import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  //Res,
  UseGuards,
} from '@nestjs/common'
//import type { Response, Request } from 'express'
import { LoginDto } from '../../domain/dto/login.dto'
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard'
import type { RegisterAuthUseCase } from 'src/auth/domain/usecase/register-auth.usecase'
import { REGISTER_AUTH_USE_CASE } from 'src/auth/domain/usecase/register-auth.usecase'
import { CreateAuthDto } from 'src/auth/domain/dto/create-auth.dto'
import { AuthDto } from 'src/auth/domain/dto/auth.dto'
import { LoginResponse } from 'src/auth/domain/dto/login-response.dto'
import { LOGIN_AUTH_USE_CASE } from 'src/auth/domain/usecase/login-auth.usecase'
import type { LoginAuthUseCase } from 'src/auth/domain/usecase/login-auth.usecase'
import type { logoutRequestDto } from 'src/auth/domain/dto/logout-request.dto'
import type { LogoutAuthUseCase } from 'src/auth/domain/usecase/logout-auth.usecase'
import { LOGOUT_AUTH_USE_CASE } from 'src/auth/domain/usecase/logout-auth.usecase'

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(REGISTER_AUTH_USE_CASE)
    private readonly registerAuthImplUseCase: RegisterAuthUseCase,
    @Inject(LOGIN_AUTH_USE_CASE)
    private readonly loginAuthImplUseCase: LoginAuthUseCase,
    @Inject(LOGOUT_AUTH_USE_CASE)
    private readonly logoutAuthUseCase: LogoutAuthUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateAuthDto): Promise<AuthDto> {
    return await this.registerAuthImplUseCase.execute(dto)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return await this.loginAuthImplUseCase.execute(
      loginDto.password,
      loginDto.email,
    )
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: logoutRequestDto) {
    const userId = req.user.id
    return this.logoutAuthUseCase.execute(userId)
  }
}
