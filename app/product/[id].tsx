import React from 'react';
import { View, Image, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { PRODUCTS } from '@/data/products';
import { BikeSpecsCard } from '@/components/product/BikeSpecsCard';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, spacing, borderRadius } from '@/constants/theme';

import ChevronLeft from '@/assets/svg/misc/chevron-left.svg';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <PressableScale
          onPress={() => router.back()}
          style={[styles.backBtn, { top: insets.top + spacing.sm }]}
        >
          <ChevronLeft width={20} height={20} />
        </PressableScale>
        <View style={styles.notFound}>
          <Typography variant="body" color={colors.textSecondary}>
            Product not found.
          </Typography>
        </View>
      </SafeAreaView>
    );
  }

  const imageHeight = Math.round(width * 0.7);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.imageContainer, { height: imageHeight }]}>
          <Image source={product.image} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <View style={styles.titleBlock}>
              <Typography variant="caption" color={colors.textSecondary}>
                {product.brand}
              </Typography>
              <Typography variant="heading" weight="bold">
                {product.name}
              </Typography>
            </View>
            {product.discountPercent !== undefined && (
              <Badge label={`${product.discountPercent}% Off`} color={colors.accent} />
            )}
          </View>

          <View style={styles.priceRow}>
            <Typography variant="price">${product.price.toLocaleString()}</Typography>
            {product.originalPrice !== undefined && (
              <Typography variant="body" color={colors.textSecondary} style={styles.originalPrice}>
                ${product.originalPrice.toLocaleString()}
              </Typography>
            )}
          </View>

          <Typography variant="body" color={colors.textSecondary} style={styles.description}>
            {product.description}
          </Typography>

          <BikeSpecsCard brand={product.brand} />
        </View>
      </ScrollView>

      <PressableScale
        onPress={() => router.back()}
        style={[styles.backBtn, { top: insets.top + spacing.sm }]}
      >
        <ChevronLeft width={20} height={20} />
      </PressableScale>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button
          label={product.inStock ? 'Add to Cart' : 'Out of Stock'}
          variant="accent"
          size="lg"
          fullWidth
          disabled={!product.inStock}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  body: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleBlock: {
    flex: 1,
    gap: 2,
    marginRight: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
  },
  description: {
    lineHeight: 22,
  },
  backBtn: {
    position: 'absolute',
    left: spacing.lg,
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
