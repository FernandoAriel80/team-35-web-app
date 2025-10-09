import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Authentication API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
