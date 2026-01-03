import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="create-account" options={{ headerShown: false }} />
        <Stack.Screen name="otp-verification" options={{ headerShown: false }} />
        <Stack.Screen name="profile-setup" options={{ headerShown: false }} />
        <Stack.Screen name="availability-toggle" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="order-details" options={{ headerShown: false }} />
        <Stack.Screen name="transaction-details" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
