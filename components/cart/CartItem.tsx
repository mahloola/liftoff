import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CartItem as CartItemType } from '@/types';
import { Typography } from '@/components/ui/Typography';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface CartItemProps {
  item: CartItemType;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export function CartItem({ item, onIncrement, onDecrement }: CartItemProps) {
  const { product, quantity } = item;

  return (
    <View style={styles.row}>
      <LinearGradient
        colors={['#363E51', '#4C5770']}
        locations={[0.078, 0.9133]}
        start={{ x: 0.804, y: 0.898 }}
        end={{ x: 0.196, y: 0.103 }}
        style={styles.imageWrap}
      >
        <Image source={product.image} style={styles.image} resizeMode="contain" />
      </LinearGradient>

      <View style={styles.info}>
        <Typography variant="body" weight="bold" numberOfLines={2} color={colors.textPrimary} style={styles.name}>
          {product.name}
        </Typography>
        <Text style={styles.price}>${(product.price * quantity).toFixed(2)}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={onDecrement} style={styles.subtractBtn} activeOpacity={0.7}>
          <Text style={styles.qtySymbol}>−</Text>
        </TouchableOpacity>

        <Text style={styles.qty}>{quantity}</Text>

        <TouchableOpacity onPress={onIncrement} style={styles.addBtn} activeOpacity={0.7}>
          <LinearGradient
            colors={['#34C8E8', '#4E4AF2']}
            locations={[0.0178, 0.9556]}
            start={{ x: 0.258, y: 0.062 }}
            end={{ x: 0.742, y: 0.938 }}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.qtySymbol}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  imageWrap: {
    width: 84,
    height: 84,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: 2,
  },
  name: {
    fontSize: 16,
  },
  price: {
    color: colors.priceBlue,
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: spacing.sm,
    paddingBottom: 2,
  },
  subtractBtn: {
    width: 36,
    height: 36,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtySymbol: {
    color: colors.textPrimary,
    fontSize: 22,
    fontFamily: 'Poppins_600SemiBold',
  },
  qty: {
    width: 24,
    textAlign: 'center',
    color: colors.textPrimary,
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
  },
});
