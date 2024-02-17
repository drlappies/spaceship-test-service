export default () => ({
  mongo: {
    uri:
      process.env.MONGODB_URI ||
      'mongodb://spaceship_test_user:spaceship_test_pass@localhost:27017',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || '6379',
  },
  coingecko: {
    apiKey: process.env.COINGECKO_API_KEY,
    baseUrl: process.env.COINGECKO_BASE_URL || 'https://api.coingecko.com/api',
  },
});
