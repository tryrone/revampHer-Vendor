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
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components/native";

// Styled Components
const Container = styled.ScrollView<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundSecondary};
`;

const Content = styled.View`
  flex: 1;
  padding: 0 ${Spacing.xl}px;
  max-width: 480px;
  width: 100%;
  align-self: center;
  padding-top: ${Spacing["6xl"]}px;
  padding-bottom: ${Spacing["2xl"]}px;
`;

const HeaderSection = styled.View`
  margin-bottom: ${Spacing["3xl"]}px;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes["3xl"]}px;
  font-weight: ${FontWeights.bold};
  line-height: ${FontSizes["3xl"] * LineHeights.tight}px;
  letter-spacing: -0.5px;
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  margin-bottom: ${Spacing.sm}px;
`;

const Subtitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.normal};
  line-height: ${FontSizes.base * LineHeights.normal}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textTertiary : Colors.light.textSecondary};
`;

const FormSection = styled.View`
  flex: 1;
  gap: ${Spacing.xl}px;
`;

const InputGroup = styled.View`
  gap: 6px;
`;

const Label = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const InputContainer = styled.View<{ isFocused: boolean; isDark: boolean }>`
  position: relative;
  flex-direction: row;
  align-items: center;
  height: 56px;
  border-radius: ${BorderRadius.md}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  border: 1px solid
    ${(props) =>
      props.isFocused
        ? PRIMARY_COLOR
        : props.isDark
        ? Colors.dark.borderInput
        : Colors.light.borderInput};
`;

const StyledTextInput = styled.TextInput<{
  isDark: boolean;
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
}>`
  flex: 1;
  height: 56px;
  padding-left: ${(props) => (props.hasLeftIcon ? "48px" : Spacing.lg + "px")};
  padding-right: ${(props) =>
    props.hasRightIcon ? "48px" : Spacing.lg + "px"};
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const LeftIcon = styled.View<{ isFocused: boolean }>`
  position: absolute;
  left: ${Spacing.lg}px;
  top: 50%;
  transform: translateY(-12px);
`;

const RightIcon = styled.View`
  position: absolute;
  right: ${Spacing.lg}px;
  top: 50%;
  transform: translateY(-12px);
`;

const PasswordToggle = styled.Pressable`
  position: absolute;
  right: ${Spacing.lg}px;
  top: 50%;
  transform: translateY(-12px);
`;

const PhoneInputContainer = styled.View<{
  isFocused: boolean;
  isDark: boolean;
}>`
  flex-direction: row;
  height: 56px;
  border-radius: ${BorderRadius.md}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  border: 1px solid
    ${(props) =>
      props.isFocused
        ? PRIMARY_COLOR
        : props.isDark
        ? Colors.dark.borderInput
        : Colors.light.borderInput};
  overflow: hidden;
`;

const CountryCodeContainer = styled.View<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: ${Spacing.lg}px;
  padding-right: ${Spacing.md}px;
  border-right-width: 1px;
  border-right-color: ${(props) =>
    props.isDark ? Colors.dark.borderInput : Colors.light.borderInput};
  background-color: ${(props) => (props.isDark ? "#23303e" : "#F9FAFB")};
`;

const CountryCodeText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  margin-left: ${Spacing.xs}px;
`;

const PhoneInput = styled.TextInput<{ isDark: boolean }>`
  flex: 1;
  height: 56px;
  padding-left: ${Spacing.md}px;
  padding-right: 48px;
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const PhoneIcon = styled.View`
  position: absolute;
  right: ${Spacing.lg}px;
  top: 50%;
  transform: translateY(-12px);
`;

const ActionsContainer = styled.View`
  margin-top: ${Spacing.lg}px;
  gap: ${Spacing.lg}px;
`;

const PrimaryButton = styled.Pressable<{ isDark: boolean }>`
  width: 100%;
  height: 56px;
  background-color: ${PRIMARY_COLOR};
  border-radius: ${BorderRadius.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  shadow-color: ${PRIMARY_COLOR};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const PrimaryButtonText = styled.Text`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: #ffffff;
`;

const DividerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${Spacing.sm}px 0;
`;

const DividerLine = styled.View<{ isDark: boolean }>`
  flex: 1;
  height: 1px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.borderInput : Colors.light.borderInput};
`;

const DividerText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textTertiary : Colors.light.textSecondary};
  margin: 0 ${Spacing.lg}px;
