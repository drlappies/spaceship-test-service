import { Module } from '@nestjs/common';
import config from './config';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ScheduleModule } from '@nestjs/schedule';

import { PriceModule } from './modules/price/price.module';
import { EventModule } from './modules/event/event.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: configService.get<Record<string, string>>('redis'),
      }),
    }),
    PriceModule,
    EventModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
