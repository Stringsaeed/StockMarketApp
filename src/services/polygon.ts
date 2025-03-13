import axios from 'axios';

export const polygonApi = axios.create({
  params: {
    apiKey: 'GNn_1NWraqF_D9YjoQBt0QOpioUaYl1W',
  },
  baseURL: 'https://api.polygon.io',
});
