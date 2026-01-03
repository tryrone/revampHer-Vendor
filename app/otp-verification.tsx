import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeights,
  LineHeights,
  PRIMARY_COLOR,
  Spacing,
} from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Pressable, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

// Styled Components
const Container = styled.ScrollView<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundSecondary};
`;

const Content = styled.View`
  flex: 1;
  padding: 0 ${Spacing.sm}px;
  max-width: 480px;
  width: 100%;
  align-self: center;
`;

const Header = styled.View<{ paddingTop?: number }>`
  flex-direction: row;
  align-items: center;
  padding: ${Spacing.lg}px ${Spacing.md}px;
  padding-top: ${(props) => props.paddingTop || 0}px;
`;

const BackButton = styled.Pressable<{ isDark: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const MainContent = styled.View`
  flex: 1;
  padding: ${Spacing.lg}px ${Spacing.lg}px ${Spacing["2xl"]}px;
  justify-content: space-between;
`;

const TitleSection = styled.View`
  gap: ${Spacing.md}px;
  margin-bottom: ${Spacing["5xl"]}px;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes["4xl"]}px;
  font-weight: ${FontWeights.extrabold};
  line-height: ${FontSizes["4xl"] * LineHeights.tight}px;
  letter-spacing: -0.5px;
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const Description = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.medium};
  line-height: ${FontSizes.base * LineHeights.relaxed}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const PhoneNumber = styled.Text<{ isDark: boolean }>`
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const OTPContainer = styled.View`
  width: 100%;
  margin-bottom: ${Spacing["5xl"]}px;
`;

const OTPInputsRow = styled.View`
  flex-direction: row;
  gap: ${Spacing.sm}px;
  justify-content: space-between;
`;

const OTPInputBase = styled.TextInput.attrs<{
  isFocused: boolean;
  isDark: boolean;
}>((props) => ({
  keyboardType: "number-pad" as const,
  maxLength: 1,
  selectTextOnFocus: true,
}))<{ isFocused: boolean; isDark: boolean }>`
  flex: 1;
  height: 56px;
  border-radius: ${BorderRadius.md}px;
  border-width: 1px;
  border-color: ${(props) =>
    props.isFocused
      ? PRIMARY_COLOR
      : props.isDark
      ? Colors.dark.borderInput
      : Colors.light.borderInput};
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  text-align: center;
  font-size: ${FontSizes["2xl"]}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  shadow-color: ${(props) => (props.isFocused ? PRIMARY_COLOR : "transparent")};
  shadow-offset: 0px 0px;
  shadow-opacity: ${(props) => (props.isFocused ? 0.2 : 0)};
  shadow-radius: 8px;
  elevation: ${(props) => (props.isFocused ? 2 : 0)};
`;

// Wrapper component to handle ref forwarding
const OTPInput = forwardRef<
  TextInput,
  React.ComponentProps<typeof OTPInputBase>
>((props, ref) => <OTPInputBase {...props} ref={ref} />);

const ResendSection = styled.View`
  align-items: center;
  gap: ${Spacing.sm}px;
  margin-bottom: ${Spacing["5xl"]}px;
`;

const ResendText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const TimerText = styled.Text<{ isDark: boolean }>`
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  font-variant: tabular-nums;
`;

const ResendIndicator = styled.View<{ isDark: boolean }>`
  height: 4px;
  width: 48px;
  border-radius: 2px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
`;

const ResendLink = styled.Text`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.medium};
  color: ${PRIMARY_COLOR};
`;

const ButtonContainer = styled.View`
  margin-top: auto;
  padding-top: ${Spacing["2xl"]}px;
`;

const PrimaryButton = styled.Pressable<{ isDark: boolean; disabled: boolean }>`
  width: 100%;
  height: 56px;
  background-color: ${(props) =>
    props.disabled
      ? props.isDark
        ? Colors.dark.borderInput
        : Colors.light.borderInput
      : PRIMARY_COLOR};
  border-radius: ${BorderRadius.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.sm}px;
  shadow-color: ${PRIMARY_COLOR};
  shadow-offset: 0px 4px;
  shadow-opacity: ${(props) => (props.disabled ? 0 : 0.25)};
  shadow-radius: 12px;
  elevation: ${(props) => (props.disabled ? 0 : 6)};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const PrimaryButtonText = styled.Text`
  font-size: ${FontSizes.lg}px;
  font-weight: ${FontWeights.bold};
  color: #ffffff;
`;

export default function OTPVerificationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";

  // Get phone number from params or use default
  const phoneNumber = (params.phone as string) || "+234 812 345 6789";

  // OTP state
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0); // Start with first field
  const [timer, setTimer] = useState(30); // 30 seconds countdown
  const [canResend, setCanResend] = useState(false);

  // Refs for OTP inputs
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Auto-focus first input on mount
  useEffect(() => {
    // Small delay to ensure the component is fully mounted
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  // Format timer as MM:SS
  const formatTimer = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Handle OTP input change
  const handleOtpChange = (value: string, index: number) => {
    // Only allow digits
    const digit = value.replace(/[^0-9]/g, "");
    if (digit.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-focus to next field if digit is entered
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  // Handle backspace
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
  };

  // Handle verify
  const handleVerify = () => {
    const code = otp.join("");
    if (code.length === 6) {
      // Navigate to profile setup after verification
      router.replace("/profile-setup");
    }
  };

  // Handle resend
  const handleResend = () => {
    if (canResend) {
      setTimer(30);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      setFocusedIndex(0);
    }
  };

  // Check if all OTP fields are filled
  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <Container
      isDark={isDark}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Content>
        {/* Header */}
        <Header paddingTop={insets.top + Spacing.sm}>
          <BackButton
            isDark={isDark}
            onPress={() => router.back()}
            android_ripple={{
              color: isDark
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.05)",
            }}
          >
            <MaterialIcons
              name="arrow-back-ios-new"
              size={24}
              color={isDark ? Colors.dark.text : Colors.light.text}
            />
          </BackButton>
        </Header>

        {/* Main Content */}
        <MainContent>
          <TitleSection>
            <Title isDark={isDark}>Verification Code</Title>
            <Description isDark={isDark}>
              We've sent a 6-digit code to your phone number{" "}
              <PhoneNumber isDark={isDark}>{phoneNumber}</PhoneNumber>.
            </Description>
          </TitleSection>

          {/* OTP Input Fields */}
          <OTPContainer>
            <OTPInputsRow>
              {otp.map((digit, index) => (
                <OTPInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  isFocused={focusedIndex === index}
                  isDark={isDark}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onFocus={() => setFocusedIndex(index)}
                />
              ))}
            </OTPInputsRow>
          </OTPContainer>

          {/* Resend Code Section */}
          <ResendSection>
            {timer > 0 ? (
              <>
                <ResendText isDark={isDark}>
                  Resend code in{" "}
                  <TimerText isDark={isDark}>{formatTimer(timer)}</TimerText>
                </ResendText>
                <ResendIndicator isDark={isDark} />
              </>
            ) : (
              <Pressable onPress={handleResend}>
                <ResendLink>Resend code</ResendLink>
              </Pressable>
            )}
          </ResendSection>

          {/* Verify Button */}
          <ButtonContainer>
            <PrimaryButton
              isDark={isDark}
              disabled={!isOtpComplete}
              onPress={handleVerify}
              android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
            >
              <PrimaryButtonText>Verify & Proceed</PrimaryButtonText>
              <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
            </PrimaryButton>
          </ButtonContainer>
        </MainContent>
      </Content>
    </Container>
  );
}
