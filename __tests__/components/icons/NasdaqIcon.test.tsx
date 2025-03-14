import {render, screen} from '@testing-library/react-native';
import React from 'react';

import NasdaqIcon from '@/components/icons/nasdaq-icon';

describe('NasdaqIcon', () => {
  it('renders correctly', () => {
    render(<NasdaqIcon testID="nasdaq-icon" />);
    expect(screen.getByTestId('nasdaq-icon')).toBeTruthy();
  });

  it('matches snapshot', () => {
    render(<NasdaqIcon />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('applies custom props correctly', () => {
    render(<NasdaqIcon width={50} height={20} fill="red" />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('maintains consistent dimensions', () => {
    render(<NasdaqIcon testID="nasdaq-icon" />);
    const icon = screen.getByTestId('nasdaq-icon');

    // Default dimensions from the component
    expect(icon).toHaveStyle({width: 106, height: 30});
  });
});
