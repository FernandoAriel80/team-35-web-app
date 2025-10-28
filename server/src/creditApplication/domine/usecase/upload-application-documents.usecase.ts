import { DocumentDbResponseDto } from 'src/document/domine/dto/document-db-response.dto'
import { FileRequestDto } from '../dto/file-request.dto'
import { DataApplRequestDto } from 'src/document/domine/dto/data-appl-request.dto'

export const UPLOAD_APPLICATION_DOCUMENTS_USECASE =
  'UPLOAD_APPLICATION_DOCUMENTS_USECASE'
export interface UploadApplicationDocumentsUseCase {
  execute(
    data: DataApplRequestDto,
    files: FileRequestDto[],
  ): Promise<DocumentDbResponseDto[]>
}
