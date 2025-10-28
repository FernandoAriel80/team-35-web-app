import { Test, TestingModule } from '@nestjs/testing'
import { CreditApplicationController } from './credit-application.controller'

describe('CreditApplicationController', () => {
  let controller: CreditApplicationController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditApplicationController],
    }).compile()

    controller = module.get<CreditApplicationController>(
      CreditApplicationController,
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
