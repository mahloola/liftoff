import React from 'react';
import { Tabs } from 'expo-router';
import { CustomTabBar } from '@/components/navigation/CustomTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen name="index"   options={{}} />
      <Tabs.Screen name="map"     options={{}} />
      <Tabs.Screen name="cart"    options={{}} />
      <Tabs.Screen name="profile" options={{}} />
      <Tabs.Screen name="orders"  options={{}} />
    </Tabs>
  );
}
