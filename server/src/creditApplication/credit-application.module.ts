import { forwardRef, Module } from '@nestjs/common'
import { UPLOAD_APPLICATION_DOCUMENTS_USECASE } from './domine/usecase/upload-application-documents.usecase'
import { UploadApplicationDocumentsImplUseCase } from './application/usecases/upload-application-documents-impl.usecase'
import { CreditApplicationController } from './infraestructure/controller/credit-application.controller'
import { SharedModule } from 'src/shared/shared.module'
import { PrismaModule } from 'src/shared/infraestructure/database/prisma.module'
import { DocumentModule } from 'src/document/document.module'
import { CREDIT_APPLICATION_REPOSITORY } from './domine/repository/credit-application.repository'
import { CreditApplicationDbRepository } from './infraestructure/repository/credit-application-pg.repository'
import { CompanyModule } from 'src/company/company.module'
import { GET_CREDIT_APPL_BY_USER_USECASE } from './domine/usecase/get-credit-appl-by-user.usecase'
import { GetCreditApplByUserImplUseCase } from './application/usecases/get-credit-appl-by-user-impl.usecase'
import { GET_ALL_CREDIT_APP_PAGINATION_USECASE } from './domine/usecase/get-all-credit-app-pagination.usecase'
import { GetAllCreditAppPaginationImplUseCase } from './application/usecases/get-all-credit-app-pagination-impl.usecase'
import { UPDATE_STATUS_CREDIT_APP_USECASE } from './domine/usecase/update-status-credit-app.usecase'
import { UpdateStatusCreditAppImplUseCase } from './application/usecases/update-status-credit-app-impl.usecase'

@Module({
  imports: [
    SharedModule,
    PrismaModule,
    DocumentModule,
    forwardRef(() => CompanyModule),
  ],
  controllers: [CreditApplicationController],
  providers: [
    {
      provide: UPLOAD_APPLICATION_DOCUMENTS_USECASE,
      useClass: UploadApplicationDocumentsImplUseCase,
    },
    {
      provide: GET_CREDIT_APPL_BY_USER_USECASE,
      useClass: GetCreditApplByUserImplUseCase,
    },
    {
      provide: GET_ALL_CREDIT_APP_PAGINATION_USECASE,
      useClass: GetAllCreditAppPaginationImplUseCase,
    },
    {
      provide: UPDATE_STATUS_CREDIT_APP_USECASE,
      useClass: UpdateStatusCreditAppImplUseCase,
    },
    {
      provide: CREDIT_APPLICATION_REPOSITORY,
      useClass: CreditApplicationDbRepository,
    },
  ],
  exports: [CREDIT_APPLICATION_REPOSITORY],
})
export class CreditApplicationModule {}
