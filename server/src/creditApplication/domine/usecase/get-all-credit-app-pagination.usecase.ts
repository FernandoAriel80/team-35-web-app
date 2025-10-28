import { CreditAppResPaginationDto } from '../dto/credit-app-res-pagination.dto'

export const GET_ALL_CREDIT_APP_PAGINATION_USECASE =
  'GET_ALL_CREDIT_APP_PAGINATION_USECASE'
export interface GetAllCreditAppPaginationUseCase {
  execute(
    page: number,
    limit: number,
    search?: string,
  ): Promise<CreditAppResPaginationDto>
}
