import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {act, render, screen} from '@testing-library/react-native';
import React from 'react';
import {View} from 'react-native';

import SplashScreen from '@/screens/SplashScreen';
import {RootStackScreens} from '@/types/navigation';

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => (
  <RootStack.Navigator>
    <RootStack.Screen name={RootStackScreens.Splash} component={SplashScreen} />
    <RootStack.Screen name={RootStackScreens.Explore}>
      {() => <View testID="explore-screen" />}
    </RootStack.Screen>
  </RootStack.Navigator>
);

const Navigation = () => (
  <NavigationContainer>
    <RootStackScreen />
  </NavigationContainer>
);

describe('SplashScreen', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  it('renders correctly', () => {
    render(<Navigation />);

    expect(screen.getByTestId('nasdaq-icon')).toBeTruthy();
    expect(screen.getByText('Stocks')).toBeTruthy();
    expect(screen.getByText(/Developed by Muhammed Saeed/)).toBeTruthy();
    expect(screen.getByText('stringsaeed@gmail.com')).toBeTruthy();
  });

  it('navigates to Explore screen after timeout', async () => {
    render(<Navigation />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await screen.findByTestId('explore-screen');
  });

  it('clears timeout on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    const {unmount} = render(<Navigation />);

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
