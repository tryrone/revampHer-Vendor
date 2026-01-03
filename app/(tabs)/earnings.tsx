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
import React, { useState } from "react";
import { View } from "react-native";
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
      ? Colors.dark.background + "E6"
      : Colors.light.backgroundSecondary + "E6"};
  padding: ${Spacing.md}px;
  padding-top: ${(props) => props.paddingTop + Spacing.md}px;
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

const HistoryLink = styled.Pressable``;

const HistoryLinkText = styled.Text`
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
  padding: ${Spacing.sm}px ${Spacing.md}px;
  gap: ${Spacing["2xl"]}px;
  padding-bottom: ${Spacing["6xl"]}px;
`;

const Card = styled.View<{ isDark: boolean }>`
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

const BalanceCard = styled(Card)`
  padding: ${Spacing["2xl"]}px;
  gap: ${Spacing.md}px;
`;

const BalanceHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${Spacing.sm}px;
`;

const BalanceHeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.sm}px;
`;

const BalanceLabel = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const VisibilityButton = styled.Pressable``;

const BalanceAmount = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes["4xl"]}px;
  font-weight: ${FontWeights.extrabold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  letter-spacing: -0.5px;
`;

const BalanceDecimal = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes["2xl"]}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textTertiary : Colors.light.textTertiary};
`;

const TrendIndicator = styled.View<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.xs}px;
  padding: ${Spacing.xs}px ${Spacing.sm}px;
  border-radius: ${BorderRadius.lg}px;
  background-color: ${(props) =>
    props.isDark ? "rgba(34, 197, 94, 0.3)" : "rgba(220, 252, 231, 1)"};
  align-self: flex-start;
`;

const TrendText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? "#86efac" : "#166534")};
`;

const WithdrawButton = styled.Pressable`
  width: 100%;
  height: 48px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.sm}px;
  border-radius: ${BorderRadius.xl}px;
  background-color: ${PRIMARY_COLOR};
  margin-top: ${Spacing["2xl"]}px;
  shadow-color: ${PRIMARY_COLOR};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 12px;
  elevation: 6;
`;

const WithdrawButtonText = styled.Text`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: #ffffff;
`;

const FilterContainer = styled.View`
  flex-direction: row;
  gap: ${Spacing.md}px;
  overflow: hidden;
  margin: 0 -${Spacing.md}px;
  padding: 0 ${Spacing.md}px;
`;

const FilterChip = styled.Pressable<{ isActive: boolean; isDark: boolean }>`
  height: 36px;
  padding: 0 ${Spacing.xl}px;
  border-radius: ${BorderRadius.full}px;
  background-color: ${(props) =>
    props.isActive
      ? props.isDark
        ? Colors.light.background
        : Colors.dark.background
      : props.isDark
      ? Colors.dark.backgroundTertiary
      : Colors.light.background};
  border-width: ${(props) => (props.isActive ? 0 : 1)}px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const FilterChipText = styled.Text<{ isActive: boolean; isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${(props) =>
    props.isActive ? FontWeights.semibold : FontWeights.medium};
  color: ${(props) =>
    props.isActive
      ? props.isDark
        ? Colors.dark.background
        : Colors.light.background
      : props.isDark
      ? Colors.dark.textSecondary
      : Colors.light.textSecondary};
`;

const ChartCard = styled(Card)`
  padding: ${Spacing.xl}px;
  gap: ${Spacing.md}px;
`;

const ChartHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ChartTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const ChartLegend = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.sm}px;
`;

const LegendDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${PRIMARY_COLOR};
`;

const LegendText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const ChartContainer = styled.View`
  margin-top: ${Spacing.sm}px;
  height: 160px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${Spacing.sm}px;
`;

const BarGroup = styled.View`
  flex: 1;
  align-items: center;
  gap: ${Spacing.sm}px;
`;

const BarContainer = styled.View<{ isDark: boolean }>`
  width: 100%;
  height: 100px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundTertiary};
  border-radius: ${BorderRadius.lg}px;
  overflow: hidden;
  position: relative;
