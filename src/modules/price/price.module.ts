import { Logger, Module } from '@nestjs/common';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';
import { PriceCache } from './price.cache';
import { CoingeckoModule } from '../coingecko/coingecko.module';
import { PriceSchedular } from './price.schedular';

@Module({
  imports: [CoingeckoModule],
  controllers: [PriceController],
  providers: [Logger, PriceCache, PriceService, PriceSchedular],
  exports: [PriceService, PriceCache],
})
export class PriceModule {}
