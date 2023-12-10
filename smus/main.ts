import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { swaggerSetUp } from './config/swagger/init.swagger';
import { PrismaService } from './config/database/prisma/prisma.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ConfigService를 통해 환경변수를 .env 파일에서 불러올 수 있다.
  const configService = app.get<ConfigService>(ConfigService);

  // .env파일의 NEST_PORT라는 환경변수를 불러와서 port라는 변수에 담는다.
  const port = configService.get('NEST_PORT');
  console.log(port);

  // Prisma
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  /**
   * swaggerSetUp함수를 /config/swagger/init.swagger.ts 파일에서 불러온다.
   * swaggerSetUp함수는 swagger를 초기 설정하는 함수
   */
  swaggerSetUp(app);

  // cross-origin 요청을 허가하는 함수
  app.enableCors();

  // Nest.js 서버를 실행시키는 함수
  await app.listen(port);
}
bootstrap();
