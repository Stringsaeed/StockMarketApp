import {fireEvent, render, screen} from '@testing-library/react-native';
import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {Button} from '@/components/ui/button';

// Mock the react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  return {
    Gesture: {
      Tap: () => ({
        onFinalize: jest.fn().mockReturnThis(),
        onBegin: jest.fn().mockReturnThis(),
        onStart: jest.fn().mockReturnThis(),
        onEnd: jest.fn().mockReturnThis(),
      }),
    },
    GestureDetector: (props: any) => props.children,
  };
});

// Simple counter component that uses the Button
const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <View testID="counter-container">
      <Text testID="count-display">Count: {count}</Text>

      <Button
        testID="increment-button"
        onTouchEnd={increment}
        style={{backgroundColor: '#28a745', marginTop: 10, padding: 10}}>
        <Text style={{color: 'white'}}>Increment</Text>
      </Button>

      <Button
        testID="decrement-button"
        onTouchEnd={decrement}
        style={{backgroundColor: '#dc3545', marginTop: 10, padding: 10}}>
        <Text style={{color: 'white'}}>Decrement</Text>
      </Button>

      <Button
        testID="reset-button"
        onTouchEnd={reset}
        style={{backgroundColor: '#6c757d', marginTop: 10, padding: 10}}>
        <Text style={{color: 'white'}}>Reset</Text>
      </Button>
    </View>
  );
};

describe('Button Integration Tests', () => {
  it('integrates with Counter component correctly', () => {
    render(<Counter />);

    // Check initial state
    expect(screen.getByText('Count: 0')).toBeTruthy();

    // Increment
    fireEvent(screen.getByTestId('increment-button'), 'onTouchEnd');
    expect(screen.getByText('Count: 1')).toBeTruthy();

    // Increment again
    fireEvent(screen.getByTestId('increment-button'), 'onTouchEnd');
    expect(screen.getByText('Count: 2')).toBeTruthy();

    // Decrement
    fireEvent(screen.getByTestId('decrement-button'), 'onTouchEnd');
    expect(screen.getByText('Count: 1')).toBeTruthy();

    // Reset
    fireEvent(screen.getByTestId('reset-button'), 'onTouchEnd');
    expect(screen.getByText('Count: 0')).toBeTruthy();
  });

  it('handles multiple button presses correctly', () => {
    render(<Counter />);

    // Multiple increments
    fireEvent(screen.getByTestId('increment-button'), 'onTouchEnd');
    fireEvent(screen.getByTestId('increment-button'), 'onTouchEnd');
    fireEvent(screen.getByTestId('increment-button'), 'onTouchEnd');
    expect(screen.getByText('Count: 3')).toBeTruthy();

    // Multiple decrements
    fireEvent(screen.getByTestId('decrement-button'), 'onTouchEnd');
    fireEvent(screen.getByTestId('decrement-button'), 'onTouchEnd');
    expect(screen.getByText('Count: 1')).toBeTruthy();
  });

  it('renders all buttons with correct styles', () => {
    render(<Counter />);

    // Check that all buttons are rendered
    expect(screen.getByTestId('increment-button')).toBeTruthy();
    expect(screen.getByTestId('decrement-button')).toBeTruthy();
    expect(screen.getByTestId('reset-button')).toBeTruthy();

    // Check button text
    expect(screen.getByText('Increment')).toBeTruthy();
    expect(screen.getByText('Decrement')).toBeTruthy();
    expect(screen.getByText('Reset')).toBeTruthy();
  });
});
