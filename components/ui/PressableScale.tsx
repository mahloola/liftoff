import React, { useRef } from 'react';
import { Animated, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

interface PressableScaleProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  scaleTo?: number;
  style?: StyleProp<ViewStyle>;
}

export function PressableScale({
  children,
  scaleTo = 0.96,
  style,
  onPress,
  disabled,
  ...rest
}: PressableScaleProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: scaleTo, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled}
        style={{ flex: 1 }}
        {...rest}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
