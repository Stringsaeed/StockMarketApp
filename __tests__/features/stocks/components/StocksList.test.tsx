import {render, screen, fireEvent} from '@testing-library/react-native';
import React from 'react';

import {StocksList} from '@/features/stocks/components/list';
import {Stock} from '@/types/stocks';

// Mock the MasonryFlashList component
jest.mock('@shopify/flash-list', () => {
  const View = jest.requireActual('react-native').View;
  return {
    MasonryFlashList: (props: any) => {
      // Handle null data by using the same nullish coalescing as the component
      const data = props.data ?? [];
      // Render a few items from the data array to simulate the list
      const items = data.slice(0, 3).map((item: any, index: number) => {
        return props.renderItem({index, item});
      });

      return (
        <View {...props}>
          {items}
          {props.ListFooterComponent && props.ListFooterComponent()}
        </View>
      );
    },
  };
});

// Mock the StockItem component
jest.mock('@/features/stocks/components/list-item', () => {
  const View = jest.requireActual('react-native').View;
  return {
    StockItem: (props: any) => (
      <View testID={`stock-item-${props.stock.ticker}`} {...props}>
        <View testID={`stock-item-content-${props.stock.ticker}`} />
      </View>
    ),
  };
});

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

describe('StocksList', () => {
  const mockStocks: Stock[] = [
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
    {
      last_updated_utc: '2023-03-01',
      primary_exchange: 'NASDAQ',
      name: 'Amazon.com Inc.',
      currency_name: 'usd',
      market: 'stocks',
      ticker: 'AMZN',
      locale: 'us',
      active: true,
      type: 'CS',
    },
  ];

  const mockOnEndReached = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the list with stock items', () => {
    render(
      <StocksList
        data={mockStocks}
        hasNextPage={false}
        onEndReached={mockOnEndReached}
      />,
    );

    expect(screen.getByTestId('stocks-list')).toBeTruthy();
    expect(screen.getByTestId('stock-item-AAPL')).toBeTruthy();
    expect(screen.getByTestId('stock-item-MSFT')).toBeTruthy();
    expect(screen.getByTestId('stock-item-AMZN')).toBeTruthy();
  });

  it('renders loading indicator when hasNextPage is true', () => {
    render(
      <StocksList
        data={mockStocks}
        hasNextPage={true}
        onEndReached={mockOnEndReached}
      />,
    );

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders error message when loadingMoreError is provided', () => {
    render(
      <StocksList
        data={mockStocks}
        hasNextPage={true}
        onEndReached={mockOnEndReached}
        loadingMoreError="Failed to load more stocks"
      />,
    );

    expect(screen.getByTestId('error-message')).toBeTruthy();
  });

  it('calls onEndReached when list reaches the end', () => {
    render(
      <StocksList
        data={mockStocks}
        hasNextPage={true}
        onEndReached={mockOnEndReached}
      />,
    );

    const list = screen.getByTestId('stocks-list');
    fireEvent(list, 'onEndReached');

    expect(mockOnEndReached).toHaveBeenCalled();
  });

  it('renders empty list when data is empty array', () => {
    render(
      <StocksList
        data={[]}
        hasNextPage={false}
        onEndReached={mockOnEndReached}
      />,
    );

    expect(screen.getByTestId('stocks-list')).toBeTruthy();
    expect(screen.queryByTestId('stock-item-AAPL')).toBeNull();
  });

  it('handles null data gracefully', () => {
    render(
      <StocksList
        data={null as any}
        hasNextPage={false}
        onEndReached={mockOnEndReached}
      />,
    );

    expect(screen.getByTestId('stocks-list')).toBeTruthy();
    expect(screen.queryByTestId('stock-item-AAPL')).toBeNull();
  });
});
