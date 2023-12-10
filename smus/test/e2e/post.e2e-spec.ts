import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/config/database/prisma/prisma.module';
import { CreatePostDto } from 'src/dtos/post/create-post.dto';
import { PostModule } from 'src/resources/post/post.module';
import * as request from 'supertest';

describe('Post e2e Test', () => {
  let app: INestApplication;
  let testingModule: TestingModule;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [PostModule, PrismaModule],
      providers: [],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Post create Test', () => {
    const url = '/api/post/create';

    const createPostRequestForm: CreatePostDto = {
      userId: 1,
      boardId: 2,
      title: 'test title',
      content: 'test content',
      isAnonymous: true,
    };

    test('정상적으로 생성되는 케이스', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .send(createPostRequestForm);

      expect(res.statusCode).toBe(201);
    });

    // TODO: validation test...
  });
});
