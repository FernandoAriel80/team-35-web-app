import { Injectable } from '@nestjs/common'
import { UploadFileResponseDto } from 'src/shared/domain/dto/uploadfile-response.dto'
import { UploadFileService } from 'src/shared/domain/service/uploadfile.service'
import { UTApi, UTFile } from 'uploadthing/server'

@Injectable()
export class UploadThingimplService implements UploadFileService {
  private readonly utapi: UTApi = new UTApi()

  async uploadPdf(
    buffer: Buffer,
    filename: string,
    mimetype: string,
  ): Promise<UploadFileResponseDto> {
    const filePart = new Uint8Array(buffer)

    const file = new UTFile([filePart], filename, {
      type: mimetype,
      customId: `pdf-${Date.now()}-${filename}`,
    })
    const response = await this.utapi.uploadFiles([file])
    const url = response[0].data?.ufsUrl
    return {
      url: url ? url : '',
      size: buffer.length,
    }
  }
}
