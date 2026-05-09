import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from '@/types';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface HeroCardProps {
  product: Product;
}

export function HeroCard({ product }: HeroCardProps) {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const cardHeight = Math.round(width * 0.62);

  return (
    <PressableScale scaleTo={0.98} onPress={() => router.push(`/product/${product.id}`)} style={styles.wrapper}>
      <View style={[styles.card, { height: cardHeight }]}>
        <Image source={product.image} style={StyleSheet.absoluteFill} resizeMode="contain" />
        {product.discountPercent !== undefined && (
          <Text style={styles.discountText}>{product.discountPercent}% Off</Text>
        )}
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  card: {
    width: '100%',
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  discountText: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.md,
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
});
