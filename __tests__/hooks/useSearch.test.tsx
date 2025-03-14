import {act, renderHook} from '@testing-library/react-native';

import {useDebounce} from '@/hooks/useDebounce';
import {useSearch} from '@/hooks/useSearch';

// Mock the useDebounce hook
jest.mock('@/hooks/useDebounce', () => ({
  useDebounce: jest.fn(value => value),
}));

describe('useSearch Hook', () => {
  const mockNavigation = {
    setOptions: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set header search bar options on mount', () => {
    renderHook(() =>
      useSearch({
        navigation: mockNavigation as any,
        placeholder: 'Search stocks',
      }),
    );

    expect(mockNavigation.setOptions).toHaveBeenCalledWith({
      headerSearchBarOptions: expect.objectContaining({
        placeholder: 'Search stocks',
        hideWhenScrolling: true,
        hideNavigationBar: true,
      }),
    });
  });

  it('should handle search text change', () => {
    const {result} = renderHook(() =>
      useSearch({
        navigation: mockNavigation as any,
        placeholder: 'Search stocks',
      }),
    );

    // Get the onChangeText handler
    const onChangeText =
      mockNavigation.setOptions.mock.calls[0][0].headerSearchBarOptions
        .onChangeText;

    // Simulate text change
    act(() => {
      onChangeText({nativeEvent: {text: 'AAPL'}});
    });

    // Since we mocked useDebounce to return the value directly,
    // deferredSearchQuery should be 'AAPL'
    expect(result.current.deferredSearchQuery).toBe('AAPL');
    expect(useDebounce).toHaveBeenCalledWith('AAPL', 300);
  });

  it('should handle cancel button press', () => {
    const {result} = renderHook(() =>
      useSearch({
        navigation: mockNavigation as any,
        placeholder: 'Search stocks',
      }),
    );

    // Get the onCancelButtonPress handler
    const onCancelButtonPress =
      mockNavigation.setOptions.mock.calls[0][0].headerSearchBarOptions
        .onCancelButtonPress;

    // Simulate text change first
    const onChangeText =
      mockNavigation.setOptions.mock.calls[0][0].headerSearchBarOptions
        .onChangeText;
    act(() => {
      onChangeText({nativeEvent: {text: 'AAPL'}});
    });

    // Simulate cancel button press
    act(() => {
      onCancelButtonPress();
    });

    // deferredSearchQuery should be empty
    expect(result.current.deferredSearchQuery).toBe('');
  });

  it('should use the provided placeholder', () => {
    renderHook(() =>
      useSearch({
        navigation: mockNavigation as any,
        placeholder: 'Custom placeholder',
      }),
    );

    expect(mockNavigation.setOptions).toHaveBeenCalledWith(
      expect.objectContaining({
        headerSearchBarOptions: expect.objectContaining({
          placeholder: 'Custom placeholder',
        }),
      }),
    );
  });
});
