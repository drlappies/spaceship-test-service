import { Injectable } from '@nestjs/common';
import { PriceListEntity } from './price.entity';
import { PriceCache } from './price.cache';
import { CoingeckoService } from '../coingecko/coingecko.service';
import { Coin, Currency } from '../coingecko/coingecko.type';
import { PriceDto } from './dtos/price.dto';

@Injectable()
export class PriceService {
  constructor(
    private readonly priceCache: PriceCache,
    private readonly coingeckoService: CoingeckoService,
  ) {}

  async getPriceList(): Promise<PriceListEntity> {
    const cachedPriceList = await this.priceCache.getPriceListCache();

    if (cachedPriceList) {
      return cachedPriceList;
    }

    const priceList = await this.getExternalPriceData();

    await this.priceCache.setPriceListCache(priceList);

    return priceList;
  }

  async getExternalPriceData(): Promise<PriceListEntity> {
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

    return new PriceListEntity({ data: priceDtos });
  }
}
