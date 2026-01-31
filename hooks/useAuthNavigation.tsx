import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export const useAuthNavigation = () => {
  const { isLoggedIn, isInitialized, isLoading, initializeAuth, token } =
    useAuthStore();

  // Initialize auth on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Determine the initial route based on auth state
  const getInitialRoute = () => {
    if (!isInitialized || isLoading) {
      return null; // Still loading, show splash
    }

    return isLoggedIn && token ? "(tabs)" : "welcome/index";
  };

  // Check if we should show loading state
  const shouldShowLoading = !isInitialized || isLoading;

  // Check if user is authenticated
  const isAuthenticated = isLoggedIn && !!token;

  return {
    isAuthenticated,
    isInitialized,
    isLoading: shouldShowLoading,
    initialRoute: getInitialRoute(),
    token,
  };
};