`;

const SocialButtonsContainer = styled.View`
  flex-direction: row;
  gap: ${Spacing.lg}px;
`;

const SocialButton = styled.Pressable<{ isDark: boolean }>`
  flex: 1;
  height: 48px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  border: 1px solid
    ${(props) =>
      props.isDark ? Colors.dark.borderInput : Colors.light.borderInput};
  border-radius: ${BorderRadius.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.sm}px;
`;

const SocialButtonText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const BottomLinkContainer = styled.View<{ isDark: boolean }>`
  width: 100%;
  padding: ${Spacing["2xl"]}px 0;
  align-items: center;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundSecondary};
  border-top-width: 1px;
  border-top-color: ${(props) =>
    props.isDark ? "rgba(42, 59, 77, 0.3)" : "transparent"};
`;

const BottomLinkText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textTertiary : Colors.light.textSecondary};
  text-align: center;
`;

const BottomLink = styled.Text`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  color: ${PRIMARY_COLOR};
`;

// SVG Components for Social Logos (reused from login)
const GoogleLogo = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <Path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <Path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </Svg>
);

const AppleLogo = ({ isDark }: { isDark: boolean }) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill={isDark ? "#ffffff" : "#000000"}
  >
    <Path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.06 2.77.63 3.54 1.76-3.35 1.75-2.67 6.47.53 7.82-.41 1.25-1.29 2.76-2.66 3.45zM12.03 5.39c-.05-2.05 1.67-3.79 3.46-3.89.28 2.21-1.92 4.07-3.46 3.89z" />
  </Svg>
);

