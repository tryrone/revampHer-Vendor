import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";

// Floating icon component
function FloatingIcon({
  icon,
  size,
  color,
  style,
  delay = 0,
  rotation = 0,
  duration = 6000,
  noContainer = false,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  size: number;
  color: string;
  style?: any;
  delay?: number;
  rotation?: number;
  duration?: number;
  noContainer?: boolean;
}) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    // Start animation after delay
    const timer = setTimeout(() => {
      translateY.value = withRepeat(
        withTiming(10, { duration: duration / 2 }),
        -1,
        true
      );
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, duration]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { rotate: `${rotation}deg` },
      ],
    };
  });

  return (
    <Animated.View style={[style, animatedStyle]}>
      {noContainer ? (
        <MaterialIcons name={icon} size={size} color={color} />
      ) : (
        <View style={styles.iconContainer}>
          <MaterialIcons name={icon} size={size} color={color} />
        </View>
      )}
    </Animated.View>
  );
}

export default function OnboardingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";

  const handleGetStarted = () => {
    router.replace("/login");
  };

  const handleLogin = () => {
    router.replace("/login");
  };

  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={
          isDark
            ? ["#111921", "#1a2332", "#0e141b"]
            : ["#DBEAFE", "#EFF6FF", "#FFFFFF"]
        }
        style={styles.gradient}
      >
        {/* Header with logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <MaterialIcons name="content-cut" size={32} color="#3B82F6" />
          </View>
        </View>

        {/* Main content area with animated icons */}
        <View style={styles.contentArea}>
          <View style={styles.iconsContainer}>
            {/* Blur background effect */}
            <View style={styles.blurBackground} />

            {/* Central storefront icon */}
            <FloatingIcon
              icon="storefront"
              size={48}
              color="#3B82F6"
              style={styles.centralIcon}
              delay={0}
              noContainer={true}
            />

            {/* Top center - Calendar */}
            <FloatingIcon
              icon="calendar-month"
              size={28}
              color="#0EA5E9"
              style={styles.topCenterIcon}
              delay={1000}
              rotation={-6}
            />

            {/* Left middle - Payments */}
            <FloatingIcon
              icon="payments"
              size={28}
              color="#3B82F6"
              style={styles.leftMiddleIcon}
              delay={500}
              rotation={6}
            />

            {/* Right middle - Group */}
            <FloatingIcon
              icon="group"
              size={28}
              color="#6366F1"
              style={styles.rightMiddleIcon}
              delay={1000}
              rotation={-3}
            />

            {/* Bottom left - Scissors */}
            <FloatingIcon
              icon="content-cut"
              size={24}
              color="#06B6D4"
              style={styles.bottomLeftIcon}
              delay={0}
              rotation={12}
            />

            {/* Bottom right - Diamond */}
            <FloatingIcon
              icon="diamond"
              size={24}
              color="#2563EB"
              style={styles.bottomRightIcon}
              delay={500}
              rotation={-8}
            />
          </View>

          {/* Text content */}
          <View style={styles.textContainer}>
            <ThemedText
              type="title"
              style={[styles.title, { color: isDark ? "#FFFFFF" : "#0F172A" }]}
            >
              Grow Your Hair Business
            </ThemedText>
            <ThemedText
              style={[
                styles.description,
                { color: isDark ? "#94A3B8" : "#64748B" },
              ]}
            >
              Streamline your appointments, manage clients, and boost your
              revenue—all in one place.
            </ThemedText>

            {/* Pagination dots */}
            <View style={styles.pagination}>
              <View style={styles.paginationDotActive} />
              <View style={styles.paginationDot} />
              <View style={styles.paginationDot} />
            </View>
          </View>
        </View>

        {/* Action buttons */}
        <View style={[styles.actions, { paddingBottom: insets.bottom + 16 }]}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
            onPress={handleGetStarted}
          >
            <ThemedText style={styles.primaryButtonText}>
              Let's Start!
            </ThemedText>
          </Pressable>

          <Pressable onPress={handleLogin} style={styles.loginLink}>
            <ThemedText
              style={[
                styles.loginText,
                { color: isDark ? "#94A3B8" : "#64748B" },
              ]}
            >
              Already have an account?{" "}
              <ThemedText style={styles.loginLinkText}>Log in</ThemedText>
            </ThemedText>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contentArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  iconsContainer: {
    width: "100%",
    height: 360,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    position: "relative",
  },
  blurBackground: {
    position: "absolute",
    width: 256,
    height: 256,
    borderRadius: 128,
    backgroundColor: "#3B82F6",
    opacity: 0.2,
    alignSelf: "center",
  },
  iconContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  centralIcon: {
    position: "absolute",
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  topCenterIcon: {
    position: "absolute",
    top: 40,
    width: 56,
    height: 56,
    borderRadius: 16,
  },
  leftMiddleIcon: {
    position: "absolute",
    left: 16,
    top: "50%",
    marginTop: -28,
    width: 56,
    height: 56,
    borderRadius: 16,
  },
  rightMiddleIcon: {
    position: "absolute",
    right: 16,
    top: "50%",
    marginTop: -28,
    width: 56,
    height: 56,
    borderRadius: 16,
  },
  bottomLeftIcon: {
    position: "absolute",
    bottom: 48,
    left: 48,
    width: 48,
    height: 48,
    borderRadius: 16,
  },
  bottomRightIcon: {
    position: "absolute",
    bottom: 48,
    right: 48,
    width: 48,
    height: 48,
    borderRadius: 16,
  },
  textContainer: {
    alignItems: "center",
    maxWidth: 320,
    zIndex: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 33.6,
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22.5,
    textAlign: "center",
    marginBottom: 24,
  },
  pagination: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  paginationDotActive: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#3B82F6",
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#3B82F6",
    opacity: 0.3,
  },
  actions: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 16,
  },
  primaryButton: {
    width: "100%",
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.015,
  },
  loginLink: {
    alignItems: "center",
    paddingVertical: 8,
  },
  loginText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  loginLinkText: {
    color: "#3B82F6",
    fontWeight: "700",
  },
});
