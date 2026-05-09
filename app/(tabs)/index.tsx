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
import { colors, spacing } from '@/constants/theme';

import SearchIcon from '@/assets/svg/misc/Search.svg';

interface FadeInCardProps {
  delay: number;
  children: React.ReactNode;
}

function FadeInCard({ delay, children }: FadeInCardProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 280, delay, useNativeDriver: true }),
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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Background gradient polygon — lowest z layer */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={['rgba(43, 107, 255, 0.55)', 'rgba(26, 79, 191, 0.35)', 'rgba(10, 15, 30, 0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.85, y: 1 }}
          style={{
            position: 'absolute',
            top: -height * 0.08,
            left: -40,
            width: width * 1.25,
            height: height * 0.68,
            transform: [{ skewY: '-8deg' }],
          }}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Typography variant="display" weight="bold">
            Choose Your Bike
          </Typography>
          <PressableScale onPress={() => {}} style={styles.searchBtn}>
            <LinearGradient
              colors={[colors.gradientEnd, colors.accent]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={[StyleSheet.absoluteFill, { borderRadius: 20 }]}
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
    paddingBottom: spacing.xxl,
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
    borderRadius: 20,
    backgroundColor: colors.gradientEnd,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  searchBtnIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
