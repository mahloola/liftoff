import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/cart/CartItem';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { CheckoutPanel } from '@/components/cart/CheckoutPanel';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { colors, spacing } from '@/constants/theme';
import SlideToCheckout from '@/components/ui/SlideToCheckout';
import { PressableScale } from '@/components/ui';
import { LinearGradient } from 'expo-linear-gradient';
import ChevronLeft from '@/assets/svg/misc/chevron-left.svg';

import { useLocalSearchParams, router } from 'expo-router';
import { AnimatedScreen } from '@/components/ui/AnimatedScreen';

export default function CartScreen() {
  const { items, increment, decrement, removeFromCart, subtotal } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const isEmpty = items.length === 0;
  const insets = useSafeAreaInsets();
  return (
    <AnimatedScreen>
    <SafeAreaView style={styles.container} edges={['top']}>
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

      <View style={styles.header}>
        <Typography variant="display" weight="bold">
          My Shopping Cart
        </Typography>
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
          {items.map((item, idx) => (
            <React.Fragment key={item.product.id}>
              {idx > 0 && <View style={styles.separator} />}
              <CartItem
                item={item}
                onIncrement={() => increment(item.product.id)}
                onDecrement={() => decrement(item.product.id)}
                onRemove={() => removeFromCart(item.product.id)}
              />
            </React.Fragment>
          ))}

          <OrderSummary subtotal={subtotal} />

          <SlideToCheckout />
        </ScrollView>
      )}

      <CheckoutPanel visible={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </SafeAreaView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10%',
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
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  checkoutBtn: {
    marginTop: spacing.sm,
  },
  backBtn: {
    position: 'absolute',
    left: spacing.lg,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.gradientEnd,
    borderColor: 'rgba(255,255,255,0.7)',
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
});
