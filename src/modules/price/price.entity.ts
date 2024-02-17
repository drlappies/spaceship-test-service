import { ApiProperty } from '@nestjs/swagger';

export class PriceEntity {
  coin: string;

  data: Record<string, number>;

  constructor(partial: Partial<PriceEntity>) {
    Object.assign(this, partial);
  }
}

export class PriceListEntity {
  data: PriceEntity[];

  constructor(partial: Partial<PriceListEntity>) {
    Object.assign(this, partial);
  }
}
