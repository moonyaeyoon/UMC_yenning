import { ModuleMetadata } from '@nestjs/common';
import { RedisOptions } from 'ioredis';

export interface RedisAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useFactory: (...args: any[]) => Promise<RedisOptions> | RedisOptions;
}

export const REDIS_SIGN_UP_EMAIL_TTL_MS = 1800000 as const;
