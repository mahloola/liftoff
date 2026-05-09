const { View, Text, Image, ScrollView, FlatList } = require('react-native');

const useSharedValue = (value) => ({ value });
const useAnimatedStyle = () => ({});
const useAnimatedProps = () => ({});
const useDerivedValue = (worklet) => ({ value: worklet() });
const useAnimatedReaction = () => {};
const useAnimatedScrollHandler = () => () => {};

const withTiming = (value) => value;
const withSpring = (value) => value;
const withDecay = () => 0;
const withDelay = (_delay, animation) => animation;
const withRepeat = (animation) => animation;
const withSequence = (...animations) => animations[animations.length - 1] ?? 0;

const cancelAnimation = jest.fn();
const runOnJS = (fn) => fn;
const runOnUI = (fn) => fn;

const createAnimatedComponent = (Component) => Component;

const Easing = {
  linear: (t) => t,
  ease: (t) => t,
  out: (fn) => fn,
  in: (fn) => fn,
  inOut: (fn) => fn,
  bezier: () => (t) => t,
  circle: (t) => t,
  sin: (t) => t,
  exp: (t) => t,
  poly: () => (t) => t,
  back: () => (t) => t,
  elastic: () => (t) => t,
  bounce: (t) => t,
};

module.exports = {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  useDerivedValue,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  withTiming,
  withSpring,
  withDecay,
  withDelay,
  withRepeat,
  withSequence,
  cancelAnimation,
  runOnJS,
  runOnUI,
  createAnimatedComponent,
  Easing,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  default: {
    createAnimatedComponent,
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
  },
};
