import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { CustomTabBar } from '@/components/navigation/CustomTabBar';
import { colors } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          sceneContainerStyle: { backgroundColor: colors.background },
        }}
      >
        <Tabs.Screen name="index"   options={{}} />
        <Tabs.Screen name="map"     options={{}} />
        <Tabs.Screen name="cart"    options={{}} />
        <Tabs.Screen name="profile" options={{}} />
        <Tabs.Screen name="orders"  options={{}} />
      </Tabs>
    </View>
  );
}
