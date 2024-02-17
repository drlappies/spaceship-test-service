import { Test } from '@nestjs/testing';
import { CoingeckoService } from '../coingecko.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { mockSimplePrice } from '../../../common/tests/mock';
import { Coin, Currency } from '../coingecko.type';

describe('CoingeckoService', () => {
  let coingeckoService: CoingeckoService;
  let configService: ConfigService;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CoingeckoService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue({
              apiKey: 'apiKey',
              baseUrl: 'https://api.coingecko.com/api',
            }),
          },
        },
        {
          provide: HttpService,
          useValue: {
            axiosRef: jest.fn(),
          },
        },
      ],
    }).compile();

    coingeckoService = moduleRef.get<CoingeckoService>(CoingeckoService);
    configService = moduleRef.get<ConfigService>(ConfigService);
    httpService = moduleRef.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(coingeckoService).toBeDefined();
    expect(configService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('getSimplePrice', () => {
    it('should return price', async () => {
      jest
        .spyOn(coingeckoService, 'makeRequest')
        .mockResolvedValue(mockSimplePrice);

      const params = {
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
      };

      const response = await coingeckoService.getSimplePrice(params);

      expect(coingeckoService.makeRequest).toHaveBeenCalledWith({
        url: '/v3/simple/price',
        method: 'GET',
        params: {
          ...params,
          vs_currencies: params.vs_currencies.join(','),
          ids: params.ids.join(','),
        },
      });

      expect(response).toEqual(mockSimplePrice);
    });
  });

  describe('makeRequest', () => {
    it('should set api key and base url before sending request to coingecko', async () => {
      jest.spyOn(httpService, 'axiosRef').mockResolvedValue({ data: {} });

      await coingeckoService.makeRequest({
        url: '/v3/any-api',
        method: 'GET',
      });

      expect(configService.get).toHaveBeenCalledWith('coingecko');
      expect(httpService.axiosRef).toHaveBeenCalledWith({
        url: '/v3/any-api',
        method: 'GET',
        baseURL: 'https://api.coingecko.com/api',
        headers: {
          x_cg_demo_api_key: 'apiKey',
        },
      });
    });
  });
});
