import {renderHook, waitFor} from '@testing-library/react-native';
import nock from 'nock';

import {createMockApi} from '#/test-utils/nock';
import {createQueryWrapper} from '#/test-utils/render';
import {useStocksInfiniteQuery} from '@/features/stocks';
import {StockResponse} from '@/types/stocks';

describe('useStocksInfiniteQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    nock.cleanAll();
  });

  test('fetches stocks data successfully', async () => {
    // Mock the API response
    const mockResponse: StockResponse = {
      results: [
        {
          last_updated_utc: '2023-03-01',
          primary_exchange: 'NASDAQ',
          currency_name: 'usd',
          name: 'Apple Inc.',
          market: 'stocks',
          ticker: 'AAPL',
          locale: 'us',
          active: true,
          type: 'CS',
        },
        {
          last_updated_utc: '2023-03-01',
          name: 'Microsoft Corporation',
          primary_exchange: 'NASDAQ',
          currency_name: 'usd',
          market: 'stocks',
          ticker: 'MSFT',
          locale: 'us',
          active: true,
          type: 'CS',
        },
      ],
      next_url: '/v3/reference/tickers?cursor=abc123',
      request_id: 'test-request-id',
      status: 'OK',
      count: 2,
    };

    await createMockApi(mockResponse);

    const {result} = renderHook(() => useStocksInfiniteQuery(), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => {
      return expect(result.current.data).toBeDefined();
    });

    expect(result.current.data).toHaveLength(2);
    expect(result.current.data?.[0].ticker).toBe('AAPL');
    expect(result.current.data?.[1].ticker).toBe('MSFT');
    expect(result.current.hasNextPage).toBe(true);
  });

  it('handles search query correctly', async () => {
    // Mock the API response for search
    const mockResponse: StockResponse = {
      results: [
        {
          last_updated_utc: '2023-03-01',
          primary_exchange: 'NASDAQ',
          currency_name: 'usd',
          name: 'Apple Inc.',
          market: 'stocks',
          ticker: 'AAPL',
          locale: 'us',
          active: true,
          type: 'CS',
        },
      ],
      request_id: 'test-request-id',
      next_url: undefined,
      status: 'OK',
      count: 1,
    };

    await createMockApi(mockResponse);

    const {result} = renderHook(() => useStocksInfiniteQuery('Apple'), {
      wrapper: createQueryWrapper(),
    });

    // Verify the data is correctly processed
    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].ticker).toBe('AAPL');
    expect(result.current.hasNextPage).toBe(false);
  });

  it('handles pagination correctly', async () => {
    // Mock the first page response
    const mockFirstPageResponse: StockResponse = {
      results: [
        {
          last_updated_utc: '2023-03-01',
          primary_exchange: 'NASDAQ',
          currency_name: 'usd',
          name: 'Apple Inc.',
          market: 'stocks',
          ticker: 'AAPL',
          locale: 'us',
          active: true,
          type: 'CS',
        },
      ],
      next_url: '/v3/reference/tickers?cursor=abc123',
      request_id: 'test-request-id-1',
      status: 'OK',
      count: 1,
    };

    // Mock the second page response
    const mockSecondPageResponse: StockResponse = {
      results: [
        {
          last_updated_utc: '2023-03-01',
          name: 'Microsoft Corporation',
          primary_exchange: 'NASDAQ',
          currency_name: 'usd',
          market: 'stocks',
          ticker: 'MSFT',
          locale: 'us',
          active: true,
          type: 'CS',
        },
      ],
      request_id: 'test-request-id-2',
      next_url: undefined,
      status: 'OK',
      count: 1,
    };

    await (createMockApi() as nock.Interceptor)
      .reply(200, uri => {
        if (uri.includes('cursor=abc123')) {
          return mockSecondPageResponse;
        }
        return mockFirstPageResponse;
      })
      .persist();

    const {result} = renderHook(() => useStocksInfiniteQuery(), {
      wrapper: createQueryWrapper(),
    });

    // Wait for the first page data to be available
    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });

    // Verify the first page data
    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].ticker).toBe('AAPL');
    expect(result.current.hasNextPage).toBe(true);

    // Fetch the next page
    result.current.fetchNextPage();

    // Wait for the second page data to be combined with the first
    await waitFor(() => {
      expect(result.current.data?.length).toBe(2);
    });

    // Verify both pages of data are combined
    expect(result.current.data?.[0].ticker).toBe('AAPL');
    expect(result.current.data?.[1].ticker).toBe('MSFT');
    expect(result.current.hasNextPage).toBe(false);
  });

  it('handles API errors correctly', async () => {
    // Mock an API error

    await (createMockApi() as nock.Interceptor).reply(500).persist(false);

    const {result} = renderHook(() => useStocksInfiniteQuery(), {
      wrapper: createQueryWrapper(),
    });

    console.log('result', result.current.error);

    // Wait for the error to be set
    await waitFor(() => expect(result.current.error).toBeTruthy());

    // Verify the error is captured
    expect(result.current.data).toBeUndefined();
  });

  it('refetches data when search query changes', async () => {
    // Mock responses for different search queries
    const mockAppleResponse: StockResponse = {
      results: [
        {
          last_updated_utc: '2023-03-01',
          primary_exchange: 'NASDAQ',
          currency_name: 'usd',
          name: 'Apple Inc.',
          market: 'stocks',
          ticker: 'AAPL',
          locale: 'us',
          active: true,
          type: 'CS',
        },
      ],
      request_id: 'test-request-id-apple',
      next_url: undefined,
      status: 'OK',
      count: 1,
    };

    const mockMicrosoftResponse: StockResponse = {
      results: [
        {
          last_updated_utc: '2023-03-01',
          name: 'Microsoft Corporation',
          primary_exchange: 'NASDAQ',
          currency_name: 'usd',
          market: 'stocks',
          ticker: 'MSFT',
          locale: 'us',
          active: true,
          type: 'CS',
        },
      ],
      request_id: 'test-request-id-microsoft',
      next_url: undefined,
      status: 'OK',
      count: 1,
    };

    // Set up the mock to return different responses for different calls
    await (createMockApi() as nock.Interceptor).reply(200, mockAppleResponse);

    // Initial render with 'Apple' search
    const {rerender, result} = renderHook(
      (searchQuery: string = 'Apple') => useStocksInfiniteQuery(searchQuery),
      {
        wrapper: createQueryWrapper(),
      },
    );

    // Wait for the first search results to be available
    await waitFor(
      () => {
        expect(result.current.data).toBeDefined();
      },
      {
        timeout: 3000,
      },
    );

    // Verify the first search results
    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].ticker).toBe('AAPL');

    nock.cleanAll();
    await createMockApi(mockMicrosoftResponse);
    // Change the search query to 'Microsoft'
    rerender('Microsoft');

    // Wait for the new search results to be available
    await waitFor(() => {
      expect(result.current.data?.[0]?.ticker).toBe('MSFT');
    });

    // Verify the new search results
    expect(result.current.data).toHaveLength(1);
  });
});
