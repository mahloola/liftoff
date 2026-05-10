import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Divider } from '@/components/ui/Divider';
import { colors, spacing, borderRadius } from '@/constants/theme';
import { Button } from '../ui';

const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 500;

interface OrderSummaryProps {
  subtotal: number;
}

interface SummaryRowProps {
  label: string;
  value: string;
  highlight?: boolean;
  totalColor?: boolean;
}

function SummaryRow({ label, value, highlight = false, totalColor = false }: SummaryRowProps) {
  const valueColor = totalColor
    ? colors.totalBlue
    : highlight
      ? colors.textPrimary
      : colors.textSecondary;
  return (
    <View style={styles.row}>
      <Typography
        variant={highlight ? 'body' : 'caption'}
        weight={highlight ? 'semibold' : 'regular'}
        color={highlight ? colors.textPrimary : colors.textSecondary}
        style={{ fontSize: 19 }}
      >
        {label}
      </Typography>
      <Typography
        variant={highlight ? 'price' : 'caption'}
        weight={totalColor ? 'bold' : highlight ? 'bold' : 'regular'}
        color={valueColor}
        style={{ fontSize: 19 }}
      >
        {value}
      </Typography>
    </View>
  );
}

export function OrderSummary({ subtotal }: OrderSummaryProps) {
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  const applyCoupon = (couponCode: string) => {
    console.log('Applying coupon code: ', couponCode);
  };

  const [couponCode, setCouponCode] = useState('');
  return (
    <View style={styles.card}>
      {freeShipping && (
        <Typography style={styles.freeShipping} variant="body">
          Your cart qualifies for free shipping
        </Typography>
      )}

      <View style={styles.coupon}>
        <TextInput
          value={couponCode}
          onChangeText={setCouponCode}
          placeholder="Enter your coupon code"
          style={styles.couponInput}
        />
        <Button
          label={'Apply'}
          variant="accent"
          size="md"
          disabled={couponCode.length === 0}
          onPress={() => applyCoupon(couponCode)}
          style={styles.couponBtn}
        />
      </View>

      <SummaryRow label="Subtotal:" value={`$${subtotal.toLocaleString()}`} />
      <SummaryRow label="Delivery Fee:" value={`$${tax.toFixed(2)}`} />
      <SummaryRow label="Discount:" value={freeShipping ? 'Free' : '$15.00'} />
      <Divider style={styles.divider} />
      <SummaryRow label="Total:" value={`$${total.toFixed(2)}`} highlight totalColor />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
    width: '90%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    marginVertical: spacing.xs,
  },
  freeShipping: {
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  coupon: {
    margin: spacing.md,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  couponInput: {
    padding: spacing.md,
    width: '70%',
    backgroundColor: '#242C3B',
    boxShadow: '4px 10px 30px 0px #191E29 inset',
    height: 44,
    borderRadius: '8px',
    color: 'white',
  },
  couponBtn: {
    width: '30%',
    height: 44,
    borderRadius: 10,
  },
});
