import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { COMPANY_REPOSITORY } from 'src/company/domain/repository/company.repsitory'
import type { CompanyRepository } from 'src/company/domain/repository/company.repsitory'
import { CreditApplicationRequestDto } from 'src/creditApplication/domine/dto/creadit-app-request.dto'
import { FileRequestDto } from 'src/creditApplication/domine/dto/file-request.dto'
import { CREDIT_APPLICATION_REPOSITORY } from 'src/creditApplication/domine/repository/credit-application.repository'
import type { CreditApplicationRepository } from 'src/creditApplication/domine/repository/credit-application.repository'
import { UploadApplicationDocumentsUseCase } from 'src/creditApplication/domine/usecase/upload-application-documents.usecase'
import { DataApplRequestDto } from 'src/document/domine/dto/data-appl-request.dto'
import { DocumentDbResponseDto } from 'src/document/domine/dto/document-db-response.dto'
import { DocumentRequestDto } from 'src/document/domine/dto/document-request.dto'
import { DOCUMENT_REPOSITORY } from 'src/document/domine/repository/document.repository'
import type { DocumentRepository } from 'src/document/domine/repository/document.repository'
import { UPLOADFILE_SERVICE } from 'src/shared/domain/service/uploadfile.service'
import type { UploadFileService } from 'src/shared/domain/service/uploadfile.service'

@Injectable()
export class UploadApplicationDocumentsImplUseCase
  implements UploadApplicationDocumentsUseCase
{
  constructor(
    @Inject(DOCUMENT_REPOSITORY)
    private documentRepository: DocumentRepository,
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: CompanyRepository,
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private creditApplicationRepository: CreditApplicationRepository,
    @Inject(UPLOADFILE_SERVICE)
    private uploadfileService: UploadFileService,
  ) {}
  async execute(
    data: DataApplRequestDto,
    files: FileRequestDto[],
  ): Promise<DocumentDbResponseDto[]> {
    const CreditAppRequest: CreditApplicationRequestDto = {
      companyId: data.id,
      requestedAmount: data.amount,
    }

    const resultCompany = await this.companyRepository.findById(data.id)
    if (!resultCompany)
      throw new ConflictException('The company does not exist')

    const creditAppDb =
      await this.creditApplicationRepository.create(CreditAppRequest)

    if (!creditAppDb)
      throw new ConflictException('Error to create credit application')

    /* /////////////////////////// */

    const documents: DocumentDbResponseDto[] = []

    for (const file of files) {
      const uploaded = await this.uploadfileService.uploadPdf(
        file.fileBuffer,
        file.originalName,
        file.mimetype,
      )

      const newDoc: DocumentRequestDto = {
        creditApplicationId: creditAppDb.id,
        url: uploaded.url,
      }

      const documentDb = await this.documentRepository.create(newDoc)
      if (!documentDb) throw new ConflictException('Error to save document')

      documents.push(documentDb)
    }

    return documents
  }
}
