import { applyDecorators, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { BadRequestException } from '@nestjs/common'

export function PdfFileUpload(maxFiles: number = 5) {
  return applyDecorators(
    UseInterceptors(
      FilesInterceptor('files', maxFiles, {
        limits: {
          fileSize: parseInt(process.env.MAX_PDF_SIZE_BYTES ?? '10485760'), // 10MB
        },
        fileFilter: (req, file, cb) => {
          const allowedMimes = ['application/pdf', 'application/x-pdf']

          if (!allowedMimes.includes(file.mimetype)) {
            return cb(
              new BadRequestException(
                `File type not allowed. Only PDFs are accepted. Received type: ${file.mimetype}`,
              ),
              false,
            )
          }

          // Validar por extensión también
          if (!file.originalname.toLowerCase().endsWith('.pdf')) {
            return cb(
              new BadRequestException('The file must have a .pdf extension.'),
              false,
            )
          }

          cb(null, true)
        },
      }),
    ),
  )
}
