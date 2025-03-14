import {fireEvent, render, screen} from '@testing-library/react-native';
import React from 'react';

import {StockItem} from '@/features/stocks/components/list-item';
import {Stock} from '@/types/stocks';

describe('StockItem Component', () => {
  const mockStock: Stock = {
    share_class_figi: 'BBG001S5N8V8',
    composite_figi: 'BBG000B9XRY4',
    last_updated_utc: '2023-03-01',
    primary_exchange: 'XNAS',
    currency_name: 'usd',
    name: 'Apple Inc.',
    cik: '0000320193',
    market: 'NASDAQ',
    ticker: 'AAPL',
    active: true,
    locale: 'US',
    type: 'CS',
  };

  beforeEach(() => {
    // Mock the getRandomBgColor function to return a consistent color for testing
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('renders correctly with even index', () => {
    const onPressMock = jest.fn();
    render(<StockItem stock={mockStock} onPress={onPressMock} index={0} />);

    // Check if ticker and name are rendered
    expect(screen.getAllByText('AAPL')[1]).toBeTruthy();
    expect(screen.getByText('Apple Inc.')).toBeTruthy();

    // Check if avatar is rendered
    const avatar = screen.getByTestId('stock-avatar');
    expect(avatar).toBeTruthy();
  });

  it('renders correctly with odd index', () => {
    const onPressMock = jest.fn();
    render(<StockItem stock={mockStock} onPress={onPressMock} index={1} />);

    // Check if ticker and name are rendered
    expect(screen.getAllByText('AAPL')[1]).toBeTruthy();
    expect(screen.getByText('Apple Inc.')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    render(<StockItem stock={mockStock} onPress={onPressMock} index={0} />);

    // Press the stock item
    fireEvent.press(screen.getByTestId('stock-item'));

    // Check if onPress was called
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
