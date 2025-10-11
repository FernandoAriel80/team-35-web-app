import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common'
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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { LogoutResponseDto } from 'src/auth/domain/dto/logout-response.dto'
import { CreateRegisterResponseDto } from 'src/auth/domain/dto/create-register-response.dto'

/**
 * Authentication Controller
 *
 * @description Handles user authentication operations including registration,
 * login, and logout. Provides JWT-based authentication system.
 *
 * @class AuthController
 * @version 1.0
 */
@ApiTags('Authentication')
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

  /**
   * Register a new user account
   *
   * @description Creates a new user with email and password credentials.
   * Validates input and returns user data upon successful registration.
   *
   * @param {CreateAuthDto} dto - User registration data
   * @returns {Promise<AuthDto>} Registered user information
   * @throws {BadRequestException} When required fields are missing
   *
   * @example
   * POST /auth/register
   * {
   *   "email": "user@example.com",
   *   "password": "securePassword123"
   * }
   */
  @Post('register')
  @ApiOperation({
    summary: 'Register new user',
    description:
      'Creates a new user account with email and password credentials',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered and returned',
    type: AuthDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input - email and password are required',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - user with this email already exists',
  })
  async register(
    @Body() dto: CreateAuthDto,
  ): Promise<CreateRegisterResponseDto> {
    if (!dto.email || !dto.password) {
      throw new BadRequestException('Email and password are required')
    }
    return await this.registerAuthImplUseCase.execute(dto)
  }

  /**
   * Authenticate user and generate access token
   *
   * @description Validates user credentials and returns authentication tokens
   * for accessing protected endpoints.
   *
   * @param {LoginDto} loginDto - User login credentials
   * @returns {Promise<LoginResponse>} Authentication tokens and user data
   * @throws {BadRequestException} When credentials are missing
   * @throws {UnauthorizedException} When credentials are invalid
   *
   * @example
   * POST /auth/login
   * {
   *   "email": "user@example.com",
   *   "password": "securePassword123"
   * }
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Authenticate user',
    description:
      'Validates credentials and returns JWT tokens for authentication',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful - returns access token and user data',
    type: LoginResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - email and password are required',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid email or password',
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    if (!loginDto.email || !loginDto.password) {
      throw new BadRequestException('Email and password are required')
    }
    return await this.loginAuthImplUseCase.execute(
      loginDto.password,
      loginDto.email,
    )
  }

  /**
   * Terminate user session
   *
   * @description Invalidates the current user's authentication token
   * and terminates the active session. Requires valid JWT authentication.
   *
   * @param {logoutRequestDto} req - Authenticated request object
   * @returns {Promise<{message: string}>} Success confirmation
   *
   * @example
   * POST /auth/logout
   * Headers: { "Authorization": "Bearer <jwt-token>" }
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Terminate user session',
    description:
      'Invalidates authentication token and ends user session. Requires JWT.',
  })
  @ApiResponse({
    status: 200,
    description: 'Logout successful - session terminated',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or missing authentication token',
  })
  logout(@Req() req: logoutRequestDto): LogoutResponseDto {
    const userId = req.user.id
    return this.logoutAuthUseCase.execute(userId)
  }
}
