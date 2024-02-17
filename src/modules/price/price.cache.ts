import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { PriceListEntity } from './price.entity';

const PRICE_LIST_CACHE_KEY = 'priceList';
@Injectable()
export class PriceCache {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async setPriceListCache(priceList: PriceListEntity): Promise<void> {
    await this.redis.set(
      PRICE_LIST_CACHE_KEY,
      JSON.stringify(priceList),
      'EX',
      120,
    );
  }

  async getPriceListCache(): Promise<PriceListEntity> {
    const response = await this.redis.get(PRICE_LIST_CACHE_KEY);

    if (!response) {
      return null;
    }

    return JSON.parse(response) as PriceListEntity;
  }
}
