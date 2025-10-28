import { UploadFileResponseDto } from '../dto/uploadfile-response.dto'

export const UPLOADFILE_SERVICE = 'UPLOADFILE_SERVICE'
export interface UploadFileService {
  uploadPdf(
    buffer: Buffer,
    filename: string,
    mimetype: string,
  ): Promise<UploadFileResponseDto>
}
