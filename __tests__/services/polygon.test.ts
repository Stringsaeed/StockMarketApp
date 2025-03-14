import axios from 'axios';

import {polygonApi} from '@/services/polygon';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      response: {
        eject: jest.fn(),
        use: jest.fn(),
      },
      request: {
        eject: jest.fn(),
        use: jest.fn(),
      },
    },
    delete: jest.fn(),
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
  })),
}));

describe('Polygon API Service', () => {
  it('should create an axios instance with the correct configuration', () => {
    expect(axios.create).toHaveBeenCalledWith({
      params: {
        apiKey: 'GNn_1NWraqF_D9YjoQBt0QOpioUaYl1W',
      },
      baseURL: 'https://api.polygon.io',
    });
  });

  it('should have the correct methods', () => {
    expect(polygonApi.delete).toBeDefined();
    expect(polygonApi.get).toBeDefined();
    expect(polygonApi.post).toBeDefined();
    expect(polygonApi.put).toBeDefined();
  });

  it('should have interceptors', () => {
    expect(polygonApi.interceptors).toBeDefined();
    expect(polygonApi.interceptors.request).toBeDefined();
    expect(polygonApi.interceptors.response).toBeDefined();
  });

  it('should make API calls with the correct parameters', async () => {
    const mockResponse = {
      data: {
        results: [
          {
            name: 'Apple Inc.',
            ticker: 'AAPL',
          },
        ],
      },
    };

    (polygonApi.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const response = await polygonApi.get('/v3/reference/tickers', {
      params: {
        search: 'Apple',
      },
    });

    expect(polygonApi.get).toHaveBeenCalledWith('/v3/reference/tickers', {
      params: {
        search: 'Apple',
      },
    });
    expect(response).toEqual(mockResponse);
  });

  it('should handle errors correctly', async () => {
    const mockError = new Error('Network Error');
    (polygonApi.get as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(polygonApi.get('/v3/reference/tickers')).rejects.toThrow(
      'Network Error',
    );
  });
});
