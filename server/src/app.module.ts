import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './shared/infraestructure/database/prisma.module'
import { SharedModule } from './shared/shared.module'
import { DocusignModule } from './docusign/docusign.module'
import { CompanyModule } from './company/company.module'

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    SharedModule,
    DocusignModule,
    CompanyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
