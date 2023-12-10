import { MailerModule } from '@nestjs-modules/mailer';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { HttpExceptionFilter } from './middlewares/filters/http-exception.filter';
import { TransformInterceptor } from './middlewares/interceptors/transform.interceptor';
import { PostModule } from './resources/post/post.module';
import { UserModule } from './resources/user/user.module';
import { BoardModule } from './resources/board/board.module';
import { CommentModule } from './resources/comment/comment.module';

@Module({
  imports: [
    /**
     * .env파일에서 환경변수를 읽어오는 ConfigModule을 설정
     * ConfigService의 get("환경변수") 함수로 환경변수를 불러올 수 있다.
     * isGlobal: true 설정을 하면 ConfigService를 어디서나 사용가능하다.
     */
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    /**
     * 메일 전송을 위해 사용되는 메일러 모듈
     */
    MailerModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.daum.net',
          port: 465,
          secure: true,
          auth: {
            user: 'admin@smus.co.kr',
            pass: configService.get('DAUM_SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: 'SMUS - 스뮤즈 관리자 계정 <admin@smus.co.kr>',
          subject: 'SMUS - 스뮤즈 학생 인증',
        },
      }),
    }),

    /**
     * User에 관련한 기능을 이용하기 위해 UserModule을 AppModule에 import한다.
     * 사용될 모든 모듈
     *
     * 은 AppModule에 import되어있어야 한다.
     *
     * 예를들어 게시글 관련해서 post관련 기능을 만들게 된다면, PostModule, PostController, PostService를 생성하게될텐데,
     * 그때 PostModule을 import해주어야 정상적으로 작동한다.
     */
    UserModule,
    AuthModule,
    PostModule,
    BoardModule,
    CommentModule,
  ],
  controllers: [],
  providers: [
    {
      // Http관련 에러를 예외처리 해주는 익셉션 필터를 설정
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
