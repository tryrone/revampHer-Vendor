/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

// Primary brand color
export const PRIMARY_COLOR = "#308ce8";
export const PRIMARY_DARK = "#2563EB";

// Color palette
export const Colors = {
  // Primary colors
  primary: PRIMARY_COLOR,
  primaryDark: PRIMARY_DARK,
  primaryLight: "rgba(48, 140, 232, 0.1)",

  // Background colors
  light: {
    text: "#0F172A",
    textSecondary: "#64748B",
    textTertiary: "#94A3B8",
    background: "#ffffff",
    backgroundSecondary: "#f6f7f8",
    backgroundTertiary: "#F1F5F9",
    backgroundInput: "#F1F5F9",
    backgroundInputFocused: "#ffffff",
    border: "#E2E8F0",
    borderInput: "#d0dbe7",
    borderInputFocused: PRIMARY_COLOR,
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ffffff",
    textSecondary: "#94A3B8",
    textTertiary: "#64748B",
    background: "#111921",
    backgroundSecondary: "#111921",
    backgroundTertiary: "#1a2632",
    backgroundInput: "#1E293B",
    backgroundInputFocused: "#1a2632",
    border: "#334155",
    borderInput: "#2a3b4d",
    borderInputFocused: PRIMARY_COLOR,
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Font sizes
export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 32,
} as const;

// Font weights
export const FontWeights = {
  normal: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  extrabold: "800" as const,
} as const;

// Line heights
export const LineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 48,
  "5xl": 64,
  "6xl": 80,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  full: 9999,
} as const;

export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
} as const;

export const IconSizes = {
  sm: 16,
  md: 24,
  lg: 28,
  xl: 32,
} as const;

export const Opacity = {
  disabled: 0.5,
  hover: 0.8,
  overlay: 0.7,
  subtle: 0.1,
  medium: 0.2,
} as const;
