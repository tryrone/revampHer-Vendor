import { ApolloProvider } from "@apollo/client/react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import Toaster from "@/components/Toaster";
import { ENV } from "@/constants";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { createApolloClient } from "@/shared/gql/apolloClient";
import { getAccessToken } from "@/storage";
import { useAuthStore } from "@/store/authStore";

export const unstable_settings = {
  anchor: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { token, setToken } = useAuthStore();

  const loadToken = async () => {
    const accessToken = await getAccessToken();
    setToken(accessToken ?? null);
  };

  useEffect(() => {
    loadToken();
    if (Platform.OS === "ios" || Platform.OS === "android") {
      const iosClientId = ENV.GOOGLE_APPLE_CLIENT_ID;
      if (iosClientId) {
        import("@react-native-google-signin/google-signin").then(
          ({ GoogleSignin }) => {
            GoogleSignin.configure({
              iosClientId,
              webClientId: ENV.GOOGLE_WEB_CLIENT_ID ?? undefined,
            });
          }
        );
      }
    }
  }, []);

  const client = useMemo(() => createApolloClient(token ?? undefined), [token]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="onboarding"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen
                name="create-account"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="otp-verification"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="profile-setup"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="availability-toggle"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="order-details"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="transaction-details"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="notifications"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />
            </Stack>
            <Toaster />
            <StatusBar style="auto" />
          </BottomSheetModalProvider>
        </ThemeProvider>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}
