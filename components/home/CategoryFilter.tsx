import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { ProductCategory } from '@/types';
import { PressableScale } from '@/components/ui/PressableScale';
import { Typography } from '@/components/ui/Typography';
import { colors, spacing, borderRadius } from '@/constants/theme';

import BicycleIcon from '@/assets/svg/products/Bicycle.svg';
import RoadIcon from '@/assets/svg/products/Road.svg';
import MountainIcon from '@/assets/svg/products/Mountain.svg';
import HelmetIcon from '@/assets/svg/products/Helmet.svg';

interface Category {
  key: ProductCategory;
  label: string;
  Icon: React.FC<{ width: number; height: number; color?: string }>;
}

const CATEGORIES: Category[] = [
  { key: 'bicycle', label: 'Bicycle', Icon: BicycleIcon },
  { key: 'road', label: 'Road', Icon: RoadIcon },
  { key: 'mountain', label: 'Mountain', Icon: MountainIcon },
  { key: 'helmet', label: 'Helmet', Icon: HelmetIcon },
];

interface CategoryFilterProps {
  selected: ProductCategory | 'all';
  onSelect: (category: ProductCategory | 'all') => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map(({ key, label, Icon }) => {
        const active = selected === key;
        return (
          <PressableScale key={key} onPress={() => onSelect(key)} style={styles.item}>
            <View style={[styles.iconWrap, active && styles.iconWrapActive]}>
              <Icon
                width={22}
                height={22}
                color={active ? colors.textPrimary : colors.navInactive}
              />
            </View>
            <Typography
              variant="caption"
              color={active ? colors.textPrimary : colors.navInactive}
              weight={active ? 'semibold' : 'regular'}
            >
              {label}
            </Typography>
          </PressableScale>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  item: {
    alignItems: 'center',
    gap: spacing.xs,
    minWidth: 64,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: colors.accent,
  },
});