`;

const BarFill = styled.View<{
  height: number;
  isActive: boolean;
  isDark: boolean;
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${(props) => props.height}%;
  background-color: ${(props) =>
    props.isActive ? PRIMARY_COLOR : PRIMARY_COLOR + "4D"};
  border-radius: ${BorderRadius.lg}px;
  shadow-color: ${(props) => (props.isActive ? PRIMARY_COLOR : "transparent")};
  shadow-offset: 0px 0px;
  shadow-opacity: ${(props) => (props.isActive ? 0.4 : 0)};
  shadow-radius: ${(props) => (props.isActive ? 10 : 0)}px;
  elevation: ${(props) => (props.isActive ? 4 : 0)};
`;

const BarLabel = styled.Text<{ isActive: boolean; isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${(props) =>
    props.isActive ? FontWeights.bold : FontWeights.semibold};
  color: ${(props) =>
    props.isActive
      ? PRIMARY_COLOR
      : props.isDark
      ? Colors.dark.textTertiary
      : Colors.light.textTertiary};
`;

const StatsGrid = styled.View`
  flex-direction: row;
  gap: ${Spacing.md}px;
`;

const StatCard = styled(Card)`
  flex: 1;
  padding: ${Spacing.xl}px;
  gap: ${Spacing.md}px;
`;

const StatCardIcon = styled.View`
  margin-bottom: ${Spacing.xs}px;
`;

const StatCardValue = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes["2xl"]}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const StatCardLabel = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const PendingPayoutCard = styled(Card)`
  padding: ${Spacing.xl}px;
  gap: ${Spacing.md}px;
`;

const PendingPayoutHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PendingPayoutHeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.sm}px;
`;

const PendingPayoutLabel = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const PendingPayoutContent = styled.View`
  flex-direction: row;
  align-items: baseline;
  gap: ${Spacing.sm}px;
`;

const PendingPayoutAmount = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes["2xl"]}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const PendingPayoutDate = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const RecentActivityHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: ${Spacing.sm}px;
`;

const RecentActivityTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const ViewAllLink = styled.Pressable``;

const ViewAllText = styled.Text`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.semibold};
  color: ${PRIMARY_COLOR};
`;

const ActivityList = styled.View`
  gap: ${Spacing.md}px;
`;

const ActivityItem = styled.Pressable<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: ${BorderRadius.xl}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  padding: ${Spacing.md}px;
  border-width: 1px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  shadow-color: rgba(0, 0, 0, 0.05);
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 4px;
  elevation: 2;
`;

const ActivityItemLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.md}px;
  flex: 1;
`;

const ActivityIcon = styled.View<{ isDark: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundTertiary};
  align-items: center;
  justify-content: center;
`;

const ActivityInfo = styled.View`
  flex: 1;
  gap: ${Spacing.xs}px;
`;

