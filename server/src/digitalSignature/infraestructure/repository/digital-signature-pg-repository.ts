import { Injectable } from '@nestjs/common'
import { DigitalSignature } from '@prisma/client'
import { DgSignRequestDto } from 'src/digitalSignature/domine/dto/dg-sign-request-dto'
import { DigitalSignatureRepository } from 'src/digitalSignature/domine/repository/digital-signature-repository'
import { PrismaService } from 'src/shared/infraestructure/database/prisma.service'

@Injectable()
export class DigitalSignatureImplRepository
  implements DigitalSignatureRepository
{
  constructor(private prismaService: PrismaService) {}
  async create(
    documentData: DgSignRequestDto,
  ): Promise<DigitalSignature | null> {
    return await this.prismaService.digitalSignature.create({
      data: documentData,
    })
  }
}
