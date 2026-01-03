import React from "react";
import { ScrollView, Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard";
import styled from "styled-components/native";
import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeights,
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

const Header = styled.View<{ paddingTop: number; isDark: boolean }>`
  position: sticky;
  top: 0;
  z-index: 50;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.background};
  padding: ${Spacing.md}px;
  padding-top: ${(props) => props.paddingTop + Spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
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

const HeaderSpacer = styled.View`
  width: 40px;
`;

const ScrollContent = styled.ScrollView<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundSecondary};
`;

const ContentWrapper = styled.View`
  padding: ${Spacing["2xl"]}px ${Spacing.md}px;
  gap: ${Spacing.xl}px;
  padding-bottom: 200px;
`;

const HeroCard = styled.View<{ isDark: boolean }>`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${Spacing["2xl"]}px;
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

const StatusBadge = styled.View<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.xs + 2}px;
  padding: ${Spacing.xs}px ${Spacing.md}px;
  border-radius: ${BorderRadius.full}px;
  background-color: ${(props) =>
    props.isDark ? "rgba(34, 197, 94, 0.3)" : "rgba(220, 252, 231, 1)"};
  border-width: 1px;
  border-color: ${(props) =>
    props.isDark ? "rgba(34, 197, 94, 0.5)" : "rgba(187, 247, 208, 1)"};
  margin-bottom: ${Spacing.md}px;
`;

const StatusBadgeText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${(props) => (props.isDark ? "#86efac" : "#166534")};
`;

const HeroAmount = styled.Text`
  font-size: ${FontSizes["4xl"]}px;
  font-weight: ${FontWeights.extrabold};
  color: ${PRIMARY_COLOR};
  letter-spacing: -0.5px;
  margin-bottom: ${Spacing.xs}px;
`;

const HeroDate = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textTertiary : Colors.light.textTertiary};
`;

const Section = styled.View`
  gap: ${Spacing.sm}px;
`;

const SectionLabel = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
  padding-left: ${Spacing.xs}px;
`;

const ClientCard = styled.View<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.md}px;
  padding: ${Spacing.md}px;
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
`;

const ClientImageContainer = styled.View<{ isDark: boolean }>`
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  border-width: 2px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.background};
  overflow: hidden;
`;

const ClientImage = styled(Image)`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

const ClientImagePlaceholder = styled.View<{ isDark: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundTertiary};
  align-items: center;
  justify-content: center;
`;

const StarBadge = styled.View<{ isDark: boolean }>`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${PRIMARY_COLOR};
  border-width: 2px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  align-items: center;
  justify-content: center;
`;

const ClientInfo = styled.View`
  flex: 1;
  min-width: 0;
  gap: ${Spacing.xs}px;
`;

const ClientName = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const ClientDetails = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const ClientChevron = styled.Pressable``;

const DetailsCard = styled.View<{ isDark: boolean }>`
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

const DetailRow = styled.View<{ isDark: boolean; isHighlighted?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${Spacing.md}px;
  background-color: ${(props) =>
    props.isHighlighted
      ? props.isDark
        ? Colors.dark.background
        : Colors.light.backgroundTertiary
      : "transparent"};
  border-top-width: ${(props) => (props.isHighlighted ? 0 : 1)}px;
  border-top-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
`;

const DetailRowLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.sm}px;
  flex: 1;
`;

const DetailLabel = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const DetailValue = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.semibold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  flex: 1;
  text-align: right;
`;

const ReferenceRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.sm}px;
  flex: 1;
  justify-content: flex-end;
`;

const ReferenceId = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.medium};
  font-family: monospace;
  letter-spacing: 0.5px;
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const CopyButton = styled.Pressable`
  padding: ${Spacing.xs}px;
  border-radius: ${BorderRadius.md}px;
`;

const BottomActions = styled.View<{ paddingBottom: number; isDark: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  border-top-width: 1px;
  border-top-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  padding: ${Spacing.md}px;
  padding-bottom: ${(props) => props.paddingBottom + Spacing["2xl"]}px;
  z-index: 40;
  shadow-color: rgba(0, 0, 0, 0.02);
  shadow-offset: 0px -4px;
  shadow-opacity: 1;
  shadow-radius: 6px;
  elevation: 8;
`;

const BottomActionsContent = styled.View`
  gap: ${Spacing.md}px;
`;

const DownloadButton = styled.Pressable`
  width: 100%;
  height: 48px;
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

const DownloadButtonText = styled.Text`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: #ffffff;
`;

const ReportLink = styled.Pressable`
  width: 100%;
  padding: ${Spacing.sm}px;
  align-items: center;
  justify-content: center;
