import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

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

  /* incrementTokenVersion(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } },
    })
  } */
}
