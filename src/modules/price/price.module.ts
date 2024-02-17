import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PriceSchema, Price } from './price.schema';
import { PriceSubcriber } from './price.subscriber';
import { PriceRepository } from './price.repository';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';
import { PriceCache } from './price.cache';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Price.name, schema: PriceSchema }]),
  ],
  controllers: [PriceController],
  providers: [
    Logger,
    PriceSubcriber,
    PriceRepository,
    PriceCache,
    PriceService,
  ],
})
export class PriceModule {}
