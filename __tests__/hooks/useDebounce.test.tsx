import {act, renderHook} from '@testing-library/react-native';

import {useDebounce} from '@/hooks/useDebounce';

describe('useDebounce Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const {result} = renderHook(() => useDebounce('initial value', 500));
    expect(result.current).toBe('initial value');
  });

  it('should debounce the value change', () => {
    const {rerender, result} = renderHook(
      ({value, delay}: {value: string; delay: number}) =>
        useDebounce(value, delay),
      {initialProps: {value: 'initial value', delay: 500}},
    );

    // Initial value should be returned immediately
    expect(result.current).toBe('initial value');

    // Update the value
    rerender({value: 'updated value', delay: 500});

    // Value should not be updated yet
    expect(result.current).toBe('initial value');

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should be updated after the delay
    expect(result.current).toBe('updated value');
  });

  it('should handle multiple value changes within the delay period', () => {
    const {rerender, result} = renderHook(
      ({value, delay}: {value: string; delay: number}) =>
        useDebounce(value, delay),
      {initialProps: {value: 'initial value', delay: 500}},
    );

    // Update the value multiple times
    rerender({value: 'intermediate value 1', delay: 500});
    rerender({value: 'intermediate value 2', delay: 500});
    rerender({value: 'final value', delay: 500});

    // Value should not be updated yet
    expect(result.current).toBe('initial value');

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Only the final value should be used
    expect(result.current).toBe('final value');
  });

  it('should handle delay changes', () => {
    const {rerender, result} = renderHook(
      ({value, delay}: {value: string; delay: number}) =>
        useDebounce(value, delay),
      {initialProps: {value: 'initial value', delay: 500}},
    );

    // Update the value and delay
    rerender({value: 'updated value', delay: 1000});

    // Fast-forward time but not enough for the new delay
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should not be updated yet
    expect(result.current).toBe('initial value');

    // Fast-forward time to reach the new delay
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should be updated after the new delay
    expect(result.current).toBe('updated value');
  });
});
