import {fireEvent, render, screen} from '@testing-library/react-native';
import React from 'react';

import ErrorMessage from '@/components/ErrorMessage';

describe('ErrorMessage Component', () => {
  it('renders correctly without retry button when onRetry is not provided', () => {
    render(<ErrorMessage />);

    // Check if the animation is rendered
    expect(screen.getByTestId('error-animation')).toBeTruthy();

    // Check that retry button is not rendered
    expect(screen.queryByText('Try Again')).toBeNull();
  });

  it('renders correctly with retry button when onRetry is provided', () => {
    const onRetryMock = jest.fn();
    render(<ErrorMessage onRetry={onRetryMock} />);

    // Check if the animation is rendered
    expect(screen.getByTestId('error-animation')).toBeTruthy();

    // Check if retry button is rendered
    const retryButton = screen.getByText('Try Again');
    expect(retryButton).toBeTruthy();

    // Test onRetry callback
    fireEvent.press(retryButton);
    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });
});
