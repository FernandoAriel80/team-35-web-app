import { Global, Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/infraestructure/database/prisma.module'

@Global()
@Module({
  imports: [PrismaModule],
  providers: [],
  exports: [],
})
export class SharedModule {}
