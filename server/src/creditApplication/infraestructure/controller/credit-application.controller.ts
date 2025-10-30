import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { FileRequestDto } from 'src/creditApplication/domine/dto/file-request.dto'
import { GET_ALL_CREDIT_APP_PAGINATION_USECASE } from 'src/creditApplication/domine/usecase/get-all-credit-app-pagination.usecase'
import type { GetAllCreditAppPaginationUseCase } from 'src/creditApplication/domine/usecase/get-all-credit-app-pagination.usecase'
import { GET_CREDIT_APPL_BY_USER_USECASE } from 'src/creditApplication/domine/usecase/get-credit-appl-by-user.usecase'
import type { GetCreditApplByUserUseCase } from 'src/creditApplication/domine/usecase/get-credit-appl-by-user.usecase'
import { UPDATE_STATUS_CREDIT_APP_USECASE } from 'src/creditApplication/domine/usecase/update-status-credit-app.usecase'
import type { UpdateStatusCreditAppUseCase } from 'src/creditApplication/domine/usecase/update-status-credit-app.usecase'
import { UPLOAD_APPLICATION_DOCUMENTS_USECASE } from 'src/creditApplication/domine/usecase/upload-application-documents.usecase'
import type { UploadApplicationDocumentsUseCase } from 'src/creditApplication/domine/usecase/upload-application-documents.usecase'
import { DataApplRequestDto } from 'src/document/domine/dto/data-appl-request.dto'
import { ApplicationStatus } from 'src/shared/domain/enums/application-status.enum'
import { UserRole } from 'src/shared/domain/enums/user-role.enum'
import { Auth } from 'src/shared/infraestructure/decorators/auth.decorator'
import { PdfFileUpload } from 'src/shared/infraestructure/decorators/file-validation.decorator'
import { User } from 'src/shared/infraestructure/decorators/user.decorator'
import { JwtAuthGuard } from 'src/shared/infraestructure/guards/jwt-auth.guard'

@ApiTags('Credit Application')
@ApiBearerAuth()
@Controller('credit-application')
export class CreditApplicationController {
  constructor(
    @Inject(UPLOAD_APPLICATION_DOCUMENTS_USECASE)
    private readonly uploadDocumentsUseCase: UploadApplicationDocumentsUseCase,
    @Inject(GET_CREDIT_APPL_BY_USER_USECASE)
    private readonly getCreditApplByUserUseCase: GetCreditApplByUserUseCase,
    @Inject(GET_ALL_CREDIT_APP_PAGINATION_USECASE)
    private readonly getAllCreditAppPaginationUseCase: GetAllCreditAppPaginationUseCase,
    @Inject(UPDATE_STATUS_CREDIT_APP_USECASE)
    private readonly updateStatusCreditAppUseCase: UpdateStatusCreditAppUseCase,
  ) {}

  @Post('upload-documents')
  @UseGuards(JwtAuthGuard)
  @PdfFileUpload(5)
  @ApiOperation({
    summary: 'Upload credit application documents',
    description:
      'Upload PDF documents required for credit application. Maximum 4 PDF files, 10MB each.',
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
          description: 'PDF files (max 4)',
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

    const result = await this.uploadDocumentsUseCase.execute(
      dataRequest,
      fileRequests,
    )

    return {
      message: `${files.length} archivos subidos correctamente.`,
      documents: result,
    }
  }

  @Get('get-credit-appl-by-user')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get all credit applications for a user',
    description:
      'Returns all credit applications created by the authenticated user, including company information and associated documents.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of user credit applications successfully obtained',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or not provided token',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async getCreditApplByUser(@User('id') UserId: number) {
    const result = await this.getCreditApplByUserUseCase.execute(UserId)
    return result
  }

  @Get('/admin/get-all-credit-appl')
  @Auth(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get all credit applications with pagination and search',
    description:
      'Retrieve a paginated list of all credit applications. Allows searching by username. Admin access required.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page (default: 10)',
    example: 10,
  })
  @ApiQuery({
    name: 'username',
    required: false,
    type: String,
    description: 'Search by user name (case insensitive partial match)',
    example: 'john',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved credit applications list',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing authentication token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - User does not have ADMIN role',
  })
  async getAllCreditAppl(
    @Query('page') parmPage = '1',
    @Query('limit') parmLimit = '10',
    @Query('username') username?: string,
  ) {
    const page = parseInt(parmPage)
    const limit = parseInt(parmLimit)

    return await this.getAllCreditAppPaginationUseCase.execute(
      page,
      limit,
      username,
    )
  }

  @Put('/admin/update-status-credit-appl')
  @Auth(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update credit application status' })
  @ApiQuery({ name: 'id', type: Number, example: 1 })
  @ApiQuery({
    name: 'status',
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    example: 'APPROVED',
  })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 404, description: 'Credit application not found' })
  async updateStatusCreditAppl(
    @Query('id') creditId: string,
    @Query('status') status: ApplicationStatus,
  ) {
    const id = parseInt(creditId)
    return await this.updateStatusCreditAppUseCase.execute(id, status)
  }
}
