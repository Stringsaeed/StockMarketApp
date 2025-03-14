import {
  StaticParamList,
  createStaticNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Platform} from 'react-native';

import NasdaqIcon from '@/components/icons/nasdaq-icon';
import ExploreScreen from '@/screens/ExploreScreen';
import SplashScreen from '@/screens/SplashScreen';
import {RootStackScreens} from '@/types/navigation';

const Stack = createNativeStackNavigator({
  screens: {
    [RootStackScreens.Explore]: {
      options: {
        headerTitle: () => (
          <NasdaqIcon testID="nasdaq-icon" width={90} height={25} />
        ),
        headerSearchBarOptions: {
          placeholder: 'Search stocks',
        },
        headerTransparent: Platform.OS === 'ios',
        headerTitleAlign: 'center',
        headerBlurEffect: 'dark',
        headerShown: true,
        title: '',
      },
      screen: ExploreScreen,
    },
    [RootStackScreens.Splash]: {
      options: {
        headerShown: false,
        animation: 'fade',
      },
      screen: SplashScreen,
    },
  },
  initialRouteName: RootStackScreens.Splash,
});

export const AppNavigation = createStaticNavigation(Stack);

export type RootStackParamList = StaticParamList<typeof Stack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
