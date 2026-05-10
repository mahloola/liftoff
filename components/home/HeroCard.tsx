import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from '@/types';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, spacing } from '@/constants/theme';

// Glassmorphic hero container SVG (390×398 viewBox)
import HeroContainer from '@/assets/svg/mikkel-bech-yjAFnkLtKY0-unsplash-removebg-preview 5.svg';

// The SVG's internal coordinate system is 390×398.
// The visible container shape spans roughly y=80 to y=297 on the left edge.
const SVG_W = 390;
const SVG_H = 398;

// Glass container area inside SVG
const GLASS_TOP = 82;
const GLASS_HEIGHT = 208;

interface HeroCardProps {
  product: Product;
}

export function HeroCard({ product }: HeroCardProps) {
  const { width: screenWidth } = useWindowDimensions();
  const router = useRouter();

  // Prevent giant scaling on larger devices
  const cardWidth = Math.min(screenWidth - 32, 430);

  const scale = cardWidth / SVG_W;
  const VISIBLE_HEIGHT = screenWidth < 380 ? 220 : 250;
  const cardHeight = VISIBLE_HEIGHT * scale;

  // Scale the glass area
  const glassTop = GLASS_TOP * scale;
  const glassHeight = GLASS_HEIGHT * scale;

  const imageTop = glassTop + glassHeight * 0.05;
  const imageHeight = glassHeight * 0.9;

  return (
    <PressableScale
      scaleTo={0.98}
      onPress={() => router.push(`/product/${product.id}`)}
      style={styles.wrapper}
    >
      <View
        style={[
          styles.cardContainer,
          {
            width: cardWidth,
            height: cardHeight,
          },
        ]}
      >
        {/* Shared transformed layer */}
        <View
          style={{
            width: cardWidth,
            height: SVG_H * scale,
            transform: [{ translateY: -70 * scale }],
          }}
        >
          {/* SVG Background */}
          <HeroContainer width={cardWidth} height={SVG_H * scale} preserveAspectRatio="none" />

          {/* Product Image */}
          <Image
            source={product.image}
            resizeMode="contain"
            style={[
              styles.bikeImage,
              {
                top: imageTop,
                width: cardWidth * 0.82,
                height: imageHeight,
              },
            ]}
          />

          {/* Discount text */}
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
  svgWrapper: {
    width: '100%',
    position: 'relative',
  },
  // bikeImage: {
  //   position: 'absolute',
  // },
  discountText: {
    position: 'absolute',
    color: 'rgba(255,255,255,0.7)',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
