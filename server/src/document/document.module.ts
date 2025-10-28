import { Module } from '@nestjs/common'
import { DocumentController } from './infraestructure/controller/document.controller'
import { DOCUMENT_REPOSITORY } from './domine/repository/document.repository'
import { DocumentPgRepository } from './infraestructure/repository/document-pg.repository'
import { PrismaModule } from 'src/shared/infraestructure/database/prisma.module'
import { SharedModule } from 'src/shared/shared.module'

@Module({
  imports: [PrismaModule, SharedModule],
  controllers: [DocumentController],
  providers: [
    {
      provide: DOCUMENT_REPOSITORY,
      useClass: DocumentPgRepository,
    },
  ],
  exports: [DOCUMENT_REPOSITORY],
})
export class DocumentModule {}
