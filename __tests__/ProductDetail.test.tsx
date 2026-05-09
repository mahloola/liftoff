import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ProductDetailScreen from '@/app/product/[id]';
import { CartProvider } from '@/context/CartContext';

const mockUseLocalSearchParams = jest.fn(() => ({ id: 'peugot-lr01' }));

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => mockUseLocalSearchParams(),
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
  it('renders the product title (brand — model)', () => {
    render(<CartProvider><ProductDetailScreen /></CartProvider>);
    // Title shows as "PEUGOT — LR01" (multiple times: header + description tab)
    expect(screen.getAllByText('PEUGOT — LR01').length).toBeGreaterThan(0);
  });

  it('renders the price', () => {
    render(<CartProvider><ProductDetailScreen /></CartProvider>);
    expect(screen.getByText('$899')).toBeTruthy();
  });

  it('renders the Add to Cart button', () => {
    render(<CartProvider><ProductDetailScreen /></CartProvider>);
    expect(screen.getByText('Add to Cart')).toBeTruthy();
  });

  it('shows Description tab by default', () => {
    render(<CartProvider><ProductDetailScreen /></CartProvider>);
    expect(screen.getByText('Description')).toBeTruthy();
    expect(screen.getByText('Specification')).toBeTruthy();
  });

  it('switches to Specification tab and shows live data section', () => {
    render(<CartProvider><ProductDetailScreen /></CartProvider>);
    fireEvent.press(screen.getByText('Specification'));
    expect(screen.getByText('Live Bike Data')).toBeTruthy();
    expect(screen.getByText('BikeIndex.org')).toBeTruthy();
  });

  it('renders not found for unknown id', () => {
    mockUseLocalSearchParams.mockReturnValueOnce({ id: 'does-not-exist' });
    render(<CartProvider><ProductDetailScreen /></CartProvider>);
    expect(screen.getByText('Product not found.')).toBeTruthy();
  });
});
