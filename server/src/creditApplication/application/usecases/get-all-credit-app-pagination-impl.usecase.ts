import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { CreditAppResPaginationDto } from 'src/creditApplication/domine/dto/credit-app-res-pagination.dto'
import { CREDIT_APPLICATION_REPOSITORY } from 'src/creditApplication/domine/repository/credit-application.repository'
import type { CreditApplicationRepository } from 'src/creditApplication/domine/repository/credit-application.repository'
import { GetAllCreditAppPaginationUseCase } from 'src/creditApplication/domine/usecase/get-all-credit-app-pagination.usecase'

@Injectable()
export class GetAllCreditAppPaginationImplUseCase
  implements GetAllCreditAppPaginationUseCase
{
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private creditApplicationRepository: CreditApplicationRepository,
  ) {}
  async execute(
    page: number,
    limit: number,
    search?: string,
  ): Promise<CreditAppResPaginationDto> {
    const creditApp =
      await this.creditApplicationRepository.findAllWithPaginationAndSearch(
        page,
        limit,
        search,
      )
    if (!creditApp)
      throw new ConflictException('Error to get credit applicatios')
    return creditApp
  }
}
