import { CompanyDbResponseDto } from '../dto/company-db-response.dto'
import { CreateCompanyRequestDto } from '../dto/create-company-request.dto'

export const CREATE_COMPANY_USECASE = 'CREATE_COMPANY_USECASE'
export interface CreateCompanyUseCase {
  execute(
    userId: number,
    data: CreateCompanyRequestDto,
  ): Promise<CompanyDbResponseDto>
}
