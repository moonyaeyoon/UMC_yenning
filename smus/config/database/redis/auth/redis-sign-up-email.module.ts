import { DynamicModule, Module } from '@nestjs/common';
import { RedisSignUpEmailService } from './redis-sign-up-email.service';
import { RedisAsyncOptions } from '.';

@Module({})
export class RedisSignUpEmailModule {
  static registerAsync(options: RedisAsyncOptions): DynamicModule {
    return {
      module: RedisSignUpEmailModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject,
        },
        RedisSignUpEmailService,
      ],
      exports: [RedisSignUpEmailService],
    };
  }
}
