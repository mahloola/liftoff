import React, { useRef, useEffect } from 'react';
import {
  Animated,
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '@/context/CartContext';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface CheckoutPanelProps {
  visible: boolean;
  onClose: () => void;
}

interface SummaryRowProps {
  label: string;
  value: string;
  bold?: boolean;
}

function SummaryRow({ label, value, bold = false }: SummaryRowProps) {
  return (
    <View style={styles.summaryRow}>
      <Typography variant="body" color={bold ? colors.textPrimary : colors.textSecondary}>
        {label}
      </Typography>
      <Typography variant="body" weight={bold ? 'bold' : 'regular'}>
        {value}
      </Typography>
    </View>
  );
}

const TAX_RATE = 0.08;

export function CheckoutPanel({ visible, onClose }: CheckoutPanelProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { items, subtotal } = useCart();

  const translateX = useRef(new Animated.Value(-width)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          speed: 14,
          bounciness: 0,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: -width,
          useNativeDriver: true,
          speed: 20,
          bounciness: 0,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, width, translateX, backdropOpacity]);

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View
        style={[styles.backdrop, { opacity: backdropOpacity }]}
        pointerEvents={visible ? 'auto' : 'none'}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.panel,
          { width, paddingTop: insets.top, paddingBottom: insets.bottom + spacing.lg },
          { transform: [{ translateX }] },
        ]}
      >
        <View style={styles.panelHeader}>
          <Typography variant="heading" weight="bold">Checkout</Typography>
          <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={12}>
            <Typography variant="body" color={colors.textSecondary}>✕</Typography>
          </Pressable>
        </View>

        <Divider />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Typography variant="subheading" weight="semibold">Items</Typography>
            {items.map((item) => (
              <View key={item.product.id} style={styles.itemRow}>
                <Typography variant="body" color={colors.textSecondary} style={styles.itemName} numberOfLines={1}>
                  {item.product.name}
                </Typography>
                <Typography variant="body">
                  ×{item.quantity}{'  '}${(item.product.price * item.quantity).toLocaleString()}
                </Typography>
              </View>
            ))}
          </View>

          <Divider />

          <View style={styles.section}>
            <Typography variant="subheading" weight="semibold">Order Total</Typography>
            <SummaryRow label="Subtotal" value={`$${subtotal.toLocaleString()}`} />
            <SummaryRow label="Tax (8%)" value={`$${tax.toFixed(2)}`} />
            <SummaryRow label="Shipping" value={subtotal >= 500 ? 'Free' : '$15.00'} />
            <Divider style={styles.innerDivider} />
            <SummaryRow label="Total" value={`$${total.toFixed(2)}`} bold />
          </View>

          <View style={styles.section}>
            <Typography variant="subheading" weight="semibold">Shipping Address</Typography>
            <View style={styles.placeholder}>
              <Typography variant="body" color={colors.textSecondary}>
                Enter your shipping address
              </Typography>
            </View>
          </View>

          <View style={styles.section}>
            <Typography variant="subheading" weight="semibold">Payment</Typography>
            <View style={styles.placeholder}>
              <Typography variant="body" color={colors.textSecondary}>
                Add a payment method
              </Typography>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            label={`Place Order — $${total.toFixed(2)}`}
            variant="accent"
            size="lg"
            fullWidth
            onPress={onClose}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  panel: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: colors.background,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
    gap: spacing.lg,
  },
  section: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    flex: 1,
    marginRight: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerDivider: {
    marginVertical: spacing.xs,
  },
  placeholder: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});