export default function CreateAccountScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const handleCreateAccount = () => {
    // Navigate to OTP verification with phone number
    router.push({
      pathname: "/otp-verification",
      params: { phone: phone || "+234 812 345 6789" },
    });
  };

  const handleGoogleSignUp = () => {
    // Placeholder for Google sign up
    console.log("Google sign up");
  };

  const handleAppleSignUp = () => {
    // Placeholder for Apple sign up
    console.log("Apple sign up");
  };

  const handleLogin = () => {
    router.push("/login");
  };

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
        {/* Header Section */}
        <HeaderSection>
          <Title isDark={isDark}>Let's grow your{"\n"}salon business.</Title>
          <Subtitle isDark={isDark}>
            Create an account to manage bookings and orders.
          </Subtitle>
        </HeaderSection>

        {/* Form Section */}
        <FormSection>
          {/* Full Name Input */}
          <InputGroup>
            <Label isDark={isDark}>Full Name</Label>
            <InputContainer isFocused={fullNameFocused} isDark={isDark}>
              <LeftIcon isFocused={fullNameFocused}>
                <MaterialIcons
                  name="person"
                  size={20}
                  color={
                    fullNameFocused
                      ? PRIMARY_COLOR
                      : isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
              </LeftIcon>
              <StyledTextInput
                isDark={isDark}
                hasLeftIcon={true}
                hasRightIcon={false}
                placeholder="Enter your full name"
                placeholderTextColor={
                  isDark ? Colors.dark.textTertiary : Colors.light.textTertiary
                }
                value={fullName}
                onChangeText={setFullName}
                onFocus={() => setFullNameFocused(true)}
                onBlur={() => setFullNameFocused(false)}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </InputContainer>
          </InputGroup>

          {/* Email Input */}
          <InputGroup>
            <Label isDark={isDark}>Email Address</Label>
            <InputContainer isFocused={emailFocused} isDark={isDark}>
              <LeftIcon isFocused={emailFocused}>
                <MaterialIcons
                  name="mail"
                  size={20}
                  color={
                    emailFocused
                      ? PRIMARY_COLOR
                      : isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
              </LeftIcon>
              <StyledTextInput
                isDark={isDark}
                hasLeftIcon={true}
                hasRightIcon={false}
                placeholder="name@example.com"
                placeholderTextColor={
                  isDark ? Colors.dark.textTertiary : Colors.light.textTertiary
                }
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </InputContainer>
          </InputGroup>

          {/* Phone Number Input */}
          <InputGroup>
            <Label isDark={isDark}>Phone Number</Label>
            <PhoneInputContainer isFocused={phoneFocused} isDark={isDark}>
              <CountryCodeContainer isDark={isDark}>
                <Text style={{ fontSize: 18 }}>🇳🇬</Text>
                <CountryCodeText isDark={isDark}>+234</CountryCodeText>
              </CountryCodeContainer>
              <PhoneInput
                isDark={isDark}
                placeholder="800 000 0000"
                placeholderTextColor={
                  isDark ? Colors.dark.textTertiary : Colors.light.textTertiary
                }
                value={phone}
                onChangeText={setPhone}
                onFocus={() => setPhoneFocused(true)}
                onBlur={() => setPhoneFocused(false)}
                keyboardType="phone-pad"
              />
              <PhoneIcon>
                <MaterialIcons
                  name="phone-iphone"
                  size={20}
                  color={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
              </PhoneIcon>
            </PhoneInputContainer>
          </InputGroup>

          {/* Password Input */}
          <InputGroup>
            <Label isDark={isDark}>Password</Label>
            <InputContainer isFocused={passwordFocused} isDark={isDark}>
              <LeftIcon isFocused={passwordFocused}>
                <MaterialIcons
                  name="lock"
                  size={20}
                  color={
                    passwordFocused
                      ? PRIMARY_COLOR
                      : isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
              </LeftIcon>
              <StyledTextInput
                isDark={isDark}
                hasLeftIcon={true}
                hasRightIcon={true}
                placeholder="Create a password"
                placeholderTextColor={
                  isDark ? Colors.dark.textTertiary : Colors.light.textTertiary
                }
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <PasswordToggle
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <MaterialIcons
                  name={isPasswordVisible ? "visibility" : "visibility-off"}
                  size={20}
                  color={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
              </PasswordToggle>
            </InputContainer>
          </InputGroup>

          {/* Confirm Password Input */}
          <InputGroup>
            <Label isDark={isDark}>Confirm Password</Label>
            <InputContainer isFocused={confirmPasswordFocused} isDark={isDark}>
              <LeftIcon isFocused={confirmPasswordFocused}>
                <MaterialIcons
                  name="lock-reset"
                  size={20}
                  color={
                    confirmPasswordFocused
                      ? PRIMARY_COLOR
                      : isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
              </LeftIcon>
              <StyledTextInput
                isDark={isDark}
                hasLeftIcon={true}
                hasRightIcon={true}
                placeholder="Re-enter password"
                placeholderTextColor={
                  isDark ? Colors.dark.textTertiary : Colors.light.textTertiary
                }
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
                secureTextEntry={!isConfirmPasswordVisible}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <PasswordToggle
                onPress={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
              >
                <MaterialIcons
                  name={
                    isConfirmPasswordVisible ? "visibility" : "visibility-off"
                  }
                  size={20}
                  color={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
              </PasswordToggle>
            </InputContainer>
          </InputGroup>

          {/* Actions Container */}
          <ActionsContainer>
            {/* Create Account Button */}
            <PrimaryButton
              isDark={isDark}
              onPress={handleCreateAccount}
              android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
            >
              <PrimaryButtonText>Create Account</PrimaryButtonText>
            </PrimaryButton>

            {/* Divider */}
            <DividerContainer>
              <DividerLine isDark={isDark} />
              <DividerText isDark={isDark}>Or sign up with</DividerText>
              <DividerLine isDark={isDark} />
            </DividerContainer>

            {/* Social Sign Up Buttons */}
            <SocialButtonsContainer>
              <SocialButton
                isDark={isDark}
                onPress={handleGoogleSignUp}
                android_ripple={{
                  color: isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                }}
              >
                <GoogleLogo />
                <SocialButtonText isDark={isDark}>Google</SocialButtonText>
              </SocialButton>

              <SocialButton
                isDark={isDark}
                onPress={handleAppleSignUp}
                android_ripple={{
                  color: isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                }}
              >
                <AppleLogo isDark={isDark} />
                <SocialButtonText isDark={isDark}>Apple</SocialButtonText>
              </SocialButton>
            </SocialButtonsContainer>
          </ActionsContainer>
        </FormSection>
      </Content>

      {/* Bottom Link */}
      <BottomLinkContainer isDark={isDark}>
        <BottomLinkText isDark={isDark}>
          Already have an account?{" "}
          <Pressable onPress={handleLogin}>
            <BottomLink>Log In</BottomLink>
          </Pressable>
        </BottomLinkText>
      </BottomLinkContainer>
    </Container>
  );
}
