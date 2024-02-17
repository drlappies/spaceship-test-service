import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PriceSchema, Price } from './price.schema';
import { PriceRepository } from './price.repository';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';
import { PriceCache } from './price.cache';
import { CoingeckoModule } from '../coingecko/coingecko.module';
import { PriceSchedular } from './price.schedular';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Price.name, schema: PriceSchema }]),
    CoingeckoModule,
  ],
  controllers: [PriceController],
  providers: [
    Logger,
    PriceRepository,
    PriceCache,
    PriceService,
    PriceSchedular,
  ],
  exports: [PriceRepository, PriceService, PriceCache],
})
export class PriceModule {}
