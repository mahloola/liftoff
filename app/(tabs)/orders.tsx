import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/theme';
import { AnimatedScreen } from '@/components/ui/AnimatedScreen';

export default function OrdersScreen() {
  return (
    <AnimatedScreen>
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Typography variant="heading">Orders</Typography>
        <Typography variant="body" color={colors.textSecondary}>
          Coming soon
        </Typography>
      </View>
    </SafeAreaView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});
