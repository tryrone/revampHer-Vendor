import { SplashScreen } from "@/components/splash-screen";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

const SPLASH_DURATION_MS = 3000;

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, isInitialized, isLoading } = useAuthNavigation();
  const mountTimeRef = useRef(Date.now());

  useEffect(() => {
    if (!isInitialized || isLoading) return;

    const elapsed = Date.now() - mountTimeRef.current;
    const remaining = Math.max(0, SPLASH_DURATION_MS - elapsed);

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/onboarding");
      }
    }, remaining);

    return () => clearTimeout(timer);
  }, [router, isInitialized, isLoading, isAuthenticated]);

  return <SplashScreen />;
}
