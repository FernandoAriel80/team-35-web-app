import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { CreditApplication } from '@prisma/client'
import { CREDIT_APPLICATION_REPOSITORY } from 'src/creditApplication/domine/repository/credit-application.repository'
import type { CreditApplicationRepository } from 'src/creditApplication/domine/repository/credit-application.repository'
import { UpdateStatusCreditAppUseCase } from 'src/creditApplication/domine/usecase/update-status-credit-app.usecase'
import { ApplicationStatus } from 'src/shared/domain/enums/application-status.enum'

@Injectable()
export class UpdateStatusCreditAppImplUseCase
  implements UpdateStatusCreditAppUseCase
{
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private creditApplicationRepository: CreditApplicationRepository,
  ) {}
  async execute(
    id: number,
    status: ApplicationStatus,
  ): Promise<CreditApplication> {
    const result = await this.creditApplicationRepository.findById(id)
    if (!result)
      throw new ConflictException('The credit application does not exist.')

    const creditApp = await this.creditApplicationRepository.updateStatus(
      id,
      status,
    )
    if (!creditApp)
      throw new ConflictException('Error to update credit application')
    return creditApp
  }
}
