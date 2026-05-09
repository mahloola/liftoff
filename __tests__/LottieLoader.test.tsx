import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { LottieLoader } from '@/components/ui/LottieLoader';

describe('LottieLoader', () => {
  it('renders without crashing', () => {
    render(<LottieLoader />);
    expect(screen.getByTestId('lottie-view')).toBeTruthy();
  });

  it('accepts a custom size', () => {
    render(<LottieLoader size={64} />);
    expect(screen.getByTestId('lottie-view')).toBeTruthy();
  });
});
