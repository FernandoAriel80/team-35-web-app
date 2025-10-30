import {
  Body,
  Controller,
  Headers,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common'
import { SEND_CONTRACT_USE_CASE } from '../../domain/usecase/send-contract.usecase'
import type { SendContractUseCase } from '../../domain/usecase/send-contract.usecase'
import type { DocuSealWebhookDto } from 'src/docusign/domain/dto/docuseal-webhook.dto'
import { PROCESS_WEBHOOK_USECASE } from 'src/docusign/domain/usecase/process-webhook.usecase'
import type { ProcessWebhookUseCase } from 'src/docusign/domain/usecase/process-webhook.usecase'
import { Auth } from 'src/shared/infraestructure/decorators/auth.decorator'
import { UserRole } from 'src/shared/domain/enums/user-role.enum'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('DocuSign')
@ApiBearerAuth()
@Controller('docuSign')
export class DocuSignController {
  constructor(
    @Inject(SEND_CONTRACT_USE_CASE)
    private readonly sendContractUseCase: SendContractUseCase,
    @Inject(PROCESS_WEBHOOK_USECASE)
    private readonly processWebhookUseCase: ProcessWebhookUseCase,
  ) { }

  @Post('/admin/:id/:email')
  @Auth(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Send contract via email',
    description:
      'Sends a contract associated with a credit application to the specified email address. Requires ADMIN role.',
  })
  @ApiParam({
    name: 'id',
    description: 'Credit application ID',
    type: String,
    example: 12345,
  })
  @ApiParam({
    name: 'email',
    description: 'Recipient email address',
    type: String,
    example: 'client@example.com',
  })
  @ApiResponse({
    status: 200,
    description: 'Contract sent successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input parameters',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing authentication token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - User does not have ADMIN role',
  })
  @ApiResponse({
    status: 404,
    description: 'Credit application not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async sendContract(
    @Param('email') email: string,
    @Param('id') creditApplicationId: string,
  ) {
    const creditAppId = parseInt(creditApplicationId)
    return await this.sendContractUseCase.execute(email, creditAppId)
  }

  /**
   * @autor Fernando Orellana
   * @description
   * WebHook development for receiving signed emails from DocuSeal
   */

  @Post('webhookDocu')
  @ApiOperation({
    summary: 'Process DocuSeal webhook',
    description:
      'Receives and processes webhook notifications from DocuSeal for signed documents',
  })
  @ApiBody({
    description: 'Webhook payload from DocuSeal',
    type: Object,
    examples: {
      basic: {
        summary: 'Basic webhook payload',
        value: {
          submission: {
            id: '123',
          },
          document: {
            url: 'https://example.com/document.pdf',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Webhook processed successfully',
    schema: {
      example: {
        status: 'success',
        message: 'Webhook processed',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid webhook payload - missing required fields',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while processing webhook',
  })
  async handleDocuSealWebhook(@Body() webhookData: DocuSealWebhookDto) {
    // if (!webhookData?.submission?.id || !webhookData?.document?.url) {
    //   throw new HttpException('Invalid webhook payload', HttpStatus.BAD_REQUEST)
    // }

    await this.processWebhookUseCase.execute(webhookData)

    return { status: 'success', message: 'Webhook processed' }
  }
}
