import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from '@/types';
import { ProductImage } from '@/components/ui/ProductImage';
import { Typography } from '@/components/ui/Typography';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const cardWidth = (width - spacing.lg * 2 - spacing.sm) / 2;

  function handlePress() {
    router.push(`/product/${product.id}`);
  }

  return (
    <PressableScale onPress={handlePress} style={[styles.card, { width: cardWidth }]}>
      <View style={styles.imageWrap}>
        <ProductImage source={product.image} aspectRatio={1} width="100%" radius={borderRadius.md} />
      </View>
      <View style={styles.info}>
        <Typography variant="caption" color={colors.textSecondary} numberOfLines={1}>
          {product.brand}
        </Typography>
        <Typography variant="body" weight="semibold" numberOfLines={2} style={styles.name}>
          {product.name}
        </Typography>
        <Typography variant="price" color={colors.textPrimary} style={styles.price}>
          ${product.price.toLocaleString()}
        </Typography>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  imageWrap: {
    padding: spacing.sm,
    backgroundColor: colors.surfaceElevated,
  },
  info: {
    padding: spacing.sm,
    paddingTop: spacing.xs,
    gap: 2,
  },
  name: {
    lineHeight: 20,
  },
  price: {
    marginTop: spacing.xs,
  },
});
