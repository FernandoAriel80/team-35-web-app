import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { CompanyDbResponseDto } from 'src/company/domain/dto/company-db-response.dto'
import { CreateCompanyRequestDto } from 'src/company/domain/dto/create-company-request.dto'
import type { CompanyRepository } from 'src/company/domain/repository/company.repsitory'
import { COMPANY_REPOSITORY } from 'src/company/domain/repository/company.repsitory'
import { CreateCompanyUseCase } from 'src/company/domain/usecase/create-company.usecase'

@Injectable()
export class CreateCompanyImplUseCase implements CreateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: CompanyRepository,
  ) {}
  async execute(
    userId: number,
    data: CreateCompanyRequestDto,
  ): Promise<CompanyDbResponseDto> {
    const companyExisting = await this.companyRepository.findByTaxId(data.taxId)
    if (companyExisting)
      throw new ConflictException('There is already a company with this RFC')

    const company = await this.companyRepository.create(userId, data)
    if (!company) throw new ConflictException('Error to create company')

    return company
  }
}
