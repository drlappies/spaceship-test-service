import { Test } from '@nestjs/testing';
import { PriceService } from '../price.service';
import { CoingeckoService } from '../../coingecko/coingecko.service';
import { PriceCache } from '../price.cache';
import { Coin, Currency } from '../../coingecko/coingecko.type';
import { mockSimplePrice, mockPriceList } from '../../../common/tests/mock';

describe('PriceService', () => {
  let priceService: PriceService;
  let coingeckoService: CoingeckoService;
  let priceCache: PriceCache;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PriceService,
        {
          provide: CoingeckoService,
          useValue: {
            getSimplePrice: jest.fn().mockResolvedValue(mockSimplePrice),
          },
        },
        {
          provide: PriceCache,
          useValue: {
            getPriceListCache: jest.fn(),
            setPriceListCache: jest.fn(),
          },
        },
      ],
    }).compile();

    priceService = moduleRef.get<PriceService>(PriceService);
    coingeckoService = moduleRef.get<CoingeckoService>(CoingeckoService);
    priceCache = moduleRef.get<PriceCache>(PriceCache);
  });

  it('should be defined', () => {
    expect(priceService).toBeDefined();
    expect(coingeckoService).toBeDefined();
    expect(priceCache).toBeDefined();
  });

  describe('getPriceList', () => {
    it('should get from external data source if cache miss', async () => {
      jest.spyOn(priceCache, 'getPriceListCache').mockResolvedValue(null);
      jest
        .spyOn(priceService, 'getExternalPriceData')
        .mockResolvedValue(mockPriceList);

      const priceList = await priceService.getPriceList();

      expect(priceCache.getPriceListCache).toHaveBeenCalled();
      expect(priceService.getExternalPriceData).toHaveBeenCalled();
      expect(priceCache.setPriceListCache).toHaveBeenCalledWith(mockPriceList);
      expect(priceList).toEqual(mockPriceList);
    });
  });

  it('should return price list from cache if cache hit', async () => {
    jest
      .spyOn(priceCache, 'getPriceListCache')
      .mockResolvedValue(mockPriceList);
    jest.spyOn(priceService, 'getExternalPriceData');

    const priceList = await priceService.getPriceList();

    expect(priceCache.getPriceListCache).toHaveBeenCalled();
    expect(priceService.getExternalPriceData).not.toHaveBeenCalled();
    expect(priceCache.setPriceListCache).not.toHaveBeenCalled();
    expect(priceList).toEqual(mockPriceList);
  });

  describe('getExternalPriceData', () => {
    it('should fetch external price data and transform to price list entity', async () => {
      const priceList = await priceService.getExternalPriceData();

      expect(coingeckoService.getSimplePrice).toHaveBeenCalledWith({
        ids: [
          Coin.BITCOIN,
          Coin.ETHERERUM,
          Coin.LITECOIN,
          Coin.MONERO,
          Coin.RIPPLE,
          Coin.DOGECOIN,
          Coin.DASH,
          Coin.MAIDSAFECOIN_TOKEN,
          Coin.LISK,
          Coin.STORJ,
        ],
        vs_currencies: [Currency.USD],
        include_24hr_vol: true,
        include_last_updated_at: true,
        include_24hr_change: true,
        precision: 8,
      });

      expect(priceList).toEqual(mockPriceList);
    });
  });
});
