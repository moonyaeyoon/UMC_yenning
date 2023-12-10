import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerSetUp(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('SMUS')
    .setDescription('상명대학교 통합 커뮤니티 SMUS를 위한 API 문서입니다.')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);
}
