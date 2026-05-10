import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Defs, LinearGradient as SvgGrad, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Product, ProductCategory } from '@/types';
import { Typography } from '@/components/ui/Typography';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, spacing, borderRadius } from '@/constants/theme';

const SKEW = '-12deg' as const;
const SKEW_INV = '12deg' as const;

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  bicycle: 'Electric Bike',
  road: 'Road Bike',
  mountain: 'Mountain Bike',
  helmet: 'Road Helmet',
};

type GradientConfig = {
  colors: [string, string];
  locations: [number, number];
  start: { x: number; y: number };
  end: { x: number; y: number };
};

// CSS angle → RN start/end conversion for each card
const CARD_GRADIENTS: GradientConfig[] = [
  // 169.98deg: #353F54 27.98%, #222834 81.2%
  {
    colors: ['#353F54', '#222834'],
    locations: [0.2798, 0.812],
    start: { x: 0.413, y: 0.008 },
    end: { x: 0.587, y: 0.992 },
  },
  // 167.4deg: rgba(54,62,81,0.6) 25.94%, rgba(25,30,38,0.6) 68.26%
  {
    colors: ['rgba(54,62,81,0.6)', 'rgba(25,30,38,0.6)'],
    locations: [0.2594, 0.6826],
    start: { x: 0.391, y: 0.012 },
    end: { x: 0.609, y: 0.988 },
  },
  // 167.05deg: rgba(54,62,81,0.6) 24.24%, rgba(25,30,38,0.6) 67.53%
  {
    colors: ['rgba(54,62,81,0.6)', 'rgba(25,30,38,0.6)'],
    locations: [0.2424, 0.6753],
    start: { x: 0.391, y: 0.015 },
    end: { x: 0.609, y: 0.985 },
  },
  {
    colors: ['rgba(54,62,81,0.6)', 'rgba(25,30,38,0.6)'],
    locations: [0.2424, 0.6753],
    start: { x: 0.391, y: 0.015 },
    end: { x: 0.609, y: 0.985 },
  },
];

function GradientHeart({ size = 22 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Defs>
        <SvgGrad id="hg" x1="21%" y1="100%" x2="79%" y2="0%">
          <Stop offset="0%" stopColor="#34CAE8" />
          <Stop offset="100%" stopColor="#4E49F2" />
        </SvgGrad>
      </Defs>
      <Path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="none"
        stroke="url(#hg)"
        strokeWidth="1.8"
      />
    </Svg>
  );
}

function OutlineHeart({ size = 22 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="none"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.5"
      />
    </Svg>
  );
}

interface ProductCardProps {
  product: Product;
  index: number;
  compact?: boolean;
}

export function ProductCard({ product, index, compact = false }: ProductCardProps) {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const cardWidth = (width - spacing.lg * 2 - spacing.sm) / 2;

  const [favorited, setFavorited] = useState(false);
  const heartScale = useRef(new Animated.Value(1)).current;

  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  const isFirstCard = index === 0;

  const toggleFavorite = () => {
    setFavorited((prev) => !prev);
    Animated.sequence([
      Animated.spring(heartScale, {
        toValue: 1.45,
        useNativeDriver: true,
        speed: 60,
        bounciness: 0,
      }),
      Animated.spring(heartScale, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 5 }),
    ]).start();
  };

  return (
    <PressableScale
      onPress={() => router.push(`/product/${product.id}`)}
      style={{ width: cardWidth }}
    >
      <View style={[styles.skewOuter, isFirstCard && styles.firstCardShadow]}>
        <LinearGradient
          colors={gradient.colors}
          locations={gradient.locations}
          start={gradient.start}
          end={gradient.end}
          style={styles.card}
        >
          <View style={styles.skewInner}>
            <View style={[styles.imageArea, compact && styles.imageAreaCompact]}>
              <Image source={product.image} style={styles.bikeImage} resizeMode="contain" />
              <TouchableOpacity
                onPress={toggleFavorite}
                style={styles.heartBtn}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                activeOpacity={0.8}
              >
                <Animated.View style={{ transform: [{ scale: heartScale }] }}>
                  {favorited ? <GradientHeart size={22} /> : <OutlineHeart size={22} />}
                </Animated.View>
              </TouchableOpacity>
            </View>
            <View style={styles.info}>
              <Text style={styles.categoryLabel}>{CATEGORY_LABELS[product.category]}</Text>
              <Typography
                variant="body"
                weight="semibold"
                numberOfLines={1}
                color={colors.textPrimary}
                style={styles.productName}
              >
                {product.name}
              </Typography>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  skewOuter: {
    transform: [{ skewY: SKEW }],
    marginVertical: 6,
  },
  firstCardShadow: {
    shadowColor: '#10141C',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 60,
    elevation: 20,
  },
  card: {
    borderWidth: 0.6,
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  skewInner: {
    transform: [{ skewY: SKEW_INV }],
  },
  imageArea: {
    aspectRatio: 1,
    padding: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageAreaCompact: {
    aspectRatio: 1.1,
  },
  bikeImage: {
    width: '90%',
    height: '90%',
  },
  heartBtn: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.sm,
  },
  info: {
    paddingHorizontal: '12%',
    paddingBottom: spacing.md,
    gap: 2,
  },
  categoryLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
  },
  productName: {
    fontSize: 15,
  },
  price: {
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
});
