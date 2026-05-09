import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { colors, TAB_BAR_HEIGHT } from '@/constants/theme';

import HomeIcon from '@/assets/svg/navbar/Subtract.svg';
import MapIcon from '@/assets/svg/navbar/map.fill.svg';
import CartIcon from '@/assets/svg/navbar/cart.fill.svg';
import PersonIcon from '@/assets/svg/navbar/person.fill.svg';
import OrdersIcon from '@/assets/svg/navbar/doc.text.fill.svg';

interface TabIconProps {
  Icon: React.FC<{ width: number; height: number }>;
  focused: boolean;
}

function TabIcon({ Icon, focused }: TabIconProps) {
  return (
    <View style={[styles.iconWrapper, { opacity: focused ? 1 : 0.4 }]}>
      <Icon width={24} height={24} />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.navInactive,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon Icon={HomeIcon} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon Icon={MapIcon} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon Icon={CartIcon} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon Icon={PersonIcon} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon Icon={OrdersIcon} focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    height: TAB_BAR_HEIGHT,
    paddingBottom: 0,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
