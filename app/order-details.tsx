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
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
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
  z-index: 20;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) =>
    props.isDark
      ? Colors.dark.background + "F5"
      : Colors.light.backgroundSecondary + "F5"};
  padding: ${Spacing.md}px;
  padding-top: ${(props) => props.paddingTop + Spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.isDark ? "rgba(148, 163, 184, 0.1)" : "rgba(226, 232, 240, 0.5)"};
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
  letter-spacing: -0.5px;
`;

const HelpButton = styled.Pressable`
  padding: ${Spacing.xs}px ${Spacing.sm}px;
  border-radius: ${BorderRadius.lg}px;
`;

const HelpButtonText = styled.Text`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  color: ${PRIMARY_COLOR};
`;

const ScrollContent = styled.ScrollView<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundSecondary};
`;

const ContentWrapper = styled.View`
  padding: ${Spacing.md}px;
  gap: ${Spacing.xl}px;
  padding-bottom: 200px;
`;

const StatusSection = styled.View`
  gap: ${Spacing.md}px;
`;

const StatusRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StatusBadge = styled.View<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.xs}px;
  height: 32px;
  padding: 0 ${Spacing.sm}px 0 ${Spacing.xs}px;
  border-radius: ${BorderRadius.full}px;
  background-color: ${(props) =>
    props.isDark ? "rgba(34, 197, 94, 0.4)" : "rgba(220, 252, 231, 1)"};
  border-width: 1px;
  border-color: ${(props) =>
    props.isDark ? "rgba(34, 197, 94, 0.5)" : "rgba(187, 247, 208, 1)"};
`;

const StatusBadgeText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${(props) => (props.isDark ? "#86efac" : "#166534")};
`;

const PlacedDate = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const ServiceTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes["2xl"]}px;
  font-weight: ${FontWeights.extrabold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  letter-spacing: -0.5px;
`;

const Card = styled.View<{ isDark: boolean }>`
  border-radius: ${BorderRadius["2xl"]}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  border-width: 1px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  shadow-color: rgba(0, 0, 0, 0.05);
  shadow-offset: 0px 4px;
  shadow-opacity: 1;
  shadow-radius: 20px;
  elevation: 4;
  overflow: hidden;
`;

const CustomerCard = styled(Card)`
  padding: ${Spacing.md}px;
  gap: ${Spacing.md}px;
`;

const CustomerHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.md}px;
`;

const CustomerImagePlaceholder = styled.View<{ isDark: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${(props) =>
    props.isDark
      ? Colors.dark.backgroundTertiary
      : Colors.light.backgroundTertiary};
  border-width: 2px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  align-items: center;
  justify-content: center;
`;

const CustomerInfo = styled.View`
  flex: 1;
  gap: ${Spacing.xs}px;
`;

const CustomerName = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.lg}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const CustomerAddress = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${Spacing.xs}px;
`;

const CustomerAddressText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
  flex: 1;
  line-height: ${FontSizes.xs * 1.5}px;
`;

const QuickActions = styled.View`
  flex-direction: row;
  gap: ${Spacing.md}px;
`;

const QuickActionButton = styled.Pressable<{ isDark: boolean }>`
  flex: 1;
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.sm}px;
  border-radius: ${BorderRadius.xl}px;
  background-color: ${PRIMARY_COLOR}1A;
`;

const QuickActionButtonText = styled.Text`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  color: ${PRIMARY_COLOR};
`;

const CustomerFooter = styled.View<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: ${Spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
`;

const RatingSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.xs + 2}px;
`;

const RatingText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const RatingSubtext = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textTertiary : Colors.light.textTertiary};
`;

const ViewHistoryLink = styled.Pressable``;

const ViewHistoryText = styled.Text`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.bold};
  color: ${PRIMARY_COLOR};
`;

const ServiceDetailsCard = styled(Card)`
  overflow: hidden;
`;

const ServiceDetailsHeader = styled.View<{ isDark: boolean }>`
  padding: ${Spacing.md}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundTertiary};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
`;

const ServiceDetailsHeaderText = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.sm}px;
`;

const ServiceDetailsLabel = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const ServiceDetailsContent = styled.View`
  padding: ${Spacing.md}px;
  gap: ${Spacing.md}px;
`;

const ServiceDetailsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ServiceDetailsItem = styled.View`
  flex: 1;
  gap: ${Spacing.xs}px;
`;

const ServiceDetailsLabelText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const ServiceDetailsValue = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const ServiceDetailsDivider = styled.View<{ isDark: boolean }>`
  width: 1px;
  height: 32px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
`;

const ServiceDetailsHorizontalDivider = styled.View<{ isDark: boolean }>`
  height: 1px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
`;

const StylistInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.sm}px;
`;

