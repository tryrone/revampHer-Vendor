import { ENV } from "@/constants";
import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeights,
  PRIMARY_COLOR,
  Spacing,
} from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getAccessToken } from "@/storage";
import { useAuthStore } from "@/store";
import {
  useGetMyProfileQuery,
  useSetSalonOnlineMutation,
  useUpdateSalonProfileMutation,
} from "@/types/gqlReactTypings.generated";
import { showToast } from "@/utils/toast";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
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
  position: sticky;
  top: 0;
  z-index: 50;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) =>
    props.isDark
      ? `${Colors.dark.background}CC`
      : `${Colors.light.background}CC`};
  padding: ${Spacing.md}px;
  padding-top: ${(props) => props.paddingTop + Spacing.md}px;
  padding-bottom: ${Spacing.sm}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
`;

const HeaderSpacer = styled.View`
  width: 40px;
  height: 40px;
`;

const HeaderTitle = styled.Text<{ isDark: boolean }>`
  flex: 1;
  font-size: ${FontSizes.lg}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  text-align: center;
  letter-spacing: -0.5px;
`;

const ScrollContent = styled.ScrollView<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundSecondary};
`;

const ContentWrapper = styled.View`
  padding-bottom: ${Spacing["6xl"]}px;
`;

const ProfileHeader = styled.View`
  align-items: center;
  padding: ${Spacing["2xl"]}px ${Spacing.md}px ${Spacing.sm}px;
  gap: ${Spacing.md}px;
`;

const ProfileImageContainer = styled.View<{ isDark: boolean }>`
  position: relative;
  width: 112px;
  height: 112px;
  border-radius: 56px;
  shadow-color: rgba(0, 0, 0, 0.1);
  shadow-offset: 0px 4px;
  shadow-opacity: 1;
  shadow-radius: 8px;
  elevation: 4;
`;

const ProfileImage = styled(Image)`
  width: 112px;
  height: 112px;
  border-radius: 56px;
`;

const ProfileImagePlaceholder = styled.View<{ isDark: boolean }>`
  width: 112px;
  height: 112px;
  border-radius: 56px;
  background-color: ${(props) =>
    props.isDark
      ? Colors.dark.backgroundTertiary
      : Colors.light.backgroundTertiary};
  align-items: center;
  justify-content: center;
`;

const EditButtonOverlay = styled.TouchableOpacity<{ isDark: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${PRIMARY_COLOR};
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

const ProfileInfo = styled.View`
  align-items: center;
  justify-content: center;
  gap: ${Spacing.xs}px;
`;

const BusinessNameRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.xs + 2}px;
  margin-bottom: ${Spacing.xs}px;
`;

const BusinessName = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes["2xl"]}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  letter-spacing: -0.5px;
`;

const LocationText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) => (props.isDark ? Colors.dark.textSecondary : "#4e7397")};
  margin-top: ${Spacing.xs}px;
`;

const VerifiedBadge = styled.View<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${Spacing.xs}px ${Spacing.sm + 2}px;
  border-radius: ${BorderRadius.full}px;
  background-color: ${(props) =>
    props.isDark ? "rgba(34, 197, 94, 0.3)" : "rgba(220, 252, 231, 1)"};
  margin-top: ${Spacing.sm}px;
`;

const VerifiedBadgeText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) => (props.isDark ? "#86efac" : "#166534")};
`;

const AvailabilityCard = styled.View<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${Spacing.md}px;
  padding: ${Spacing.xl}px;
  margin: ${Spacing.sm}px ${Spacing.md}px;
  border-radius: ${BorderRadius["2xl"]}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  border-width: 1px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  shadow-color: rgba(0, 0, 0, 0.05);
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 4px;
  elevation: 2;
`;

const AvailabilityLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.md}px;
  flex: 1;
`;

const AvailabilityIconContainer = styled.View<{ isDark: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isDark ? "rgba(34, 197, 94, 0.3)" : "rgba(220, 252, 231, 1)"};
  align-items: center;
  justify-content: center;
`;

