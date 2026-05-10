import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius } from '@/constants/theme';
import ChevronLeft from '@/assets/svg/misc/chevron-left.svg';

const TRACK_WIDTH = 174;
const THUMB_WIDTH = 44;
const SNAP_THRESHOLD = TRACK_WIDTH * 0.75;
const MAX_TRANSLATE = TRACK_WIDTH - THUMB_WIDTH;

interface SlideToCheckoutProps {
  onSuccess?: () => void;
}

export default function SlideToCheckout({ onSuccess }: SlideToCheckoutProps) {
  const thumbX = useSharedValue(0);
  const isCompleted = useSharedValue(false);

  const handleSuccess = useCallback(() => onSuccess?.(), [onSuccess]);

  const panGesture = Gesture.Pan()
    .activeOffsetX([0, 5])
    .onUpdate((e) => {
      if (isCompleted.value) return;
      thumbX.value = Math.max(0, Math.min(e.translationX, MAX_TRANSLATE));
    })
    .onEnd(() => {
      if (isCompleted.value) return;
      if (thumbX.value > SNAP_THRESHOLD) {
        isCompleted.value = true;
        thumbX.value = withSpring(MAX_TRANSLATE, { damping: 15, stiffness: 150 });
        if (onSuccess) runOnJS(handleSuccess)();
      } else {
        thumbX.value = withSpring(0, { damping: 15, stiffness: 200 });
      }
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbX.value }],
  }));

  const checkoutStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      thumbX.value,
      [MAX_TRANSLATE - THUMB_WIDTH * 1.5, MAX_TRANSLATE],
      ['rgba(255,255,255,0.55)', 'rgba(255,255,255,0)']
    ),
  }));

  const doneStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      thumbX.value,
      [0, THUMB_WIDTH * 1.5],
      ['rgba(255,255,255,0)', 'rgba(255,255,255,0.55)']
    ),
  }));

  return (
    <View style={styles.track}>
      <Animated.Text style={[styles.doneLabel, doneStyle]}>Done!</Animated.Text>
      <Animated.Text style={[styles.checkoutLabel, checkoutStyle]}>Checkout</Animated.Text>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.thumb, thumbStyle]}>
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, { borderRadius: 10 }]}
          />
          <ChevronLeft width={20} height={20} style={{ transform: [{ rotate: '180deg' }] }} />
        </Animated.View>
      </GestureDetector>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutLabel: {
    position: 'absolute',
    right: 28,
    textAlign: 'right',
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
  },
  doneLabel: {
    position: 'absolute',
    left: 28,
    textAlign: 'left',
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
  },
});
