import { DigitalSignature } from '@prisma/client'
import { DgSignRequestDto } from '../dto/dg-sign-request-dto'

export const DIGITAL_SIGNATURE_REPOSITORY = 'DIGITAL_SIGNATURE_REPOSITORY'
export interface DigitalSignatureRepository {
  create(documentData: DgSignRequestDto): Promise<DigitalSignature | null>
}
