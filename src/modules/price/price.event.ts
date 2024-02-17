import { PriceDto } from './dtos/price.dto';

export enum PriceEvent {
  PRICE_UPDATED = 'price.updated',
}

export class PriceUpdatedEvent {
  payload: PriceDto[];

  constructor(payload: PriceDto[]) {
    this.payload = payload;
  }
}
