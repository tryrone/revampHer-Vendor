import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeights,
  PRIMARY_COLOR,
  Spacing,
} from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

// Styled Components
const Container = styled.View<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundSecondary};
`;

const Header = styled.View<{ paddingTop: number; isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${Spacing.md}px;
  padding-top: ${(props) => props.paddingTop + Spacing.sm}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundSecondary};
  z-index: 10;
  position: relative;
`;

const HeaderSpacer = styled.View`
  width: 48px;
`;

const HeaderTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.lg}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  text-align: center;
  flex: 1;
`;

const CloseButton = styled.Pressable<{ isDark: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(226, 232, 240, 0.5)"};
  align-items: center;
  justify-content: center;
`;

const MainContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${Spacing.xl}px;
  margin-top: -${Spacing.xl}px;
  position: relative;
`;

const RippleContainer = styled(Animated.View)`
  position: absolute;
  width: 240px;
  height: 240px;
  border-radius: 120px;
  background-color: ${PRIMARY_COLOR}33;
`;

const StatusCircle = styled.View<{ isDark: boolean }>`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  border-width: 6px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  align-items: center;
  justify-content: center;
  shadow-color: rgba(0, 0, 0, 0.04);
  shadow-offset: 0px 8px;
  shadow-opacity: 1;
  shadow-radius: 30px;
  elevation: 4;
  z-index: 10;
  position: relative;
`;

const StorefrontIcon = styled.View`
  align-items: center;
  justify-content: center;
`;

const OnlineBadge = styled.View<{ isDark: boolean }>`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #22c55e;
  border-width: 4px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  align-items: center;
  justify-content: center;
  shadow-color: rgba(0, 0, 0, 0.1);
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 4px;
  elevation: 2;
`;

const StatusTextSection = styled.View`
  align-items: center;
  margin-top: ${Spacing["2xl"]}px;
  gap: ${Spacing.sm}px;
  z-index: 10;
`;

const StatusHeading = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes["4xl"]}px;
  font-weight: ${FontWeights.extrabold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  text-align: center;
  letter-spacing: -0.5px;
`;

const LocationText = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.xs + 2}px;
`;

const LocationTextContent = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) => (props.isDark ? Colors.dark.textSecondary : "#4e7397")};
  text-align: center;
`;

const BottomSheet = styled.View<{ paddingBottom: number; isDark: boolean }>`
  width: 100%;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  border-top-left-radius: ${BorderRadius["3xl"]}px;
  border-top-right-radius: ${BorderRadius["3xl"]}px;
  padding: ${Spacing["2xl"]}px;
  padding-bottom: ${(props) => props.paddingBottom + Spacing.xl}px;
  shadow-color: rgba(0, 0, 0, 0.1);
  shadow-offset: 0px -10px;
  shadow-opacity: 1;
  shadow-radius: 40px;
  elevation: 8;
  z-index: 20;
`;

const BottomSheetContent = styled.View`
  max-width: 100%;
  gap: ${Spacing["2xl"]}px;
`;

const AcceptingOrdersCard = styled.View<{ isDark: boolean }>`
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : "#f8fafc"};
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? Colors.dark.border : "#d0dbe7")};
  border-radius: ${BorderRadius["2xl"]}px;
  padding: ${Spacing["2xl"]}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  shadow-color: rgba(0, 0, 0, 0.05);
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 4px;
  elevation: 2;
`;

const AcceptingOrdersText = styled.View`
  flex: 1;
  gap: ${Spacing.xs}px;
  padding-right: ${Spacing.md}px;
`;

const AcceptingOrdersTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.lg}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const AcceptingOrdersSubtitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) => (props.isDark ? Colors.dark.textSecondary : "#4e7397")};
`;

// Toggle Switch Components
const ToggleContainer = styled.Pressable<{
  isChecked: boolean;
  isDark: boolean;
}>`
  height: 40px;
  width: 64px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isChecked
      ? PRIMARY_COLOR
      : props.isDark
      ? Colors.dark.border
      : "#e7edf3"};
  padding: ${Spacing.xs}px;
  justify-content: center;
`;

const ToggleThumb = styled(Animated.View)<{ isDark: boolean }>`
  height: 32px;
  width: 32px;
  border-radius: 16px;
  background-color: ${Colors.light.background};
  shadow-color: rgba(0, 0, 0, 0.1);
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 4px;
  elevation: 2;
  align-items: center;
  justify-content: center;
`;

const PendingRequestsCard = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${Spacing.sm}px;
`;

const PendingRequestsLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.md}px;
  flex: 1;
`;

const PendingRequestsIcon = styled.View<{ isDark: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: ${BorderRadius["2xl"]}px;
  background-color: ${(props) =>
    props.isDark ? "rgba(251, 146, 60, 0.2)" : "#fff0e6"};
  align-items: center;
  justify-content: center;
`;

const PendingRequestsText = styled.View`
  flex: 1;
  gap: ${Spacing.xs}px;
`;

const PendingRequestsTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const PendingRequestsSubtitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) => (props.isDark ? Colors.dark.textSecondary : "#4e7397")};
`;

const ViewButton = styled.Pressable<{ isDark: boolean }>`
  height: 40px;
  padding: 0 ${Spacing.md}px;
  border-radius: ${BorderRadius.xl}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.border : "#f1f5f9"};
  align-items: center;
  justify-content: center;
