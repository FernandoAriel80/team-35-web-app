import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/infraestructure/database/prisma.module'
import { DIGITAL_SIGNATURE_REPOSITORY } from './domine/repository/digital-signature-repository'
import { DigitalSignatureImplRepository } from './infraestructure/repository/digital-signature-pg-repository'

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: DIGITAL_SIGNATURE_REPOSITORY,
      useClass: DigitalSignatureImplRepository,
    },
  ],
  exports: [DIGITAL_SIGNATURE_REPOSITORY],
})
export class DigitalSignatureModule {}
