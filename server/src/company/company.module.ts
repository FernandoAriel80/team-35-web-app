import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/infraestructure/database/prisma.module'
import { COMPANY_REPOSITORY } from './domain/repository/company.repsitory'
import { CompanyPgRepository } from './infraestructure/repository/company-pg.repository'
import { CompanyController } from './infraestructure/controller/company.controller'
import { CREATE_COMPANY_USECASE } from './domain/usecase/create-company.usecase'
import { CreateCompanyImplUseCase } from './application/usecase/create-company-impl.usecase'
import { GetAllCompanyByUserImplUseCase } from './application/usecase/get-all-company-by-user-impl.usecase'
import { GET_ALL_COMPANY_BY_USER_USECASE } from './domain/usecase/get-all-company-by-user.usecase'
import { UpdateCompanyImplUseCase } from './application/usecase/update-company-impl.usecase'
import { UPDATE_COMPANY_USECASE } from './domain/usecase/update-company.usecase'
import { DELETE_COMPANY_USECASE } from './domain/usecase/delete-company.usecase'
import { DeleteCompanyimplUseCase } from './application/usecase/dalete-company-impl.usecase'
import { GET_ALL_COMPANY_USECASE } from './domain/usecase/get-all-company.usecase'
import { GetAllCompanyImplUseCase } from './application/usecase/get-all-company-impl.usecase'

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: COMPANY_REPOSITORY,
      useClass: CompanyPgRepository,
    },
    {
      provide: CREATE_COMPANY_USECASE,
      useClass: CreateCompanyImplUseCase,
    },
    {
      provide: GET_ALL_COMPANY_BY_USER_USECASE,
      useClass: GetAllCompanyByUserImplUseCase,
    },
    {
      provide: UPDATE_COMPANY_USECASE,
      useClass: UpdateCompanyImplUseCase,
    },
    {
      provide: DELETE_COMPANY_USECASE,
      useClass: DeleteCompanyimplUseCase,
    },
    {
      provide: GET_ALL_COMPANY_USECASE,
      useClass: GetAllCompanyImplUseCase,
    },
  ],
  controllers: [CompanyController],
})
export class CompanyModule {}
