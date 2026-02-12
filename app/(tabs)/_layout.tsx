import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { Colors, PRIMARY_COLOR, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: isDark ? Colors.dark.textSecondary : "#6b7280",
        headerShown: false,
        tabBarShowLabel: true,
        tabBarButton: HapticTab,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: isDark ? Colors.dark.backgroundTertiary : "#ffffff",
          borderTopWidth: 0,

          paddingHorizontal: 6,
          paddingTop: 10,
          shadowColor: "rgba(0, 0, 0, 0.15)",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 8,
        },
        tabBarItemStyle: {
          borderRadius: 20,
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? PRIMARY_COLOR : "transparent",
              }}
            >
              <MaterialIcons
                name="home"
                size={24}
                color={
                  focused
                    ? "#ffffff"
                    : isDark
                      ? Colors.dark.textSecondary
                      : "#4b5563"
                }
              />
            </View>
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                fontSize: 11,
                fontWeight: focused ? "700" : "500",
                marginTop: Spacing.x2,
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? PRIMARY_COLOR : "transparent",
              }}
            >
              <MaterialIcons
                name="receipt-long"
                size={24}
                color={
                  focused
                    ? "#ffffff"
                    : isDark
                      ? Colors.dark.textSecondary
                      : "#4b5563"
                }
              />
            </View>
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                fontSize: 11,
                fontWeight: focused ? "700" : "500",
                marginTop: Spacing.x2,
              }}
            >
              History
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: "Earnings",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? PRIMARY_COLOR : "transparent",
              }}
            >
              <MaterialIcons
                name="account-balance-wallet"
                size={24}
                color={
                  focused
                    ? "#ffffff"
                    : isDark
                      ? Colors.dark.textSecondary
                      : "#4b5563"
                }
              />
            </View>
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                fontSize: 11,
                fontWeight: focused ? "700" : "500",
                marginTop: Spacing.x2,
              }}
            >
              Earnings
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? PRIMARY_COLOR : "transparent",
              }}
            >
              <MaterialIcons
                name="person-outline"
                size={24}
                color={
                  focused
                    ? "#ffffff"
                    : isDark
                      ? Colors.dark.textSecondary
                      : "#4b5563"
                }
              />
            </View>
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                fontSize: 11,
                fontWeight: focused ? "700" : "500",
                marginTop: Spacing.x2,
              }}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
