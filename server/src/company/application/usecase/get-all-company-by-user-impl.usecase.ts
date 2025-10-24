import { Inject, Injectable } from '@nestjs/common'
import { CompanyDbResponseDto } from 'src/company/domain/dto/company-db-response.dto'
import type { CompanyRepository } from 'src/company/domain/repository/company.repsitory'
import { COMPANY_REPOSITORY } from 'src/company/domain/repository/company.repsitory'
import { GetAllCompanyByUserUseCase } from 'src/company/domain/usecase/get-all-company-by-user.usecase'

@Injectable()
export class GetAllCompanyByUserImplUseCase
  implements GetAllCompanyByUserUseCase
{
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: CompanyRepository,
  ) {}
  async execute(userId: number): Promise<CompanyDbResponseDto[] | []> {
    const companies = await this.companyRepository.findAllByUserId(userId)
    return companies ? companies : []
  }
}
