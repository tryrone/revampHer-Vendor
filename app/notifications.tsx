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
import React, { useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

// Types
type NotificationType =
  | "booking"
  | "payment"
  | "reminder"
  | "review"
  | "cancellation"
  | "system";
type FilterType = "All" | "Orders" | "Payments" | "System";

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  section: "today" | "yesterday";
  actions?: {
    confirm?: () => void;
    decline?: () => void;
  };
};

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
      ? `${Colors.dark.background}E6`
      : `${Colors.light.background}E6`};
  padding: ${Spacing.md}px ${Spacing.xl}px;
  padding-top: ${(props) => props.paddingTop + Spacing.md}px;
  padding-bottom: ${Spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
`;

const HeaderTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xl}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  letter-spacing: -0.5px;
`;

const MarkAllReadButton = styled.Pressable`
  padding: ${Spacing.xs}px ${Spacing.sm}px;
`;

const MarkAllReadText = styled.Text`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  color: ${PRIMARY_COLOR};
  letter-spacing: 0.5px;
`;

const FilterSection = styled.View<{ isDark: boolean }>`
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.background};
  padding-top: ${Spacing.md}px;
  padding-bottom: ${Spacing.sm}px;
`;

const FilterScrollView = styled.ScrollView`
  padding-left: ${Spacing.xl}px;
  padding-right: ${Spacing.xl}px;
  padding-bottom: ${Spacing.sm}px;
`;

const FilterChip = styled.Pressable<{ isActive: boolean; isDark: boolean }>`
  height: 36px;
  padding: 0 ${Spacing.xl}px;
  border-radius: ${BorderRadius.full}px;
  background-color: ${(props) =>
    props.isActive
      ? PRIMARY_COLOR
      : props.isDark
      ? Colors.dark.backgroundTertiary
      : Colors.light.backgroundTertiary};
  align-items: center;
  justify-content: center;
  margin-right: ${Spacing.md}px;
  shadow-color: ${(props) => (props.isActive ? PRIMARY_COLOR : "transparent")};
  shadow-offset: 0px 2px;
  shadow-opacity: ${(props) => (props.isActive ? 0.2 : 0)};
  shadow-radius: 8px;
  elevation: ${(props) => (props.isActive ? 2 : 0)};
`;

const FilterChipText = styled.Text<{ isActive: boolean; isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${(props) =>
    props.isActive ? FontWeights.semibold : FontWeights.medium};
  color: ${(props) =>
    props.isActive
      ? "#ffffff"
      : props.isDark
      ? Colors.dark.textSecondary
      : Colors.light.textSecondary};
`;

const ScrollContent = styled.ScrollView<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundSecondary};
`;

const ContentWrapper = styled.View`
  padding-bottom: ${Spacing["6xl"]}px;
`;

const Section = styled.View`
  margin-top: ${Spacing.sm}px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${Spacing.md}px ${Spacing.xl}px;
  padding-top: ${Spacing.md}px;
`;

const SectionTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const SectionBadge = styled.View`
  padding: ${Spacing.xs}px ${Spacing.sm}px;
  border-radius: ${BorderRadius.full}px;
  background-color: ${PRIMARY_COLOR}1A;
`;

const SectionBadgeText = styled.Text`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.bold};
  color: ${PRIMARY_COLOR};
`;

const NotificationCard = styled.View<{ isDark: boolean; isRead: boolean }>`
  position: relative;
  margin: 0 ${Spacing.md}px ${Spacing.md}px;
  padding: ${Spacing.md}px;
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
  elevation: 2;
  opacity: ${(props) => (props.isRead ? 0.7 : 1)};
`;

const UnreadDot = styled.View<{ isDark: boolean }>`
  position: absolute;
  top: ${Spacing.md}px;
  right: ${Spacing.md}px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${PRIMARY_COLOR};
  border-width: 4px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
`;

const NotificationContent = styled.View`
  flex-direction: row;
  gap: ${Spacing.md}px;
  align-items: flex-start;
`;

const NotificationIconContainer = styled.View<{
  color: string;
  isDark: boolean;
}>`
  width: 48px;
  height: 48px;
  border-radius: ${BorderRadius.xl}px;
  background-color: ${(props) => props.color};
  align-items: center;
  justify-content: center;
  shrink: 0;
  margin-top: ${Spacing.xs}px;
`;

const NotificationTextContent = styled.View`
  flex: 1;
  min-width: 0;
  gap: ${Spacing.xs}px;
`;

const NotificationHeader = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding-right: ${Spacing.md}px;
`;

const NotificationTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  flex: 1;
`;

const NotificationTimestamp = styled.Text`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.medium};
  color: ${Colors.light.textTertiary};
  margin-left: ${Spacing.sm}px;
`;

const NotificationDescription = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
  line-height: ${FontSizes.sm * 1.5}px;
`;

const ActionButtons = styled.View`
  flex-direction: row;
  gap: ${Spacing.md}px;
  margin-top: ${Spacing.md}px;
`;

const ActionButton = styled.Pressable<{ isPrimary: boolean; isDark: boolean }>`
  flex: 1;
  height: 40px;
  border-radius: ${BorderRadius.lg}px;
  background-color: ${(props) =>
    props.isPrimary
      ? PRIMARY_COLOR
      : props.isDark
      ? "transparent"
      : Colors.light.background};
  border-width: ${(props) => (props.isPrimary ? 0 : 1)}px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  align-items: center;
  justify-content: center;
  shadow-color: ${(props) => (props.isPrimary ? PRIMARY_COLOR : "transparent")};
  shadow-offset: 0px 2px;
  shadow-opacity: ${(props) => (props.isPrimary ? 0.2 : 0)};
  shadow-radius: 8px;
  elevation: ${(props) => (props.isPrimary ? 2 : 0)};
`;

const ActionButtonText = styled.Text<{ isPrimary: boolean; isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) =>
    props.isPrimary
      ? "#ffffff"
      : props.isDark
      ? Colors.dark.textSecondary
      : Colors.light.textSecondary};
`;

const Divider = styled.View<{ isDark: boolean }>`
  height: 1px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  margin: ${Spacing.sm}px ${Spacing.xl}px;
`;

const EndMessage = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${Spacing["2xl"]}px;
`;

const EndMessageText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textTertiary : Colors.light.textTertiary};
`;

const BackButton = styled.Pressable<{ isDark: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

// Helper function to get icon and color for notification type
const getNotificationIcon = (
  type: NotificationType
): {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
  bgColor: string;
} => {
  switch (type) {
    case "booking":
      return {
        name: "event-available",
        color: "#9333ea",
        bgColor: "rgba(147, 51, 234, 0.1)",
      };
    case "payment":
      return {
        name: "account-balance-wallet",
        color: "#16a34a",
        bgColor: "rgba(22, 163, 74, 0.1)",
      };
    case "reminder":
      return {
        name: "schedule",
        color: "#ea580c",
        bgColor: "rgba(234, 88, 12, 0.1)",
      };
    case "review":
      return {
        name: "star",
        color: "#eab308",
        bgColor: "rgba(234, 179, 8, 0.1)",
      };
    case "cancellation":
      return {
        name: "event-busy",
        color: "#ef4444",
        bgColor: "rgba(239, 68, 68, 0.1)",
      };
    case "system":
      return {
        name: "verified",
        color: "#64748b",
        bgColor: "rgba(100, 116, 139, 0.1)",
      };
    default:
      return {
        name: "notifications",
        color: "#64748b",
        bgColor: "rgba(100, 116, 139, 0.1)",
      };
  }
};

export default function NotificationsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";

  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "booking",
      title: "New Booking Request",
      description: "Ngozi O. requested Goddess Braids for tomorrow at 2:00 PM.",
      timestamp: "2m ago",
      isRead: false,
      section: "today",
      actions: {
        confirm: () => console.log("Confirm booking"),
        decline: () => console.log("Decline booking"),
      },
    },
    {
      id: "2",
      type: "payment",
      title: "Payment Received",
      description: "Wallet funded with ₦15,000 for Order #2891.",
      timestamp: "1h ago",
      isRead: false,
      section: "today",
    },
    {
      id: "3",
      type: "reminder",
      title: "Upcoming Appt",
      description: "Client Chioma A. arriving in 30 mins for Wig Install.",
      timestamp: "3h ago",
      isRead: false,
      section: "today",
    },
    {
      id: "4",
      type: "review",
      title: "New 5-Star Review",
      description: 'Adesuwa left a review: "Loved the service!..."',
      timestamp: "1d ago",
      isRead: true,
      section: "yesterday",
    },
    {
      id: "5",
      type: "cancellation",
      title: "Booking Cancelled",
      description: "Order #2044 was cancelled by the client.",
      timestamp: "1d ago",
      isRead: true,
      section: "yesterday",
    },
    {
      id: "6",
      type: "system",
      title: "Profile Verified",
      description: "You can now accept online card payments.",
      timestamp: "1d ago",
      isRead: true,
      section: "yesterday",
    },
  ]);

  // Filter notifications based on active filter
  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    if (activeFilter === "Orders") {
      filtered = filtered.filter(
        (n) =>
          n.type === "booking" ||
          n.type === "cancellation" ||
          n.type === "reminder"
      );
    } else if (activeFilter === "Payments") {
      filtered = filtered.filter((n) => n.type === "payment");
    } else if (activeFilter === "System") {
      filtered = filtered.filter(
        (n) => n.type === "system" || n.type === "review"
      );
    }

    return filtered;
  }, [notifications, activeFilter]);

  // Group notifications by section
  const todayNotifications = filteredNotifications.filter(
    (n) => n.section === "today"
  );
  const yesterdayNotifications = filteredNotifications.filter(
    (n) => n.section === "yesterday"
  );

  // Count unread notifications
  const todayUnreadCount = todayNotifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleConfirm = (id: string) => {
    console.log("Confirm notification:", id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleDecline = (id: string) => {
    console.log("Decline notification:", id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleBack = () => {
    router.back();
  };

  const renderNotification = (notification: Notification) => {
    const iconInfo = getNotificationIcon(notification.type);
    const isDarkMode = isDark;

    return (
      <NotificationCard
        key={notification.id}
        isDark={isDarkMode}
        isRead={notification.isRead}
      >
        {!notification.isRead && <UnreadDot isDark={isDarkMode} />}
        <NotificationContent>
          <NotificationIconContainer
            color={
              isDarkMode
                ? iconInfo.bgColor.replace("0.1", "0.2")
                : iconInfo.bgColor
            }
            isDark={isDarkMode}
          >
            <MaterialIcons
              name={iconInfo.name}
              size={24}
              color={iconInfo.color}
            />
          </NotificationIconContainer>
          <NotificationTextContent>
            <NotificationHeader>
              <NotificationTitle isDark={isDarkMode}>
                {notification.title}
              </NotificationTitle>
              <NotificationTimestamp>
                {notification.timestamp}
              </NotificationTimestamp>
            </NotificationHeader>
            <NotificationDescription isDark={isDarkMode}>
              {notification.description}
            </NotificationDescription>
            {notification.actions && (
              <ActionButtons>
                <ActionButton
                  isPrimary
                  isDark={isDarkMode}
                  onPress={() => {
                    notification.actions?.confirm?.();
                    handleConfirm(notification.id);
                  }}
                  android_ripple={{
                    color: "rgba(255, 255, 255, 0.2)",
                    borderless: false,
                  }}
                >
                  <ActionButtonText isPrimary isDark={isDarkMode}>
                    Confirm
                  </ActionButtonText>
                </ActionButton>
                <ActionButton
                  isPrimary={false}
                  isDark={isDarkMode}
                  onPress={() => {
                    notification.actions?.decline?.();
                    handleDecline(notification.id);
                  }}
                  android_ripple={{
                    color: isDarkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)",
                    borderless: false,
                  }}
                >
                  <ActionButtonText isPrimary={false} isDark={isDarkMode}>
                    Decline
                  </ActionButtonText>
                </ActionButton>
              </ActionButtons>
            )}
          </NotificationTextContent>
        </NotificationContent>
      </NotificationCard>
    );
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

        <HeaderTitle isDark={isDark}>Notifications</HeaderTitle>
        <MarkAllReadButton
          onPress={handleMarkAllRead}
          android_ripple={{
            color: PRIMARY_COLOR + "20",
            borderless: true,
          }}
        >
          <MarkAllReadText>Mark all read</MarkAllReadText>
        </MarkAllReadButton>
      </Header>

      {/* Filter Chips */}
      <FilterSection isDark={isDark}>
        <FilterScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: Spacing.xl }}
        >
          {(["All", "Orders", "Payments", "System"] as FilterType[]).map(
            (filter) => (
              <FilterChip
                key={filter}
                isActive={activeFilter === filter}
                isDark={isDark}
                onPress={() => setActiveFilter(filter)}
                android_ripple={{
                  color:
                    activeFilter === filter
                      ? "rgba(255, 255, 255, 0.2)"
                      : isDark
                      ? "rgba(255, 255, 255, 0.05)"
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
        </FilterScrollView>
      </FilterSection>

      {/* Scrollable Content */}
      <ScrollContent
        isDark={isDark}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ContentWrapper>
          {/* Today Section */}
          {todayNotifications.length > 0 && (
            <Section>
              <SectionHeader>
                <SectionTitle isDark={isDark}>Today</SectionTitle>
                {todayUnreadCount > 0 && (
                  <SectionBadge>
                    <SectionBadgeText>{todayUnreadCount} New</SectionBadgeText>
                  </SectionBadge>
                )}
              </SectionHeader>
              {todayNotifications.map((notification) =>
                renderNotification(notification)
              )}
            </Section>
          )}

          {/* Divider */}
          {todayNotifications.length > 0 &&
            yesterdayNotifications.length > 0 && <Divider isDark={isDark} />}

          {/* Yesterday Section */}
          {yesterdayNotifications.length > 0 && (
            <Section>
              <SectionHeader>
                <SectionTitle isDark={isDark}>Yesterday</SectionTitle>
              </SectionHeader>
              {yesterdayNotifications.map((notification) =>
                renderNotification(notification)
              )}
            </Section>
          )}

          {/* End Message */}
          {filteredNotifications.length === 0 ? (
            <EndMessage>
              <EndMessageText isDark={isDark}>
                No notifications found
              </EndMessageText>
            </EndMessage>
          ) : (
            <EndMessage>
              <EndMessageText isDark={isDark}>
                No more notifications
              </EndMessageText>
            </EndMessage>
          )}
        </ContentWrapper>
      </ScrollContent>
    </Container>
  );
}
