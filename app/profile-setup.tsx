import type { SalonLocation } from "@/components/LocationSelector";
import { LocationSelector } from "@/components/LocationSelector";
import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeights,
  PRIMARY_COLOR,
  Spacing,
} from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  useCompleteSalonOnboardingMutation,
  useMySalonQuery,
} from "@/types/gqlReactTypings.generated";
import { formatGqlError } from "@/utils";
import { showToast } from "@/utils/toast";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Keyboard } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

// Styled Components
const Container = styled.View<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundSecondary};
`;

const ScrollContent = styled.ScrollView<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundSecondary};
`;

const Header = styled.View<{ paddingTop: number; isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${Spacing.md}px ${Spacing.md}px;
  padding-top: ${(props) => props.paddingTop}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundSecondary};
`;

const BackButton = styled.Pressable<{ isDark: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.lg}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  flex: 1;
  text-align: center;
`;

const HeaderSpacer = styled.View`
  width: 40px;
`;

const Content = styled.View`
  padding: ${Spacing.lg}px ${Spacing.md}px;
  gap: ${Spacing["2xl"]}px;
`;

const ProfileSection = styled.View`
  align-items: center;
  gap: ${Spacing.lg}px;
`;

const AvatarContainer = styled.View`
  position: relative;
  margin-bottom: ${Spacing.lg}px;
`;

const Avatar = styled(Image)`
  width: 128px;
  height: 128px;
  border-radius: 64px;
`;

const AvatarPlaceholder = styled.View<{ isDark: boolean }>`
  width: 128px;
  height: 128px;
  border-radius: 64px;
  background-color: ${(props) =>
    props.isDark
      ? Colors.dark.backgroundTertiary
      : Colors.light.backgroundTertiary};
  align-items: center;
  justify-content: center;
`;

const CameraButton = styled.Pressable`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${PRIMARY_COLOR};
  align-items: center;
  justify-content: center;
  shadow-color: ${PRIMARY_COLOR};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.4;
  shadow-radius: 8px;
  elevation: 4;
`;

const ProfileTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes["2xl"]}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  text-align: center;
`;

const ProfileSubtitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.normal};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
  text-align: center;
`;

const FormSection = styled.View`
  gap: ${Spacing["2xl"]}px;
`;

const InputGroup = styled.View`
  gap: ${Spacing.sm}px;
`;

const Label = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.semibold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  margin-left: ${Spacing.xs}px;
`;

const InputContainer = styled.View<{ isFocused: boolean; isDark: boolean }>`
  position: relative;
  flex-direction: row;
  align-items: center;
  height: 56px;
  border-radius: ${BorderRadius.xl}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  border-width: 1px;
  border-color: ${(props) =>
    props.isFocused
      ? PRIMARY_COLOR
      : props.isDark
      ? Colors.dark.borderInput
      : Colors.light.borderInput};
`;

const StyledTextInput = styled.TextInput<{
  isDark: boolean;
  hasRightIcon: boolean;
}>`
  flex: 1;
  height: 56px;
  padding-left: ${Spacing.md}px;
  padding-right: ${(props) =>
    props.hasRightIcon ? "48px" : Spacing.md + "px"};
  font-size: ${FontSizes.base}px;
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const InputIcon = styled.View`
  position: absolute;
  right: ${Spacing.md}px;
  top: 50%;
  transform: translateY(-12px);
`;

const Footer = styled.View<{ paddingBottom: number; isDark: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${Spacing.md}px;
  padding-bottom: ${(props) => props.paddingBottom}px;
  background-color: ${(props) =>
    props.isDark
      ? Colors.dark.backgroundTertiary + "CC"
      : Colors.light.background + "CC"};
  border-top-width: 1px;
  border-top-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
`;

const SaveButton = styled.Pressable<{ isDark: boolean; disabled?: boolean }>`
  width: 100%;
  height: 56px;
  background-color: ${PRIMARY_COLOR};
  border-radius: ${BorderRadius.xl}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.sm}px;
  shadow-color: ${PRIMARY_COLOR};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 12px;
  elevation: 6;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

const SaveButtonText = styled.Text`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: #ffffff;
`;