const AvailabilityText = styled.View`
  flex: 1;
  gap: ${Spacing.xs}px;
`;

const AvailabilityTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const AvailabilitySubtitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.normal};
  color: ${(props) => (props.isDark ? Colors.dark.textSecondary : "#4e7397")};
`;

const Section = styled.View`
  margin-top: ${Spacing["2xl"]}px;
  padding: 0 ${Spacing.md}px;
`;

const SectionLabel = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  opacity: 0.7;
  margin-bottom: ${Spacing.md}px;
  margin-left: ${Spacing.sm}px;
`;

const SectionCard = styled.View<{ isDark: boolean }>`
  border-radius: ${BorderRadius.xl}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  border-width: 1px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  shadow-color: rgba(0, 0, 0, 0.05);
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 4px;
  elevation: 2;
  overflow: hidden;
`;

const ListItem = styled.Pressable<{ isDark: boolean; isLast?: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.md}px;
  padding: ${Spacing.md}px;
  border-bottom-width: ${(props) => (props.isLast ? 0 : 1)}px;
  border-bottom-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
`;

const ListItemIconContainer = styled.View<{ isDark: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: ${BorderRadius.lg}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundTertiary};
  align-items: center;
  justify-content: center;
  shrink: 0;
`;

const ListItemContent = styled.View`
  flex: 1;
  gap: ${Spacing.xs}px;
`;

const ListItemTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.semibold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const ListItemSubtitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  color: ${(props) => (props.isDark ? Colors.dark.textSecondary : "#4e7397")};
`;

const ListItemRight = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.sm}px;
  shrink: 0;
`;

const Badge = styled.View<{ isDark: boolean }>`
  padding: ${Spacing.xs}px ${Spacing.sm}px;
  border-radius: ${BorderRadius.md}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundTertiary};
`;

const BadgeText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const LogoutButton = styled.TouchableOpacity<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.sm}px;
  padding: ${Spacing.md}px;
  margin: ${Spacing["2xl"]}px ${Spacing.md}px;
  border-radius: ${BorderRadius.xl}px;
  border-width: 1px;
  border-color: ${(props) =>
    props.isDark ? "rgba(239, 68, 68, 0.2)" : "rgba(254, 226, 226, 1)"};
  background-color: ${(props) =>
    props.isDark ? "rgba(239, 68, 68, 0.1)" : "rgba(254, 242, 242, 1)"};
`;

const LogoutButtonText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? "#fca5a5" : "#dc2626")};
`;

// Logout modal
const LOGOUT_ICON_COLOR = "#dc2626";
const ModalOverlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: ${Spacing.xl}px;
`;
const LogoutModalBox = styled.View<{ isDark: boolean }>`
  width: 100%;
  max-width: 340px;
  border-radius: ${BorderRadius["2xl"]}px;
  padding: ${Spacing["2xl"]}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.background};
  align-items: center;
`;
const LogoutModalIconCircle = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${LOGOUT_ICON_COLOR};
  align-items: center;
  justify-content: center;
  margin-bottom: ${Spacing.lg}px;
`;
const LogoutModalTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes["2xl"]}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  margin-bottom: ${Spacing.sm}px;
`;
const LogoutModalMessage = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.normal};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
  text-align: center;
  margin-bottom: ${Spacing.xl}px;
`;
const LogoutModalButtons = styled.View`
  width: 100%;
  gap: ${Spacing.md}px;
`;
const LogoutModalConfirmButton = styled.Pressable`
  width: 100%;
  height: 48px;
  border-radius: ${BorderRadius.xl}px;
  background-color: ${LOGOUT_ICON_COLOR};
  align-items: center;
  justify-content: center;
`;
const LogoutModalConfirmButtonText = styled.Text`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: #ffffff;
`;
const LogoutModalCancelButton = styled.Pressable<{ isDark: boolean }>`
  width: 100%;
  height: 48px;
  border-radius: ${BorderRadius.xl}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  border-width: 1px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  align-items: center;
  justify-content: center;
`;
const LogoutModalCancelButtonText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.semibold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const VersionText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textTertiary : Colors.light.textTertiary};
  text-align: center;
  margin-top: ${Spacing.md}px;