`;

const ReportLinkText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

export default function TransactionDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";

  // Get transaction data from params or use defaults
  const amount = (params.amount as string) || "₦ 25,000.00";
  const earnedDate = (params.earnedDate as string) || "Oct 14, 2023";
  const clientName = (params.clientName as string) || "Nkechi Okonkwo";
  const clientVisits = (params.clientVisits as string) || "5";
  const isRecurring = (params.isRecurring as string) || "true";
  const serviceName = (params.serviceName as string) || "Silk Press & Trim";
  const dateTime = (params.dateTime as string) || "Tue, 14 Oct • 14:30";
  const paymentMethod = (params.paymentMethod as string) || "Bank Transfer";
  const referenceId = (params.referenceId as string) || "REF-88392019";
  const clientImageUrl = params.clientImageUrl as string | undefined;

  const handleBack = () => {
    router.back();
  };

  const handleClientPress = () => {
    console.log("View client profile");
  };

  const handleCopyReference = async () => {
    await Clipboard.setStringAsync(referenceId);
    console.log("Reference ID copied to clipboard");
  };

  const handleDownloadReceipt = () => {
    console.log("Download receipt");
  };

  const handleReportIssue = () => {
    console.log("Report issue");
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
          }}>
          <MaterialIcons
            name="arrow-back-ios-new"
            size={24}
            color={isDark ? Colors.dark.text : Colors.light.text}
          />
        </BackButton>
        <HeaderTitle isDark={isDark}>Transaction Details</HeaderTitle>
        <HeaderSpacer />
      </Header>

      {/* Scrollable Content */}
      <ScrollContent
        isDark={isDark}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}>
        <ContentWrapper>
          {/* Hero Amount Card */}
          <HeroCard isDark={isDark}>
            <StatusBadge isDark={isDark}>
              <MaterialIcons name="check-circle" size={14} color={isDark ? "#86efac" : "#166534"} />
              <StatusBadgeText isDark={isDark}>Payment Successful</StatusBadgeText>
            </StatusBadge>
            <HeroAmount>{amount}</HeroAmount>
            <HeroDate isDark={isDark}>Earned on {earnedDate}</HeroDate>
          </HeroCard>

          {/* Client Section */}
          <Section>
            <SectionLabel isDark={isDark}>Client</SectionLabel>
            <ClientCard isDark={isDark}>
              <ClientImageContainer isDark={isDark}>
                {clientImageUrl ? (
                  <ClientImage source={{ uri: clientImageUrl }} />
                ) : (
                  <ClientImagePlaceholder isDark={isDark}>
                    <MaterialIcons
                      name="person"
                      size={32}
                      color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                    />
                  </ClientImagePlaceholder>
                )}
                <StarBadge isDark={isDark}>
                  <MaterialIcons name="star" size={10} color="#ffffff" />
                </StarBadge>
              </ClientImageContainer>
              <ClientInfo>
                <ClientName isDark={isDark}>{clientName}</ClientName>
                <ClientDetails isDark={isDark}>
                  {isRecurring === "true" ? "Recurring Client" : "Client"} • {clientVisits} Visits
                </ClientDetails>
              </ClientInfo>
              <ClientChevron
                onPress={handleClientPress}
                android_ripple={{
                  color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                  borderless: true,
                }}>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={isDark ? Colors.dark.textTertiary : Colors.light.textTertiary}
                />
              </ClientChevron>
            </ClientCard>
          </Section>

          {/* Transaction Details Section */}
          <Section>
            <SectionLabel isDark={isDark}>Transaction Details</SectionLabel>
            <DetailsCard isDark={isDark}>
              {/* Service */}
              <DetailRow isDark={isDark}>
                <DetailRowLeft>
                  <MaterialIcons
                    name="content-cut"
                    size={18}
                    color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                  />
                  <DetailLabel isDark={isDark}>Service</DetailLabel>
                </DetailRowLeft>
                <DetailValue isDark={isDark}>{serviceName}</DetailValue>
              </DetailRow>

              {/* Date & Time */}
              <DetailRow isDark={isDark}>
                <DetailRowLeft>
                  <MaterialIcons
                    name="event"
                    size={18}
                    color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                  />
                  <DetailLabel isDark={isDark}>Date & Time</DetailLabel>
                </DetailRowLeft>
                <DetailValue isDark={isDark}>{dateTime}</DetailValue>
              </DetailRow>

              {/* Payment Method */}
              <DetailRow isDark={isDark}>
                <DetailRowLeft>
                  <MaterialIcons
                    name="account-balance"
                    size={18}
                    color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                  />
                  <DetailLabel isDark={isDark}>Payment Method</DetailLabel>
                </DetailRowLeft>
                <DetailValue isDark={isDark}>{paymentMethod}</DetailValue>
              </DetailRow>

              {/* Reference ID */}
              <DetailRow isDark={isDark} isHighlighted>
                <DetailRowLeft>
                  <MaterialIcons
                    name="tag"
                    size={18}
                    color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                  />
                  <DetailLabel isDark={isDark}>Reference ID</DetailLabel>
                </DetailRowLeft>
                <ReferenceRow>
                  <ReferenceId isDark={isDark}>{referenceId}</ReferenceId>
                  <CopyButton
                    onPress={handleCopyReference}
                    android_ripple={{
                      color: PRIMARY_COLOR + "20",
                      borderless: true,
                    }}>
                    <MaterialIcons name="content-copy" size={16} color={PRIMARY_COLOR} />
                  </CopyButton>
                </ReferenceRow>
              </DetailRow>
            </DetailsCard>
          </Section>
        </ContentWrapper>
      </ScrollContent>

      {/* Sticky Footer */}
      <BottomActions paddingBottom={insets.bottom} isDark={isDark}>
        <BottomActionsContent>
          <DownloadButton
            onPress={handleDownloadReceipt}
            android_ripple={{ color: "rgba(255, 255, 255, 0.2)", borderless: false }}>
            <MaterialIcons name="download" size={20} color="#ffffff" />
            <DownloadButtonText>Download Receipt</DownloadButtonText>
          </DownloadButton>
          <ReportLink
            onPress={handleReportIssue}
            android_ripple={{
              color: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
              borderless: true,
            }}>
            <ReportLinkText isDark={isDark}>
              Report an issue with this transaction
            </ReportLinkText>
          </ReportLink>
        </BottomActionsContent>
      </BottomActions>
    </Container>
  );
}

