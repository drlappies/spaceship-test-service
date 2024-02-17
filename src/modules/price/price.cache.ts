import { Injectable, Logger } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { PriceDto } from './dtos/price.dto';

const PRICE_LIST_CACHE_KEY = 'priceList';
@Injectable()
export class PriceCache {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly logger: Logger,
  ) {}

  async setPriceListCache(priceDtos: PriceDto[]): Promise<void> {
    await this.redis.set(
      PRICE_LIST_CACHE_KEY,
      JSON.stringify(priceDtos),
      'EX',
      30,
    );
  }

  async getPriceListCache(): Promise<PriceDto[]> {
    const response = await this.redis.get(PRICE_LIST_CACHE_KEY);

    if (!response) {
      this.logger.debug('cache miss');
      return null;
    }

    this.logger.debug('cache hit');

    return JSON.parse(response) as PriceDto[];
  }
}
