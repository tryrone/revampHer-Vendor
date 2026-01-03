import React, { useState } from "react";
import { Pressable, TextInput, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
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
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundTertiary};
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

const StyledTextInput = styled.TextInput<{ isDark: boolean; hasRightIcon: boolean }>`
  flex: 1;
  height: 56px;
  padding-left: ${Spacing.md}px;
  padding-right: ${(props) => (props.hasRightIcon ? "48px" : Spacing.md + "px")};
  font-size: ${FontSizes.base}px;
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const InputIcon = styled.View`
  position: absolute;
  right: ${Spacing.md}px;
  top: 50%;
  transform: translateY(-12px);
`;

const ServicesSection = styled.View`
  gap: ${Spacing.md}px;
`;

const ServicesHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${Spacing.xs}px;
`;

const EditLink = styled.Pressable``;

const EditLinkText = styled.Text`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  color: ${PRIMARY_COLOR};
`;

const ServicesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${Spacing.sm}px;
`;

const ServiceTag = styled.View<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.sm}px;
  padding: ${Spacing.sm}px ${Spacing.md}px;
  border-radius: ${BorderRadius.md}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  border-width: 1px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.borderInput : Colors.light.borderInput};
`;

const ServiceTagText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const RemoveServiceButton = styled.Pressable`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const AddServiceButton = styled.Pressable<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.xs}px;
  padding: ${Spacing.sm}px ${Spacing.md}px;
  border-radius: ${BorderRadius.md}px;
  border-width: 1px;
  border-style: dashed;
  border-color: ${PRIMARY_COLOR}80;
  background-color: ${PRIMARY_COLOR}0D;
`;

const AddServiceText = styled.Text`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.semibold};
  color: ${PRIMARY_COLOR};
`;

const PriceRangeSection = styled.View`
  gap: ${Spacing.md}px;
  padding-top: ${Spacing.sm}px;
`;

const PriceRangeContainer = styled.View`
  flex-direction: row;
  gap: ${Spacing.md}px;
`;

const PriceRangeButton = styled.Pressable<{ isSelected: boolean; isDark: boolean }>`
  flex: 1;
  height: 48px;
  border-radius: ${BorderRadius.xl}px;
  border-width: 1px;
  border-color: ${(props) =>
    props.isSelected
      ? PRIMARY_COLOR
      : props.isDark
        ? Colors.dark.borderInput
        : Colors.light.borderInput};
  background-color: ${(props) =>
    props.isSelected
      ? props.isDark
        ? PRIMARY_COLOR + "33"
        : PRIMARY_COLOR + "0D"
      : props.isDark
        ? Colors.dark.backgroundTertiary
        : Colors.light.background};
  align-items: center;
  justify-content: center;
`;

const PriceRangeText = styled.Text<{ isSelected: boolean; isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) =>
    props.isSelected
      ? PRIMARY_COLOR
      : props.isDark
        ? Colors.dark.textSecondary
        : Colors.light.textSecondary};
`;

const HelperText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textTertiary : Colors.light.textTertiary};
  margin-left: ${Spacing.xs}px;
`;

const Footer = styled.View<{ paddingBottom: number; isDark: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${Spacing.md}px;
  padding-bottom: ${(props) => props.paddingBottom}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary + "CC" : Colors.light.background + "CC"};
  border-top-width: 1px;
  border-top-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
