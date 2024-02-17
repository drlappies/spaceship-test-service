import { SimplePrice } from '../coingecko/coingecko.type';
import { PriceDto } from '../price/dtos/price.dto';

export enum DataEvent {
  CRYPTO_PRICE_UPDATED = 'crypto_price.updated',
}

export class CryptoPriceUpdatedEvent {
  prices: PriceDto[];

  constructor(simplePrice: SimplePrice) {
    this.prices = Object.entries(simplePrice).map(
      ([coin, details]) => new PriceDto(coin, details),
    );
  }
}
