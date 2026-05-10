import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';

// import ChevronLeft from '@assets/svg/navbar/chevron-left.svg';
// import PlusIcon from '@assets/svg/misc/plus.svg';
// import MinusIcon from '@assets/svg/misc/minus.svg';

interface CheckoutPanelProps {
  visible: boolean;
  onClose: () => void;
}

const ITEMS = [PRODUCTS[1], PRODUCTS[3], PRODUCTS[2]];

function CartItem({ item }: { item: Product }) {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.itemLeft}>
        <View style={styles.imageCard}>
          <Image source={item.image} resizeMode="contain" style={styles.productImage} />
        </View>

        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>
            {item.brand} - {item.model}
          </Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.qtyContainer}>
        <Pressable style={styles.qtyDarkBtn}>{/*<MinusIcon width={18} height={18} />*/}</Pressable>

        <Text style={styles.qtyText}>1</Text>

        <LinearGradient
          colors={['#34C8E8', '#4E4AF2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.qtyGradientBtn}
        >
          {/*<PlusIcon width={18} height={18} />*/}
        </LinearGradient>
      </View>
    </View>
  );
}

export function CheckoutPanel({ visible, onClose }: CheckoutPanelProps) {
  const { width } = useWindowDimensions();

  if (!visible) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 44,
        }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#34C8E8', '#4E4AF2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.backButton}
          >
            <Pressable onPress={onClose} style={styles.backButtonInner}>
              {/*<ChevronLeft width={22} height={22} />*/}
            </Pressable>
          </LinearGradient>

          <Text style={styles.headerTitle}>My Shopping Cart</Text>
        </View>

        {/* ITEMS */}
        <View style={{ marginTop: 30 }}>
          {ITEMS.map((item, index) => (
            <View key={item.id}>
              <CartItem item={item} />

              {index !== ITEMS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* SHIPPING TEXT */}
        <Text style={styles.shippingText}>Your cart qualifies for free shipping</Text>

        {/* COUPON */}
        <View style={styles.couponRow}>
          <View style={styles.couponInput}>
            <Text style={styles.couponPlaceholder}>Bike30</Text>
          </View>

          <LinearGradient
            colors={['#34C8E8', '#4E4AF2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.applyButton}
          >
            <Text style={styles.applyText}>Apply</Text>
          </LinearGradient>
        </View>

        {/* TOTALS */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>$6119.99</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery Fee:</Text>
            <Text style={styles.totalValue}>$0</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Discount:</Text>
            <Text style={styles.totalValue}>30%</Text>
          </View>

          <View style={[styles.totalRow, { marginTop: 28 }]}>
            <Text style={styles.totalBigLabel}>Total:</Text>

            <Text style={styles.totalBigValue}>$4,283.99</Text>
          </View>
        </View>

        {/* CHECKOUT */}
        <View style={styles.checkoutContainer}>
          <View style={styles.checkoutPill}>
            <LinearGradient
              colors={['#34C8E8', '#4E4AF2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.checkoutIcon}
            >
              {/*<ChevronLeft
                width={22}
                height={22}
                style={{
                  transform: [{ rotate: '180deg' }],
                }}
              />*/}
            </LinearGradient>

            <Text style={styles.checkoutText}>Checkout</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2637',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 10,
  },

  backButton: {
    width: 62,
    height: 62,
    borderRadius: 20,

    shadowColor: '#34C8E8',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 10,
  },

  backButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    color: 'white',
    fontSize: 34,
    fontFamily: 'Poppins_700Bold',
    marginLeft: 24,
    letterSpacing: -1,
  },

  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 24,
    paddingVertical: 24,
  },

  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageCard: {
    width: 108,
    height: 108,
    borderRadius: 28,
    backgroundColor: '#323B52',

    alignItems: 'center',
    justifyContent: 'center',
  },

  productImage: {
    width: '78%',
    height: '78%',
  },

  itemInfo: {
    marginLeft: 20,
    width: 150,
  },

  itemTitle: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'Poppins_700Bold',
    lineHeight: 28,
  },

  itemPrice: {
    marginTop: 14,
    color: '#34B8FF',
    fontSize: 19,
    fontFamily: 'Poppins_500Medium',
  },

  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  qtyDarkBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#2C354A',

    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyGradientBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,

    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    marginHorizontal: 18,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginHorizontal: 24,
  },

  shippingText: {
    marginTop: 36,
    textAlign: 'center',

    color: 'rgba(255,255,255,0.55)',
    fontSize: 19,
    fontFamily: 'Poppins_400Regular',
  },

  couponRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 30,
    paddingHorizontal: 24,
  },

  couponInput: {
    flex: 1,
    height: 74,

    borderRadius: 20,
    backgroundColor: '#222B3D',

    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  couponPlaceholder: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
  },

  applyButton: {
    width: 140,
    height: 74,

    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: -12,
  },

  applyText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
  },

  totals: {
    marginTop: 34,
    paddingHorizontal: 24,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 18,
  },

  totalLabel: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'Poppins_600SemiBold',
  },

  totalValue: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 21,
    fontFamily: 'Poppins_500Medium',
  },

  totalBigLabel: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
  },

  totalBigValue: {
    color: '#34B8FF',
    fontSize: 34,
    fontFamily: 'Poppins_700Bold',
  },

  checkoutContainer: {
    alignItems: 'center',
    marginTop: 34,
  },

  checkoutPill: {
    width: '88%',
    maxWidth: 380,
    height: 84,

    borderRadius: 28,
    backgroundColor: '#222B3D',

    flexDirection: 'row',
    alignItems: 'center',
  },

  checkoutIcon: {
    width: 84,
    height: 84,
    borderRadius: 28,

    alignItems: 'center',
    justifyContent: 'center',
  },

  checkoutText: {
    flex: 1,
    textAlign: 'center',

    color: 'rgba(255,255,255,0.72)',
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',

    marginRight: 44,
  },
});
