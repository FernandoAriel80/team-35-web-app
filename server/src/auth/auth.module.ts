import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './infraestructure/controller/auth.controller'
import { AUTH_PG_REPOSITORY } from './domain/repository/auth.repository'
import { RegisterAuthImplUseCase } from './application/usecase/register-auth-impl.usecase'
import { PrismaModule } from 'src/shared/infraestructure/database/prisma.module'
import { AuthPgRepository } from './infraestructure/repository/auth-pg.repository'
import { REGISTER_AUTH_USE_CASE } from './domain/usecase/register-auth.usecase'
import { LOGOUT_AUTH_USE_CASE } from './domain/usecase/logout-auth.usecase'
import { LogoutAuthImplUseCase } from './application/usecase/logout-auth-impl.usecase'
import { LoginAuthImplUseCase } from './application/usecase/login-auth-impl.usecase'
import { PasswordService } from './application/service/password-impl.service'
import { SharedModule } from 'src/shared/shared.module'
import { LOGIN_AUTH_USE_CASE } from './domain/usecase/login-auth.usecase'

@Module({
  imports: [
    PrismaModule,
    SharedModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
    }),
  ],
  providers: [
    PasswordService,
    {
      provide: AUTH_PG_REPOSITORY,
      useClass: AuthPgRepository,
    },
    {
      provide: REGISTER_AUTH_USE_CASE,
      useClass: RegisterAuthImplUseCase,
    },
    {
      provide: LOGIN_AUTH_USE_CASE,
      useClass: LoginAuthImplUseCase,
    },
    {
      provide: LOGOUT_AUTH_USE_CASE,
      useClass: LogoutAuthImplUseCase,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
