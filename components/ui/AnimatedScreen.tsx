import React, { useCallback, useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useFocusEffect } from 'expo-router';
import { useNavigationState, useNavigation } from '@react-navigation/native';
import { colors } from '@/constants/theme';

let prevTabIndex = -1;
// Flag: true while a gesture is already animating the exit, so the
// useFocusEffect cleanup doesn't cancel it by jumping to width
let gestureHandlingExit = false;

const SWIPE_THRESHOLD = 0.25;
const VELOCITY_THRESHOLD = 600;
const ANIM_DURATION = 320;

export function AnimatedScreen({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions();
  // Initialize off-screen so the very first paint is invisible
  const translateX = useSharedValue(width);

  const tabIndex = useNavigationState((state) => state?.index ?? 0);
  const routes = useNavigationState((state) => state?.routes ?? []);
  const navigation = useNavigation();

  // Shared values readable from gesture worklets on the UI thread
  const tabIndexSV = useSharedValue(tabIndex);
  const routesLengthSV = useSharedValue(routes.length);
  useEffect(() => { tabIndexSV.value = tabIndex; }, [tabIndex]);
  useEffect(() => { routesLengthSV.value = routes.length; }, [routes.length]);

  // Stable navigate ref so runOnJS always calls the latest closure
  const navigateRef = useRef((index: number) => {
    if (index < 0 || index >= routes.length) return;
    navigation.navigate(routes[index].name as never);
  });
  useEffect(() => {
    navigateRef.current = (index: number) => {
      if (index < 0 || index >= routes.length) return;
      navigation.navigate(routes[index].name as never);
    };
  }, [navigation, routes]);
  const navigate = useCallback((index: number) => navigateRef.current(index), []);
  const markGestureExit = useCallback(() => { gestureHandlingExit = true; }, []);

  useFocusEffect(
    useCallback(() => {
      // Reset flag — a new screen is now active
      gestureHandlingExit = false;

      const startX = tabIndex > prevTabIndex ? width : -width;
      prevTabIndex = tabIndex;
      translateX.value = startX;
      translateX.value = withTiming(0, {
        duration: ANIM_DURATION,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      });

      return () => {
        // Pre-position off-screen so on the NEXT visit this screen is
        // already hidden when React Navigation makes it display:flex again.
        // Skip if a gesture already owns the exit animation.
        if (!gestureHandlingExit) {
          translateX.value = width;
        }
      };
    }, [tabIndex, width])
  );

  const panGesture = Gesture.Pan()
    .activeOffsetX([-15, 15])
    .failOffsetY([-10, 10])
    .onUpdate((e) => {
      const canGoBack = tabIndexSV.value > 0;
      const canGoForward = tabIndexSV.value < routesLengthSV.value - 1;
      if ((e.translationX > 0 && canGoBack) || (e.translationX < 0 && canGoForward)) {
        translateX.value = e.translationX;
      }
    })
    .onEnd((e) => {
      const distOk = Math.abs(e.translationX) > width * SWIPE_THRESHOLD;
      const velOk = Math.abs(e.velocityX) > VELOCITY_THRESHOLD;
      const goingLeft = e.translationX < 0;

      if ((distOk || velOk) && goingLeft && tabIndexSV.value < routesLengthSV.value - 1) {
        // Mark before navigate so cleanup sees it
        runOnJS(markGestureExit)();
        translateX.value = withTiming(-width, { duration: ANIM_DURATION, easing: Easing.in(Easing.cubic) });
        runOnJS(navigate)(tabIndexSV.value + 1);
      } else if ((distOk || velOk) && !goingLeft && tabIndexSV.value > 0) {
        runOnJS(markGestureExit)();
        translateX.value = withTiming(width, { duration: ANIM_DURATION, easing: Easing.in(Easing.cubic) });
        runOnJS(navigate)(tabIndexSV.value - 1);
      } else {
        translateX.value = withSpring(0, { damping: 20, stiffness: 300, mass: 0.5 });
      }
    });

  const animStyle = useAnimatedStyle(() => ({
    flex: 1,
    backgroundColor: colors.background,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animStyle}>{children}</Animated.View>
    </GestureDetector>
  );
}
