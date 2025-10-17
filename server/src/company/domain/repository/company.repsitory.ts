import { CreateCompanyRequestDto } from '../dto/create-company-request.dto'
import { CompanyDbResponseDto } from '../dto/company-db-response.dto'

export const COMPANY_REPOSITORY = 'COMPANY_REPOSITORY'
export interface CompanyRepository {
  create(
    userId: number,
    data: CreateCompanyRequestDto,
  ): Promise<CompanyDbResponseDto | null>

  findByTaxId(taxId: string): Promise<CompanyDbResponseDto | null>

  /* update(
    data: CreateCompanyRequestDto,
  ): Promise<CompanyDbResponseDto | null> */
}
