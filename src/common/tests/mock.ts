export const mockSimplePrice = {
  bitcoin: {
    usd: 50757.46283056,
    usd_market_cap: 995809417468.5662,
    usd_24h_vol: 20279338296.877434,
    usd_24h_change: -2.0407743943803727,
    last_updated_at: 1708182989,
  },
};

export const mockPriceList = {
  data: [{ coin: 'bitcoin', data: { ...mockSimplePrice.bitcoin } }],
};
