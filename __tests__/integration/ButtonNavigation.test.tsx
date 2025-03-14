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

// Mock screens for navigation testing
const HomeScreen = ({navigate}: {navigate: (screen: string) => void}) => (
  <View testID="home-screen">
    <Text>Home Screen</Text>
    <Button
      testID="to-profile-button"
      onTouchEnd={() => navigate('Profile')}
      style={{backgroundColor: '#007bff', marginTop: 10, padding: 10}}>
      <Text style={{color: 'white'}}>Go to Profile</Text>
    </Button>
    <Button
      testID="to-settings-button"
      onTouchEnd={() => navigate('Settings')}
      style={{backgroundColor: '#28a745', marginTop: 10, padding: 10}}>
      <Text style={{color: 'white'}}>Go to Settings</Text>
    </Button>
  </View>
);

const ProfileScreen = ({navigate}: {navigate: (screen: string) => void}) => (
  <View testID="profile-screen">
    <Text>Profile Screen</Text>
    <Button
      testID="back-to-home-button"
      onTouchEnd={() => navigate('Home')}
      style={{backgroundColor: '#6c757d', marginTop: 10, padding: 10}}>
      <Text style={{color: 'white'}}>Back to Home</Text>
    </Button>
  </View>
);

const SettingsScreen = ({navigate}: {navigate: (screen: string) => void}) => (
  <View testID="settings-screen">
    <Text>Settings Screen</Text>
    <Button
      testID="back-to-home-button"
      onTouchEnd={() => navigate('Home')}
      style={{backgroundColor: '#6c757d', marginTop: 10, padding: 10}}>
      <Text style={{color: 'white'}}>Back to Home</Text>
    </Button>
  </View>
);

// Simple navigation container
const NavigationContainer = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const navigate = (_screen: string) => {
    setCurrentScreen(_screen);
  };

  return (
    <View testID="navigation-container">
      {currentScreen === 'Home' && <HomeScreen navigate={navigate} />}
      {currentScreen === 'Profile' && <ProfileScreen navigate={navigate} />}
      {currentScreen === 'Settings' && <SettingsScreen navigate={navigate} />}
    </View>
  );
};

describe('Button in Navigation Integration Tests', () => {
  it('renders the home screen by default', () => {
    render(<NavigationContainer />);

    expect(screen.getByTestId('home-screen')).toBeTruthy();
    expect(screen.getByText('Home Screen')).toBeTruthy();
  });

  it('navigates from home to profile screen when profile button is pressed', () => {
    render(<NavigationContainer />);

    // Verify we're on the home screen
    expect(screen.getByTestId('home-screen')).toBeTruthy();

    // Navigate to profile
    fireEvent(screen.getByTestId('to-profile-button'), 'onTouchEnd');

    // Verify we're on the profile screen
    expect(screen.getByTestId('profile-screen')).toBeTruthy();
    expect(screen.getByText('Profile Screen')).toBeTruthy();
  });

  it('navigates from home to settings screen when settings button is pressed', () => {
    render(<NavigationContainer />);

    // Verify we're on the home screen
    expect(screen.getByTestId('home-screen')).toBeTruthy();

    // Navigate to settings
    fireEvent(screen.getByTestId('to-settings-button'), 'onTouchEnd');

    // Verify we're on the settings screen
    expect(screen.getByTestId('settings-screen')).toBeTruthy();
    expect(screen.getByText('Settings Screen')).toBeTruthy();
  });

  it('navigates back to home from profile screen', () => {
    render(<NavigationContainer />);

    // Navigate to profile
    fireEvent(screen.getByTestId('to-profile-button'), 'onTouchEnd');

    // Verify we're on the profile screen
    expect(screen.getByTestId('profile-screen')).toBeTruthy();

    // Navigate back to home
    fireEvent(screen.getByTestId('back-to-home-button'), 'onTouchEnd');

    // Verify we're back on the home screen
    expect(screen.getByTestId('home-screen')).toBeTruthy();
  });

  it('navigates back to home from settings screen', () => {
    render(<NavigationContainer />);

    // Navigate to settings
    fireEvent(screen.getByTestId('to-settings-button'), 'onTouchEnd');

    // Verify we're on the settings screen
    expect(screen.getByTestId('settings-screen')).toBeTruthy();

    // Navigate back to home
    fireEvent(screen.getByTestId('back-to-home-button'), 'onTouchEnd');

    // Verify we're back on the home screen
    expect(screen.getByTestId('home-screen')).toBeTruthy();
  });

  it('completes a full navigation flow between all screens', () => {
    render(<NavigationContainer />);

    // Start at home
    expect(screen.getByTestId('home-screen')).toBeTruthy();

    // Go to profile
    fireEvent(screen.getByTestId('to-profile-button'), 'onTouchEnd');
    expect(screen.getByTestId('profile-screen')).toBeTruthy();

    // Back to home
    fireEvent(screen.getByTestId('back-to-home-button'), 'onTouchEnd');
    expect(screen.getByTestId('home-screen')).toBeTruthy();

    // Go to settings
    fireEvent(screen.getByTestId('to-settings-button'), 'onTouchEnd');
    expect(screen.getByTestId('settings-screen')).toBeTruthy();

    // Back to home
    fireEvent(screen.getByTestId('back-to-home-button'), 'onTouchEnd');
    expect(screen.getByTestId('home-screen')).toBeTruthy();
  });
});