export default function ProfileSetupScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";

  const { data: mySalonData } = useMySalonQuery();
  const mySalon = mySalonData?.mySalon;
  const hasInitializedFromMySalon = useRef(false);
  const locationSheetRef = useRef<BottomSheetModal>(null);

  const [completeSalonOnboardingMutation, { loading }] =
    useCompleteSalonOnboardingMutation({
      onCompleted: (data) => {
        console.log("data", data);
        showToast({ type: "success", text: "Profile saved successfully." });
        router.replace("/availability-toggle");
      },
      onError: (error) => {
        showToast({
          type: "error",
          text: formatGqlError(error) ?? "Something went wrong",
        });
      },
    });

  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [locationLatitude, setLocationLatitude] = useState<number | null>(null);
  const [locationLongitude, setLocationLongitude] = useState<number | null>(
    null
  );

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [localPickedImageUri, setLocalPickedImageUri] = useState<string | null>(
    null
  );

  const [businessNameFocused, setBusinessNameFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);

  useEffect(() => {
    if (mySalon && !hasInitializedFromMySalon.current) {
      hasInitializedFromMySalon.current = true;
      setBusinessName(mySalon.name ?? "");
      setLocation(mySalon.address ?? "");
      setLocationLatitude(mySalon.latitude ?? null);
      setLocationLongitude(mySalon.longitude ?? null);
      if (mySalon.imageUrl) {
        setProfileImage(mySalon.imageUrl);
      }
      setLocalPickedImageUri(null);
    }
  }, [mySalon]);

  const handleBack = () => {
    router.back();
  };

  const handleCameraPress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      showToast({
        type: "error",
        text: "Permission to access photos is required to change your profile image.",
      });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      setLocalPickedImageUri(uri);
    }
  };

  const handleSaveProfile = async () => {
    const trimmedName = businessName.trim();
    const trimmedLocation = location.trim();
    if (!trimmedName) {
      showToast({ type: "error", text: "Please enter your business name." });
      return;
    }
    if (!trimmedLocation) {
      showToast({ type: "error", text: "Please enter your location." });
      return;
    }
    const latitude = locationLatitude ?? mySalon?.latitude ?? 0;
    const longitude = locationLongitude ?? mySalon?.longitude ?? 0;
    const displayImageUri = localPickedImageUri ?? profileImage;
    const input = {
      businessName: trimmedName,
      location: {
        address: trimmedLocation,
        latitude,
        longitude,
      },
      ...(displayImageUri &&
      (displayImageUri.startsWith("http") ||
        displayImageUri.startsWith("https"))
        ? { profileImageUrl: displayImageUri }
        : {}),
    };

    await completeSalonOnboardingMutation({ variables: { input } });
  };

  const displayImageUri = localPickedImageUri ?? profileImage;

  return (
    <Container isDark={isDark}>
      <ScrollContent
        isDark={isDark}
        contentContainerStyle={{
          paddingBottom: 100, // Space for sticky footer
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <Header paddingTop={insets.top + Spacing.sm} isDark={isDark}>
          <BackButton
            isDark={isDark}
            onPress={handleBack}
            android_ripple={{
              color: isDark
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.05)",
            }}
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={isDark ? Colors.dark.text : Colors.light.text}
            />
          </BackButton>
          <HeaderTitle isDark={isDark}>Setup Profile</HeaderTitle>
          <HeaderSpacer />
        </Header>

        {/* Content */}
        <Content>
          {/* Profile Picture Section */}
          <ProfileSection>
            <AvatarContainer>
              {displayImageUri ? (
                <Avatar
                  key={displayImageUri ?? "avatar-placeholder"}
                  source={{ uri: displayImageUri }}
                />
              ) : (
                <AvatarPlaceholder isDark={isDark}>
                  <MaterialIcons
                    name="person"
                    size={64}
                    color={
                      isDark
                        ? Colors.dark.textSecondary
                        : Colors.light.textSecondary
                    }
                  />
                </AvatarPlaceholder>
              )}
              <CameraButton
                onPress={handleCameraPress}
                android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
              >
                <MaterialIcons name="photo-camera" size={20} color="#ffffff" />
              </CameraButton>
            </AvatarContainer>
            <ProfileTitle isDark={isDark}>Let's set up your salon</ProfileTitle>
            <ProfileSubtitle isDark={isDark}>
              Tell clients about your business identity.
            </ProfileSubtitle>
          </ProfileSection>

          {/* Form Section */}
          <FormSection>
            {/* Business Name */}
            <InputGroup>
              <Label isDark={isDark}>Business Name</Label>
              <InputContainer isFocused={businessNameFocused} isDark={isDark}>
                <StyledTextInput
                  isDark={isDark}
                  hasRightIcon={false}
                  placeholder="e.g., Grace's Braid Shop"
                  placeholderTextColor={
                    isDark
                      ? Colors.dark.textTertiary
                      : Colors.light.textTertiary
                  }
                  value={businessName}
                  onChangeText={setBusinessName}
                  onFocus={() => setBusinessNameFocused(true)}
                  onBlur={() => setBusinessNameFocused(false)}
                  autoCapitalize="words"
                />
              </InputContainer>
            </InputGroup>

            {/* Location */}
            <InputGroup>
              <Label isDark={isDark}>Location</Label>
              <InputContainer isFocused={locationFocused} isDark={isDark}>
                <StyledTextInput
                  isDark={isDark}
                  hasRightIcon={true}
                  placeholder="Lagos, Nigeria"
                  placeholderTextColor={
                    isDark
                      ? Colors.dark.textTertiary
                      : Colors.light.textTertiary
                  }
                  value={location}
                  onChangeText={setLocation}
                  onFocus={() => {
                    setLocationFocused(true);
                    Keyboard.dismiss();
                    locationSheetRef.current?.present();
                  }}
                  onBlur={() => setLocationFocused(false)}
                  autoCapitalize="words"
                />
                <InputIcon>
                  <MaterialIcons
                    name="map"
                    size={20}
                    color={
                      locationFocused
                        ? PRIMARY_COLOR
                        : isDark
                        ? Colors.dark.textSecondary
                        : Colors.light.textSecondary
                    }
                  />
                </InputIcon>
              </InputContainer>
            </InputGroup>
          </FormSection>
        </Content>
      </ScrollContent>

      {/* Sticky Footer */}
      <Footer paddingBottom={insets.bottom + Spacing.md} isDark={isDark}>
        <SaveButton
          isDark={isDark}
          disabled={loading}
          onPress={handleSaveProfile}
          android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <>
              <SaveButtonText>Save Profile</SaveButtonText>
              <MaterialIcons name="check" size={20} color="#ffffff" />
            </>
          )}
        </SaveButton>
      </Footer>

      <LocationSelector
        ref={locationSheetRef}
        onClose={() => setLocationFocused(false)}
        onSelect={(loc: SalonLocation) => {
          setLocation(loc.address);
          setLocationLatitude(loc.latitude);
          setLocationLongitude(loc.longitude);
        }}
        selectedAddress={location}
      />
    </Container>
  );
}
