import { Module } from '@nestjs/common'
import { DOCUSEAL_SERVICE } from './domain/service/docuseal.service'
import { DocusealImplService } from './application/service/docuseal-impl.service'
import { DocuSignController } from './infrastructure/controller/docu-sign.controller'
import { SEND_CONTRACT_USE_CASE } from './domain/usecase/send-contract.usecase'
import { SendContractImplUseCase } from './application/usecase/send-contract-impl-use-case.service'
import { ProcessWebhookImplUseCase } from './application/usecase/process-webhook-impl.usecase'
import { PROCESS_WEBHOOK_USECASE } from './domain/usecase/process-webhook.usecase'
import { DigitalSignatureModule } from 'src/digitalSignature/digital-signature.module'
import { SharedModule } from 'src/shared/shared.module'
import { CreditApplicationModule } from 'src/creditApplication/credit-application.module'

@Module({
  imports: [DigitalSignatureModule, SharedModule, CreditApplicationModule],
  controllers: [DocuSignController],
  providers: [
    {
      provide: DOCUSEAL_SERVICE,
      useClass: DocusealImplService,
    },
    {
      provide: SEND_CONTRACT_USE_CASE,
      useClass: SendContractImplUseCase,
    },
    {
      provide: PROCESS_WEBHOOK_USECASE,
      useClass: ProcessWebhookImplUseCase,
    },
  ],
})
export class DocusignModule { }
