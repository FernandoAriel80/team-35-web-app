import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { RegisterTokenDto } from './dto/register.token.dto'

/**
 * Authentication service responsible for user registration, login, token management, and logout.
 *
 * @class AuthService
 * @public
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Registers a new user in the system.
   *
   * @param firstName - User's first name (will be converted to lowercase)
   * @param lastName - User's last name (will be converted to lowercase)
   * @param email - User's email address (must be unique)
   * @param password - User's password (will be hashed before storage)
   * @returns {Promise<{id: number, email: string, createdAt: Date}>} User data without sensitive information
   * @throws {ConflictException} When email is already registered
   * @example
   * const user = await authService.register('John', 'Doe', 'john@example.com', 'password123');
   */
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
   * Validates user credentials for authentication.
   *
   * @param email - User's email address
   * @param password - User's plain text password
   * @returns {Promise<any>} User object if credentials are valid, null otherwise
   * @example
   * const user = await authService.validateUser('john@example.com', 'password123');
   * if (user) { // credentials are valid }
   */
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (!user) return null
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return null
    return user
  }

  /**
   * Generates JWT tokens for authenticated user.
   *
   * @param user - User data for token generation
   * @returns {Object} Object containing access and refresh tokens
   * @returns {string} return.accessToken - JWT access token (short-lived)
   * @returns {string} return.refreshToken - JWT refresh token (long-lived)
   * @example
   * const tokens = await authService.login(user);
   * // { accessToken: 'eyJ...', refreshToken: 'eyJ...' }
   */
  login(user: RegisterTokenDto) {
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
  }

  /**
   * Refreshes authentication tokens using a valid refresh token.
   *
   * @param refreshTokenPayload - Decoded RegisterTokenDto from refresh token
   * @returns {Promise<Object>} New access and refresh tokens
   * @throws {UnauthorizedException} When user not found or token version mismatch
   * @example
   * const newTokens = await authService.refreshTokens(refreshTokenPayload);
   */

  async refreshTokens(refreshTokenPayload: RegisterTokenDto) {
    const user = await this.usersService.findById(refreshTokenPayload.id)
    if (!user) throw new UnauthorizedException()
    if (user.tokenVersion !== refreshTokenPayload.tokenVersion)
      throw new UnauthorizedException()
    const tokens = this.login(user)
    return tokens
  }

  /**
   * Validates JWT refresh token and returns its payload.
   *
   * @param token JWT refresh token string
   * @returns Decoded token payload
   * @throws ForbiddenException if token is invalid or missing subject
   */
  verifyRefreshToken(token: string): RegisterTokenDto {
    const payload = this.jwtService.verify<RegisterTokenDto>(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    })

    if (!payload.id) {
      throw new ForbiddenException('Refresh token inválido')
    }

    return payload
  }

  /**
   * Invalidates all refresh tokens for a user by incrementing token version.
   * This effectively logs the user out from all devices.
   *
   * @param userId - ID of the user to logout
   * @returns {Promise<void>}
   * @example
   * await authService.logout('123');
   */
  async logout(userId: string) {
    await this.usersService.incrementTokenVersion(userId)
  }
}
