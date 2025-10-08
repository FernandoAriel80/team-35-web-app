import { Module } from '@nestjs/common'
import { UsersService } from './application/service/users.service'
import { UserPgRepository } from 'src/shared/infraestructure/repository/user-pg.repository'
import { PrismaModule } from 'src/shared/infraestructure/database/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UserPgRepository],
  exports: [UserPgRepository],
})
export class UsersModule {}
