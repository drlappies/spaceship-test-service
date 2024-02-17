import { Injectable } from '@nestjs/common';
import { PriceRepository } from './price.repository';
import { PriceListEntity, PriceEntity } from './price.entity';

@Injectable()
export class PriceService {
  constructor(private readonly priceRepository: PriceRepository) {}

  async getAll(): Promise<PriceListEntity> {
    const prices = await this.priceRepository.getAll();

    return new PriceListEntity({
      data: prices.map(({ coin, data }) => new PriceEntity({ coin, data })),
    });
  }
}
