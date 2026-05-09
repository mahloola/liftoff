import React, { useEffect } from 'react';
import { ViewProps, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import { colors, borderRadius } from '@/constants/theme';

interface SkeletonProps extends ViewProps {
  width?: number | `${number}%`;
  height?: number;
  radius?: number;
}

export function Skeleton({
  width = '100%',
  height = 16,
  radius = borderRadius.sm,
  style,
  ...rest
}: SkeletonProps) {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
    return () => cancelAnimation(opacity);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        styles.skeleton,
        animatedStyle,
        { width, height, borderRadius: radius },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.surfaceElevated,
  },
});
