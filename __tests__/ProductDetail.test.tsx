import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ProductDetailScreen from '@/app/product/[id]';

const mockUseLocalSearchParams = jest.fn(() => ({ id: 'peugot-lr01' }));

jest.mock('expo-router', () => ({
  useLocalSearchParams: (...args: unknown[]) => mockUseLocalSearchParams(...args),
  router: { back: jest.fn() },
}));

jest.mock('react-native-safe-area-context', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');
  return {
    SafeAreaView: ({ children, ...props }: { children: React.ReactNode }) => (
      <View {...props}>{children}</View>
    ),
    useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => <View>{children}</View>,
  };
});

jest.mock('@/hooks/useBikeSpecs', () => ({
  useBikeSpecs: () => ({ spec: null, loading: true, error: false }),
}));

describe('ProductDetailScreen', () => {
  it('renders the product name', () => {
    render(<ProductDetailScreen />);
    expect(screen.getByText('PEUGOT LR01')).toBeTruthy();
  });

  it('renders the brand name', () => {
    render(<ProductDetailScreen />);
    expect(screen.getByText('PEUGOT')).toBeTruthy();
  });

  it('renders the price', () => {
    render(<ProductDetailScreen />);
    expect(screen.getByText('$899')).toBeTruthy();
  });

  it('renders the Add to Cart button', () => {
    render(<ProductDetailScreen />);
    expect(screen.getByText('Add to Cart')).toBeTruthy();
  });

  it('renders the BikeIndex live data section', () => {
    render(<ProductDetailScreen />);
    expect(screen.getByText('Live Bike Data')).toBeTruthy();
    expect(screen.getByText('BikeIndex.org')).toBeTruthy();
  });

  it('renders not found for unknown id', () => {
    mockUseLocalSearchParams.mockReturnValueOnce({ id: 'does-not-exist' });
    render(<ProductDetailScreen />);
    expect(screen.getByText('Product not found.')).toBeTruthy();
  });
});
