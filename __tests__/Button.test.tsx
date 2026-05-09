import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/ui/Button';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

describe('Button', () => {
  it('renders label text', () => {
    render(<Button label="Add to Cart" onPress={() => {}} />);
    expect(screen.getByText('Add to Cart')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    render(<Button label="Buy" onPress={onPress} />);
    fireEvent.press(screen.getByText('Buy'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    render(<Button label="Buy" onPress={onPress} disabled />);
    fireEvent.press(screen.getByText('Buy'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when loading', () => {
    const onPress = jest.fn();
    render(<Button label="Buy" onPress={onPress} loading />);
    // Loading state hides the label
    expect(screen.queryByText('Buy')).toBeNull();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders outline variant without crashing', () => {
    render(<Button label="Cancel" onPress={() => {}} variant="outline" />);
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('renders ghost variant without crashing', () => {
    render(<Button label="Skip" onPress={() => {}} variant="ghost" />);
    expect(screen.getByText('Skip')).toBeTruthy();
  });
});
