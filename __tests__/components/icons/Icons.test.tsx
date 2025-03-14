import {render, screen} from '@testing-library/react-native';
import React from 'react';

import NasdaqIcon from '@/components/icons/nasdaq-icon';

// Import other icons as needed
// import OtherIcon from '@/components/icons/other-icon';

describe('Icon Components', () => {
  describe('NasdaqIcon', () => {
    it('renders without crashing', () => {
      render(<NasdaqIcon testID="nasdaq-icon" />);
      expect(screen.getByTestId('nasdaq-icon')).toBeTruthy();
    });

    it('matches snapshot', () => {
      render(<NasdaqIcon />);
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });

  // Add tests for other icons as needed
  // describe('OtherIcon', () => {
  //   it('renders without crashing', () => {
  //     render(<OtherIcon testID="other-icon" />);
  //     expect(screen.getByTestId('other-icon')).toBeTruthy();
  //   });
  //
  //   it('matches snapshot', () => {
  //     render(<OtherIcon />);
  //     expect(screen.toJSON()).toMatchSnapshot();
  //   });
  // });
});
