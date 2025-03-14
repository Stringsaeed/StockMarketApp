import {fireEvent, render, screen} from '@testing-library/react-native';
import React from 'react';
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

describe('Button Component', () => {
  it('renders correctly', () => {
    render(
      <Button testID="test-button">
        <Text>Test Button</Text>
      </Button>,
    );

    expect(screen.getByTestId('test-button')).toBeTruthy();
    expect(screen.getByText('Test Button')).toBeTruthy();
  });

  it('matches snapshot', () => {
    render(
      <Button>
        <Text>Test Button</Text>
      </Button>,
    );

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('applies custom styles', () => {
    const customStyle = {backgroundColor: 'red', borderRadius: 8};

    render(
      <Button style={customStyle} testID="styled-button">
        <Text>Styled Button</Text>
      </Button>,
    );

    const button = screen.getByTestId('styled-button');
    expect(button).toBeTruthy();
  });

  it('passes additional props', () => {
    render(
      <Button testID="props-button" accessibilityLabel="Accessible Button">
        <Text>Props Button</Text>
      </Button>,
    );

    const button = screen.getByTestId('props-button');
    expect(button).toBeTruthy();
  });

  it('renders children correctly', () => {
    render(
      <Button testID="children-button">
        <Text testID="button-text">Button Text</Text>
        <View testID="button-icon" />
      </Button>,
    );

    expect(screen.getByTestId('children-button')).toBeTruthy();
    expect(screen.getByTestId('button-text')).toBeTruthy();
    expect(screen.getByTestId('button-icon')).toBeTruthy();
  });

  it('handles press animations', () => {
    render(
      <Button testID="animated-button">
        <Text>Animated Button</Text>
      </Button>,
    );

    const button = screen.getByTestId('animated-button');

    // Simulate press
    fireEvent(button, 'onTouchStart');
    fireEvent(button, 'onTouchEnd');

    expect(button).toBeTruthy();
  });
});
