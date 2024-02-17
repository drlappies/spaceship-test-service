import { Test } from '@nestjs/testing';
import { PriceSchedular } from '../price.schedular';
import { PriceService } from '../price.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PriceCache } from '../price.cache';
import { Logger } from '@nestjs/common';
import { mockPriceList } from '../../../common/tests/mock';
import { PriceEvent } from '../price.event';

describe('PriceSchedular', () => {
  let priceSchedular: PriceSchedular;
  let priceService: PriceService;
  let eventEmitter: EventEmitter2;
  let priceCache: PriceCache;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PriceSchedular,
        { provide: Logger, useValue: { debug: jest.fn(), log: jest.fn() } },
        {
          provide: PriceService,
          useValue: {
            getExternalPriceData: jest.fn().mockResolvedValue(mockPriceList),
          },
        },
        { provide: EventEmitter2, useValue: { emit: jest.fn() } },
        { provide: PriceCache, useValue: { setPriceListCache: jest.fn() } },
      ],
    }).compile();

    priceSchedular = moduleRef.get<PriceSchedular>(PriceSchedular);
    priceService = moduleRef.get<PriceService>(PriceService);
    eventEmitter = moduleRef.get<EventEmitter2>(EventEmitter2);
    priceCache = moduleRef.get<PriceCache>(PriceCache);
  });

  it('should be defined', () => {
    expect(priceSchedular).toBeDefined();
    expect(priceService).toBeDefined();
    expect(eventEmitter).toBeDefined();
    expect(priceCache).toBeDefined();
  });

  describe('getCryptoPrice', () => {
    it('should get price data, emit PRICE_UPDATED event and update the price list in cache', async () => {
      await priceSchedular.getCryptoPrice();

      expect(priceService.getExternalPriceData).toHaveBeenCalled();
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        PriceEvent.PRICE_UPDATED,
        mockPriceList,
      );
      expect(priceCache.setPriceListCache).toHaveBeenCalledWith(mockPriceList);
    });
  });
});
