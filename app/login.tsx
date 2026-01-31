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
import useGoogleSignInHook from "@/hooks/useGoogleSignInHook";
import {
  getLocalItem,
  saveLocalUserData,
  setAccessToken,
  setLocalItem,
} from "@/storage";
import { useAuthStore } from "@/store";
import {
  AuthProvider,
  useLoginWithEmailMutation,
  useLoginWithOAuthMutation,
  UserRole,
} from "@/types/gqlReactTypings.generated";
import { formatGqlError } from "@/utils";
import { showToast } from "@/utils/toast";
import { MaterialIcons } from "@expo/vector-icons";
import * as AppleAuthentication from "expo-apple-authentication";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components/native";

// Styled Components
const Container = styled.ScrollView<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.background};
`;

const Content = styled.View`
  flex: 1;
  padding: 0 ${Spacing["2xl"]}px;
  max-width: 480px;
  width: 100%;
  align-self: center;
`;

const HeaderSection = styled.View`
  align-items: center;
  padding-top: ${Spacing["5xl"]}px;
  padding-bottom: ${Spacing["3xl"]}px;
`;

const IconContainer = styled.View<{ isDark: boolean }>`
  width: ${Spacing["5xl"]}px;
  height: ${Spacing["5xl"]}px;
  border-radius: ${Spacing["3xl"]}px;
  background-color: ${Colors.primaryLight};
  align-items: center;
  justify-content: center;
  margin-bottom: ${Spacing["2xl"]}px;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes["4xl"]}px;
  font-weight: ${FontWeights.extrabold};
  line-height: ${FontSizes["4xl"] * LineHeights.tight}px;
  text-align: center;
  letter-spacing: -0.5px;
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  margin-bottom: ${Spacing.sm}px;
`;

const Subtitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.medium};
  line-height: ${FontSizes.base * LineHeights.normal}px;
  text-align: center;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
  max-width: 320px;
  padding-top: ${Spacing.sm}px;
`;

const FormSection = styled.View`
  flex: 1;
  padding-top: ${Spacing.lg}px;
`;

const InputGroup = styled.View`
  margin-bottom: ${Spacing.xl}px;
`;

const Label = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.semibold};
  line-height: ${FontSizes.base * LineHeights.normal}px;
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  margin-bottom: ${Spacing.sm}px;
`;

const InputContainer = styled.View<{ isFocused: boolean; isDark: boolean }>`
  position: relative;
  flex-direction: row;
  align-items: center;
`;

const StyledTextInput = styled.TextInput<{ isDark: boolean; hasIcon: boolean }>`
  width: 100%;
  height: 56px;
  border-radius: 12px;
  background-color: ${(props) => (props.isDark ? "#1E293B" : "#F1F5F9")};
  padding-left: 16px;
  padding-right: ${(props) => (props.hasIcon ? "48px" : "16px")};
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.isDark ? "#ffffff" : "#0F172A")};
`;

const InputIcon = styled.View<{ isFocused: boolean }>`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-12px);
`;

const PasswordToggle = styled.Pressable<{ isFocused: boolean }>`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-12px);
`;

const ForgotPasswordLink = styled.View`
  align-items: flex-end;
  margin-bottom: 32px;
`;

const LinkText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #308ce8;
`;

const ActionsContainer = styled.View`
  margin-top: auto;
  margin-bottom: ${Spacing["3xl"]}px;
  gap: ${Spacing.lg}px;
`;

const PrimaryButton = styled.TouchableOpacity<{ isDark: boolean }>`
  width: 100%;
  height: 56px;
  background-color: ${PRIMARY_COLOR};
  border-radius: ${BorderRadius.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.sm}px;
  shadow-color: ${PRIMARY_COLOR};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 12px;
  elevation: 6;
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
    props.isDark ? Colors.dark.border : Colors.light.border};
`;

const DividerText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
  margin: 0 ${Spacing.lg}px;
`;

const SocialButtonsContainer = styled.View`
  flex-direction: row;
  gap: ${Spacing.lg}px;
`;

const SocialButton = styled.Pressable<{ isDark: boolean }>`
  flex: 1;
  height: 56px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundInput : Colors.light.background};
  border: 1px solid
    ${(props) => (props.isDark ? Colors.dark.border : Colors.light.border)};
  border-radius: ${BorderRadius.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.sm}px;
