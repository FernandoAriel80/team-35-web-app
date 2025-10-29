import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { DIGITAL_SIGNATURE_REPOSITORY } from 'src/digitalSignature/domine/repository/digital-signature-repository'
import type { DigitalSignatureRepository } from 'src/digitalSignature/domine/repository/digital-signature-repository'
import { DocumentRequestDto } from 'src/document/domine/dto/document-request.dto'
import { DocuSealWebhookDto } from 'src/docusign/domain/dto/docuseal-webhook.dto'
import { ProcessWebhookUseCase } from 'src/docusign/domain/usecase/process-webhook.usecase'
import { UPLOADFILE_SERVICE } from 'src/shared/domain/service/uploadfile.service'
import type { UploadFileService } from 'src/shared/domain/service/uploadfile.service'

@Injectable()
export class ProcessWebhookImplUseCase implements ProcessWebhookUseCase {
  constructor(
    @Inject(DIGITAL_SIGNATURE_REPOSITORY)
    private readonly digitalSignatureRepository: DigitalSignatureRepository,
    @Inject(UPLOADFILE_SERVICE)
    private readonly uploadFileService: UploadFileService,
  ) {}

  async execute(webhookData: DocuSealWebhookDto<string>): Promise<void> {
    const { submitter, submission, document } = webhookData

    const pdfName = `signed-document-${submission.id}.pdf`

    const resultBufferType = await this.uploadFileService.downloadPDFWithMime(
      document.download_url,
    )
    if (!resultBufferType) throw new ConflictException('Error downloading PDF')

    const resulteUrlSize = await this.uploadFileService.uploadPdf(
      resultBufferType.buffer,
      pdfName,
      resultBufferType.mimeType,
    )
    if (!resulteUrlSize)
      throw new ConflictException('Error to save pdf in storage')

    const creditAppId = submitter.metadata?.credit_app_id
      ? submitter.metadata?.credit_app_id
      : ''

    const newDoc: DocumentRequestDto = {
      creditApplicationId: parseInt(creditAppId),
      url: resulteUrlSize.url,
    }
    const documentDb = await this.digitalSignatureRepository.create(newDoc)
    if (!documentDb)
      throw new ConflictException('Error to create sing document')
  }
}
