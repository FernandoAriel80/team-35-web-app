import { Injectable } from '@nestjs/common'
import { CompanyDbResponseDto } from 'src/company/domain/dto/company-db-response.dto'
import { CreateCompanyRequestDto } from 'src/company/domain/dto/create-company-request.dto'
import { CompanyRepository } from 'src/company/domain/repository/company.repsitory'
import { PrismaService } from 'src/shared/infraestructure/database/prisma.service'

@Injectable()
export class CompanyPgRepository implements CompanyRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    data: CreateCompanyRequestDto,
  ): Promise<CompanyDbResponseDto | null> {
    return await this.prisma.company.create({
      data: {
        ...data,
        userId: userId,
      },
    })
  }

  async findByTaxId(taxId: string): Promise<CompanyDbResponseDto | null> {
    return await this.prisma.company.findFirst({
      where: { taxId: taxId },
    })
  }
}
