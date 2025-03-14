import {render, screen} from '@testing-library/react-native';
import React, {act} from 'react';
import {SvgProps} from 'react-native-svg';

import {AppNavigation} from '@/navigation/AppNavigator';

// Mock the NasdaqIcon component
jest.mock('@/components/icons/nasdaq-icon', () => {
  const Text = jest.requireActual('react-native').Text;
  return {
    default: (props: SvgProps) => (
      <Text testID="nasdaq-icon" {...props}>
        Nasdaq Icon
      </Text>
    ),
    __esModule: true,
  };
});

// Import the actual components after mocking

describe('AppNavigator', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render the SplashScreen', () => {
    render(<AppNavigation />);
    expect(screen.getByTestId('splash-screen')).toBeTruthy();
  });

  it('should render the ExploreScreen', async () => {
    jest.useFakeTimers();
    render(<AppNavigation />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await screen.findByTestId('nasdaq-icon');
  });
});
