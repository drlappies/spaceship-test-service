import { Injectable } from '@nestjs/common';
import { PriceListEntity, PriceEntity } from './price.entity';
import { PriceCache } from './price.cache';

@Injectable()
export class PriceService {
  constructor(private readonly priceCache: PriceCache) {}

  async getAll(): Promise<PriceListEntity> {
    const priceList = await this.priceCache.getPriceListCache();

    return new PriceListEntity({
      data: priceList.map(({ coin, data }) => new PriceEntity({ coin, data })),
    });
  }
}
