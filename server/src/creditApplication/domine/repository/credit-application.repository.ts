import { CreditApplication } from '@prisma/client'
import { CreditApplicationRequestDto } from '../dto/creadit-app-request.dto'

export const CREDIT_APPLICATIONREPOSITORY = 'CREDIT_APPLICATIONREPOSITORY'
export interface CreditApplicationRepository {
  create(
    dataRequest: CreditApplicationRequestDto,
  ): Promise<CreditApplication | null>
  findById(id: number): Promise<CreditApplication | null>
}
