import React, { useEffect, useRef } from 'react';
import { Animated, ViewProps, StyleSheet } from 'react-native';
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
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.skeleton, { width, height, borderRadius: radius, opacity }, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.surfaceElevated,
  },
});
