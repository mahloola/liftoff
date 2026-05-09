import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { CartItem as CartItemType } from '@/types';
import { Typography } from '@/components/ui/Typography';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface CartItemProps {
  item: CartItemType;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export function CartItem({ item, onIncrement, onDecrement, onRemove }: CartItemProps) {
  const { product, quantity } = item;

  return (
    <View style={styles.row}>
      <View style={styles.imageWrap}>
        <Image source={product.image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.info}>
        <Typography variant="caption" color={colors.textSecondary} numberOfLines={1}>
          {product.brand}
        </Typography>
        <Typography variant="body" weight="semibold" numberOfLines={2}>
          {product.name}
        </Typography>
        <Typography variant="price" color={colors.textPrimary}>
          ${(product.price * quantity).toLocaleString()}
        </Typography>
      </View>

      <View style={styles.controls}>
        <PressableScale onPress={onRemove} style={styles.removeBtn}>
          <Typography variant="caption" color={colors.textSecondary}>✕</Typography>
        </PressableScale>

        <View style={styles.qtyRow}>
          <PressableScale onPress={onDecrement} style={styles.qtyBtn}>
            <Typography variant="body" weight="semibold" color={colors.textPrimary}>−</Typography>
          </PressableScale>
          <Typography variant="body" weight="semibold" style={styles.qty}>
            {quantity}
          </Typography>
          <PressableScale onPress={onIncrement} style={styles.qtyBtn}>
            <Typography variant="body" weight="semibold" color={colors.textPrimary}>+</Typography>
          </PressableScale>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    gap: spacing.sm,
    alignItems: 'center',
  },
  imageWrap: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 56,
    height: 56,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  controls: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  removeBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    width: 28,
    textAlign: 'center',
  },
});
