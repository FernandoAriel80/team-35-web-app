import { ApplicationStatus } from 'src/shared/domain/enums/application-status.enum'

export interface CreditAppDbResponseDto {
  id: number
  companyId: number
  requestedAmount: number
  status: ApplicationStatus
}
