import React from 'react';
import { View, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import SvgTabs from '@/assets/svg/svg-tabs.svg';
import SvgActiveTab from '@/assets/svg/svg-active-tab.svg';

import HomeIcon from '@/assets/svg/navbar/Subtract.svg';
import MapIcon from '@/assets/svg/navbar/map.fill.svg';
import CartIcon from '@/assets/svg/navbar/cart.fill.svg';
import PersonIcon from '@/assets/svg/navbar/person.fill.svg';
import OrdersIcon from '@/assets/svg/navbar/doc.text.fill.svg';

const NAV_ICONS = [HomeIcon, MapIcon, CartIcon, PersonIcon, OrdersIcon];

const SVG_HEIGHT = 103;
const ACTIVE_W = 107;
const ACTIVE_H = 111;

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const tabW = width / state.routes.length;
  const totalH = SVG_HEIGHT + insets.bottom;

  return (
    <View style={[styles.container, { height: totalH, width }]}>
      {/* Background shape */}
      <SvgTabs width={width} height={SVG_HEIGHT} preserveAspectRatio="none" style={styles.bgSvg} />

      {/* Inset fill below the SVG shape (safe-area padding) */}
      <View style={[styles.insetFill, { height: insets.bottom }]} />

      {/* Tab buttons row — sits inside the visible pill area */}
      <View style={[styles.iconsRow, { height: SVG_HEIGHT }]}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const Icon = NAV_ICONS[index] ?? HomeIcon;

          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={[styles.tab, { width: tabW }]}
            >
              {focused && (
                <SvgActiveTab
                  width={ACTIVE_W}
                  height={ACTIVE_H}
                  style={[
                    styles.activeIndicator,
                    {
                      marginLeft: ACTIVE_W / 2 - 40,
                    },
                  ]}
                />
              )}
              <Icon width={24} height={24} style={{ opacity: focused ? 1 : 0.4 }} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bgSvg: {
    position: 'absolute',
    top: 23,
    left: 0,
  },
  insetFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#181C24',
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16, // push icons below the angled top edge
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -28,
    alignSelf: 'center',
    marginLeft: -(ACTIVE_W / 2 - 12),
  },
});
