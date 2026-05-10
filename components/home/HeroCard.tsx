import React, { useEffect } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Product } from '@/types';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, spacing } from '@/constants/theme';

import HeroContainer from '@/assets/svg/mikkel-bech-yjAFnkLtKY0-unsplash-removebg-preview 5.svg';

const SVG_W = 390;
const SVG_H = 398;
const GLASS_TOP = 82;
const GLASS_HEIGHT = 208;

interface HeroCardProps {
  product: Product;
}

export function HeroCard({ product }: HeroCardProps) {
  const { width: screenWidth } = useWindowDimensions();
  const router = useRouter();

  const cardWidth = Math.min(screenWidth - 32, 430);
  const scale = cardWidth / SVG_W;
  const VISIBLE_HEIGHT = screenWidth < 380 ? 220 : 250;
  const cardHeight = VISIBLE_HEIGHT * scale;
  const glassTop = GLASS_TOP * scale;
  const glassHeight = GLASS_HEIGHT * scale;
  const imageTop = glassTop + glassHeight * 0.05;
  const imageHeight = glassHeight * 0.9;

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
    translateY.value = withSpring(0, { damping: 14, stiffness: 120 });
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <PressableScale
        scaleTo={0.98}
        onPress={() => router.push(`/product/${product.id}`)}
        style={styles.wrapper}
      >
        <View style={[styles.cardContainer, { width: cardWidth, height: cardHeight }]}>
          <View
            style={{
              width: cardWidth,
              height: SVG_H * scale,
              transform: [{ translateY: -70 * scale }],
            }}
          >
            <HeroContainer width={cardWidth} height={SVG_H * scale} preserveAspectRatio="none" />

            <Image
              source={product.image}
              resizeMode="contain"
              style={[
                styles.bikeImage,
                { top: imageTop, width: cardWidth * 0.82, height: imageHeight },
              ]}
            />

            <Text
              style={[
                styles.discountText,
                {
                  top: imageTop + imageHeight - 10 * scale,
                  left: cardWidth * 0.1,
                  fontSize: Math.max(18, 26 * scale),
                },
              ]}
            >
              30% OFF
            </Text>
          </View>
        </View>
      </PressableScale>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    width: '100%',
  },
  cardContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  bikeImage: {
    position: 'absolute',
    alignSelf: 'center',
  },
  discountText: {
    position: 'absolute',
    color: 'rgba(255,255,255,0.7)',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