`;

const ViewButtonText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

// Custom Toggle Switch Component
function ToggleSwitch({
  value,
  onValueChange,
  isDark,
}: {
  value: boolean;
  onValueChange: (value: boolean) => void;
  isDark: boolean;
}) {
  const translateX = useSharedValue(value ? 24 : 0);
  const opacity = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    translateX.value = withTiming(value ? 24 : 0, { duration: 300 });
    opacity.value = withTiming(value ? 1 : 0, { duration: 300 });
  }, [value]);

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <ToggleContainer
      isChecked={value}
      isDark={isDark}
      onPress={() => onValueChange(!value)}
      android_ripple={{
        color: value ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
        borderless: false,
        radius: 32,
      }}
    >
      <ToggleThumb style={thumbStyle} isDark={isDark}>
        <Animated.View style={iconStyle}>
          <MaterialIcons
            name="power-settings-new"
            size={14}
            color={PRIMARY_COLOR}
          />
        </Animated.View>
      </ToggleThumb>
    </ToggleContainer>
  );
}

export default function AvailabilityToggleScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";

  const [isAcceptingOrders, setIsAcceptingOrders] = useState(true);

  // Pulse animation for ripple effect
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.2);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withTiming(1.5, { duration: 3000 }),
      -1,
      true
    );
    pulseOpacity.value = withRepeat(
      withTiming(0.1, { duration: 3000 }),
      -1,
      true
    );
  }, []);

  const rippleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseScale.value }],
      opacity: pulseOpacity.value,
    };
  });

  const handleClose = () => {
    router.replace("/(tabs)");
  };

  const handleViewPending = () => {
    // Placeholder for viewing pending requests
    console.log("View pending requests");
  };

  return (
    <Container isDark={isDark}>
      {/* Header */}
      <Header paddingTop={insets.top} isDark={isDark}>
        <HeaderSpacer />
        <HeaderTitle isDark={isDark}>Your Status</HeaderTitle>
        <CloseButton
          isDark={isDark}
          onPress={handleClose}
          android_ripple={{
            color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
            borderless: false,
            radius: 20,
          }}
        >
          <MaterialIcons
            name="close"
            size={24}
            color={isDark ? Colors.dark.text : Colors.light.text}
          />
        </CloseButton>
      </Header>

      {/* Main Content */}
      <MainContent>
        {/* Ripple/Glow Effect */}
        <RippleContainer style={rippleStyle} />

        {/* Status Circle */}
        <StatusCircle isDark={isDark}>
          <StorefrontIcon>
            <MaterialIcons name="storefront" size={64} color={PRIMARY_COLOR} />
          </StorefrontIcon>
          <OnlineBadge isDark={isDark}>
            <MaterialIcons name="check" size={18} color="#ffffff" />
          </OnlineBadge>
        </StatusCircle>

        {/* Status Text */}
        <StatusTextSection>
          <StatusHeading isDark={isDark}>You are Online</StatusHeading>
          <LocationText>
            <MaterialIcons
              name="location-on"
              size={18}
              color={isDark ? Colors.dark.textSecondary : "#4e7397"}
            />
            <LocationTextContent isDark={isDark}>
              Visible to clients in Lagos
            </LocationTextContent>
          </LocationText>
        </StatusTextSection>
      </MainContent>

      {/* Bottom Action Sheet */}
      <BottomSheet paddingBottom={insets.bottom} isDark={isDark}>
        <BottomSheetContent>
          {/* Accepting Orders Card */}
          <AcceptingOrdersCard isDark={isDark}>
            <AcceptingOrdersText>
              <AcceptingOrdersTitle isDark={isDark}>
                Accepting Orders
              </AcceptingOrdersTitle>
              <AcceptingOrdersSubtitle isDark={isDark}>
                Toggle to manage availability
              </AcceptingOrdersSubtitle>
            </AcceptingOrdersText>
            <ToggleSwitch
              value={isAcceptingOrders}
              onValueChange={setIsAcceptingOrders}
              isDark={isDark}
            />
          </AcceptingOrdersCard>

          {/* Pending Requests Card */}
          {/* <PendingRequestsCard>
            <PendingRequestsLeft>
              <PendingRequestsIcon isDark={isDark}>
                <MaterialIcons
                  name="pending-actions"
                  size={24}
                  color={isDark ? "#fb923c" : "#ea580c"}
                />
              </PendingRequestsIcon>
              <PendingRequestsText>
                <PendingRequestsTitle isDark={isDark}>
                  3 Pending Requests
                </PendingRequestsTitle>
                <PendingRequestsSubtitle isDark={isDark}>
                  Requires your attention
                </PendingRequestsSubtitle>
              </PendingRequestsText>
            </PendingRequestsLeft>
            <ViewButton
              isDark={isDark}
              onPress={handleViewPending}
              android_ripple={{
                color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                borderless: false,
                radius: 20,
              }}>
              <ViewButtonText isDark={isDark}>View</ViewButtonText>
            </ViewButton>
          </PendingRequestsCard> */}
        </BottomSheetContent>
      </BottomSheet>
    </Container>
  );
}
