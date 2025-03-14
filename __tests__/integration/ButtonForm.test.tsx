import {fireEvent, render, screen} from '@testing-library/react-native';
import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';

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

// Simple form component that uses the Button
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError('');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setError('');
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <View testID="success-container">
        <Text testID="success-message">Login successful!</Text>
        <Button testID="back-button" onTouchEnd={handleReset}>
          <Text>Back to Login</Text>
        </Button>
      </View>
    );
  }

  return (
    <View testID="form-container">
      {error ? <Text testID="error-message">{error}</Text> : null}

      <TextInput
        testID="username-input"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        testID="password-input"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        testID="submit-button"
        onTouchEnd={handleSubmit}
        style={{backgroundColor: '#007bff', marginTop: 10, padding: 10}}>
        <Text style={{color: 'white'}}>Login</Text>
      </Button>

      <Button
        testID="reset-button"
        onTouchEnd={handleReset}
        style={{backgroundColor: '#dc3545', marginTop: 10, padding: 10}}>
        <Text style={{color: 'white'}}>Reset</Text>
      </Button>
    </View>
  );
};

describe('Button in Form Integration Tests', () => {
  it('shows error message when form is submitted with empty fields', () => {
    render(<LoginForm />);

    // Submit the form without filling in fields
    fireEvent(screen.getByTestId('submit-button'), 'onTouchEnd');

    // Check that error message is displayed
    expect(screen.getByTestId('error-message')).toBeTruthy();
    expect(screen.getByText('Please fill in all fields')).toBeTruthy();
  });

  it('shows error message when password is too short', () => {
    render(<LoginForm />);

    // Fill in username
    fireEvent.changeText(screen.getByTestId('username-input'), 'testuser');

    // Fill in a short password
    fireEvent.changeText(screen.getByTestId('password-input'), '12345');

    // Submit the form
    fireEvent(screen.getByTestId('submit-button'), 'onTouchEnd');

    // Check that error message is displayed
    expect(screen.getByTestId('error-message')).toBeTruthy();
    expect(
      screen.getByText('Password must be at least 6 characters'),
    ).toBeTruthy();
  });

  it('submits the form successfully with valid inputs', () => {
    render(<LoginForm />);

    // Fill in username
    fireEvent.changeText(screen.getByTestId('username-input'), 'testuser');

    // Fill in a valid password
    fireEvent.changeText(screen.getByTestId('password-input'), 'password123');

    // Submit the form
    fireEvent(screen.getByTestId('submit-button'), 'onTouchEnd');

    // Check that success message is displayed
    expect(screen.getByTestId('success-container')).toBeTruthy();
    expect(screen.getByText('Login successful!')).toBeTruthy();
  });

  it('resets the form when reset button is clicked', () => {
    render(<LoginForm />);

    // Fill in username
    fireEvent.changeText(screen.getByTestId('username-input'), 'testuser');

    // Fill in password
    fireEvent.changeText(screen.getByTestId('password-input'), 'password123');

    // Click reset button
    fireEvent(screen.getByTestId('reset-button'), 'onTouchEnd');

    // Check that fields are cleared
    expect(screen.getByTestId('username-input').props.value).toBe('');
    expect(screen.getByTestId('password-input').props.value).toBe('');
  });

  it('navigates back to login form after successful submission', () => {
    render(<LoginForm />);

    // Fill in form and submit
    fireEvent.changeText(screen.getByTestId('username-input'), 'testuser');
    fireEvent.changeText(screen.getByTestId('password-input'), 'password123');
    fireEvent(screen.getByTestId('submit-button'), 'onTouchEnd');

    // Check that we're on the success screen
    expect(screen.getByTestId('success-container')).toBeTruthy();

    // Click back button
    fireEvent(screen.getByTestId('back-button'), 'onTouchEnd');

    // Check that we're back to the form
    expect(screen.getByTestId('form-container')).toBeTruthy();

    // Check that form is reset
    expect(screen.getByTestId('username-input').props.value).toBe('');
    expect(screen.getByTestId('password-input').props.value).toBe('');
  });
});
