import { ENV } from "@/constants";
import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeights,
  IconSizes,
  Spacing,
} from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { showToast } from "@/utils/toast";
import { MaterialIcons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

export interface SalonLocation {
  address: string;
  latitude: number;
  longitude: number;
}

interface LocationSelectorProps {
  onClose: () => void;
  onSelect: (location: SalonLocation) => void;
  selectedAddress?: string;
}

const ContentWrapper = styled.View<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.background};
  padding-top: ${Spacing["2xl"]}px;
  padding-horizontal: ${Spacing.lg}px;
  padding-bottom: ${Spacing["3xl"]}px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${Spacing.lg}px;
`;

const HeaderTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.lg}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  flex: 1;
`;

const CloseButton = styled.Pressable<{ isDark: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const ApiKeyMessage = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
  text-align: center;
  padding-vertical: ${Spacing.xl}px;
`;

export const LocationSelector = forwardRef<
  BottomSheetModal,
  LocationSelectorProps
>(function LocationSelector({ onClose, onSelect }, ref) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const apiKey = ENV.GOOGLE_MAPS_API_KEY;

  const autocompleteStyles = useMemo(
    () => ({
      container: {
        flex: 1,
      },
      textInputContainer: {
        flexDirection: "row" as const,
        backgroundColor: isDark
          ? Colors.dark.backgroundTertiary
          : Colors.light.backgroundTertiary,
        borderRadius: BorderRadius.xl,
        paddingHorizontal: Spacing.md,
        height: 48,
        marginBottom: Spacing.lg,
        alignItems: "center" as const,
      },
      textInput: {
        flex: 1,
        height: 48,
        color: isDark ? Colors.dark.text : Colors.light.text,
        fontSize: FontSizes.base,
        paddingVertical: 0,
        paddingHorizontal: Spacing.sm,
      },
      listView: {
        flex: 1,
        backgroundColor: isDark
          ? Colors.dark.background
          : Colors.light.background,
      },
      row: {
        backgroundColor: isDark
          ? Colors.dark.backgroundSecondary
          : Colors.light.backgroundSecondary,
        padding: Spacing.md,
        minHeight: 44,
        flexDirection: "row" as const,
        alignItems: "center" as const,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: isDark ? Colors.dark.border : Colors.light.border,
      },
      description: {
        fontSize: FontSizes.base,
        color: isDark ? Colors.dark.text : Colors.light.text,
      },
      separator: {
        height: 0,
      },
      loader: {
        padding: Spacing.md,
        alignItems: "center" as const,
      },
    }),
    [isDark]
  );

  const handlePress = (
    data: { description: string },
    details: {
      formatted_address?: string;
      formattedAddress?: string;
      geometry?: { location: { lat: number; lng: number } };
    } | null
  ) => {
    if (!details?.geometry?.location) {
      showToast({
        type: "error",
        text: "Could not get location details. Please try another place.",
      });
      return;
    }
    const loc = details.geometry.location;
    const address =
      details.formatted_address ??
      (details as { formattedAddress?: string }).formattedAddress ??
      data.description;
    onSelect({
      address,
      latitude: loc.lat,
      longitude: loc.lng,
    });
    if (typeof ref !== "function" && ref?.current) {
      ref.current.dismiss();
    }
  };

  const handleDismiss = () => {
    onClose();
  };

  if (!apiKey) {
    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={["40%"]}
        enableDynamicSizing={false}
        onDismiss={handleDismiss}
        backgroundStyle={{
          backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
        }}
        handleIndicatorStyle={{
          backgroundColor: isDark
            ? Colors.dark.textTertiary
            : Colors.light.textTertiary,
        }}
        backdropComponent={({ style }) => (
          <View style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]} />
        )}
      >
        <ContentWrapper isDark={isDark}>
          <Header>
            <HeaderTitle isDark={isDark}>Select location</HeaderTitle>
            <CloseButton
              isDark={isDark}
              onPress={() => {
                if (typeof ref !== "function" && ref?.current) {
                  ref.current.dismiss();
                }
              }}
              android_ripple={{
                color: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
              }}
            >
              <MaterialIcons
                name="close"
                size={IconSizes.md}
                color={isDark ? Colors.dark.text : Colors.light.text}
              />
            </CloseButton>
          </Header>
          <ApiKeyMessage isDark={isDark}>
            Google Maps API key is not configured.
          </ApiKeyMessage>
        </ContentWrapper>
      </BottomSheetModal>
    );
  }

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={["60%"]}
      enableDynamicSizing={false}
      onDismiss={handleDismiss}
      backgroundStyle={{
        backgroundColor: isDark
          ? Colors.dark.background
          : Colors.light.background,
      }}
      handleIndicatorStyle={{
        backgroundColor: isDark
          ? Colors.dark.textTertiary
          : Colors.light.textTertiary,
      }}
      backdropComponent={({ style }) => (
        <View style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]} />
      )}
    >
      <ContentWrapper isDark={isDark}>
        <Header>
          <HeaderTitle isDark={isDark}>Select location</HeaderTitle>
          <CloseButton
            isDark={isDark}
            onPress={() => {
              if (typeof ref !== "function" && ref?.current) {
                ref.current.dismiss();
              }
            }}
            android_ripple={{
              color: isDark
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.05)",
            }}
          >
            <MaterialIcons
              name="close"
              size={IconSizes.md}
              color={isDark ? Colors.dark.text : Colors.light.text}
            />
          </CloseButton>
        </Header>

        <GooglePlacesAutocomplete
          placeholder="Search location"
          onPress={handlePress}
          fetchDetails={true}
          query={{
            key: apiKey,
            language: "en",
            components: "country:ng",
          }}
          keyboardShouldPersistTaps="always"
          suppressDefaultStyles={true}
          styles={autocompleteStyles}
          enablePoweredByContainer={false}
          onFail={(error) => {
            showToast({
              type: "error",
              text: error?.message ?? "Location search failed. Please try again.",
            });
          }}
          onNotFound={() => {
            showToast({
              type: "error",
              text: "Place not found. Please try another search.",
            });
          }}
          textInputProps={{
            placeholderTextColor: isDark
              ? Colors.dark.textTertiary
              : Colors.light.textTertiary,
          }}
          listLoaderComponent={
            <View style={autocompleteStyles.loader}>
              <ActivityIndicator
                size="small"
                color={isDark ? Colors.dark.text : Colors.light.text}
              />
            </View>
          }
          listEmptyComponent={
            <View style={autocompleteStyles.loader}>
              <Text
                style={[
                  autocompleteStyles.description,
                  { color: isDark ? Colors.dark.textTertiary : Colors.light.textTertiary },
                ]}
              >
                No results found
              </Text>
            </View>
          }
        />
      </ContentWrapper>
    </BottomSheetModal>
  );
});
