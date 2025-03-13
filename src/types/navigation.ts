import {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum RootStackScreens {
  Splash = 'Splash',
  Explore = 'Explore',
}

export type RootStackParamList = {
  [RootStackScreens.Splash]: undefined;
  [RootStackScreens.Explore]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
