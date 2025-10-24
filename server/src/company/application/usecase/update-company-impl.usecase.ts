import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { CompanyDbResponseDto } from 'src/company/domain/dto/company-db-response.dto'
import { UpdateCompanyRequestDto } from 'src/company/domain/dto/update-company-request.dto'
import type { CompanyRepository } from 'src/company/domain/repository/company.repsitory'
import { COMPANY_REPOSITORY } from 'src/company/domain/repository/company.repsitory'
import { UpdateCompanyUseCase } from 'src/company/domain/usecase/update-company.usecase'

@Injectable()
export class UpdateCompanyImplUseCase implements UpdateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: CompanyRepository,
  ) {}

  async execute(
    companyId: number,
    userId: number,
    data: UpdateCompanyRequestDto,
  ): Promise<CompanyDbResponseDto> {
    const existing = await this.companyRepository.findById(companyId)
    if (!existing) throw new ConflictException('The company does not exist')

    const company = await this.companyRepository.update(userId, companyId, data)
    if (!company) throw new ConflictException('Error to update company')

    return company
  }
}
