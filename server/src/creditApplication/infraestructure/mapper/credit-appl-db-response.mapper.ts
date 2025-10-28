import { UserCreditApplicationsResponseDto } from 'src/creditApplication/domine/dto/user-credit-applications-response.dto'
import { Prisma } from '@prisma/client'

// Usa el tipo que Prisma genera para findMany con include
type CreditApplicationWithIncludes = Prisma.CreditApplicationGetPayload<{
  include: {
    company: true
    documents: true
    digitalSignature: true
  }
}>

export class CreditApplDbResponseMapper {
  static toDto(
    app: CreditApplicationWithIncludes,
  ): UserCreditApplicationsResponseDto {
    return {
      id: app.id,
      requestedAmount: app.requestedAmount,
      status: app.status,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
      company: {
        id: app.company.id,
        name: app.company.name,
        type: app.company.type,
        taxId: app.company.taxId,
        activity: app.company.activity,
        employeeCount: app.company.employeeCount,
        address: app.company.address,
        website: app.company.website || undefined,
        email: app.company.email,
      },
      documents: app.documents.map((doc) => ({
        id: doc.id,
        url: doc.url,
        uploadedAt: doc.uploadedAt,
      })),
      /*  digitalSignature: app.digitalSignature.map((sig) => ({
        id: sig.id,
        // Agrega aquí los demás campos de DigitalSignature
      })), */
    }
  }
  static toDtoArray(
    apps: CreditApplicationWithIncludes[],
  ): UserCreditApplicationsResponseDto[] {
    return apps.map((app) => this.toDto(app))
  }
}
