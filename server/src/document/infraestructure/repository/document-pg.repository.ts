import { Injectable } from '@nestjs/common'
import { DocumentDbResponseDto } from 'src/document/domine/dto/document-db-response.dto'
import { DocumentRequestDto } from 'src/document/domine/dto/document-request.dto'
import { DocumentRepository } from 'src/document/domine/repository/document.repository'
import { PrismaService } from 'src/shared/infraestructure/database/prisma.service'

@Injectable()
export class DocumentPgRepository implements DocumentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    documentData: DocumentRequestDto,
  ): Promise<DocumentDbResponseDto> {
    return await this.prismaService.document.create({
      data: documentData,
    })
  }

  /* async findByCreditApplicationId(creditApplicationId: number) {
    const recs = await this.prisma.document.findMany({
      where: { creditApplicationId },
    })
    return recs.map(
      (r) => new DocEntity(r.id, r.creditApplicationId, r.url, r.uploadedAt),
    )
  } */
}
