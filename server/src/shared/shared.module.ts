// shared.module.ts
import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from 'src/shared/infraestructure/database/prisma.module'
import { PASSWORD_SERVICE } from 'src/shared/domain/service/password.service'
import { PasswordImplService } from 'src/shared/application/service/password-impl.service'
import { TOKEN_SERVICE } from 'src/shared/domain/service/toker.service'
import { TokenImplService } from 'src/shared/application/service/token-imple.service'
import { USER_REPOSITORY } from 'src/users/domain/repository/user.repository'
import { UserPgRepository } from 'src/users/infraestructure/repository/user-pg.repository'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './infraestructure/strategies/jwt.strategy'
import { JwtAuthGuard } from './infraestructure/guards/jwt-auth.guard'
import { RolesGuard } from './infraestructure/guards/roles.guard'
import { UPLOADFILE_SERVICE } from './domain/service/uploadfile.service'
import { UploadThingimplService } from './application/service/uploadthing-impl.service'

@Global()
@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), //,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '24h' }, // ← TIEMPO FIJO TEMPORAL
    }),
  ],
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    {
      provide: USER_REPOSITORY,
      useClass: UserPgRepository,
    },
    {
      provide: PASSWORD_SERVICE,
      useClass: PasswordImplService,
    },
    {
      provide: TOKEN_SERVICE,
      useClass: TokenImplService,
    },
    {
      provide: UPLOADFILE_SERVICE,
      useClass: UploadThingimplService,
    },
  ],
  exports: [
    USER_REPOSITORY,
    PASSWORD_SERVICE,
    TOKEN_SERVICE,
    UPLOADFILE_SERVICE,
    JwtModule,
    PrismaModule,
    JwtAuthGuard,
    RolesGuard,
    PassportModule,
  ],
})
export class SharedModule {}
