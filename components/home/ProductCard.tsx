import React from 'react';
import { View, Image, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from '@/types';
import { Typography } from '@/components/ui/Typography';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, spacing, borderRadius } from '@/constants/theme';

const SKEW = '-5deg' as const;
const SKEW_INV = '5deg' as const;

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const cardWidth = (width - spacing.lg * 2 - spacing.sm) / 2;

  return (
    <PressableScale onPress={() => router.push(`/product/${product.id}`)} style={{ width: cardWidth }}>
      {/* skewed outer shell — creates parallelogram border */}
      <View style={styles.skewOuter}>
        <View style={styles.card}>
          {/* de-skewed inner content */}
          <View style={styles.skewInner}>
            {/* image area */}
            <View style={styles.imageArea}>
              <Image source={product.image} style={styles.bikeImage} resizeMode="contain" />
              <Text style={styles.heart}>♡</Text>
            </View>
            {/* info */}
            <View style={styles.info}>
              <Typography variant="body" weight="semibold" numberOfLines={1} color={colors.textPrimary}>
                {product.name}
              </Typography>
              <Typography variant="caption" color={colors.textPrimary} weight="bold">
                ${product.price.toLocaleString()}
              </Typography>
            </View>
          </View>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  skewOuter: {
    transform: [{ skewY: SKEW }],
    marginVertical: 6,
  },
  card: {
    backgroundColor: 'rgba(20, 27, 46, 0.78)',
    borderWidth: 0.6,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  skewInner: {
    transform: [{ skewY: SKEW_INV }],
  },
  imageArea: {
    aspectRatio: 1,
    padding: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bikeImage: {
    width: '90%',
    height: '90%',
  },
  heart: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.sm,
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 16,
    lineHeight: 20,
  },
  info: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
    gap: 2,
  },
});
