import { Injectable } from '@nestjs/common'
import { CompanyDbResponseDto } from 'src/company/domain/dto/company-db-response.dto'
import { CreateCompanyRequestDto } from 'src/company/domain/dto/create-company-request.dto'
import { UpdateCompanyRequestDto } from 'src/company/domain/dto/update-company-request.dto'
import { CompanyRepository } from 'src/company/domain/repository/company.repsitory'
import { PrismaService } from 'src/shared/infraestructure/database/prisma.service'

@Injectable()
export class CompanyPgRepository implements CompanyRepository {
  constructor(private prisma: PrismaService) {}

  async all(): Promise<CompanyDbResponseDto[] | null> {
    return await this.prisma.company.findMany()
  }
  async findById(id: number): Promise<CompanyDbResponseDto | null> {
    return await this.prisma.company.findFirst({
      where: { id: id },
    })
  }

  async findAllByUserId(
    userid: number,
  ): Promise<CompanyDbResponseDto[] | null> {
    return await this.prisma.company.findMany({
      where: { userId: userid },
    })
  }

  async findByTaxId(taxId: string): Promise<CompanyDbResponseDto | null> {
    return await this.prisma.company.findFirst({
      where: { taxId: taxId },
    })
  }

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

  async update(
    userId: number,
    companyId: number,
    data: UpdateCompanyRequestDto,
  ): Promise<CompanyDbResponseDto | null> {
    return await this.prisma.company.update({
      where: {
        id: companyId,
      },
      data: {
        ...data,
        userId: userId,
      },
    })
  }

  async delete(id: number): Promise<CompanyDbResponseDto | null> {
    return await this.prisma.company.delete({
      where: {
        id: id,
      },
    })
  }
}
