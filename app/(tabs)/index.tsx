import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Animated, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ProductCategory, Product } from '@/types';
import { FEATURED_PRODUCT, PRODUCTS } from '@/data/products';
import { HeroCard } from '@/components/home/HeroCard';
import { CategoryFilter } from '@/components/home/CategoryFilter';
import { ProductCard } from '@/components/home/ProductCard';
import { Typography } from '@/components/ui/Typography';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, spacing, gradientButtonShadow, borderRadius } from '@/constants/theme';

import SvgIndex from '@/assets/svg/svg-index.svg';
import SearchIcon from '@/assets/svg/misc/Search.svg';

interface FadeInCardProps {
  delay: number;
  children: React.ReactNode;
}

function FadeInCard({ delay, children }: FadeInCardProps) {
  const opacity   = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity,    { toValue: 1, duration: 280, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 280, delay, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateY, delay]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(
      (p) => p.id !== FEATURED_PRODUCT.id && (selectedCategory === 'all' || p.category === selectedCategory)
    );
  }, [selectedCategory]);

  const displayProducts: Product[] = filteredProducts.length > 0
    ? filteredProducts
    : PRODUCTS.filter((p) => p.id !== FEATURED_PRODUCT.id);

  // Scale SVG polygon to screen dimensions
  const svgW = width;
  const svgH = width * (695 / 390);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Background polygon SVG — lowest layer */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <SvgIndex
          width={svgW}
          height={svgH}
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: height * 0.15 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Typography variant="display" weight="bold">
            Choose Your Bike
          </Typography>

          {/* Search button — gradient + white border + shadow */}
          <PressableScale onPress={() => {}} style={styles.searchBtn}>
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientEnd]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={[StyleSheet.absoluteFill, { borderRadius: borderRadius.pill }]}
            />
            <View style={styles.searchBtnIcon}>
              <SearchIcon width={22} height={22} color={colors.textPrimary} />
            </View>
          </PressableScale>
        </View>

        <HeroCard product={FEATURED_PRODUCT} />

        <View style={styles.section}>
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        </View>

        <View style={styles.grid}>
          {displayProducts.map((product, index) => (
            <FadeInCard key={product.id} delay={index * 80}>
              <ProductCard product={product} />
            </FadeInCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  scrollContent: {
    gap: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.gradientEnd,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    ...gradientButtonShadow,
  },
  searchBtnIcon: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    gap: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
});
