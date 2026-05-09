import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Typography } from './Typography';
import { colors, borderRadius, spacing } from '@/constants/theme';

interface BadgeProps extends ViewProps {
  label: string;
  color?: string;
}

export function Badge({ label, color = colors.badge, style, ...rest }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: color }, style]} {...rest}>
      <Typography variant="caption" weight="semibold" color={colors.textPrimary}>
        {label}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
});
