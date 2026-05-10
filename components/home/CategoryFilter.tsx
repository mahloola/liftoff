import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProductCategory } from '@/types';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, spacing, borderRadius, gradientButtonShadow } from '@/constants/theme';

import BicycleIcon from '@/assets/svg/products/Bicycle.svg';
import RoadIcon from '@/assets/svg/products/Road.svg';
import MountainIcon from '@/assets/svg/products/Mountain.svg';
import HelmetIcon from '@/assets/svg/products/Helmet.svg';

function AllIcon({ color = '#fff' }: { width?: number; height?: number; color?: string }) {
  return <Text style={{ color, fontSize: 13, fontFamily: 'Poppins_600SemiBold' }}>All</Text>;
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
const SLANT_OFFSETS = [40, 30, 20, 10, 0];

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
            scaleTo={0.78}
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