const ActivityService = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const ActivityDate = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const ActivityAmount = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? "#86efac" : "#16a34a")};
`;

type TimeFilter = "This Week" | "Today" | "This Month";

type ActivityItem = {
  id: string;
  serviceName: string;
  date: string;
  amount: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export default function EarningsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";

  const [activeFilter, setActiveFilter] = useState<TimeFilter>("This Week");
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  // Bar chart data (percentage heights)
  const chartData = [
    { day: "M", height: 40, isActive: false },
    { day: "T", height: 65, isActive: false },
    { day: "W", height: 30, isActive: false },
    { day: "T", height: 90, isActive: true }, // Thursday
    { day: "F", height: 75, isActive: false },
    { day: "S", height: 85, isActive: false },
    { day: "S", height: 50, isActive: false },
  ];

  // Recent activity data
  const activities: ActivityItem[] = [
    {
      id: "1",
      serviceName: "Braids - Large (Knotless)",
      date: "Today, 2:30 PM",
      amount: "+ ₦15,000",
      icon: "content-cut",
    },
    {
      id: "2",
      serviceName: "Bridal Styling",
      date: "Yesterday, 10:00 AM",
      amount: "+ ₦35,000",
      icon: "face",
    },
    {
      id: "3",
      serviceName: "Hair Treatment",
      date: "Mon, 1:15 PM",
      amount: "+ ₦8,500",
      icon: "spa",
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleHistory = () => {
    router.push("/(tabs)/history");
  };

  const handleWithdraw = () => {
    console.log("Withdraw funds");
  };

  const handleViewAll = () => {
    router.push("/(tabs)/history");
  };

  const handleActivityPress = (activity: ActivityItem) => {
    // Extract amount value (remove "+ ₦" prefix)
    const amountValue = activity.amount.replace("+ ₦", "").replace(/,/g, "");
    const formattedAmount = `₦ ${parseFloat(amountValue).toLocaleString(
      "en-NG",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;

    // Parse date to get earned date
    const earnedDate = activity.date.includes("Today")
      ? new Date().toLocaleDateString("en-NG", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : activity.date.includes("Yesterday")
      ? new Date(Date.now() - 86400000).toLocaleDateString("en-NG", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : activity.date.split(",")[0] + ", " + new Date().getFullYear();

    router.push({
      pathname: "/transaction-details",
      params: {
        amount: formattedAmount,
        earnedDate: earnedDate,
        serviceName: activity.serviceName,
        dateTime: activity.date,
        clientName: "Client Name", // Default, should be replaced with actual client data
        clientVisits: "5", // Default
        isRecurring: "true", // Default
        paymentMethod: "Bank Transfer", // Default
        referenceId: `REF-${activity.id.padStart(8, "0")}`, // Generate reference ID from activity ID
      },
    });
  };

  const formatBalance = (visible: boolean): string => {
    if (visible) {
      return "₦152,500";
    }
    return "₦•••,•••";
  };

  return (
    <Container isDark={isDark}>
      {/* Header */}
      <Header paddingTop={insets.top} isDark={isDark}>
        <BackButton
          isDark={isDark}
          android_ripple={{
            color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
            borderless: false,
            radius: 20,
          }}
        ></BackButton>
        <HeaderTitle isDark={isDark}>Earnings</HeaderTitle>
        <HistoryLink onPress={handleHistory}>
          <HistoryLinkText>History</HistoryLinkText>
        </HistoryLink>
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
          {/* Available Balance Card */}
          <BalanceCard isDark={isDark}>
            <BalanceHeader>
              <BalanceHeaderLeft>
                <MaterialIcons
                  name="account-balance-wallet"
                  size={20}
                  color={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
                <BalanceLabel isDark={isDark}>Available Balance</BalanceLabel>
              </BalanceHeaderLeft>
              <VisibilityButton
                onPress={() => setIsBalanceVisible(!isBalanceVisible)}
                android_ripple={{
                  color: isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                  borderless: true,
                }}
              >
                <MaterialIcons
                  name={isBalanceVisible ? "visibility" : "visibility-off"}
                  size={20}
                  color={
                    isDark
                      ? Colors.dark.textTertiary
                      : Colors.light.textTertiary
                  }
                />
              </VisibilityButton>
            </BalanceHeader>
            <View>
              <BalanceAmount isDark={isDark}>
                {formatBalance(isBalanceVisible)}
                <BalanceDecimal isDark={isDark}>.00</BalanceDecimal>
              </BalanceAmount>
            </View>
            <TrendIndicator isDark={isDark}>
              <MaterialIcons
                name="trending-up"
                size={16}
                color={isDark ? "#86efac" : "#166534"}
              />
              <TrendText isDark={isDark}>+12% vs last week</TrendText>
            </TrendIndicator>
            <WithdrawButton
              onPress={handleWithdraw}
              android_ripple={{
                color: "rgba(255, 255, 255, 0.2)",
                borderless: false,
              }}
            >
              <MaterialIcons name="payments" size={20} color="#ffffff" />
              <WithdrawButtonText>Withdraw Funds</WithdrawButtonText>
            </WithdrawButton>
          </BalanceCard>

          {/* Time Filter Chips */}
          <FilterContainer>
            {(["This Week", "Today", "This Month"] as TimeFilter[]).map(
              (filter) => (
                <FilterChip
                  key={filter}
                  isActive={activeFilter === filter}
                  isDark={isDark}
                  onPress={() => setActiveFilter(filter)}
                  android_ripple={{
                    color: isDark
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.05)",
                    borderless: false,
                  }}
                >
                  <FilterChipText
                    isActive={activeFilter === filter}
                    isDark={isDark}
                  >
                    {filter}
                  </FilterChipText>
                </FilterChip>
              )
            )}
          </FilterContainer>

          {/* Weekly Overview Chart */}
          <ChartCard isDark={isDark}>
            <ChartHeader>
              <ChartTitle isDark={isDark}>Weekly Overview</ChartTitle>
              <ChartLegend>
                <LegendDot />
                <LegendText isDark={isDark}>Earnings</LegendText>
              </ChartLegend>
            </ChartHeader>
            <ChartContainer>
              {chartData.map((bar, index) => (
                <BarGroup key={index}>
                  <BarContainer isDark={isDark}>
                    <BarFill
                      height={bar.height}
                      isActive={bar.isActive}
                      isDark={isDark}
                    />
                  </BarContainer>
                  <BarLabel isActive={bar.isActive} isDark={isDark}>
                    {bar.day}
                  </BarLabel>
                </BarGroup>
              ))}
            </ChartContainer>
          </ChartCard>

          {/* Stats Grid */}
          <StatsGrid>
            <StatCard isDark={isDark}>
              <StatCardIcon>
                <MaterialIcons
                  name="shopping-bag"
                  size={20}
                  color={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
              </StatCardIcon>
              <StatCardValue isDark={isDark}>24</StatCardValue>
              <StatCardLabel isDark={isDark}>Orders Completed</StatCardLabel>
            </StatCard>
            <StatCard isDark={isDark}>
              <StatCardIcon>
                <MaterialIcons
                  name="analytics"
                  size={20}
                  color={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
              </StatCardIcon>
              <StatCardValue isDark={isDark}>₦6,350</StatCardValue>
              <StatCardLabel isDark={isDark}>Avg. Order Value</StatCardLabel>
            </StatCard>
          </StatsGrid>

          {/* Pending Payout Card */}
          <PendingPayoutCard isDark={isDark}>
            <PendingPayoutHeader>
              <PendingPayoutHeaderLeft>
                <MaterialIcons
                  name="schedule"
                  size={20}
                  color={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
                <PendingPayoutLabel isDark={isDark}>
                  Pending Payouts
                </PendingPayoutLabel>
              </PendingPayoutHeaderLeft>
              <MaterialIcons
                name="chevron-right"
                size={18}
                color={
                  isDark ? Colors.dark.textTertiary : Colors.light.textTertiary
                }
              />
            </PendingPayoutHeader>
            <PendingPayoutContent>
              <PendingPayoutAmount isDark={isDark}>₦12,000</PendingPayoutAmount>
              <PendingPayoutDate isDark={isDark}>
                Processing for Fri, 24th
              </PendingPayoutDate>
            </PendingPayoutContent>
          </PendingPayoutCard>

          {/* Recent Activity */}
          <View>
            <RecentActivityHeader>
              <RecentActivityTitle isDark={isDark}>
                Recent Activity
              </RecentActivityTitle>
              <ViewAllLink onPress={handleViewAll}>
                <ViewAllText>View All</ViewAllText>
              </ViewAllLink>
            </RecentActivityHeader>
            <ActivityList>
              {activities.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  isDark={isDark}
                  onPress={() => handleActivityPress(activity)}
                  android_ripple={{
                    color: isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)",
                    borderless: false,
                  }}
                >
                  <ActivityItemLeft>
                    <ActivityIcon isDark={isDark}>
                      <MaterialIcons
                        name={activity.icon}
                        size={20}
                        color={
                          isDark
                            ? Colors.dark.textSecondary
                            : Colors.light.textSecondary
                        }
                      />
                    </ActivityIcon>
                    <ActivityInfo>
                      <ActivityService isDark={isDark}>
                        {activity.serviceName}
                      </ActivityService>
                      <ActivityDate isDark={isDark}>
                        {activity.date}
                      </ActivityDate>
                    </ActivityInfo>
                  </ActivityItemLeft>
                  <ActivityAmount isDark={isDark}>
                    {activity.amount}
                  </ActivityAmount>
                </ActivityItem>
              ))}
            </ActivityList>
          </View>
        </ContentWrapper>
      </ScrollContent>
    </Container>
  );
}
