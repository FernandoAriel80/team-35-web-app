import { CompanyDbResponseDto } from '../dto/company-db-response.dto'

export const GET_ALL_COMPANY_USECASE = 'GET_ALL_COMPANY_USECASE'
export interface GetAllCompanyUseCase {
  execute(): Promise<CompanyDbResponseDto[]>
}
