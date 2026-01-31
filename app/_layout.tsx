import { ApolloProvider } from "@apollo/client/react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import { Platform } from "react-native";
import "react-native-reanimated";

import Toaster from "@/components/Toaster";
import { ENV } from "@/constants";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { createApolloClient } from "@/shared/gql/apolloClient";

export const unstable_settings = {
  anchor: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const client = useMemo(() => createApolloClient(undefined), []);

  // Google Sign-In on iOS requires EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID in .env (iOS OAuth client ID from Google Cloud Console).
  useEffect(() => {
    if (Platform.OS !== "ios" && Platform.OS !== "android") return;
    const iosClientId = ENV.GOOGLE_APPLE_CLIENT_ID;
    if (!iosClientId) return;
    import("@react-native-google-signin/google-signin").then(
      ({ GoogleSignin }) => {
        GoogleSignin.configure({
          iosClientId,
          webClientId: ENV.GOOGLE_WEB_CLIENT_ID ?? undefined,
        });
      }
    );
  }, []);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen
            name="create-account"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="otp-verification"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="profile-setup" options={{ headerShown: false }} />
          <Stack.Screen
            name="availability-toggle"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="order-details" options={{ headerShown: false }} />
          <Stack.Screen
            name="transaction-details"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="notifications" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <Toaster />
        <StatusBar style="auto" />
      </ThemeProvider>
    </ApolloProvider>
  );
}
