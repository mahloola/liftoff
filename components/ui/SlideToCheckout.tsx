import React, { useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';
import { colors, borderRadius } from '@/constants/theme';
import { PressableScale } from './PressableScale';
import ChevronLeft from '@/assets/svg/misc/chevron-left.svg';
import { LinearGradient } from 'expo-linear-gradient';
const TRACK_WIDTH = 174;
const THUMB_WIDTH = 44;
const SNAP_THRESHOLD = TRACK_WIDTH * 0.75;
const MAX_TRANSLATE = TRACK_WIDTH - THUMB_WIDTH;

interface SlideToCheckoutProps {
  onSuccess?: () => void;
}

export default function SlideToCheckout({ onSuccess }: SlideToCheckoutProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const completed = useRef(false);
  const labelOpacity = translateX.interpolate({
    inputRange: [0, MAX_TRANSLATE * 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const doneOpacity = useRef(new Animated.Value(0)).current;

  const snapForward = useCallback(() => {
    completed.current = true;
    Animated.parallel([
      Animated.spring(translateX, { toValue: MAX_TRANSLATE, useNativeDriver: true }),
      Animated.timing(doneOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start(() => onSuccess?.());
  }, [translateX, doneOpacity, onSuccess]);

  const snapBack = useCallback(() => {
    Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
  }, [translateX]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !completed.current,
      onMoveShouldSetPanResponder: () => !completed.current,
      onPanResponderMove: (_, gestureState) => {
        if (completed.current) return;
        const clamped = Math.max(0, Math.min(gestureState.dx, MAX_TRANSLATE));
        translateX.setValue(clamped);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (completed.current) return;
        if (gestureState.dx > SNAP_THRESHOLD) {
          snapForward();
        } else {
          snapBack();
        }
      },
      onPanResponderTerminate: () => {
        if (!completed.current) snapBack();
      },
    })
  ).current;

  return (
    <View style={styles.track}>
      <Animated.Text style={[styles.label, { opacity: labelOpacity }]}>Checkout</Animated.Text>
      <Animated.Text style={[styles.label, styles.doneLabel, { opacity: doneOpacity }]}>
        Done!
      </Animated.Text>
      <Animated.View
        style={[styles.thumb, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, { borderRadius: 10 }]}
        />
        <ChevronLeft width={20} height={20} style={{ transform: [{ rotate: '180deg' }] }} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: 60,
    backgroundColor: colors.panelEnd,
    borderRadius: borderRadius.pill,
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  thumb: {
    position: 'absolute',
    left: 0,
    width: THUMB_WIDTH,
    height: 60,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.gradientEnd,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbIcon: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
  },
  label: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    paddingLeft: THUMB_WIDTH,
  },
  doneLabel: {
    color: colors.gradientStart,
    paddingLeft: 0,
  },
});
