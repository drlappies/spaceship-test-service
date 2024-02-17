import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';
import { GetSimplePrice, SimplePrice } from './coingecko.type';

@Injectable()
export class CoingeckoService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Cache / Update Frequency: every 60 seconds (every 30 seconds for Pro API)
   */
  async getSimplePrice({
    vs_currencies,
    ids,
    ...params
  }: GetSimplePrice): Promise<SimplePrice> {
    const response = await this.makeRequest<SimplePrice>({
      url: '/v3/simple/price',
      method: 'GET',
      params: {
        vs_currencies: vs_currencies.join(','),
        ids: ids.join(','),
        ...params,
      },
    });

    return response;
  }

  private async makeRequest<T>(config: AxiosRequestConfig): Promise<T> {
    const { apiKey, baseUrl } =
      this.configService.get<Record<string, string>>('coingecko');

    const response = await this.httpService.axiosRef({
      ...config,
      baseURL: baseUrl,
      headers: {
        x_cg_demo_api_key: apiKey,
      },
    });

    return response.data as T;
  }
}
