import { IsString, IsObject } from 'class-validator';

export class PriceDto {
  @IsString()
  coin: string;

  @IsObject()
  data: Record<string, number>;

  constructor(coin: string, data: Record<string, number>) {
    this.coin = coin;
    this.data = data;
  }
}
