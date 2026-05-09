import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const loadingAnimation = require('@/assets/animations/loading.json');

interface LottieLoaderProps {
  size?: number;
}

export function LottieLoader({ size = 48 }: LottieLoaderProps) {
  return (
    <View style={styles.wrap}>
      <LottieView
        source={loadingAnimation}
        autoPlay
        loop
        style={{ width: size, height: size }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
