import { CompanyDbResponseDto } from '../dto/company-db-response.dto'
import { UpdateCompanyRequestDto } from '../dto/update-company-request.dto'

export const UPDATE_COMPANY_USECASE = 'UPDATE_COMPANY_USECASE'
export interface UpdateCompanyUseCase {
  execute(data: UpdateCompanyRequestDto): Promise<CompanyDbResponseDto>
}
