import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { CompanyDbResponseDto } from 'src/company/domain/dto/company-db-response.dto'
import type { CompanyRepository } from 'src/company/domain/repository/company.repsitory'
import { COMPANY_REPOSITORY } from 'src/company/domain/repository/company.repsitory'
import { DeleteCompanyUseCase } from 'src/company/domain/usecase/delete-company.usecase'

@Injectable()
export class DeleteCompanyimplUseCase implements DeleteCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: CompanyRepository,
  ) {}
  async execute(id: number): Promise<CompanyDbResponseDto | null> {
    const existing = await this.companyRepository.findById(id)
    if (!existing) throw new ConflictException('The company does not exist')

    const company = await this.companyRepository.delete(id)
    if (!company) throw new ConflictException('Error to delete company')
    return company
  }
}
