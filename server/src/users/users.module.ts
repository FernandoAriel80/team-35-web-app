import { Module } from '@nestjs/common'
import { UsersService } from './application/service/users.service'
import { PrismaModule } from 'prisma/prisma.module'
import { UserPgRepository } from 'src/shared/infraestructure/repository/user-pg.repository'

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UserPgRepository],
  exports: [UserPgRepository],
})
export class UsersModule {}
