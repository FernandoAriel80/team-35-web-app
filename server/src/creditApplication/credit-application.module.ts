import { Module } from '@nestjs/common'
import { UPLOAD_APPLICATION_DOCUMENTS_USECASE } from './domine/usecase/upload-application-documents.usecase'
import { UploadApplicationDocumentsImplUseCase } from './application/usecases/upload-application-documents-impl.usecase'
import { CreditApplicationController } from './infraestructure/controller/credit-application/credit-application.controller'
import { SharedModule } from 'src/shared/shared.module'
import { PrismaModule } from 'src/shared/infraestructure/database/prisma.module'
import { DocumentModule } from 'src/document/document.module'
import { CREDIT_APPLICATIONREPOSITORY } from './domine/repository/credit-application.repository'
import { CreditApplicationDbRepository } from './infraestructure/repository/credit-application-pg.repository'
import { CompanyModule } from 'src/company/company.module'

@Module({
  imports: [SharedModule, PrismaModule, DocumentModule, CompanyModule],
  controllers: [CreditApplicationController],
  providers: [
    {
      provide: UPLOAD_APPLICATION_DOCUMENTS_USECASE,
      useClass: UploadApplicationDocumentsImplUseCase,
    },
    {
      provide: CREDIT_APPLICATIONREPOSITORY,
      useClass: CreditApplicationDbRepository,
    },
  ],
})
export class CreditApplicationModule {}
