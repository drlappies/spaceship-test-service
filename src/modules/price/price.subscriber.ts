import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CryptoPriceUpdatedEvent, DataEvent } from '../data/data.event';
import { PriceRepository } from './price.repository';

@Injectable()
export class PriceSubcriber {
  constructor(
    private readonly logger: Logger,
    private readonly priceRepository: PriceRepository,
  ) {}

  @OnEvent(DataEvent.CRYPTO_PRICE_UPDATED)
  async handleCryptoPriceUpdated({
    prices,
  }: CryptoPriceUpdatedEvent): Promise<void> {
    this.logger.log(`handle ${DataEvent.CRYPTO_PRICE_UPDATED}`);

    this.logger.debug(prices);

    this.priceRepository.upsertMany(prices);
  }
}
