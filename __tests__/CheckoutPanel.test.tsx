import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { CartProvider } from '@/context/CartContext';
import { CheckoutPanel } from '@/components/cart/CheckoutPanel';

jest.mock('react-native-safe-area-context', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');
  return {
    useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => <View>{children}</View>,
  };
});

function PanelHarness({ initialVisible = true }: { initialVisible?: boolean }) {
  const [visible, setVisible] = useState(initialVisible);
  return (
    <CartProvider>
      <CheckoutPanel visible={visible} onClose={() => setVisible(false)} />
    </CartProvider>
  );
}

describe('CheckoutPanel', () => {
  it('renders when visible', () => {
    render(<PanelHarness />);
    expect(screen.getByText('Checkout')).toBeTruthy();
  });

  it('shows Items section', () => {
    render(<PanelHarness />);
    expect(screen.getByText('Items')).toBeTruthy();
  });

  it('shows Order Total section', () => {
    render(<PanelHarness />);
    expect(screen.getByText('Order Total')).toBeTruthy();
  });

  it('shows Place Order button', () => {
    render(<PanelHarness />);
    expect(screen.getByText(/Place Order/)).toBeTruthy();
  });

  it('calls onClose when ✕ is pressed', () => {
    const onClose = jest.fn();
    render(
      <CartProvider>
        <CheckoutPanel visible={true} onClose={onClose} />
      </CartProvider>
    );
    fireEvent.press(screen.getByText('✕'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders without crashing when not visible', () => {
    render(<PanelHarness initialVisible={false} />);
    // Panel is off-screen (translateX = -width) but still mounted
    expect(screen.getByText('Checkout')).toBeTruthy();
  });
});
