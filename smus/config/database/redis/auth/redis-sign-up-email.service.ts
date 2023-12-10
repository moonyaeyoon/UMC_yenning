import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis, RedisKey, RedisOptions } from 'ioredis';
import { REDIS_SIGN_UP_EMAIL_TTL_MS } from '.';

@Injectable()
export class RedisSignUpEmailService implements OnModuleDestroy {
  private readonly redis: Redis;

  constructor(
    @Inject('CONFIG_OPTIONS')
    private readonly options: RedisOptions,
  ) {
    this.redis = new Redis(options);
  }

  onModuleDestroy() {
    this.redis.disconnect();
  }

  async get(key: RedisKey): Promise<string | null> {
    const res = await this.redis.get(key);
    return res;
  }

  async set(key: RedisKey, value: string | Buffer | number): Promise<true> {
    await this.redis.set(key, value, 'PX', REDIS_SIGN_UP_EMAIL_TTL_MS);

    return true;
  }
}
