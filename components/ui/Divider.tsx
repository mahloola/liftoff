import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { colors } from '@/constants/theme';

interface DividerProps extends ViewProps {
  marginVertical?: number;
}

export function Divider({ marginVertical = 12, style, ...rest }: DividerProps) {
  return (
    <View style={[styles.divider, { marginVertical }, style]} {...rest} />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    width: '100%',
  },
});
