import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/cart/CartItem';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { colors, spacing } from '@/constants/theme';

export default function CartScreen() {
  const { items, increment, decrement, removeFromCart, subtotal } = useCart();

  const isEmpty = items.length === 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Typography variant="display" weight="bold">My Cart</Typography>
        {!isEmpty && (
          <Typography variant="caption" color={colors.textSecondary}>
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </Typography>
        )}
      </View>

      {isEmpty ? (
        <View style={styles.empty}>
          <Typography variant="heading" color={colors.textSecondary}>
            Your cart is empty
          </Typography>
          <Typography variant="body" color={colors.navInactive}>
            Add some bikes to get started
          </Typography>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onIncrement={() => increment(item.product.id)}
              onDecrement={() => decrement(item.product.id)}
              onRemove={() => removeFromCart(item.product.id)}
            />
          ))}

          <OrderSummary subtotal={subtotal} />

          <Button
            label="Proceed to Checkout"
            variant="accent"
            size="lg"
            fullWidth
            onPress={() => {}}
            style={styles.checkoutBtn}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    gap: 2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  checkoutBtn: {
    marginTop: spacing.sm,
  },
});