const StylistImagePlaceholder = styled.View<{ isDark: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isDark
      ? Colors.dark.backgroundTertiary
      : Colors.light.backgroundTertiary};
`;

const LocationTypeInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: ${Spacing.xs}px;
`;

const PaymentCard = styled(Card)`
  padding: ${Spacing.xl}px;
  gap: ${Spacing.md}px;
`;

const PaymentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.sm}px;
`;

const PaymentTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const PaymentItems = styled.View`
  gap: ${Spacing.md}px;
`;

const PaymentItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PaymentItemLabel = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const PaymentItemValue = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const PaymentDivider = styled.View<{ isDark: boolean }>`
  height: 1px;
  border-top-width: 1px;
  border-top-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  border-style: dashed;
  margin: ${Spacing.md}px 0;
`;

const PaymentTotal = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const PaymentTotalLeft = styled.View`
  gap: ${Spacing.xs}px;
`;

const PaymentTotalLabel = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const PaymentTotalValue = styled.Text`
  font-size: ${FontSizes["2xl"]}px;
  font-weight: ${FontWeights.extrabold};
  color: ${PRIMARY_COLOR};
  letter-spacing: -0.5px;
`;

const PaymentMethodBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.xs + 2}px;
  padding: ${Spacing.xs + 2}px ${Spacing.md}px;
  border-radius: ${BorderRadius.lg}px;
  background-color: ${PRIMARY_COLOR}1A;
`;

const PaymentMethodText = styled.Text`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.bold};
  color: ${PRIMARY_COLOR};
`;

const BottomActions = styled.View<{ paddingBottom: number; isDark: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) =>
    props.isDark
      ? Colors.dark.backgroundTertiary + "F0"
      : Colors.light.background + "F0"};
  border-top-width: 1px;
  border-top-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  padding: ${Spacing.md}px;
  padding-bottom: ${(props) => props.paddingBottom + Spacing["2xl"]}px;
  z-index: 30;
  shadow-color: rgba(0, 0, 0, 0.1);
  shadow-offset: 0px -8px;
  shadow-opacity: 1;
  shadow-radius: 30px;
  elevation: 8;
`;

const BottomActionsContent = styled.View`
  gap: ${Spacing.md}px;
`;

const PrimaryActionButton = styled.Pressable`
  width: 100%;
  height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.sm}px;
  border-radius: ${BorderRadius.xl}px;
  background-color: ${PRIMARY_COLOR};
  shadow-color: ${PRIMARY_COLOR};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 12px;
  elevation: 6;
`;

const PrimaryActionButtonText = styled.Text`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: #ffffff;
`;

const SecondaryActions = styled.View`
  flex-direction: row;
  gap: ${Spacing.md}px;
`;

const SecondaryActionButton = styled.Pressable<{
  isDark: boolean;
  outlined?: boolean;
}>`
  flex: 1;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: ${BorderRadius.xl}px;
  background-color: ${(props) =>
    props.outlined
      ? "transparent"
      : props.isDark
      ? Colors.dark.background
      : Colors.light.backgroundTertiary};
  border-width: ${(props) => (props.outlined ? 2 : 0)}px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
