import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaModule } from 'prisma/prisma.module'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
