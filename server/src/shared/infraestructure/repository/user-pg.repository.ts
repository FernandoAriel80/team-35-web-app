import { Injectable } from '@nestjs/common'
import { CreateUserDto } from 'src/users/domain/dto/create-user.dto'
import { UserDto } from 'src/users/domain/dto/user.dto'
import { UserRepository } from 'src/users/domain/repository/user.repository'
import { PrismaService } from '../database/prisma.service'

@Injectable()
export class UserPgRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = this.prismaService.user.create({ createUserDto })
    return user
  }

  findByEmail(UserId: string): Promise<UserDto> {
      
  }
}
