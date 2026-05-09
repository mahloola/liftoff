import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import CartScreen from '@/app/(tabs)/cart';
import { CartProvider } from '@/context/CartContext';

jest.mock('react-native-safe-area-context', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');
  return {
    SafeAreaView: ({ children, ...props }: { children: React.ReactNode }) => (
      <View {...props}>{children}</View>
    ),
    useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
  };
});

function renderWithCart() {
  return render(
    <CartProvider>
      <CartScreen />
    </CartProvider>
  );
}

describe('CartScreen', () => {
  it('renders the My Cart heading', () => {
    renderWithCart();
    expect(screen.getByText('My Cart')).toBeTruthy();
  });

  it('shows pre-seeded cart items', () => {
    renderWithCart();
    expect(screen.getByText('PEUGOT LR01')).toBeTruthy();
    expect(screen.getByText('SMITH Trade')).toBeTruthy();
  });

  it('shows item count', () => {
    renderWithCart();
    expect(screen.getByText('2 items')).toBeTruthy();
  });

  it('renders Order Summary section', () => {
    renderWithCart();
    expect(screen.getByText('Order Summary')).toBeTruthy();
  });

  it('renders Proceed to Checkout button', () => {
    renderWithCart();
    expect(screen.getByText('Proceed to Checkout')).toBeTruthy();
  });

  it('removing all items shows empty state', () => {
    renderWithCart();
    const removeButtons = screen.getAllByText('✕');
    fireEvent.press(removeButtons[0]);
    fireEvent.press(screen.getAllByText('✕')[0]);
    expect(screen.getByText('Your cart is empty')).toBeTruthy();
  });
});
