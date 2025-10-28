import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { FileRequestDto } from 'src/creditApplication/domine/dto/file-request.dto'
import { UPLOAD_APPLICATION_DOCUMENTS_USECASE } from 'src/creditApplication/domine/usecase/upload-application-documents.usecase'
import type { UploadApplicationDocumentsUseCase } from 'src/creditApplication/domine/usecase/upload-application-documents.usecase'
import { DataApplRequestDto } from 'src/document/domine/dto/data-appl-request.dto'
import { PdfFileUpload } from 'src/shared/infraestructure/decorators/file-validation.decorator'
import { JwtAuthGuard } from 'src/shared/infraestructure/guards/jwt-auth.guard'

@ApiTags('Credit Application')
@ApiBearerAuth()
@Controller('credit-application')
export class CreditApplicationController {
  constructor(
    @Inject(UPLOAD_APPLICATION_DOCUMENTS_USECASE)
    private readonly UploadDocumentsUseCase: UploadApplicationDocumentsUseCase,
  ) {}

  @Post('upload-documents')
  @UseGuards(JwtAuthGuard)
  @PdfFileUpload(5)
  @ApiOperation({
    summary: 'Upload credit application documents',
    description:
      'Upload PDF documents required for credit application. Maximum 5 PDF files, 10MB each.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Credit application data and documents',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          description: 'PDF files (max 5)',
        },
        companyId: {
          type: 'string',
          example: '1',
          description: 'Applicant company ID',
        },
        requestedAmount: {
          type: 'string',
          example: '50000',
          description: 'Requested credit amount',
        },
      },
      required: ['files', 'companyId', 'requestedAmount'],
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Documents uploaded successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data or files',
    schema: {
      example: {
        statusCode: 400,
        message: 'No valid files received.',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or missing JWT token',
  })
  @ApiResponse({
    status: HttpStatus.PAYLOAD_TOO_LARGE,
    description: 'Files exceed maximum allowed size',
  })
  @ApiResponse({
    status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    description: 'Invalid file type. Only PDF files are allowed',
  })
  async upload(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('companyId') companyId: string,
    @Body('requestedAmount') requestedAmount: string,
  ) {
    if (!files?.length)
      throw new BadRequestException('No se recibieron archivos válidos.')

    const id = parseInt(companyId)
    const amount = parseInt(requestedAmount)

    const fileRequests: FileRequestDto[] = files.map((file) => ({
      fileBuffer: file.buffer,
      originalName: file.originalname,
      mimetype: file.mimetype,
    }))

    const dataRequest: DataApplRequestDto = {
      id,
      amount,
    }

    const result = await this.UploadDocumentsUseCase.execute(
      dataRequest,
      fileRequests,
    )

    return {
      message: `${files.length} archivos subidos correctamente.`,
      documents: result,
    }
  }
}
