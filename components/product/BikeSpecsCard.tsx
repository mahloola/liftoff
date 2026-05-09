import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useBikeSpecs } from '@/hooks/useBikeSpecs';
import { Skeleton } from '@/components/ui/Skeleton';
import { Typography } from '@/components/ui/Typography';
import { Divider } from '@/components/ui/Divider';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface BikeSpecsCardProps {
  brand: string;
}

interface SpecRowProps {
  label: string;
  value: string;
}

function SpecRow({ label, value }: SpecRowProps) {
  return (
    <View style={styles.row}>
      <Typography variant="caption" color={colors.textSecondary}>
        {label}
      </Typography>
      <Typography variant="caption" weight="semibold" color={colors.textPrimary}>
        {value}
      </Typography>
    </View>
  );
}

export function BikeSpecsCard({ brand }: BikeSpecsCardProps) {
  const { spec, loading, error } = useBikeSpecs(brand);

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Typography variant="body" weight="semibold">
          Live Bike Data
        </Typography>
        <Typography variant="caption" color={colors.accent}>
          BikeIndex.org
        </Typography>
      </View>

      <Divider style={styles.divider} />

      {loading && (
        <View style={styles.skeletons}>
          <Skeleton height={12} width="60%" />
          <Skeleton height={12} width="80%" />
          <Skeleton height={12} width="50%" />
        </View>
      )}

      {error && (
        <Typography variant="caption" color={colors.textSecondary}>
          Could not load live data.
        </Typography>
      )}

      {!loading && !error && spec && (
        <View style={styles.specs}>
          <SpecRow label="Frame material" value={spec.frameMaterial} />
          <SpecRow label="Drivetrain" value={spec.drivetrainType} />
          <SpecRow label="Wheel size" value={spec.wheelSize} />
          <SpecRow label="Year" value={String(spec.year)} />
        </View>
      )}

      {!loading && !error && !spec && (
        <Typography variant="caption" color={colors.textSecondary}>
          No data found for this brand.
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    marginVertical: spacing.xs,
  },
  skeletons: {
    gap: spacing.sm,
  },
  specs: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
