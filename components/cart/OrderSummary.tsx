import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Divider } from '@/components/ui/Divider';
import { colors, spacing, borderRadius } from '@/constants/theme';

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
  const valueColor = totalColor ? colors.totalBlue : (highlight ? colors.textPrimary : colors.textSecondary);
  return (
    <View style={styles.row}>
      <Typography
        variant={highlight ? 'body' : 'caption'}
        weight={highlight ? 'semibold' : 'regular'}
        color={highlight ? colors.textPrimary : colors.textSecondary}
      >
        {label}
      </Typography>
      <Typography
        variant={highlight ? 'price' : 'caption'}
        weight={totalColor ? 'bold' : (highlight ? 'bold' : 'regular')}
        color={valueColor}
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

  return (
    <View style={styles.card}>
      <Typography variant="body" weight="semibold">Order Summary</Typography>
      <Divider style={styles.divider} />
      <SummaryRow label="Subtotal" value={`$${subtotal.toLocaleString()}`} />
      <SummaryRow label="Tax (8%)" value={`$${tax.toFixed(2)}`} />
      <SummaryRow
        label="Shipping"
        value={freeShipping ? 'Free' : '$15.00'}
      />
      <Divider style={styles.divider} />
      <SummaryRow label="Total" value={`$${total.toFixed(2)}`} highlight totalColor />
      {freeShipping && (
        <Typography variant="caption" color={colors.success} style={styles.freeShipping}>
          You qualify for free shipping!
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
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
});