`;

const SaveButton = styled.Pressable<{ isDark: boolean }>`
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

  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [services, setServices] = useState<string[]>(["Box Braids", "Cornrows"]);
  const [priceRange, setPriceRange] = useState<"low" | "mid" | "high">("low");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [businessNameFocused, setBusinessNameFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleCameraPress = () => {
    // Placeholder for image picker
    console.log("Open image picker");
  };

  const handleRemoveService = (serviceToRemove: string) => {
    setServices(services.filter((service) => service !== serviceToRemove));
  };

  const handleAddService = () => {
    // Placeholder for add service
    console.log("Add service");
  };

  const handleEditServices = () => {
    // Placeholder for edit services
    console.log("Edit services");
  };

  const handleSaveProfile = () => {
    // Navigate to availability toggle after saving profile
    router.replace("/availability-toggle");
  };

  return (
    <Container isDark={isDark}>
      <ScrollContent
        isDark={isDark}
        contentContainerStyle={{
          paddingBottom: 100, // Space for sticky footer
        }}
        keyboardShouldPersistTaps="handled">
        {/* Header */}
        <Header paddingTop={insets.top + Spacing.sm} isDark={isDark}>
          <BackButton
            isDark={isDark}
            onPress={handleBack}
            android_ripple={{
              color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
            }}>
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
              {profileImage ? (
                <Avatar source={{ uri: profileImage }} />
              ) : (
                <AvatarPlaceholder isDark={isDark}>
                  <MaterialIcons
                    name="person"
                    size={64}
                    color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                  />
                </AvatarPlaceholder>
              )}
              <CameraButton
                onPress={handleCameraPress}
                android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}>
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
              <InputContainer
                isFocused={businessNameFocused}
                isDark={isDark}>
                <StyledTextInput
                  isDark={isDark}
                  hasRightIcon={false}
                  placeholder="e.g., Grace's Braid Shop"
                  placeholderTextColor={
                    isDark ? Colors.dark.textTertiary : Colors.light.textTertiary
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
                    isDark ? Colors.dark.textTertiary : Colors.light.textTertiary
                  }
                  value={location}
                  onChangeText={setLocation}
                  onFocus={() => setLocationFocused(true)}
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

            {/* Services Offered */}
            <ServicesSection>
              <ServicesHeader>
                <Label isDark={isDark}>Services Offered</Label>
                <EditLink onPress={handleEditServices}>
                  <EditLinkText>Edit</EditLinkText>
                </EditLink>
              </ServicesHeader>
              <ServicesContainer>
                {services.map((service, index) => (
                  <ServiceTag key={index} isDark={isDark}>
                    <ServiceTagText isDark={isDark}>{service}</ServiceTagText>
                    <RemoveServiceButton
                      onPress={() => handleRemoveService(service)}
                      android_ripple={{
                        color: isDark
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.05)",
                      }}>
                      <MaterialIcons
                        name="close"
                        size={16}
                        color={isDark ? Colors.dark.textTertiary : Colors.light.textTertiary}
                      />
                    </RemoveServiceButton>
                  </ServiceTag>
                ))}
                <AddServiceButton
                  isDark={isDark}
                  onPress={handleAddService}
                  android_ripple={{
                    color: PRIMARY_COLOR + "20",
                  }}>
                  <MaterialIcons name="add" size={18} color={PRIMARY_COLOR} />
                  <AddServiceText>Add Service</AddServiceText>
                </AddServiceButton>
              </ServicesContainer>
            </ServicesSection>

            {/* Price Range */}
            <PriceRangeSection>
              <Label isDark={isDark}>Price Range</Label>
              <PriceRangeContainer>
                <PriceRangeButton
                  isSelected={priceRange === "low"}
                  isDark={isDark}
                  onPress={() => setPriceRange("low")}
                  android_ripple={{
                    color: isDark
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.05)",
                  }}>
                  <PriceRangeText isSelected={priceRange === "low"} isDark={isDark}>
                    ₦
                  </PriceRangeText>
                </PriceRangeButton>
                <PriceRangeButton
                  isSelected={priceRange === "mid"}
                  isDark={isDark}
                  onPress={() => setPriceRange("mid")}
                  android_ripple={{
                    color: isDark
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.05)",
                  }}>
                  <PriceRangeText isSelected={priceRange === "mid"} isDark={isDark}>
                    ₦₦
                  </PriceRangeText>
                </PriceRangeButton>
                <PriceRangeButton
                  isSelected={priceRange === "high"}
                  isDark={isDark}
                  onPress={() => setPriceRange("high")}
                  android_ripple={{
                    color: isDark
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.05)",
                  }}>
                  <PriceRangeText isSelected={priceRange === "high"} isDark={isDark}>
                    ₦₦₦
                  </PriceRangeText>
                </PriceRangeButton>
              </PriceRangeContainer>
              <HelperText isDark={isDark}>
                Indicates average cost of service.
              </HelperText>
            </PriceRangeSection>
          </FormSection>
        </Content>
      </ScrollContent>

      {/* Sticky Footer */}
      <Footer paddingBottom={insets.bottom + Spacing.md} isDark={isDark}>
        <SaveButton
          isDark={isDark}
          onPress={handleSaveProfile}
          android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}>
          <SaveButtonText>Save Profile</SaveButtonText>
          <MaterialIcons name="check" size={20} color="#ffffff" />
        </SaveButton>
      </Footer>
    </Container>
  );
}

