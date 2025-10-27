import { CompanyDbResponseDto } from '../dto/company-db-response.dto'

export const GET_ALL_COMPANY_BY_USER_USECASE = 'GET_ALL_COMPANY_BY_USER_USECASE'
export interface GetAllCompanyByUserUseCase {
  execute(userId: number): Promise<CompanyDbResponseDto[] | []>
}
