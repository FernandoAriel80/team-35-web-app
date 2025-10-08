import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/infraestructure/database/prisma.service'

/**
 * UsersService
 *
 * Provides data access methods for the User entity.
 * Handles user lookup, creation, and token version management using Prisma ORM.
 */
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find a user by their email.
   * @param email - User email address.
   * @returns User record or null if not found.
   */
  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  /**
   * Find a user by their unique ID.
   * @param id - User UUID.
   * @returns User record or null if not found.
   */
  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  /**
   * Create a new user in the database.
   * @param firstName - User's first name.
   * @param lastName - User's last name.
   * @param email - User's email (must be unique).
   * @param hashedPassword - Hashed password to store securely.
   * @returns Created user record.
   */
  createUser(
    firstName: string,
    lastName: string,
    email: string,
    hashedPassword: string,
  ) {
    return this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    })
  }

  /**
   * Increment the user's token version.
   * Used to invalidate existing refresh tokens after logout or security events.
   * @param userId - User UUID.
   * @returns Updated user record.
   */
  incrementTokenVersion(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } },
    })
  }
}
