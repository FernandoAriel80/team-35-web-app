import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { SendContractUseCase } from '../../domain/usecase/send-contract.usecase'
import { DOCUSEAL_SERVICE } from '../../domain/service/docuseal.service'
import type { DocusealService } from '../../domain/service/docuseal.service'
import { CREDIT_APPLICATION_REPOSITORY } from 'src/creditApplication/domine/repository/credit-application.repository'
import type { CreditApplicationRepository } from 'src/creditApplication/domine/repository/credit-application.repository'

@Injectable()
export class SendContractImplUseCase implements SendContractUseCase {
  constructor(
    @Inject(DOCUSEAL_SERVICE)
    private readonly docusealService: DocusealService,
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly creditApplicationRepository: CreditApplicationRepository,
  ) {}

  async execute(email: string, creditAppId: number): Promise<void> {
    const result = this.docusealService.sendContract(email, creditAppId)
    if (!result) throw new ConflictException('Error sending request')
    const status = await this.creditApplicationRepository.updateStatus(
      creditAppId,
      'PENDING_SIGN',
    )
    if (!status) throw new ConflictException('Error to update status')
    return result
  }
}
