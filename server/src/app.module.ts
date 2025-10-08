import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './shared/infraestructure/database/prisma.module'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
