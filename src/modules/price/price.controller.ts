import { Controller, Get } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceListEntity } from './price.entity';

@Controller('/v1/price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  getAll(): Promise<PriceListEntity> {
    return this.priceService.getPriceList();
  }
}
