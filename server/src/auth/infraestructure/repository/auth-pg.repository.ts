import { AuthDto } from 'src/auth/domain/dto/auth.dto'
import { AuthRepository } from 'src/auth/domain/repository/auth.repository'
import { PrismaService } from 'src/shared/infraestructure/database/prisma.service'
import { AuthMapper } from '../mapper/auth.mapper'
import { Injectable } from '@nestjs/common'
import { UserCreateValidatedDto } from 'src/auth/domain/dto/user-create-validated.dto'

@Injectable()
export class AuthPgRepository implements AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAuthDto: UserCreateValidatedDto): Promise<AuthDto> {
    const auth = await this.prismaService.user.create({
      data: createAuthDto,
    })
    return AuthMapper.toDto(auth)
  }

  async findByEmail(email: string): Promise<AuthDto | null> {
    const auth = await this.prismaService.user.findFirst({
      where: { email: email },
    })
    return auth ? AuthMapper.toDto(auth) : null
  }
  async findOne(authId: number): Promise<AuthDto | null> {
    const auth = await this.prismaService.user.findFirst({
      where: { id: authId },
    })
    return auth ? AuthMapper.toDto(auth) : null
  }
}
