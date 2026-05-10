import React, { useState, useCallback } from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  useWindowDimensions,
  Alert,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { BikeSpecsCard } from '@/components/product/BikeSpecsCard';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, spacing, borderRadius, gradientButtonShadow } from '@/constants/theme';

import ChevronLeft from '@/assets/svg/misc/chevron-left.svg';
import SvgProduct from '@/assets/svg/svg-product.svg';
import SvgProductBottom from '@/assets/svg/svg-product-bottom.svg';
import useBikeDescription from '@/components/hooks/useBikeDescription';
type Tab = 'description' | 'specification';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const tabProgress = useSharedValue(0);

  const handleTabPress = useCallback(
    (tab: Tab) => {
      setActiveTab(tab);
      tabProgress.value = withTiming(tab === 'specification' ? 1 : 0, { duration: 500 });
    },
    [tabProgress]
  );

  const descBtnStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(tabProgress.value, [0, 1], ['#28303F', '#323B4F']),
  }));
  const specBtnStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(tabProgress.value, [0, 1], ['#323B4F', '#28303F']),
  }));
  const descLabelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(tabProgress.value, [0, 1], [colors.tabTextStart, colors.textSecondary]),
  }));
  const specLabelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(tabProgress.value, [0, 1], [colors.textSecondary, colors.tabTextStart]),
  }));

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <PressableScale
          onPress={() => router.back()}
          style={[styles.backBtn, { top: insets.top + spacing.sm }]}
        >
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
          />
          <View style={styles.backBtnIcon}>
            <ChevronLeft width={20} height={20} />
          </View>
        </PressableScale>
        <View style={styles.notFound}>
          <Typography variant="body" color={colors.textSecondary}>
            Product not found.
          </Typography>
        </View>
      </View>
    );
  }

  const searchName = `${product.brand} ${product.model}`;

  const { data, isLoading } = useBikeDescription(searchName);

  const apiBike = data?.bikes?.[(Math.random() * 5).toFixed(0)]; // arbitrarily pick one of 5 bikes (just as an API demo)
  console.log(apiBike);

  const apiDescription = apiBike?.description || product.description;
  const svgBgH = width * (641 / 382);
  const imageH = Math.round(width * 0.6);
  const bottomH = 104 + insets.bottom;

  return (
    <View style={styles.container}>
      {/* Background polygon */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <SvgProduct
          width={width}
          height={svgBgH}
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </View>

      {/* Back button */}
      <PressableScale
        onPress={() => router.back()}
        style={[styles.backBtn, { top: insets.top + spacing.sm }]}
      >
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
        />
        <View style={styles.backBtnIcon}>
          <ChevronLeft width={20} height={20} />
        </View>
      </PressableScale>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: bottomH + spacing.lg }}
        showsVerticalScrollIndicator={false}
      >
        {/* Product title */}
        <View style={[styles.titleArea, { paddingTop: insets.top + spacing.lg }]}>
          {/* spacing.lg is hard coded to avoid the complexity of transform to get a perfect lineup */}
          <Typography variant="heading" weight="bold" style={styles.titleText}>
            {product.brand} - {product.model}
          </Typography>
        </View>

        {/* Bike image */}
        <View style={[styles.imageWrap, { height: imageH }]}>
          <Image source={product.image} style={styles.bikeImage} resizeMode="contain" />
        </View>

        {/* Pagination dots */}
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Description / Specification tabs + content */}
        <LinearGradient
          colors={['#353F54', '#222834']}
          locations={[0, 0.5847]}
          start={{ x: 0.31, y: 0.04 }}
          end={{ x: 0.69, y: 0.96 }}
          style={styles.tabCard}
        >
          {/* Tab row */}
          <View style={styles.tabRow}>
            <Pressable onPress={() => handleTabPress('description')} style={styles.tabBtnBase}>
              <Animated.View
                style={[StyleSheet.absoluteFill, { borderRadius: 10 }, descBtnStyle]}
              />
              <Animated.Text
                style={[
                  styles.tabLabel,
                  descLabelStyle,
                  activeTab === 'description' && styles.tabLabelActive,
                ]}
              >
                Description
              </Animated.Text>
            </Pressable>
            <Pressable onPress={() => handleTabPress('specification')} style={styles.tabBtnBase}>
              <Animated.View
                style={[StyleSheet.absoluteFill, { borderRadius: 10 }, specBtnStyle]}
              />
              <Animated.Text
                style={[
                  styles.tabLabel,
                  specLabelStyle,
                  activeTab === 'specification' && styles.tabLabelActive,
                ]}
              >
                Specification
              </Animated.Text>
            </Pressable>
          </View>

          {/* Tab content */}
          <View style={styles.tabContent}>
            {activeTab === 'description' ? (
              <View style={styles.descContent}>
                <Typography variant="body" weight="bold" color={colors.textPrimary}>
                  {product.brand} — {product.model}
                </Typography>

                <Typography variant="body" color={colors.textSecondary} style={styles.descText}>
                  {isLoading ? 'Loading bike details...' : product.description}
                </Typography>
              </View>
            ) : (
              <BikeSpecsCard bike={apiBike} isLoading={isLoading} />
            )}
          </View>
        </LinearGradient>
      </ScrollView>

      {/* Bottom container: price + Add to Cart */}
      <View style={[styles.bottomOuter, { height: bottomH }]}>
        <View style={[styles.bottomContent, { paddingBottom: insets.bottom }]}>
          <Text style={styles.priceText}>${product.price.toLocaleString()}</Text>

          <Button
            label={product.inStock ? 'Add to Cart' : 'Out of Stock'}
            variant="accent"
            size="md"
            disabled={!product.inStock}
            onPress={() => {
              addToCart(product);
              Alert.alert('Added to Cart', `${product.name} has been added to your cart.`);
            }}
            style={styles.addToCartBtn}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  backBtn: {
    position: 'absolute',
    left: spacing.lg,
    zIndex: 10,
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.gradientEnd,
    borderColor: 'rgba(255,255,255,0.7)',
    ...gradientButtonShadow,
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
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleArea: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
  },
  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  bikeImage: {
    width: '80%',
    height: '100%',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.md,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  dotActive: {
    backgroundColor: 'white',
  },
  tabCard: {
    marginTop: spacing.xxl,
    height: '100%',
    width: '100%',
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tabRow: {
    flexDirection: 'row',
  },
  tabBtnBase: {
    marginTop: 30,
    marginHorizontal: 30,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: 2,
    boxShadow: '4px 4px 10px 0px #252B39, -4px -4px 10px 0px #38445A',
  },
  tabLabel: {
    color: colors.tabTextStart,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
  },
  tabLabelActive: {
    fontFamily: 'Poppins_600SemiBold',
  },
  tabContent: {
    padding: spacing.lg,
  },
  descContent: {
    gap: spacing.sm,
  },
  descText: {
    fontSize: 17,
    lineHeight: 22,
  },
  bottomOuter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'visible',
    backgroundColor: '#262E3D',
    boxShadow: '0px -10px 40px 0px #1C222E',
    borderRadius: 50,
  },
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 104,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xxl,
    gap: spacing.lg,
  },
  priceText: {
    fontSize: 35,
    color: colors.priceBlue,
  },
  addToCartBtn: {
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
