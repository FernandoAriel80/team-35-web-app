import { Injectable } from '@nestjs/common'
import { CreditApplication } from '@prisma/client'
import { CreditApplicationRequestDto } from 'src/creditApplication/domine/dto/creadit-app-request.dto'
import { UserCreditApplicationsResponseDto } from 'src/creditApplication/domine/dto/user-credit-applications-response.dto'
import { CreditApplicationRepository } from 'src/creditApplication/domine/repository/credit-application.repository'
import { PrismaService } from 'src/shared/infraestructure/database/prisma.service'
import { CreditApplDbResponseMapper } from '../mapper/credit-appl-db-response.mapper'
import { Prisma } from '@prisma/client'
import { CreditAppResPaginationDto } from 'src/creditApplication/domine/dto/credit-app-res-pagination.dto'
import { ApplicationStatus } from 'src/shared/domain/enums/application-status.enum'

@Injectable()
export class CreditApplicationDbRepository
  implements CreditApplicationRepository
{
  constructor(private prismaService: PrismaService) {}
  async updateStatus(
    id: number,
    status: ApplicationStatus,
  ): Promise<CreditApplication | null> {
    return this.prismaService.creditApplication.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    })
  }

  async findAllWithPaginationAndSearch(
    page: number = 1,
    limit: number = 10,
    search?: string,
  ): Promise<CreditAppResPaginationDto> {
    const skip = (page - 1) * limit

    // Construir el where condition para la búsqueda
    const where: Prisma.CreditApplicationWhereInput = search
      ? {
          company: {
            user: {
              name: {
                contains: search,
              },
            },
          },
        }
      : {}

    // Obtener los datos
    const [data, total] = await Promise.all([
      this.prismaService.creditApplication.findMany({
        skip,
        take: limit,
        where,
        include: {
          company: {
            include: {
              user: true,
            },
          },
          documents: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prismaService.creditApplication.count({ where }),
    ])

    // Calcular metadata de paginación
    const totalPages = Math.ceil(total / limit)
    const hasNext = page < totalPages
    const hasPrev = page > 1

    return {
      data: data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNext,
        hasPrev,
      },
    }
  }

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
  async findByCompanyCreditStatus(
    companyId: number,
  ): Promise<CreditApplication[] | null> {
    const result = await this.prismaService.creditApplication.findMany({
      where: {
        companyId: companyId,
        status: ApplicationStatus.REJECTED,
      },
    })
    return result.length > 0 ? result : null
  }
  async findByUser(
    userId: number,
  ): Promise<UserCreditApplicationsResponseDto[] | null> {
    const creditApplication =
      await this.prismaService.creditApplication.findMany({
        where: {
          company: {
            userId: userId,
          },
        },
        include: {
          company: true,
          documents: true,
          digitalSignature: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    return CreditApplDbResponseMapper.toDtoArray(creditApplication)
  }
}
