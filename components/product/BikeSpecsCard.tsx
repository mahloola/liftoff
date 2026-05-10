import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LottieLoader } from '@/components/ui/LottieLoader';
import { Typography } from '@/components/ui/Typography';
import { Divider } from '@/components/ui/Divider';
import { BikeIndexBike } from '@/types';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface BikeSpecsCardProps {
  bike?: BikeIndexBike;
  isLoading: boolean;
}

interface SpecRowProps {
  label: string;
  value: string;
}

function prettifySlug(slug: string) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
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

export function BikeSpecsCard({ bike, isLoading }: BikeSpecsCardProps) {
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

      {isLoading && <LottieLoader size={40} />}

      {!isLoading && !bike && (
        <Typography variant="caption" color={colors.textSecondary}>
          No data found.
        </Typography>
      )}

      {!isLoading && bike && (
        <View style={styles.specs}>
          <SpecRow label="Manufacturer" value={bike.manufacturer_name} />
          <SpecRow label="Model" value={bike.frame_model} />
          <SpecRow label="Colors" value={bike.frame_colors.join(' / ')} />
          <SpecRow label="Year" value={bike.year ? String(bike.year) : 'Unknown'} />
          <SpecRow label="Drive type" value={prettifySlug(bike.propulsion_type_slug)} />
          <SpecRow label="Serial" value={bike.serial} />
        </View>
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
  specs: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
