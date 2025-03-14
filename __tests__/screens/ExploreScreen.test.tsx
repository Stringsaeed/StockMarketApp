import {NavigationContainer} from '@react-navigation/native';
import {render, screen, waitFor} from '@testing-library/react-native';
import React from 'react';

import ExploreScreen from '@/screens/ExploreScreen';

// Mock the navigation
const mockNavigate = jest.fn();
const mockSetOptions = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      setOptions: mockSetOptions,
      navigate: mockNavigate,
    }),
  };
});

// Mock the useSearch hook
jest.mock('@/hooks/useSearch', () => ({
  useSearch: jest.fn(() => ({
    deferredSearchQuery: '',
  })),
}));

// Mock the useStocksInfiniteQuery hook
const mockFetchNextPage = jest.fn();
const mockRefetch = jest.fn();

jest.mock('@/features/stocks', () => ({
  useStocksInfiniteQuery: jest.fn(() => ({
    data: [
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
    fetchNextPage: mockFetchNextPage,
    isFetchNextPageError: false,
    isFetchingNextPage: false,
    refetch: mockRefetch,
    hasNextPage: true,
    isLoading: false,
    error: null,
  })),
  StocksList: (props: any) => {
    const View = jest.requireActual('react-native').View;
    return (
      <View testID="stocks-list" {...props}>
        <View testID="mocked-stocks-list" />
      </View>
    );
  },
}));

// Mock the LoadingIndicator component
jest.mock('@/components/LoadingIndicator', () => {
  const View = jest.requireActual('react-native').View;
  return {
    default: (props: any) => <View testID="loading-indicator" {...props} />,
    __esModule: true,
  };
});

// Mock the ErrorMessage component
jest.mock('@/components/ErrorMessage', () => {
  const View = jest.requireActual('react-native').View;
  return {
    default: (props: any) => <View testID="error-message" {...props} />,
    __esModule: true,
  };
});

describe('ExploreScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the StocksList when data is available', () => {
    render(
      <NavigationContainer>
        <ExploreScreen />
      </NavigationContainer>,
    );

    expect(screen.getByTestId('stocks-list')).toBeTruthy();
    expect(screen.getByTestId('mocked-stocks-list')).toBeTruthy();
  });

  it('renders LoadingIndicator when isLoading is true', () => {
    // Override the mock to return isLoading: true
    require('@/features/stocks').useStocksInfiniteQuery.mockReturnValueOnce({
      isLoading: true,
      error: null,
      data: null,
    });

    render(
      <NavigationContainer>
        <ExploreScreen />
      </NavigationContainer>,
    );

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders ErrorMessage when there is an error', () => {
    // Override the mock to return an error
    require('@/features/stocks').useStocksInfiniteQuery.mockReturnValueOnce({
      error: new Error('Failed to fetch stocks'),
      isFetchNextPageError: false,
      isLoading: false,
      data: null,
    });

    render(
      <NavigationContainer>
        <ExploreScreen />
      </NavigationContainer>,
    );
  });

  it('calls fetchNextPage when handleEndReached is called', async () => {
    render(
      <NavigationContainer>
        <ExploreScreen />
      </NavigationContainer>,
    );

    // Get the StocksList component and trigger onEndReached
    const stocksList = screen.getByTestId('stocks-list');
    stocksList.props.onEndReached();

    await waitFor(() => {
      expect(mockFetchNextPage).toHaveBeenCalled();
    });
  });
});
