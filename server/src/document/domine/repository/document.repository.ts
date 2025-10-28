import { DocumentDbResponseDto } from '../dto/document-db-response.dto'
import { DocumentRequestDto } from '../dto/document-request.dto'

export const DOCUMENT_REPOSITORY = 'DOCUMENT_REPOSITORY'
export interface DocumentRepository {
  create(document: DocumentRequestDto): Promise<DocumentDbResponseDto>
  /*  findByCreditApplicationId(
    creditApplicationId: number,
  ): Promise<DocumentDbResponseDto[]> */
}
