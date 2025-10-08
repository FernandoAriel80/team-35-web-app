import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/infraestructure/database/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [],
  exports: [],
})
export class UsersModule {}
