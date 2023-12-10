import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/config/database/prisma/prisma.module';
import { RedisSignUpEmailService } from 'src/config/database/redis/auth/redis-sign-up-email.service';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { UserInfoDto } from 'src/dtos/user/user-info.dto';
import { ERROR_MESSAGE } from 'src/utils/constants/error-message';
import * as request from 'supertest';

describe('e2e Auth Test', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  const prisma: PrismaClient = new PrismaClient();

  const redisSignUpEmailService = {
    get: () => 'true',
    set: () => true,
  };

  const mailerService = {
    sendMail: () => null,
  };

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
        MailerModule.forRoot(),
        PrismaModule,
      ],
      providers: [],
    })
      .overrideProvider(RedisSignUpEmailService)
      .useValue(redisSignUpEmailService)
      .overrideProvider(MailerService)
      .useValue(mailerService)
      .compile();

    app = testingModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/auth/sign-up', () => {
    const url = '/api/auth/sign-up';

    const registerInfo: CreateUserDto = {
      nickname: '테스트유저',
      password: 'test1234',
      passwordConfirm: 'test1234',
      roleId: 1,
      schoolId: '222222222',
    };

    test('비밀번호와 비밀번호 확인이 다른 경우', async () => {
      const userInfo: CreateUserDto = {
        ...registerInfo,
        passwordConfirm: 'test12345678',
      };

      const res = await request(app.getHttpServer()).post(url).send(userInfo);
      expect(res.body).toStrictEqual(ERROR_MESSAGE.NOT_MATCH_PASSWORD_CONFIRM);
      expect(res.statusCode).toBe(400);
    });

    describe('회원가입 시, Unique에 대한 검증', () => {
      const existedUser: CreateUserDto = {
        nickname: 'existedUser',
        password: 'test1234',
        passwordConfirm: 'test1234',
        roleId: 1,
        schoolId: '202056789',
      };

      let user: UserInfoDto;

      beforeAll(async () => {
        // 이미 존재하는 유저 삭제
        const foundUser = await prisma.user.findFirst({
          where: {
            email: existedUser.schoolId,
          },
        });

        const foundUser2 = await prisma.user.findFirst({
          where: {
            nickname: existedUser.nickname,
          },
        });

        if (foundUser) {
          await prisma.user.delete({
            where: {
              id: foundUser.id,
            },
          });
        }

        if (foundUser2) {
          await prisma.user.delete({
            where: {
              id: foundUser2.id,
            },
          });
        }

        const res = await request(app.getHttpServer())
          .post(url)
          .send(existedUser);

        user = res.body;

        console.log(Object.entries(user));
      });

      afterAll(async () => {
        // 생성된 유저 삭제
        await prisma.user.delete({
          where: {
            id: user.id,
          },
        });
      });

      test('학번이 중복되는 경우', async () => {
        const userInfo: CreateUserDto = {
          nickname: '1234',
          schoolId: existedUser.schoolId,
          password: 'abcd1234',
          passwordConfirm: 'abcd1234',
          roleId: 1,
        };

        const res = await request(app.getHttpServer()).post(url).send(userInfo);

        expect(res.body).toStrictEqual(
          ERROR_MESSAGE.FAIL_TO_REGISTER_SCHOOL_ID,
        );
        expect(res.statusCode).toBe(400);
      });

      test('닉네임이 중복되는 경우', async () => {
        const userInfo: CreateUserDto = {
          nickname: existedUser.nickname,
          password: 'abcd1234',
          passwordConfirm: 'abcd1234',
          roleId: 1,
          schoolId: '202020202',
        };

        const res = await request(app.getHttpServer()).post(url).send(userInfo);

        expect(res.body).toStrictEqual(ERROR_MESSAGE.FAIL_TO_REGISTER_NICKNAME);
        expect(res.statusCode).toBe(400);
      });
    });

    describe('로컬 회원가입 시, 역할 검증', () => {
      test('만약 역할이 학생인 경우', async () => {
        const userInfo: CreateUserDto = {
          ...registerInfo,
          roleId: 1,
        };

        const res = await request(app.getHttpServer()).post(url).send(userInfo);

        const createdUserInfo: UserInfoDto = await res.body;

        expect(createdUserInfo.roleId).toStrictEqual(1);

        // 생성된 유저 삭제
        await prisma.user.delete({
          where: {
            id: createdUserInfo.id,
          },
        });
      });

      test('만약 역할이 임직원인 경우', async () => {
        const userInfo: CreateUserDto = {
          ...registerInfo,
          roleId: 2,
        };

        const res = await request(app.getHttpServer()).post(url).send(userInfo);

        const createdUserInfo: UserInfoDto = await res.body;

        expect(createdUserInfo.roleId).toStrictEqual(2);

        // 생성된 유저 삭제
        await prisma.user.delete({
          where: {
            id: createdUserInfo.id,
          },
        });
      });
    });
  });
});
