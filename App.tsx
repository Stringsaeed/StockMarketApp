/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {DarkTheme} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {Appearance} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppNavigation} from './src/navigation/AppNavigator';

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    Appearance.setColorScheme('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AppNavigation theme={DarkTheme} />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
