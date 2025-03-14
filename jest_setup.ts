import 'react-native-gesture-handler/jestSetup';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import '@shopify/flash-list/jestSetup';

// Mock Lottie animations
jest.mock('lottie-react-native', () => 'LottieView');

// Mock react-native-reanimated
require('react-native-reanimated').setUpTests();

jest.mock('react-native-reanimated', () => {
  const Reanimated = jest.requireActual('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const inset = {bottom: 0, right: 0, left: 0, top: 0};
  return {
    SafeAreaProvider: jest.fn(({children}) => children),
    SafeAreaView: jest.fn(({children}) => children),
    useSafeAreaInsets: jest.fn(() => inset),
  };
});

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
