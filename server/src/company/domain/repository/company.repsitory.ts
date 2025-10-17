import { CreateCompanyRequestDto } from '../dto/create-company-request.dto'
import { CompanyDbResponseDto } from '../dto/company-db-response.dto'
import { UpdateCompanyRequestDto } from '../dto/update-company-request.dto'

export const COMPANY_REPOSITORY = 'COMPANY_REPOSITORY'
export interface CompanyRepository {
  all(): Promise<CompanyDbResponseDto[] | null>

  findAllByUserId(userid: number): Promise<CompanyDbResponseDto[] | null>

  findByTaxId(taxId: string): Promise<CompanyDbResponseDto | null>

  create(
    userId: number,
    data: CreateCompanyRequestDto,
  ): Promise<CompanyDbResponseDto | null>

  update(data: UpdateCompanyRequestDto): Promise<CompanyDbResponseDto | null>

  destroy(id: number): Promise<CompanyDbResponseDto | null>
}
