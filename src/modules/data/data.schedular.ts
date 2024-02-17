import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CoingeckoService } from '../coingecko/coingecko.service';
import { Coin, Currency } from '../coingecko/coingecko.type';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CryptoPriceUpdatedEvent, DataEvent } from './data.event';

@Injectable()
export class DataSchedular {
  constructor(
    private readonly coingeckoService: CoingeckoService,
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

    this.eventEmitter.emit(
      DataEvent.CRYPTO_PRICE_UPDATED,
      new CryptoPriceUpdatedEvent(simplePrice),
    );
  }
}
