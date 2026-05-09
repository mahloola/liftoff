import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '@/app/(tabs)/index';

jest.mock('react-native-safe-area-context', () => {
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
  it('renders the home screen heading', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Choose Your Bike')).toBeTruthy();
  });
});
