import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Price } from './price.schema';
import { PriceDto } from './dtos/price.dto';

@Injectable()
export class PriceRepository {
  constructor(@InjectModel(Price.name) readonly priceModel: Model<Price>) {}

  async upsertMany(priceDtos: PriceDto[]) {
    const result = await this.priceModel.bulkWrite(
      priceDtos.map(({ coin, data }) => ({
        updateOne: {
          filter: { coin },
          update: {
            data,
          },
          upsert: true,
        },
      })),
    );

    return result;
  }

  async getAll() {
    return this.priceModel.find();
  }
}