`;

const SecondaryActionButtonText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

export default function OrderDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";

  // Get order data from params or use defaults
  const orderId = (params.orderId as string) || "2049";
  const status = (params.status as string) || "CONFIRMED";
  const placedDate = (params.placedDate as string) || "Oct 12, 09:30 AM";
  const serviceTitle =
    (params.serviceTitle as string) || "Knotless Braids (Medium)";
  const clientName = (params.clientName as string) || "Amaka Obi";
  const clientAddress =
    (params.clientAddress as string) ||
    "14 Admiralty Way, Lekki Phase 1, Lagos";
  const rating = (params.rating as string) || "4.8";
  const orderCount = (params.orderCount as string) || "12";
  const dateTime = (params.dateTime as string) || "Tue, 14 Oct • 10:00 AM";
  const duration = (params.duration as string) || "4 Hours";
  const locationType = (params.locationType as string) || "Home Service";
  const serviceCost = (params.serviceCost as string) || "₦15,000";
  const transportFee = (params.transportFee as string) || "₦2,000";
  const totalPaid = (params.totalPaid as string) || "₦17,000";
  const paymentMethod = (params.paymentMethod as string) || "Paid via Transfer";

  const handleBack = () => {
    router.back();
  };

  const handleHelp = () => {
    console.log("Open help");
  };

  const handleCall = () => {
    console.log("Call client");
  };

  const handleMessage = () => {
    console.log("Message client");
  };

  const handleViewHistory = () => {
    console.log("View client history");
  };

  const handleMarkInProgress = () => {
    console.log("Mark as in progress");
  };

  const handleCancel = () => {
    console.log("Cancel order");
  };

  const handleReschedule = () => {
    console.log("Reschedule order");
  };

  return (
    <Container isDark={isDark}>
      {/* Header */}
      <Header paddingTop={insets.top} isDark={isDark}>
        <BackButton
          isDark={isDark}
          onPress={handleBack}
          android_ripple={{
            color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
            borderless: false,
            radius: 20,
          }}
        >
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={isDark ? Colors.dark.text : Colors.light.text}
          />
        </BackButton>
        <HeaderTitle isDark={isDark}>Order #{orderId}</HeaderTitle>
        <HelpButton
          onPress={handleHelp}
          android_ripple={{
            color: PRIMARY_COLOR + "20",
            borderless: false,
          }}
        >
          <HelpButtonText>Help</HelpButtonText>
        </HelpButton>
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
          {/* Status & Main Info */}
          <StatusSection>
            <StatusRow>
              <StatusBadge isDark={isDark}>
                <MaterialIcons
                  name="check-circle"
                  size={18}
                  color={isDark ? "#86efac" : "#166534"}
                />
                <StatusBadgeText isDark={isDark}>{status}</StatusBadgeText>
              </StatusBadge>
              <PlacedDate isDark={isDark}>Placed: {placedDate}</PlacedDate>
            </StatusRow>
            <ServiceTitle isDark={isDark}>{serviceTitle}</ServiceTitle>
          </StatusSection>

          {/* Customer Profile Card */}
          <CustomerCard isDark={isDark}>
            <CustomerHeader>
              <CustomerImagePlaceholder isDark={isDark}>
                <MaterialIcons
                  name="person"
                  size={32}
                  color={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
              </CustomerImagePlaceholder>
              <CustomerInfo>
                <CustomerName isDark={isDark}>{clientName}</CustomerName>
                <CustomerAddress>
                  <MaterialIcons
                    name="location-on"
                    size={16}
                    color={
                      isDark
                        ? Colors.dark.textSecondary
                        : Colors.light.textSecondary
                    }
                  />
                  <CustomerAddressText isDark={isDark}>
                    {clientAddress}
                  </CustomerAddressText>
                </CustomerAddress>
              </CustomerInfo>
            </CustomerHeader>

            {/* Quick Actions */}
            <QuickActions>
              <QuickActionButton
                isDark={isDark}
                onPress={handleCall}
                android_ripple={{
                  color: PRIMARY_COLOR + "20",
                  borderless: false,
                }}
              >
                <MaterialIcons name="call" size={18} color={PRIMARY_COLOR} />
                <QuickActionButtonText>Call</QuickActionButtonText>
              </QuickActionButton>
              <QuickActionButton
                isDark={isDark}
                onPress={handleMessage}
                android_ripple={{
                  color: PRIMARY_COLOR + "20",
                  borderless: false,
                }}
              >
                <MaterialIcons name="chat" size={18} color={PRIMARY_COLOR} />
                <QuickActionButtonText>Message</QuickActionButtonText>
              </QuickActionButton>
            </QuickActions>

            {/* Customer Footer */}
            <CustomerFooter isDark={isDark}>
              <RatingSection>
                <MaterialIcons name="star" size={18} color="#fbbf24" />
                <RatingText isDark={isDark}>{rating}</RatingText>
                <RatingSubtext isDark={isDark}>
                  ({orderCount} orders)
                </RatingSubtext>
              </RatingSection>
              <ViewHistoryLink onPress={handleViewHistory}>
                <ViewHistoryText>View History</ViewHistoryText>
              </ViewHistoryLink>
            </CustomerFooter>
          </CustomerCard>

          {/* Service Details Card */}
          <ServiceDetailsCard isDark={isDark}>
            <ServiceDetailsHeader isDark={isDark}>
              <ServiceDetailsHeaderText>
                <MaterialIcons
                  name="calendar-month"
                  size={16}
                  color={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
                <ServiceDetailsLabel isDark={isDark}>
                  Service Details
                </ServiceDetailsLabel>
              </ServiceDetailsHeaderText>
            </ServiceDetailsHeader>
            <ServiceDetailsContent>
              <ServiceDetailsRow>
                <ServiceDetailsItem>
                  <ServiceDetailsLabelText isDark={isDark}>
                    Date & Time
                  </ServiceDetailsLabelText>
                  <ServiceDetailsValue isDark={isDark}>
                    {dateTime}
                  </ServiceDetailsValue>
                </ServiceDetailsItem>
                <ServiceDetailsDivider isDark={isDark} />
                <ServiceDetailsItem style={{ alignItems: "flex-end" }}>
                  <ServiceDetailsLabelText isDark={isDark}>
                    Est. Duration
                  </ServiceDetailsLabelText>
                  <ServiceDetailsValue isDark={isDark}>
                    {duration}
                  </ServiceDetailsValue>
                </ServiceDetailsItem>
              </ServiceDetailsRow>
              <ServiceDetailsHorizontalDivider isDark={isDark} />
              <ServiceDetailsRow>
                <ServiceDetailsItem>
                  <ServiceDetailsLabelText isDark={isDark}>
                    Stylist
                  </ServiceDetailsLabelText>
                  <StylistInfo>
                    <StylistImagePlaceholder isDark={isDark}>
                      <MaterialIcons
                        name="person"
                        size={12}
                        color={
                          isDark
                            ? Colors.dark.textSecondary
                            : Colors.light.textSecondary
                        }
                      />
                    </StylistImagePlaceholder>
                    <ServiceDetailsValue isDark={isDark}>
                      You
                    </ServiceDetailsValue>
                  </StylistInfo>
                </ServiceDetailsItem>
                <ServiceDetailsDivider isDark={isDark} />
                <ServiceDetailsItem style={{ alignItems: "flex-end" }}>
                  <ServiceDetailsLabelText isDark={isDark}>
                    Location Type
                  </ServiceDetailsLabelText>
                  <LocationTypeInfo>
                    <MaterialIcons
                      name="home"
                      size={16}
                      color={PRIMARY_COLOR}
                    />
                    <ServiceDetailsValue isDark={isDark}>
                      {locationType}
                    </ServiceDetailsValue>
                  </LocationTypeInfo>
                </ServiceDetailsItem>
              </ServiceDetailsRow>
            </ServiceDetailsContent>
          </ServiceDetailsCard>

          {/* Payment Breakdown Card */}
          <PaymentCard isDark={isDark}>
            <PaymentHeader>
              <MaterialIcons
                name="receipt-long"
                size={20}
                color={
                  isDark ? Colors.dark.textTertiary : Colors.light.textTertiary
                }
              />
              <PaymentTitle isDark={isDark}>Payment Breakdown</PaymentTitle>
            </PaymentHeader>
            <PaymentItems>
              <PaymentItem>
                <PaymentItemLabel isDark={isDark}>
                  Service Cost
                </PaymentItemLabel>
                <PaymentItemValue isDark={isDark}>
                  {serviceCost}
                </PaymentItemValue>
              </PaymentItem>
              <PaymentItem>
                <PaymentItemLabel isDark={isDark}>
                  Transport Fee
                </PaymentItemLabel>
                <PaymentItemValue isDark={isDark}>
                  {transportFee}
                </PaymentItemValue>
              </PaymentItem>
            </PaymentItems>
            <PaymentDivider isDark={isDark} />
            <PaymentTotal>
              <PaymentTotalLeft>
                <PaymentTotalLabel isDark={isDark}>
                  Total Paid
                </PaymentTotalLabel>
                <PaymentTotalValue>{totalPaid}</PaymentTotalValue>
              </PaymentTotalLeft>
              <PaymentMethodBadge>
                <MaterialIcons
                  name="credit-card"
                  size={16}
                  color={PRIMARY_COLOR}
                />
                <PaymentMethodText>{paymentMethod}</PaymentMethodText>
              </PaymentMethodBadge>
            </PaymentTotal>
          </PaymentCard>
        </ContentWrapper>
      </ScrollContent>

      {/* Sticky Bottom Actions */}
      <BottomActions paddingBottom={insets.bottom} isDark={isDark}>
        <BottomActionsContent>
          <PrimaryActionButton
            onPress={handleMarkInProgress}
            android_ripple={{
              color: "rgba(255, 255, 255, 0.2)",
              borderless: false,
            }}
          >
            <MaterialIcons name="play-arrow" size={20} color="#ffffff" />
            <PrimaryActionButtonText>
              Mark as In Progress
            </PrimaryActionButtonText>
          </PrimaryActionButton>
          <SecondaryActions>
            <SecondaryActionButton
              isDark={isDark}
              onPress={handleCancel}
              android_ripple={{
                color: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
                borderless: false,
              }}
            >
              <SecondaryActionButtonText isDark={isDark}>
                Cancel Order
              </SecondaryActionButtonText>
            </SecondaryActionButton>
            <SecondaryActionButton
              isDark={isDark}
              outlined
              onPress={handleReschedule}
              android_ripple={{
                color: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
                borderless: false,
              }}
            >
              <SecondaryActionButtonText isDark={isDark}>
                Reschedule
              </SecondaryActionButtonText>
            </SecondaryActionButton>
          </SecondaryActions>
        </BottomActionsContent>
      </BottomActions>
    </Container>
  );
}
