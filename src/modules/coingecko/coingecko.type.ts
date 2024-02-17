export enum Currency {
  USD = 'usd',
}

export enum Coin {
  BITCOIN = 'bitcoin',
  ETHERERUM = 'ethererum',
  LITECOIN = 'litecoin',
  MONERO = 'monero',
  RIPPLE = 'ripple',
  DOGECOIN = 'dogecoin',
  DASH = 'dash',
  MAIDSAFECOIN_TOKEN = 'maidsafecoin-token',
  LISK = 'LISK',
  STORJ = 'STORJ',
}

export interface GetSimplePrice {
  ids: Coin[];
  vs_currencies: Currency[];
  precision: number;
  include_market_cap?: boolean;
  include_24hr_vol?: boolean;
  include_24hr_change?: boolean;
  include_last_updated_at?: boolean;
}

export interface SimplePrice {
  [coin: string]: {
    [unit in Currency]: number;
  };
}
