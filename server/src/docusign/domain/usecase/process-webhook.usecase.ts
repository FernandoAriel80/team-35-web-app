import { DocuSealWebhookDto } from '../dto/docuseal-webhook.dto'

export const PROCESS_WEBHOOK_USECASE = 'PROCESS_WEBHOOK_USECASE'
export interface ProcessWebhookUseCase {
  execute(webhookData: DocuSealWebhookDto): Promise<void>
}
