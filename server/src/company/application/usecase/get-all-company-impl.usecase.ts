import { Inject, Injectable } from '@nestjs/common'
import { CompanyDbResponseDto } from 'src/company/domain/dto/company-db-response.dto'
import type { CompanyRepository } from 'src/company/domain/repository/company.repsitory'
import { COMPANY_REPOSITORY } from 'src/company/domain/repository/company.repsitory'
import { GetAllCompanyUseCase } from 'src/company/domain/usecase/get-all-company.usecase'

Injectable()
export class GetAllCompanyImplUseCase implements GetAllCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: CompanyRepository,
  ) {}
  async execute(): Promise<CompanyDbResponseDto[]> {
    const companies = await this.companyRepository.all()
    return companies ? companies : []
  }
}
