import { UserCreditApplicationsResponseDto } from '../dto/user-credit-applications-response.dto'

export const GET_CREDIT_APPL_BY_USER_USECASE = 'GET_CREDIT_APPL_BY_USER_USECASE'
export interface GetCreditApplByUserUseCase {
  execute(userId: number): Promise<UserCreditApplicationsResponseDto[]>
}
