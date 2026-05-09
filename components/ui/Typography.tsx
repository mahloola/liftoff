import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { colors, fontSizes, fontWeights } from '@/constants/theme';

type Variant = 'display' | 'heading' | 'subheading' | 'body' | 'caption' | 'price' | 'button';
type Weight = keyof typeof fontWeights;

interface TypographyProps extends TextProps {
  variant?: Variant;
  weight?: Weight;
  color?: string;
  children: React.ReactNode;
}

export function Typography({
  variant = 'body',
  weight,
  color = colors.textPrimary,
  style,
  children,
  ...rest
}: TypographyProps) {
  const defaultWeight = getDefaultWeight(variant);

  return (
    <Text
      style={[
        styles.base,
        { fontSize: fontSizes[variant], color },
        { fontWeight: fontWeights[weight ?? defaultWeight] },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

function getDefaultWeight(variant: Variant): Weight {
  switch (variant) {
    case 'display':
      return 'bold';
    case 'heading':
      return 'semibold';
    case 'subheading':
      return 'semibold';
    case 'price':
      return 'bold';
    case 'button':
      return 'semibold';
    default:
      return 'regular';
  }
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
