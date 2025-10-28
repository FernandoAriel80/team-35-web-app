import { CreditApplication } from '@prisma/client'
import { ApplicationStatus } from 'src/shared/domain/enums/application-status.enum'

export const UPDATE_STATUS_CREDIT_APP_USECASE =
  'UPDATE_STATUS_CREDIT_APP_USECASE'
export interface UpdateStatusCreditAppUseCase {
  execute(id: number, status: ApplicationStatus): Promise<CreditApplication>
}
