import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductCategory } from '@/types';
import { FEATURED_PRODUCT, PRODUCTS } from '@/data/products';
import { HeroCard } from '@/components/home/HeroCard';
import { CategoryFilter } from '@/components/home/CategoryFilter';
import { ProductCard } from '@/components/home/ProductCard';
import { Typography } from '@/components/ui/Typography';
import { colors, spacing } from '@/constants/theme';

import SearchIcon from '@/assets/svg/misc/Search.svg';
import { PressableScale } from '@/components/ui/PressableScale';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('bicycle');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(
      (p) => p.id !== FEATURED_PRODUCT.id && (selectedCategory === 'all' || p.category === selectedCategory)
    );
  }, [selectedCategory]);

  const displayProducts = filteredProducts.length > 0
    ? filteredProducts
    : PRODUCTS.filter((p) => p.id !== FEATURED_PRODUCT.id);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Typography variant="display" weight="bold">
            Choose Your Bike
          </Typography>
          <PressableScale onPress={() => {}} style={styles.searchBtn}>
            <SearchIcon width={22} height={22} />
          </PressableScale>
        </View>

        <HeroCard product={FEATURED_PRODUCT} />

        <View style={styles.section}>
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography variant="heading" weight="semibold">
              Best Seller
            </Typography>
            <Typography variant="caption" color={colors.accent}>
              See All
            </Typography>
          </View>
          <View style={styles.grid}>
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
  },
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
});
