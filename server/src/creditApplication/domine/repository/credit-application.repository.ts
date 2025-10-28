import { CreditApplication } from '@prisma/client'
import { CreditApplicationRequestDto } from '../dto/creadit-app-request.dto'
import { UserCreditApplicationsResponseDto } from '../dto/user-credit-applications-response.dto'
import { CreditAppResPaginationDto } from '../dto/credit-app-res-pagination.dto'

export const CREDIT_APPLICATION_REPOSITORY = 'CREDIT_APPLICATION_REPOSITORY'
export interface CreditApplicationRepository {
  findAllWithPaginationAndSearch(
    page: number,
    limit: number,
    search?: string,
  ): Promise<CreditAppResPaginationDto>
  create(
    dataRequest: CreditApplicationRequestDto,
  ): Promise<CreditApplication | null>
  findById(id: number): Promise<CreditApplication | null>
  findByUser(
    userId: number,
  ): Promise<UserCreditApplicationsResponseDto[] | null>
  updateStatus(id: number, status: string): Promise<CreditApplication | null>
}
