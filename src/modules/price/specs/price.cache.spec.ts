import { Test } from '@nestjs/testing';
import { PriceCache } from '../price.cache';
import { getRedisToken } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { mockPriceList } from '../../../common/tests/mock';

describe('PriceCache', () => {
  let priceCache: PriceCache;
  let redis: Redis;

  beforeEach(async () => {
    const redisToken = getRedisToken('default');

    const moduleRef = await Test.createTestingModule({
      providers: [
        PriceCache,
        {
          provide: redisToken,
          useValue: { set: jest.fn(), get: jest.fn() },
        },
      ],
    }).compile();

    priceCache = moduleRef.get<PriceCache>(PriceCache);
    redis = moduleRef.get<Redis>(redisToken);
  });

  it('should be defined', () => {
    expect(priceCache).toBeDefined();
    expect(redis).toBeDefined();
  });

  describe('setPriceListCache', () => {
    it('should set price list to cache', async () => {
      await priceCache.setPriceListCache(mockPriceList);
      expect(redis.set).toHaveBeenCalledWith(
        'priceList',
        JSON.stringify(mockPriceList),
        'EX',
        30,
      );
    });
  });

  describe('getPriceListCache', () => {
    it('should return null if there is no price list from cache', async () => {
      jest.spyOn(redis, 'get').mockResolvedValue(null);
      const priceList = await priceCache.getPriceListCache();
      expect(redis.get).toHaveBeenCalledWith('priceList');
      expect(priceList).toEqual(null);
    });

    it('should return price list from cache', async () => {
      jest.spyOn(redis, 'get').mockResolvedValue(JSON.stringify(mockPriceList));
      const priceList = await priceCache.getPriceListCache();
      expect(redis.get).toHaveBeenCalledWith('priceList');
      expect(priceList).toEqual(mockPriceList);
    });
  });
});
