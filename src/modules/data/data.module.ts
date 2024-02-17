import { Module, Logger } from '@nestjs/common';
import { DataSchedular } from './data.schedular';
import { CoingeckoModule } from '../coingecko/coingecko.module';

@Module({
  imports: [CoingeckoModule],
  providers: [DataSchedular, Logger],
})
export class DataModule {}
