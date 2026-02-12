import { Spacing } from "@/constants/theme";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type AnimatedScaleModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
};

export default function AnimatedScaleModal({
  visible,
  onRequestClose,
  children,
}: AnimatedScaleModalProps) {
  const [isRendered, setIsRendered] = useState(visible);
  const modalScale = useSharedValue(0.92);
  const modalOpacity = useSharedValue(0);

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: modalScale.value }],
    opacity: modalOpacity.value,
  }));

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (visible) {
      setIsRendered(true);
      modalScale.value = 0.92;
      modalOpacity.value = 0;
      modalScale.value = withTiming(1, { duration: 220 });
      modalOpacity.value = withTiming(1, { duration: 220 });
    } else if (isRendered) {
      modalScale.value = withTiming(0.92, { duration: 180 });
      modalOpacity.value = withTiming(0, { duration: 180 });
      timeoutId = setTimeout(() => {
        setIsRendered(false);
      }, 190);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isRendered, modalOpacity, modalScale, visible]);

  return (
    <Modal
      visible={isRendered}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onRequestClose} />
        <Animated.View style={[styles.animatedContainer, modalAnimatedStyle]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  animatedContainer: {
    width: "100%",
    alignItems: "center",
  },
});
