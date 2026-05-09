import React from 'react';
import { ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PressableScale } from './PressableScale';
import { Typography } from './Typography';
import { colors, borderRadius, shadows } from '@/constants/theme';

type Variant = 'accent' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

const HEIGHT: Record<Size, number> = { sm: 40, md: 52, lg: 60 };

export function Button({
  label,
  onPress,
  variant = 'accent',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const h = HEIGHT[size];

  if (variant === 'accent') {
    return (
      <PressableScale
        onPress={onPress}
        disabled={isDisabled}
        scaleTo={0.97}
        style={[
          { height: h, borderRadius: borderRadius.md, backgroundColor: colors.gradientEnd },
          fullWidth && styles.fullWidth,
          isDisabled && styles.disabled,
          shadows.button,
          style,
        ]}
      >
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius: borderRadius.md }]}
        />
        <Typography variant="button" color={colors.textPrimary}>{loading ? '' : label}</Typography>
        {loading && (
          <ActivityIndicator
            color={colors.textPrimary}
            size="small"
            style={StyleSheet.absoluteFill}
          />
        )}
      </PressableScale>
    );
  }

  return (
    <PressableScale
      onPress={onPress}
      disabled={isDisabled}
      scaleTo={0.97}
      style={[
        styles.base,
        styles[variant],
        { height: h },
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={labelColor(variant)} size="small" />
      ) : (
        <Typography variant="button" color={labelColor(variant)}>{label}</Typography>
      )}
    </PressableScale>
  );
}

function labelColor(variant: Variant): string {
  switch (variant) {
    case 'outline': return colors.accent;
    case 'ghost':   return colors.textSecondary;
    default:        return colors.textPrimary;
  }
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.accent,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.5,
  },
});
