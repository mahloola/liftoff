import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface HeroCardProps {
  product: Product;
}

export function HeroCard({ product }: HeroCardProps) {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const cardHeight = Math.round(width * 0.62);

  function handlePress() {
    router.push(`/product/${product.id}`);
  }

  return (
    <PressableScale scaleTo={0.98} onPress={handlePress} style={styles.wrapper}>
      <View style={[styles.card, { height: cardHeight }]}>
        <Image
          source={product.image}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(10,15,30,0.55)', 'rgba(10,15,30,0.92)']}
          locations={[0.3, 0.62, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.topRow}>
          {product.discountPercent !== undefined && (
            <Badge label={`${product.discountPercent}% Off`} color={colors.accent} />
          )}
        </View>
        <View style={styles.bottomContent}>
          <Typography variant="heading" weight="bold" color={colors.textPrimary}>
            {product.name}
          </Typography>
          <View style={styles.priceRow}>
            <Typography variant="price" color={colors.textPrimary}>
              ${product.price.toLocaleString()}
            </Typography>
            {product.originalPrice !== undefined && (
              <Typography
                variant="caption"
                color={colors.textSecondary}
                style={styles.originalPrice}
              >
                ${product.originalPrice.toLocaleString()}
              </Typography>
            )}
          </View>
          <Button
            label="Buy Now"
            variant="accent"
            size="sm"
            onPress={handlePress}
            style={styles.buyButton}
          />
        </View>
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
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  topRow: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
  },
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
  },
  buyButton: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },
});
