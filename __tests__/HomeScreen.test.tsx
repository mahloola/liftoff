import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import HomeScreen from '@/app/(tabs)/index';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('react-native-safe-area-context', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');
  return {
    SafeAreaView: ({ children, ...props }: { children: React.ReactNode }) => (
      <View {...props}>{children}</View>
    ),
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => <View>{children}</View>,
  };
});

describe('HomeScreen', () => {
  it('renders the main heading', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Choose Your Bike')).toBeTruthy();
  });

  it('renders the hero card discount label', () => {
    render(<HomeScreen />);
    expect(screen.getByText('30% Off')).toBeTruthy();
  });

  it('renders product cards in the grid', () => {
    render(<HomeScreen />);
    expect(screen.getByText('PEUGOT LR01')).toBeTruthy();
    expect(screen.getByText('SMITH Trade')).toBeTruthy();
  });

  it('renders product prices in the grid', () => {
    render(<HomeScreen />);
    expect(screen.getByText('$899')).toBeTruthy();
    expect(screen.getByText('$649')).toBeTruthy();
  });

  it('renders all five category buttons', () => {
    render(<HomeScreen />);
    expect(screen.getByTestId('category-all')).toBeTruthy();
    expect(screen.getByTestId('category-bicycle')).toBeTruthy();
    expect(screen.getByTestId('category-road')).toBeTruthy();
    expect(screen.getByTestId('category-mountain')).toBeTruthy();
    expect(screen.getByTestId('category-helmet')).toBeTruthy();
  });

  it('tapping a category button does not crash', () => {
    render(<HomeScreen />);
    fireEvent.press(screen.getByTestId('category-mountain'));
  });

  it('tapping all category button shows all products', () => {
    render(<HomeScreen />);
    fireEvent.press(screen.getByTestId('category-all'));
    expect(screen.getByText('PEUGOT LR01')).toBeTruthy();
  });
});
