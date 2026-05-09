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
const CONTAINER_TOP_Y    = 82;   // top of glassmorphic rect in SVG coords
const CONTAINER_BOTTOM_Y = 290;  // approximate bottom of visible area

interface HeroCardProps {
  product: Product;
}

export function HeroCard({ product }: HeroCardProps) {
  const { width } = useWindowDimensions();
  const router    = useRouter();

  const scale   = width / SVG_W;
  const svgH    = SVG_H * scale;
  const imgTop  = CONTAINER_TOP_Y * scale;
  const imgH    = (CONTAINER_BOTTOM_Y - CONTAINER_TOP_Y) * scale;
  const imgSide = 24 * scale;

  return (
    <PressableScale
      scaleTo={0.98}
      onPress={() => router.push(`/product/${product.id}`)}
      style={styles.wrapper}
    >
      <View style={[styles.svgWrapper, { height: svgH }]}>
        <HeroContainer width={width} height={svgH} preserveAspectRatio="none" />

        {/* Bike image centered within the glassmorphic container */}
        <Image
          source={product.image}
          style={[
            styles.bikeImage,
            { top: imgTop, left: imgSide, right: imgSide, height: imgH },
          ]}
          resizeMode="contain"
        />

        {/* "30% Off" label bottom-left of container */}
        {product.discountPercent !== undefined && (
          <Text
            style={[
              styles.discountText,
              { bottom: (SVG_H - CONTAINER_BOTTOM_Y) * scale + spacing.md },
            ]}
          >
            {product.discountPercent}% Off
          </Text>
        )}
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: spacing.lg,
  },
  svgWrapper: {
    width: '100%',
    position: 'relative',
  },
  bikeImage: {
    position: 'absolute',
  },
  discountText: {
    position: 'absolute',
    left: spacing.xl,
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
});
