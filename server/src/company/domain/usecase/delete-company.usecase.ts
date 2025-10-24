import { CompanyDbResponseDto } from '../dto/company-db-response.dto'

export const DELETE_COMPANY_USECASE = 'DELETE_COMPANY_USECASE'
export interface DeleteCompanyUseCase {
  execute(id: number): Promise<CompanyDbResponseDto | null>
}
