import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { UserCreditApplicationsResponseDto } from 'src/creditApplication/domine/dto/user-credit-applications-response.dto'
import { CREDIT_APPLICATION_REPOSITORY } from 'src/creditApplication/domine/repository/credit-application.repository'
import type { CreditApplicationRepository } from 'src/creditApplication/domine/repository/credit-application.repository'
import { GetCreditApplByUserUseCase } from 'src/creditApplication/domine/usecase/get-credit-appl-by-user.usecase'

@Injectable()
export class GetCreditApplByUserImplUseCase
  implements GetCreditApplByUserUseCase
{
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private creditApplicationRepository: CreditApplicationRepository,
  ) {}
  async execute(userId: number): Promise<UserCreditApplicationsResponseDto[]> {
    const creditApp = await this.creditApplicationRepository.findByUser(userId)
    if (!creditApp) throw new ConflictException('Error to get credits by user')
    return creditApp
  }
}