`;

const EditModalInput = styled(TextInput)<{ isDark: boolean }>`
  width: 100%;
  min-height: 48px;
  border-radius: ${BorderRadius.xl}px;
  border-width: 1px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  padding: 0 ${Spacing.md}px;
  font-size: ${FontSizes.base}px;
`;

const EditModalLabel = styled.Text<{ isDark: boolean }>`
  width: 100%;
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.semibold};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
  margin-bottom: ${Spacing.xs}px;
`;

const EditModalForm = styled.View`
  width: 100%;
  gap: ${Spacing.md}px;
  margin-bottom: ${Spacing.xl}px;
`;

// Toggle Switch Components
const ToggleContainer = styled.Pressable<{
  isChecked: boolean;
  isDark: boolean;
}>`
  height: 28px;
  width: 48px;
  border-radius: 14px;
  background-color: ${(props) =>
    props.isChecked
      ? PRIMARY_COLOR
      : props.isDark
      ? Colors.dark.border
      : "#e2e8f0"};
  padding: ${Spacing.xs}px;
  justify-content: center;
`;

const ToggleThumb = styled(Animated.View)<{ isDark: boolean }>`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  background-color: ${Colors.light.background};
  shadow-color: rgba(0, 0, 0, 0.1);
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 4px;
  elevation: 2;
  align-items: center;
  justify-content: center;
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
  const translateX = useSharedValue(value ? 20 : 0);
  const opacity = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    translateX.value = withTiming(value ? 20 : 0, { duration: 300 });
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
        radius: 24,
      }}
    >
      <ToggleThumb style={thumbStyle} isDark={isDark}>
        <Animated.View style={iconStyle}>
          <MaterialIcons name="check" size={14} color={PRIMARY_COLOR} />
        </Animated.View>
      </ToggleThumb>
    </ToggleContainer>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";
  const logout = useAuthStore((s) => s.logout);
  const token = useAuthStore((s) => s.token);

  const { data: profileData, refetch: refetchProfile } = useGetMyProfileQuery({
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });
  const mySalon = profileData?.me.salonProfile;
  const [updateSalonProfile] = useUpdateSalonProfileMutation();
  const [setSalonOnline, { loading: settingSalonOnline }] =
    useSetSalonOnlineMutation();

  const [isAcceptingBookings, setIsAcceptingBookings] = useState(
    mySalon?.isOnline ?? true,
  );
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [uploadingStoreImage, setUploadingStoreImage] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [editBusinessName, setEditBusinessName] = useState("");
  const [editBusinessAddress, setEditBusinessAddress] = useState("");

  useEffect(() => {
    setIsAcceptingBookings(mySalon?.isOnline ?? true);
  }, [mySalon?.isOnline]);

  const handlePickAndUploadStoreImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      showToast({
        type: "error",
        title: "Permission required",
        text: "Permission to access your photos is required to upload a profile image.",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets?.[0]) return;

    if (!mySalon) {
      showToast({
        type: "error",
        title: "Profile required",
        text: "Load your business profile first.",
      });
      return;
    }

    setUploadingStoreImage(true);
    try {
      const asset = result.assets[0];
      const formData = new FormData();
      formData.append("image", {
        uri: asset.uri,
        name: asset.fileName || "profile.jpg",
        type: asset.mimeType || "image/jpeg",
      } as any);

      const accessToken = token ?? (await getAccessToken());
      const res = await fetch(`${ENV.API_BASE}/upload/profile-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken ?? ""}`,
        },
        body: formData,
      });

      if (!res.ok) {
        showToast({
          type: "error",
          title: "Upload failed",
          text: "Could not upload the image. Please try again.",
        });
        return;
      }

      const data = (await res.json()) as { url?: string };
      if (!data?.url) {
        showToast({
          type: "error",
          title: "Upload failed",
          text: "Invalid response from server. Please try again.",
        });
        return;
      }

      await updateSalonProfile({
        variables: {
          input: {
            profileImageUrl: data.url,
            businessName: mySalon.name,
            location: {
              address: mySalon.address,
              latitude: mySalon.latitude,
              longitude: mySalon.longitude,
            },
          },
        },
      });
      await refetchProfile();
      showToast({
        type: "success",
        text: "Profile image updated.",
      });
    } catch {
      showToast({
        type: "error",
        title: "Upload failed",
        text: "Could not update profile. Please try again.",
      });
    } finally {
      setUploadingStoreImage(false);
    }
  };

  const handleEditBusinessProfile = () => {
    setEditBusinessName(mySalon?.name ?? "");
    setEditBusinessAddress(mySalon?.address ?? "");
    setShowEditProfileModal(true);
  };

  const handleSaveBusinessProfile = async () => {
    const businessName = editBusinessName.trim();
    const address = editBusinessAddress.trim();

    if (!businessName || !address) {
      showToast({
        type: "error",
        text: "Business name and address are required.",
      });
      return;
    }

    if (!mySalon) {
      showToast({
        type: "error",
        text: "Salon profile is not available.",
      });
      return;
    }

    setSavingProfile(true);
    try {
      await updateSalonProfile({
        variables: {
          input: {
            businessName,
            location: {
              address,
              latitude: mySalon.latitude,
              longitude: mySalon.longitude,
            },
            profileImageUrl: mySalon.imageUrl,
          },
        },
      });
      await refetchProfile();
      setShowEditProfileModal(false);
      showToast({
        type: "success",
        text: "Business profile updated.",
      });
    } catch {
      showToast({
        type: "error",
        text: "Could not update profile. Please try again.",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleToggleAvailability = async (nextValue: boolean) => {
    if (settingSalonOnline) return;
    setIsAcceptingBookings(nextValue);
    try {
      await setSalonOnline({
        variables: {
          isOnline: nextValue,
        },
      });
      await refetchProfile();
      showToast({
        type: "success",
        text: nextValue
          ? "You are now accepting bookings."
          : "You are no longer accepting bookings.",
      });
    } catch {
      setIsAcceptingBookings(!nextValue);
      showToast({
        type: "error",
        text: "Could not update availability. Please try again.",
      });
    }
  };

  const handleServicesPrices = () => {
    console.log("Services & Prices");
  };

  const handleLocationSettings = () => {
    console.log("Location Settings");
  };

  const handlePayoutMethods = () => {
    console.log("Payout Methods");
  };

  const handleTransactionHistory = () => {
    router.push("/(tabs)/history");
  };

  const handleNotifications = () => {
    console.log("Notifications");
  };

  const handleHelpSupport = () => {
    console.log("Help & Support");
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = async () => {
    try {
      await logout();
      setShowLogoutModal(false);
      router.replace("/onboarding");
    } catch {
      showToast({
        type: "error",
        text: "Failed to log out. Please try again.",
      });
    }
  };

  return (
    <Container isDark={isDark}>
      {/* Header */}
      <Header paddingTop={insets.top} isDark={isDark}>
        <HeaderSpacer />
        <HeaderTitle isDark={isDark}>Profile & Settings</HeaderTitle>
        <HeaderSpacer />
      </Header>

      {/* Scrollable Content */}
      <ScrollContent
        isDark={isDark}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ContentWrapper>
          {/* Profile Header */}
          <ProfileHeader>
            <ProfileImageContainer isDark={isDark}>
              {mySalon?.imageUrl ? (
                <ProfileImage source={{ uri: mySalon.imageUrl }} />
              ) : (
                <ProfileImagePlaceholder isDark={isDark}>
                  <MaterialIcons
                    name="storefront"
                    size={48}
                    color={
                      isDark
                        ? Colors.dark.textSecondary
                        : Colors.light.textSecondary
                    }
                  />
                </ProfileImagePlaceholder>
              )}
              <EditButtonOverlay
                isDark={isDark}
                onPress={handlePickAndUploadStoreImage}
                disabled={uploadingStoreImage}
              >
                {uploadingStoreImage ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <MaterialIcons name="edit" size={16} color="#ffffff" />
                )}
              </EditButtonOverlay>
            </ProfileImageContainer>
            <ProfileInfo>
              <BusinessNameRow>
                <BusinessName isDark={isDark}>
                  {mySalon?.name || "Your Business"}
                </BusinessName>
                {mySalon?.isVerified && (
                  <MaterialIcons
                    name="verified"
                    size={20}
                    color={PRIMARY_COLOR}
                    style={
                      {
                        fontVariationSettings: "'FILL' 1",
                      } as React.ComponentProps<typeof MaterialIcons>["style"]
                    }
                  />
                )}
              </BusinessNameRow>
              <LocationText isDark={isDark}>
                {mySalon?.address || "Location not set"}
              </LocationText>
              {mySalon?.isVerified && (
                <VerifiedBadge isDark={isDark}>
                  <VerifiedBadgeText isDark={isDark}>
                    Verified Stylist
                  </VerifiedBadgeText>
                </VerifiedBadge>
              )}
            </ProfileInfo>
          </ProfileHeader>

          {/* Availability Toggle Card */}
          <AvailabilityCard isDark={isDark}>
            <AvailabilityLeft>
              <AvailabilityIconContainer isDark={isDark}>
                <MaterialIcons
                  name="event-available"
                  size={20}
                  color={isDark ? "#86efac" : "#166534"}
                />
              </AvailabilityIconContainer>
              <AvailabilityText>
                <AvailabilityTitle isDark={isDark}>
                  Accepting Bookings
                </AvailabilityTitle>
                <AvailabilitySubtitle isDark={isDark}>
                  Turn off to pause new orders.
                </AvailabilitySubtitle>
              </AvailabilityText>
            </AvailabilityLeft>
            <ToggleSwitch
              value={isAcceptingBookings}
              onValueChange={handleToggleAvailability}
              isDark={isDark}
            />
          </AvailabilityCard>

          {/* Business Management Section */}
          <Section>
            <SectionLabel isDark={isDark}>Business Management</SectionLabel>
            <SectionCard isDark={isDark}>
              <ListItem
                isDark={isDark}
                onPress={handleEditBusinessProfile}
                android_ripple={{
                  color: isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                  borderless: false,
                }}
              >
                <ListItemIconContainer isDark={isDark}>
                  <MaterialIcons
                    name="storefront"
                    size={20}
                    color={
                      isDark
                        ? Colors.dark.textSecondary
                        : Colors.light.textSecondary
                    }
                  />
                </ListItemIconContainer>
                <ListItemContent>
                  <ListItemTitle isDark={isDark}>
                    Edit Business Profile
                  </ListItemTitle>
                  <ListItemSubtitle isDark={isDark}>
                    Name, photos, description
                  </ListItemSubtitle>
                </ListItemContent>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={
                    isDark
                      ? Colors.dark.textTertiary
                      : Colors.light.textTertiary
                  }
                />
              </ListItem>
              <ListItem
                isDark={isDark}
                onPress={handleServicesPrices}
                android_ripple={{
                  color: isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                  borderless: false,
                }}
              >
                <ListItemIconContainer isDark={isDark}>
                  <MaterialIcons
                    name="content-cut"
                    size={20}
                    color={
                      isDark
                        ? Colors.dark.textSecondary
                        : Colors.light.textSecondary
                    }
                  />
                </ListItemIconContainer>
                <ListItemContent>
                  <ListItemTitle isDark={isDark}>
                    Services & Prices
                  </ListItemTitle>
                  <ListItemSubtitle isDark={isDark}>
                    Manage menu items
                  </ListItemSubtitle>
                </ListItemContent>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={
                    isDark
                      ? Colors.dark.textTertiary
                      : Colors.light.textTertiary
                  }
                />
              </ListItem>
              <ListItem
                isDark={isDark}
                isLast
                onPress={handleLocationSettings}
                android_ripple={{
                  color: isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                  borderless: false,
                }}
              >
                <ListItemIconContainer isDark={isDark}>
                  <MaterialIcons
                    name="location-on"
                    size={20}
                    color={
                      isDark
                        ? Colors.dark.textSecondary
                        : Colors.light.textSecondary
                    }
                  />
                </ListItemIconContainer>
                <ListItemContent>
                  <ListItemTitle isDark={isDark}>
                    Location Settings
                  </ListItemTitle>
                  <ListItemSubtitle isDark={isDark}>
                    {mySalon?.address || "Address not set"}
                  </ListItemSubtitle>
                </ListItemContent>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={
                    isDark
                      ? Colors.dark.textTertiary
                      : Colors.light.textTertiary
                  }
                />
              </ListItem>
            </SectionCard>
          </Section>

          {/* Finance Section */}
          <Section>
            <SectionLabel isDark={isDark}>Finance</SectionLabel>
            <SectionCard isDark={isDark}>
              <ListItem
                isDark={isDark}
                onPress={handlePayoutMethods}
                android_ripple={{
                  color: isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                  borderless: false,
                }}
              >
                <ListItemIconContainer isDark={isDark}>
                  <MaterialIcons
                    name="account-balance-wallet"
                    size={20}
                    color={
                      isDark
                        ? Colors.dark.textSecondary
                        : Colors.light.textSecondary
                    }
                  />
                </ListItemIconContainer>
                <ListItemContent>
                  <ListItemTitle isDark={isDark}>Payout Methods</ListItemTitle>
                  <ListItemSubtitle isDark={isDark}>
                    Manage bank accounts
                  </ListItemSubtitle>
                </ListItemContent>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={
                    isDark
                      ? Colors.dark.textTertiary
                      : Colors.light.textTertiary
                  }
                />
              </ListItem>
              <ListItem
                isDark={isDark}
                isLast
                onPress={handleTransactionHistory}
                android_ripple={{
                  color: isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                  borderless: false,
                }}
              >
                <ListItemIconContainer isDark={isDark}>
                  <MaterialIcons
                    name="receipt-long"
                    size={20}
                    color={
                      isDark
                        ? Colors.dark.textSecondary
                        : Colors.light.textSecondary
                    }
                  />
                </ListItemIconContainer>
                <ListItemContent>
                  <ListItemTitle isDark={isDark}>
                    Transaction History
                  </ListItemTitle>
                </ListItemContent>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={
                    isDark
                      ? Colors.dark.textTertiary
                      : Colors.light.textTertiary
                  }
                />
              </ListItem>
            </SectionCard>
          </Section>

          {/* App Settings Section */}
          <Section>
            <SectionLabel isDark={isDark}>App Settings</SectionLabel>
            <SectionCard isDark={isDark}>
              <ListItem
                isDark={isDark}
                onPress={handleNotifications}
                android_ripple={{
                  color: isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                  borderless: false,
                }}
              >
                <ListItemIconContainer isDark={isDark}>
                  <MaterialIcons
                    name="notifications"
                    size={20}
                    color={
                      isDark
                        ? Colors.dark.textSecondary
                        : Colors.light.textSecondary
                    }
                  />
                </ListItemIconContainer>
                <ListItemContent>
                  <ListItemTitle isDark={isDark}>Notifications</ListItemTitle>
                </ListItemContent>
                <ListItemRight>
                  <Badge isDark={isDark}>
                    <BadgeText isDark={isDark}>
                      {profileData?.me.notificationsEnabled ? "On" : "Off"}
                    </BadgeText>
                  </Badge>
                </ListItemRight>
              </ListItem>
              <ListItem
                isDark={isDark}
                isLast
                onPress={handleHelpSupport}
                android_ripple={{
                  color: isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                  borderless: false,
                }}
              >
                <ListItemIconContainer isDark={isDark}>
                  <MaterialIcons
                    name="help"
                    size={20}
                    color={
                      isDark
                        ? Colors.dark.textSecondary
                        : Colors.light.textSecondary
                    }
                  />
                </ListItemIconContainer>
                <ListItemContent>
                  <ListItemTitle isDark={isDark}>Help & Support</ListItemTitle>
                </ListItemContent>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={
                    isDark
                      ? Colors.dark.textTertiary
                      : Colors.light.textTertiary
                  }
                />
              </ListItem>
            </SectionCard>
          </Section>

          {/* Log Out Button */}
          <LogoutButton isDark={isDark} onPress={handleLogout}>
            <MaterialIcons
              name="logout"
              size={20}
              color={isDark ? "#fca5a5" : "#dc2626"}
            />
            <LogoutButtonText isDark={isDark}>Log Out</LogoutButtonText>
          </LogoutButton>

          {/* Version Text */}
          <VersionText isDark={isDark}>Version 2.4.0</VersionText>
        </ContentWrapper>
      </ScrollContent>

      {/* Edit business profile modal */}
      <Modal
        visible={showEditProfileModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowEditProfileModal(false)}
      >
        <ModalOverlay onPress={() => setShowEditProfileModal(false)}>
          <LogoutModalBox isDark={isDark}>
            <LogoutModalTitle isDark={isDark}>Edit Business Profile</LogoutModalTitle>
            <EditModalForm>
              <View>
                <EditModalLabel isDark={isDark}>Business Name</EditModalLabel>
                <EditModalInput
                  isDark={isDark}
                  value={editBusinessName}
                  onChangeText={setEditBusinessName}
                  placeholder="Business Name"
                  placeholderTextColor={
                    isDark ? Colors.dark.textTertiary : Colors.light.textTertiary
                  }
                />
              </View>
              <View>
                <EditModalLabel isDark={isDark}>Business Address</EditModalLabel>
                <EditModalInput
                  isDark={isDark}
                  value={editBusinessAddress}
                  onChangeText={setEditBusinessAddress}
                  placeholder="Business Address"
                  placeholderTextColor={
                    isDark ? Colors.dark.textTertiary : Colors.light.textTertiary
                  }
                />
              </View>
            </EditModalForm>
            <LogoutModalButtons>
              <LogoutModalConfirmButton
                onPress={handleSaveBusinessProfile}
                android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
                disabled={savingProfile}
              >
                {savingProfile ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <LogoutModalConfirmButtonText>Save</LogoutModalConfirmButtonText>
                )}
              </LogoutModalConfirmButton>
              <LogoutModalCancelButton
                isDark={isDark}
                onPress={() => setShowEditProfileModal(false)}
                android_ripple={{
                  color: isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                }}
              >
                <LogoutModalCancelButtonText isDark={isDark}>
                  Cancel
                </LogoutModalCancelButtonText>
              </LogoutModalCancelButton>
            </LogoutModalButtons>
          </LogoutModalBox>
        </ModalOverlay>
      </Modal>

      {/* Logout confirmation modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={handleCancelLogout}
      >
        <ModalOverlay onPress={handleCancelLogout}>
          <LogoutModalBox isDark={isDark}>
            <LogoutModalIconCircle>
              <MaterialIcons name="logout" size={28} color="#ffffff" />
            </LogoutModalIconCircle>
            <LogoutModalTitle isDark={isDark}>Logout</LogoutModalTitle>
            <LogoutModalMessage isDark={isDark}>
              Are you sure you want to log out of your account?
            </LogoutModalMessage>
            <LogoutModalButtons>
              <LogoutModalConfirmButton
                onPress={handleConfirmLogout}
                android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
              >
                <LogoutModalConfirmButtonText>
                  Log Out
                </LogoutModalConfirmButtonText>
              </LogoutModalConfirmButton>
              <LogoutModalCancelButton
                isDark={isDark}
                onPress={handleCancelLogout}
                android_ripple={{
                  color: isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                }}
              >
                <LogoutModalCancelButtonText isDark={isDark}>
                  Cancel
                </LogoutModalCancelButtonText>
              </LogoutModalCancelButton>
            </LogoutModalButtons>
          </LogoutModalBox>
        </ModalOverlay>
      </Modal>
    </Container>
  );
}
