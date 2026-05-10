import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProductCategory } from '@/types';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, spacing, borderRadius, gradientButtonShadow } from '@/constants/theme';

import BicycleIcon from '@/assets/svg/products/Bicycle.svg';
import RoadIcon from '@/assets/svg/products/Road.svg';
import MountainIcon from '@/assets/svg/products/Mountain.svg';
import HelmetIcon from '@/assets/svg/products/Helmet.svg';

// 2×2 grid squares — "All" icon
function AllIcon({
  width = 22,
  height = 22,
  color = '#fff',
}: {
  width?: number;
  height?: number;
  color?: string;
}) {
  const box = Math.floor((Math.min(width, height) - 4) / 2);
  return (
    <View
      style={{
        width,
        height,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <View
          key={i}
          style={{ width: box, height: box, backgroundColor: color, borderRadius: 2 }}
        />
      ))}
    </View>
  );
}

type IconFC = React.FC<{ width: number; height: number; color?: string }>;

interface Category {
  key: ProductCategory | 'all';
  Icon: IconFC;
}

const CATEGORIES: Category[] = [
  { key: 'all', Icon: AllIcon as IconFC },
  { key: 'bicycle', Icon: BicycleIcon as IconFC },
  { key: 'road', Icon: RoadIcon as IconFC },
  { key: 'mountain', Icon: MountainIcon as IconFC },
  { key: 'helmet', Icon: HelmetIcon as IconFC },
];

// Uphill translateY: leftmost (All) is lowest, rightmost (Helmet) is highest
const SLANT_OFFSETS = [20, 15, 10, 5, 0];

interface CategoryFilterProps {
  selected: ProductCategory | 'all';
  onSelect: (category: ProductCategory | 'all') => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <View style={styles.row}>
      {CATEGORIES.map(({ key, Icon }, idx) => {
        const active = selected === key;
        const offsetY = SLANT_OFFSETS[idx] ?? 0;

        const iconColors = active
          ? ([colors.gradientStart, colors.gradientEnd] as const)
          : ([colors.panelStart, colors.panelEnd] as const);

        const iconColor = active ? colors.textPrimary : colors.navInactive;

        return (
          <PressableScale
            key={key}
            testID={`category-${key}`}
            onPress={() => onSelect(key)}
            style={[styles.item, { transform: [{ translateY: offsetY }] }]}
          >
            <LinearGradient
              colors={iconColors}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={[styles.iconWrap, active && styles.iconWrapActive]}
            >
              <Icon width={22} height={22} color={iconColor} />
            </LinearGradient>
          </PressableScale>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    paddingBottom: 22,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iconWrapActive: {
    borderColor: 'rgba(255,255,255,0.6)',
    ...gradientButtonShadow,
    borderRadius: borderRadius.md,
  },
});
