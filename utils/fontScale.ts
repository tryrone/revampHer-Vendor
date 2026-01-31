import { PixelRatio } from "react-native";

/**
 * Scales a font size based on the system font scale setting
 * This ensures text respects the user's accessibility preferences
 * @param size - Base font size in pixels
 * @param maxScale - Maximum scale factor (default: 1.3 to prevent excessive scaling)
 * @returns Scaled font size
 */
export const scaleFontSize = (size: number, maxScale: number = 1.3): number => {
  const fontScale = PixelRatio.getFontScale();
  const scaledSize = size * Math.min(fontScale, maxScale);
  // Round to nearest 0.5 for better rendering
  return Math.round(scaledSize * 2) / 2;
};

/**
 * Hook to get the current font scale factor
 */
export const useFontScale = (): number => {
  return Math.min(PixelRatio.getFontScale(), 1.3);
};

