import { Injectable } from '@nestjs/common';
import { CronExpression, Cron } from '@nestjs/schedule';
import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PriceEvent } from './price.event';
import { PriceCache } from './price.cache';
import { PriceService } from './price.service';

@Injectable()
export class PriceSchedular {
  constructor(
    private readonly priceService: PriceService,
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2,
    private readonly priceCache: PriceCache,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async getCryptoPrice(): Promise<void> {
    this.logger.log(`getCryptoPrice ${CronExpression.EVERY_MINUTE}`);
    const priceList = await this.priceService.getExternalPriceData();

    this.logger.debug(priceList);

    this.eventEmitter.emit(PriceEvent.PRICE_UPDATED, priceList);

    await this.priceCache.setPriceListCache(priceList);
  }
}
