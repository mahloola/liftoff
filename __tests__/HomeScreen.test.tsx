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

  it('renders the featured product name', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Electric Bicycle Pro')).toBeTruthy();
  });

  it('renders the discount badge', () => {
    render(<HomeScreen />);
    expect(screen.getByText('30% Off')).toBeTruthy();
  });

  it('renders the Buy Now button', () => {
    render(<HomeScreen />);
    expect(screen.getAllByText('Buy Now').length).toBeGreaterThan(0);
  });

  it('renders the featured price with discount', () => {
    render(<HomeScreen />);
    expect(screen.getByText('$1,749')).toBeTruthy();
    expect(screen.getByText('$2,499')).toBeTruthy();
  });

  it('renders Best Seller section heading', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Best Seller')).toBeTruthy();
  });

  it('renders all four category labels', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Bicycle')).toBeTruthy();
    expect(screen.getByText('Road')).toBeTruthy();
    expect(screen.getByText('Mountain')).toBeTruthy();
    expect(screen.getByText('Helmet')).toBeTruthy();
  });

  it('renders product cards in the grid', () => {
    render(<HomeScreen />);
    expect(screen.getByText('PEUGOT LR01')).toBeTruthy();
    expect(screen.getByText('SMITH Trade')).toBeTruthy();
  });

  it('renders product brand names in cards', () => {
    render(<HomeScreen />);
    expect(screen.getByText('PEUGOT')).toBeTruthy();
    expect(screen.getByText('SMITH')).toBeTruthy();
  });

  it('tapping a category button does not crash', () => {
    render(<HomeScreen />);
    fireEvent.press(screen.getByText('Mountain'));
  });
});
