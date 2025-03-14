import {render, screen} from '@testing-library/react-native';
import React from 'react';

import LoadingIndicator from '@/components/LoadingIndicator';

describe('LoadingIndicator Component', () => {
  it('renders correctly with default props', () => {
    render(<LoadingIndicator />);

    // Check if the animation is rendered
    expect(screen.getByTestId('loading-animation')).toBeTruthy();

    // Check if default message is rendered
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('renders correctly with custom message', () => {
    render(<LoadingIndicator message="Custom loading message" />);

    // Check if the animation is rendered
    expect(screen.getByTestId('loading-animation')).toBeTruthy();

    // Check if custom message is rendered
    expect(screen.getByText('Custom loading message')).toBeTruthy();
  });

  it('renders correctly with small size', () => {
    render(<LoadingIndicator size="small" />);

    // Check if the animation is rendered with small size
    const animation = screen.getByTestId('loading-animation');
    expect(animation).toBeTruthy();
    expect(animation).toHaveStyle({height: 50, width: 50});
  });

  it('renders correctly with large size', () => {
    render(<LoadingIndicator size="large" />);

    // Check if the animation is rendered with large size
    const animation = screen.getByTestId('loading-animation');
    expect(animation).toBeTruthy();
    expect(animation).toHaveStyle({height: 100, width: 100});
  });

  it('does not render message when message is empty', () => {
    render(<LoadingIndicator message="" />);

    // Check if the animation is rendered
    expect(screen.getByTestId('loading-animation')).toBeTruthy();

    // Check that no message is rendered
    expect(screen.queryByTestId('loading-message')).toBeNull();
  });
});
