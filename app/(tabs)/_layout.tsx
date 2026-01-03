import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { Colors, PRIMARY_COLOR } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: isDark
          ? Colors.dark.textSecondary
          : Colors.light.textSecondary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: isDark
            ? Colors.dark.backgroundTertiary
            : Colors.light.background,
          borderTopWidth: 1,
          borderTopColor: isDark ? Colors.dark.border : Colors.light.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? "home" : "home"}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: "Earnings",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={
                focused ? "account-balance-wallet" : "account-balance-wallet"
              }
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? "receipt-long" : "receipt-long"}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? "person" : "person"}
              size={26}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
