import { Injectable } from '@nestjs/common'
import { CreditApplication } from '@prisma/client'
import { CreditApplicationRequestDto } from 'src/creditApplication/domine/dto/creadit-app-request.dto'
import { CreditApplicationRepository } from 'src/creditApplication/domine/repository/credit-application.repository'
import { PrismaService } from 'src/shared/infraestructure/database/prisma.service'

@Injectable()
export class CreditApplicationDbRepository
  implements CreditApplicationRepository
{
  constructor(private prismaService: PrismaService) {}
  async create(
    dataRequest: CreditApplicationRequestDto,
  ): Promise<CreditApplication | null> {
    return await this.prismaService.creditApplication.create({
      data: dataRequest,
    })
  }
  async findById(id: number): Promise<CreditApplication | null> {
    return await this.prismaService.creditApplication.findUnique({
      where: { id },
    })
  }
}