`;

const SocialButtonText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const CreateAccountContainer = styled.View`
  align-items: center;
  margin-top: ${Spacing.lg}px;
  padding-bottom: ${Spacing.sm}px;
`;

const CreateAccountText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
  text-align: center;
`;

const CreateAccountLink = styled.Text`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  color: ${PRIMARY_COLOR};
  position: relative;
  top: 5px;
`;

// SVG Components for Social Logos
const GoogleLogo = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
      fill="#4285F4"
    />
    <Path
      d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z"
      fill="#34A853"
    />
    <Path
      d="M5.50253 14.3003C5.00236 12.8099 5.00236 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z"
      fill="#FBBC05"
    />
    <Path
      d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.0344664 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z"
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
    <Path d="M17.4876 16.5919C16.6349 17.8189 15.7011 19.5516 14.288 19.5786C12.9234 19.6053 12.4934 18.7719 10.9082 18.7719C9.32207 18.7719 8.8402 19.5516 7.53127 19.6053C6.16834 19.6603 4.96574 17.9792 4.10327 16.7328C2.3396 14.1843 1.01046 9.49753 2.79373 6.40263C3.67733 4.86873 5.25307 3.89966 6.96913 3.87273C8.28313 3.8458 9.24293 4.76106 10.0521 4.76106C10.8351 4.76106 12.0118 3.65753 13.5937 3.8188C14.1681 3.84473 15.7766 4.05386 16.8927 5.68886C16.8083 5.74273 14.9351 6.83366 14.9611 9.01246C14.9891 11.6231 17.2917 12.6732 17.3827 12.7163C17.3168 12.8723 16.9407 14.0759 16.5298 14.6732L17.4876 16.5919ZM11.6445 2.52933C12.3533 1.67086 12.8091 0.490865 12.6779 -0.666664C11.5204 -0.619131 10.1221 0.106668 9.29687 1.06913C8.55833 1.91613 8.01667 3.12513 8.16933 4.2558C9.44527 4.35446 10.7963 3.5514 11.6445 2.52933Z" />
  </Svg>
);

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const { setIsLoggedIn, setToken } = useAuthStore();

  const [loginWithOAuth] = useLoginWithOAuthMutation();
  const [loginWithEmail] = useLoginWithEmailMutation();
  const { googlePromptAsync, user, googleSignInToken } = useGoogleSignInHook();

  const handleLogin = () => {
    if (!email || !password) {
      showToast({
        title: "Please fill in all fields",
        type: "error",
      });
      return;
    }

    loginWithEmail({
      variables: {
        input: {
          email: email,
          password: password,
        },
      },
      onCompleted: (data) => {
        if (data.loginWithEmail.user) {
          router.replace("/(tabs)");
          setAccessToken(data.loginWithEmail.token);
          saveLocalUserData({
            ...data.loginWithEmail.user,
            notificationsEnabled: true,
          });
          setIsLoggedIn(true);
          setToken(data.loginWithEmail.token);
        }
      },
      onError: (error) => {
        console.error("Login with email error", error);
        showToast({
          title: "Unable to login",
          text: formatGqlError(error) ?? "Something went wrong",
          type: "error",
        });
      },
    });
  };

  const handleForgotPassword = () => {
    // Placeholder for forgot password
    console.log("Forgot password");
  };

  const handleGoogleLogin = () => {
    googlePromptAsync();
  };

  const handleAppleLogin = async () => {
    // Apple authentication is only available on iOS
    if (Platform.OS !== "ios") {
      console.log("Apple Sign-In is only available on iOS devices");
      return;
    }

    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const storageKey = `apple_credential_${credential.user}`;

      let storedEmail: string | null = null;
      let storedFullName: string | null = null;
      const storedData = await getLocalItem(storageKey);
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          storedEmail = parsed.email || null;
          storedFullName = parsed.fullName || null;
        } catch (e) {
          console.error("Failed to parse stored Apple credential:", e);
        }
      }

      // Use credential values if available, otherwise fall back to stored values
      const email = credential.email || storedEmail || "";
      const fullName = credential.fullName
        ? `${credential.fullName.givenName || ""} ${
            credential.fullName.familyName || ""
          }`.trim()
        : storedFullName || "";

      // Store the values if we got NEW data from this sign-in
      if (credential.email || credential.fullName) {
        await setLocalItem(
          storageKey,
          JSON.stringify({
            email: credential.email || storedEmail || "",
            fullName: credential.fullName
              ? `${credential.fullName.givenName || ""} ${
                  credential.fullName.familyName || ""
                }`.trim()
              : storedFullName || "",
          })
        );
      }

      loginWithOAuth({
        variables: {
          input: {
            provider: AuthProvider.Apple,
            providerId: credential.user,
            email: email || undefined,
            fullName: fullName || "Apple User",
            role: UserRole.Salon,
          },
        },
      });
    } catch (e: any) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        // User canceled the sign-in flow
        console.log("Apple Sign-In was canceled by the user");
      } else {
        // Handle other errors
        console.error("Apple Sign-In error:", e);
      }
    }
  };

  const handleCreateAccount = () => {
    router.push("/create-account");
  };

  useEffect(() => {
    if (user && googleSignInToken) {
      loginWithOAuth({
        variables: {
          input: {
            provider: AuthProvider.Google,
            providerId: user.id ?? "",
            email: user.email ?? "",
            fullName: user.name ?? "Google User",
            profileImage: user.photo ?? "",
            role: UserRole.Salon,
          },
        },
      });
    }
  }, [user, googleSignInToken]);

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
          <IconContainer isDark={isDark}>
            <MaterialIcons name="content-cut" size={32} color={PRIMARY_COLOR} />
          </IconContainer>
          <Title isDark={isDark}>Welcome back</Title>
          <Subtitle isDark={isDark}>
            Login to manage your bookings and orders
          </Subtitle>
        </HeaderSection>

        {/* Form Section */}
        <FormSection>
          {/* Email/Phone Input */}
          <InputGroup>
            <Label isDark={isDark}>Email or Phone Number</Label>
            <InputContainer isFocused={emailFocused} isDark={isDark}>
              <StyledTextInput
                isDark={isDark}
                hasIcon={true}
                placeholder="e.g. 0801 234 5678"
                placeholderTextColor={
                  isDark
                    ? Colors.dark.textSecondary
                    : Colors.light.textSecondary
                }
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <InputIcon isFocused={emailFocused}>
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
              </InputIcon>
            </InputContainer>
          </InputGroup>

          {/* Password Input */}
          <InputGroup>
            <Label isDark={isDark}>Password</Label>
            <InputContainer isFocused={passwordFocused} isDark={isDark}>
              <StyledTextInput
                isDark={isDark}
                hasIcon={true}
                placeholder="Enter your password"
                placeholderTextColor={
                  isDark
                    ? Colors.dark.textSecondary
                    : Colors.light.textSecondary
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
                isFocused={passwordFocused}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <MaterialIcons
                  name={isPasswordVisible ? "visibility" : "visibility-off"}
                  size={20}
                  color={
                    passwordFocused
                      ? PRIMARY_COLOR
                      : isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
              </PasswordToggle>
            </InputContainer>
          </InputGroup>

          {/* Forgot Password Link */}
          <ForgotPasswordLink>
            <Pressable onPress={handleForgotPassword}>
              <LinkText>Forgot Password?</LinkText>
            </Pressable>
          </ForgotPasswordLink>

          {/* Actions Container */}
          <ActionsContainer>
            {/* Log In Button */}
            <PrimaryButton isDark={isDark} onPress={handleLogin}>
              <PrimaryButtonText>Log In</PrimaryButtonText>
              <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
            </PrimaryButton>

            {/* Divider */}
            <DividerContainer>
              <DividerLine isDark={isDark} />
              <DividerText isDark={isDark}>Or continue with</DividerText>
              <DividerLine isDark={isDark} />
            </DividerContainer>

            {/* Social Login Buttons */}
            <SocialButtonsContainer>
              <SocialButton
                isDark={isDark}
                onPress={handleGoogleLogin}
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
                onPress={handleAppleLogin}
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

            {/* Create Account Link */}
            <CreateAccountContainer>
              <CreateAccountText isDark={isDark}>
                New here?{" "}
                <Pressable onPress={handleCreateAccount}>
                  <CreateAccountLink>Create an Account</CreateAccountLink>
                </Pressable>
              </CreateAccountText>
            </CreateAccountContainer>
          </ActionsContainer>
        </FormSection>
      </Content>
    </Container>
  );
}
