import { Injectable } from '@nestjs/common';
import { CronExpression, Cron } from '@nestjs/schedule';
import { Logger } from '@nestjs/common';
import { CoingeckoService } from '../coingecko/coingecko.service';
import { Coin, Currency } from '../coingecko/coingecko.type';
import { PriceRepository } from './price.repository';
import { PriceDto } from './dtos/price.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PriceEvent } from './price.event';

@Injectable()
export class PriceSchedular {
  constructor(
    private readonly coingeckoService: CoingeckoService,
    private readonly priceRepository: PriceRepository,
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async getCryptoPrice(): Promise<void> {
    this.logger.log(`getCryptoPrice ${CronExpression.EVERY_MINUTE}`);
    const simplePrice = await this.coingeckoService.getSimplePrice({
      ids: [
        Coin.BITCOIN,
        Coin.ETHERERUM,
        Coin.LITECOIN,
        Coin.MONERO,
        Coin.RIPPLE,
        Coin.DOGECOIN,
        Coin.DASH,
        Coin.MAIDSAFECOIN_TOKEN,
        Coin.LISK,
        Coin.STORJ,
      ],
      vs_currencies: [Currency.USD],
      include_24hr_vol: true,
      include_last_updated_at: true,
      include_24hr_change: true,
      precision: 8,
    });

    const priceDtos = Object.entries(simplePrice).map(
      ([coin, details]) => new PriceDto(coin, details),
    );

    this.logger.debug(priceDtos);

    this.eventEmitter.emit(PriceEvent.PRICE_UPDATED, priceDtos);

    await this.priceRepository.upsertMany(priceDtos);
  }
}