import { Injectable } from '@nestjs/common';
import { PriceRepository } from './price.repository';
import { PriceListEntity, PriceEntity } from './price.entity';
import { PriceCache } from './price.cache';

@Injectable()
export class PriceService {
  constructor(
    private readonly priceRepository: PriceRepository,
    private readonly priceCache: PriceCache,
  ) {}

  async getAll(): Promise<PriceListEntity> {
    const priceListCache = await this.priceCache.getPriceListCache();

    if (priceListCache) {
      return new PriceListEntity({
        data: priceListCache,
      });
    }

    const priceList = await this.priceRepository.getAll();

    await this.priceCache.setPriceListCache(priceList);

    return new PriceListEntity({
      data: priceList.map(({ coin, data }) => new PriceEntity({ coin, data })),
    });
  }
}
