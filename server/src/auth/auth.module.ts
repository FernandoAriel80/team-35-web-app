import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './infraestructure/controller/auth.controller'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/application/service/users.service'
import { UserEntity } from 'src/users/domain/entity/user.entity'
import { AUTH_PG_REPOSITORY } from './domain/repository/auth.repository'
import { RegisterAuthImplUseCase } from './application/usecase/register-auth-impl.usecase'
import { PrismaModule } from 'src/shared/infraestructure/database/prisma.module'
import { AuthService } from './application/service/auth.service'

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    UserEntity,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    {
      provide: AUTH_PG_REPOSITORY,
      useClass: RegisterAuthImplUseCase,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
