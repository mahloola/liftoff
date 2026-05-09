import React, { useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { BikeSpecsCard } from '@/components/product/BikeSpecsCard';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, spacing, borderRadius, gradientButtonShadow } from '@/constants/theme';

import ChevronLeft from '@/assets/svg/misc/chevron-left.svg';
import SvgProduct from '@/assets/svg/svg-product.svg';
import SvgProductBottom from '@/assets/svg/svg-product-bottom.svg';

type Tab = 'description' | 'specification';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<Tab>('description');

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <PressableScale
          onPress={() => router.back()}
          style={[styles.backBtn, { top: insets.top + spacing.sm }]}
        >
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, { borderRadius: 10 }]}
          />
          <View style={styles.backBtnIcon}>
            <ChevronLeft width={20} height={20} />
          </View>
        </PressableScale>
        <View style={styles.notFound}>
          <Typography variant="body" color={colors.textSecondary}>
            Product not found.
          </Typography>
        </View>
      </View>
    );
  }

  const svgBgH = width * (641 / 382);
  const imageH = Math.round(width * 0.6);
  const bottomH = 104 + insets.bottom;

  return (
    <View style={styles.container}>
      {/* Background polygon */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <SvgProduct
          width={width}
          height={svgBgH}
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </View>

      {/* Back button */}
      <PressableScale
        onPress={() => router.back()}
        style={[styles.backBtn, { top: insets.top + spacing.sm }]}
      >
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, { borderRadius: 10 }]}
        />
        <View style={styles.backBtnIcon}>
          <ChevronLeft width={20} height={20} />
        </View>
      </PressableScale>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: bottomH + spacing.lg }}
        showsVerticalScrollIndicator={false}
      >
        {/* Product title */}
        <View style={[styles.titleArea, { paddingTop: insets.top + spacing.xl + 40 }]}>
          <Typography variant="heading" weight="bold" style={styles.titleText}>
            {product.brand} — {product.model}
          </Typography>
        </View>

        {/* Bike image */}
        <View style={[styles.imageWrap, { height: imageH }]}>
          <Image source={product.image} style={styles.bikeImage} resizeMode="contain" />
        </View>

        {/* Pagination dots */}
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Description / Specification tabs + content */}
        <View style={styles.tabCard}>
          {/* Tab row */}
          <View style={styles.tabRow}>
            {(['description', 'specification'] as Tab[]).map((tab) => {
              const isActive = activeTab === tab;
              const label = tab === 'description' ? 'Description' : 'Specification';
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={styles.tabBtn}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.tabLabel,
                      { color: isActive ? colors.tabTextStart : colors.textSecondary },
                      isActive && styles.tabLabelActive,
                    ]}
                  >
                    {label}
                  </Text>
                  {isActive && <View style={styles.tabUnderline} />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Tab content */}
          <View style={styles.tabContent}>
            {activeTab === 'description' ? (
              <View style={styles.descContent}>
                <Typography variant="body" weight="bold" color={colors.textPrimary}>
                  {product.brand} — {product.model}
                </Typography>
                <Typography variant="body" color={colors.textSecondary} style={styles.descText}>
                  {product.description}
                </Typography>
              </View>
            ) : (
              <BikeSpecsCard brand={product.brand} />
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom container: price + Add to Cart */}
      <View style={[styles.bottomOuter, { height: bottomH }]}>
        <SvgProductBottom
          width={width}
          height={154}
          preserveAspectRatio="none"
          style={[StyleSheet.absoluteFill, { bottom: insets.bottom - 50 }]}
        />
        <View style={[styles.bottomContent, { paddingBottom: insets.bottom }]}>
          <View style={styles.priceBlock}>
            <Typography variant="caption" color={colors.textSecondary}>
              Price
            </Typography>
            <Text style={styles.priceText}>${product.price.toLocaleString()}</Text>
          </View>
          <View style={styles.cartBtnWrap}>
            <Button
              label={product.inStock ? 'Add to Cart' : 'Out of Stock'}
              variant="accent"
              size="md"
              disabled={!product.inStock}
              onPress={() => addToCart(product)}
            />
          </View>
        </View>
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
  backBtn: {
    position: 'absolute',
    left: spacing.lg,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.gradientEnd,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    ...gradientButtonShadow,
  },
  backBtnIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleArea: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
  },
  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  bikeImage: {
    width: '80%',
    height: '100%',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.md,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  dotActive: {
    width: 18,
    borderRadius: 3,
    backgroundColor: colors.gradientStart,
  },
  tabCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    backgroundColor: colors.panelStart,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: 2,
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  tabLabelActive: {
    color: colors.tabTextStart,
  },
  tabUnderline: {
    height: 2,
    width: 40,
    borderRadius: 1,
    backgroundColor: colors.tabTextStart,
  },
  tabContent: {
    padding: spacing.lg,
  },
  descContent: {
    gap: spacing.sm,
  },
  descText: {
    lineHeight: 22,
  },
  bottomOuter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'visible',
  },
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 104,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  priceBlock: {
    gap: 2,
  },
  priceText: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: colors.priceBlue,
  },
  cartBtnWrap: {
    flex: 1,
  },
});
