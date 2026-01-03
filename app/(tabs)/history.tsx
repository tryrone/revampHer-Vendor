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
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

// Order History Type
type OrderHistory = {
  id: string;
  clientName: string;
  serviceName: string;
  date: string;
  time: string;
  price: string;
  status: "Completed" | "Cancelled" | "Refunded";
  clientImageUrl?: string;
  serviceIcon: keyof typeof MaterialIcons.glyphMap;
  month: "this" | "last";
};

// Styled Components
const Container = styled.View<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundSecondary};
`;

const StickyHeader = styled.View<{ paddingTop: number; isDark: boolean }>`
  position: sticky;
  top: 0;
  z-index: 30;
  background-color: ${(props) =>
    props.isDark
      ? Colors.dark.background + "F5"
      : Colors.light.backgroundSecondary + "F5"};
  padding-top: ${(props) => props.paddingTop}px;
`;

const HeaderTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${Spacing.md}px ${Spacing.xl}px;
`;

const HeaderTitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes["2xl"]}px;
  font-weight: ${FontWeights.extrabold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  letter-spacing: -0.5px;
`;

const CalendarButton = styled.Pressable<{ isDark: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  align-items: center;
  justify-content: center;
  shadow-color: rgba(0, 0, 0, 0.05);
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 4px;
  elevation: 2;
`;

const SearchContainer = styled.View`
  padding: 0 ${Spacing.xl}px ${Spacing.sm}px;
`;

const SearchInputContainer = styled.View<{
  isFocused: boolean;
  isDark: boolean;
}>`
  position: relative;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  border-radius: ${BorderRadius.xl}px;
  shadow-color: rgba(0, 0, 0, 0.05);
  shadow-offset: 0px 4px;
  shadow-opacity: 1;
  shadow-radius: 20px;
  elevation: 2;
`;

const SearchIcon = styled.View`
  position: absolute;
  left: ${Spacing.md}px;
  z-index: 1;
`;

const SearchInput = styled.TextInput<{ isDark: boolean }>`
  flex: 1;
  height: 48px;
  padding-left: ${Spacing["3xl"]}px;
  padding-right: ${Spacing.md}px;
  font-size: ${FontSizes.base}px;
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const FilterContainer = styled.View`
  padding: ${Spacing.md}px ${Spacing.xl}px;
  overflow: hidden;
`;

const FilterScrollView = styled.ScrollView`
  flex-direction: row;
`;

const FilterChip = styled.Pressable<{ isActive: boolean; isDark: boolean }>`
  padding: ${Spacing.sm + 2}px ${Spacing.xl}px;
  border-radius: ${BorderRadius.xl}px;
  background-color: ${(props) =>
    props.isActive
      ? PRIMARY_COLOR
      : props.isDark
      ? Colors.dark.backgroundTertiary
      : Colors.light.background};
  margin-right: ${Spacing.md}px;
  shadow-color: ${(props) =>
    props.isActive ? PRIMARY_COLOR : "rgba(0, 0, 0, 0.05)"};
  shadow-offset: 0px 2px;
  shadow-opacity: ${(props) => (props.isActive ? 0.2 : 1)};
  shadow-radius: ${(props) => (props.isActive ? 8 : 4)}px;
  elevation: ${(props) => (props.isActive ? 4 : 2)};
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

const HeaderDivider = styled.View<{ isDark: boolean }>`
  height: 1px;
  width: 100%;
  background-color: ${(props) =>
    props.isDark ? "rgba(148, 163, 184, 0.1)" : "rgba(226, 232, 240, 0.5)"};
  opacity: 0.5;
`;

const ScrollContent = styled.ScrollView<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundSecondary};
`;

const ContentWrapper = styled.View`
  padding: ${Spacing.md}px ${Spacing.xl}px;
  gap: ${Spacing.md}px;
  padding-bottom: ${Spacing["6xl"]}px;
`;

const SectionHeader = styled.View`
  padding-top: ${Spacing.md}px;
  margin-bottom: ${Spacing.sm}px;
`;

const SectionHeaderText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const OrderCard = styled.Pressable<{ isDark: boolean; isCancelled: boolean }>`
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  border-radius: ${BorderRadius["2xl"]}px;
  padding: ${Spacing.md}px;
  border-width: 1px;
  border-color: ${(props) =>
    props.isCancelled
      ? props.isDark
        ? "rgba(239, 68, 68, 0.3)"
        : "rgba(254, 226, 226, 1)"
      : "transparent"};
  shadow-color: rgba(0, 0, 0, 0.05);
  shadow-offset: 0px 4px;
  shadow-opacity: 1;
  shadow-radius: 20px;
  elevation: 2;
`;

const OrderCardContent = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${Spacing.md}px;
`;

const AvatarContainer = styled.View<{ isDark: boolean }>`
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  border-width: 2px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  overflow: hidden;
`;

const Avatar = styled(Image)`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

const AvatarPlaceholder = styled.View<{ isDark: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${(props) =>
    props.isDark
      ? Colors.dark.backgroundTertiary
      : Colors.light.backgroundTertiary};
  align-items: center;
  justify-content: center;
`;

const AvatarInitials = styled.View<{ isDark: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #c7d2fe;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
`;

const AvatarInitialsText = styled.Text`
  font-size: ${FontSizes.lg}px;
  font-weight: ${FontWeights.bold};
  color: #6366f1;
`;

const ServiceIconBadge = styled.View<{ isDark: boolean }>`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  padding: 2px;
  align-items: center;
  justify-content: center;
`;

const ServiceIconContainer = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${PRIMARY_COLOR}1A;
  align-items: center;
  justify-content: center;
`;

const OrderInfo = styled.View`
  flex: 1;
  min-width: 0;
  gap: ${Spacing.xs}px;
`;

const OrderHeader = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${Spacing.sm}px;
`;

const ClientName = styled.Text<{ isDark: boolean; isCancelled: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) =>
    props.isCancelled
      ? props.isDark
        ? Colors.dark.textTertiary
        : Colors.light.textTertiary
      : props.isDark
      ? Colors.dark.text
      : Colors.light.text};
  flex: 1;
`;

const OrderPrice = styled.Text<{ isDark: boolean; isCancelled: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) =>
    props.isCancelled
      ? props.isDark
        ? Colors.dark.textTertiary
        : Colors.light.textTertiary
      : PRIMARY_COLOR};
  text-decoration-line: ${(props) =>
    props.isCancelled ? "line-through" : "none"};
`;

const ServiceName = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
  margin-top: ${Spacing.xs}px;
`;

const OrderFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${Spacing.sm}px;
`;

const OrderDateTime = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textTertiary : Colors.light.textTertiary};
`;

const StatusBadge = styled.View<{ status: string; isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.xs}px;
  padding: ${Spacing.xs}px ${Spacing.sm}px;
  border-radius: ${BorderRadius.md}px;
  background-color: ${(props) => {
    if (props.status === "Completed") {
      return props.isDark ? "rgba(34, 197, 94, 0.2)" : "rgba(220, 252, 231, 1)";
    } else if (props.status === "Cancelled") {
      return props.isDark ? "rgba(239, 68, 68, 0.2)" : "rgba(254, 226, 226, 1)";
    }
    return props.isDark
      ? Colors.dark.backgroundTertiary
      : Colors.light.backgroundTertiary;
  }};
`;

const StatusBadgeText = styled.Text<{ status: string; isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.semibold};
  color: ${(props) => {
    if (props.status === "Completed") {
      return props.isDark ? "#86efac" : "#166534";
    } else if (props.status === "Cancelled") {
      return props.isDark ? "#fca5a5" : "#991b1b";
    }
    return props.isDark
      ? Colors.dark.textSecondary
      : Colors.light.textSecondary;
  }};
`;

const StatusDot = styled.View<{ status: string; isDark: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${(props) => {
    if (props.status === "Completed") {
      return props.isDark ? "#86efac" : "#16a34a";
    }
    return "transparent";
  }};
`;

type FilterType =
  | "All"
  | "Completed"
  | "Cancelled"
  | "Refunded"
  | "Last 30 Days";

export default function HistoryScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [searchFocused, setSearchFocused] = useState(false);

  // Sample order history data
  const allOrders: OrderHistory[] = [
    {
      id: "1",
      clientName: "Amaka Obi",
      serviceName: "Braids - Box Braids (Medium)",
      date: "Oct 24",
      time: "2:00 PM",
      price: "₦15,000",
      status: "Completed",
      serviceIcon: "content-cut",
      month: "this",
    },
    {
      id: "2",
      clientName: "Chioma Adebayo",
      serviceName: "Silk Press & Trim",
      date: "Oct 22",
      time: "10:00 AM",
      price: "₦12,500",
      status: "Completed",
      serviceIcon: "spa",
      month: "this",
    },
    {
      id: "3",
      clientName: "Zainab Musa",
      serviceName: "Cornrows - Simple",
      date: "Sep 28",
      time: "4:30 PM",
      price: "₦8,000",
      status: "Cancelled",
      serviceIcon: "content-cut",
      month: "last",
    },
    {
      id: "4",
      clientName: "Funke Akindele",
      serviceName: "Full Bridal Package Trial",
      date: "Sep 15",
      time: "9:00 AM",
      price: "₦25,000",
      status: "Completed",
      serviceIcon: "face",
      month: "last",
    },
    {
      id: "5",
      clientName: "Tolu Balogun",
      serviceName: "Wash & Blowdry",
      date: "Sep 10",
      time: "1:15 PM",
      price: "₦5,000",
      status: "Completed",
      serviceIcon: "content-cut",
      month: "last",
    },
  ];

  // Filter and search logic
  const filteredOrders = useMemo(() => {
    let filtered = allOrders;

    // Apply status filter
    if (activeFilter !== "All" && activeFilter !== "Last 30 Days") {
      filtered = filtered.filter((order) => order.status === activeFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.clientName.toLowerCase().includes(query) ||
          order.serviceName.toLowerCase().includes(query)
      );
    }

    // Group by month
    const thisMonth = filtered.filter((order) => order.month === "this");
    const lastMonth = filtered.filter((order) => order.month === "last");

    return { thisMonth, lastMonth };
  }, [searchQuery, activeFilter]);

  const handleOrderPress = (order: OrderHistory) => {
    router.push({
      pathname: "/order-details",
      params: {
        orderId: order.id,
        status: order.status,
        placedDate: `${order.date} • ${order.time}`,
        serviceTitle: order.serviceName,
        clientName: order.clientName,
        clientAddress: "Address not available",
        rating: "4.8",
        orderCount: "5",
        dateTime: `${order.date} • ${order.time}`,
        duration: "4 Hours",
        locationType: "Home Service",
        serviceCost: order.price,
        transportFee: "₦2,000",
        totalPaid: order.price,
        paymentMethod: "Paid via Transfer",
      },
    });
  };

  const handleCalendarPress = () => {
    console.log("Open calendar");
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderOrderCard = (order: OrderHistory) => {
    const isCancelled = order.status === "Cancelled";
    const hasImage = !!order.clientImageUrl;

    return (
      <OrderCard
        key={order.id}
        isDark={isDark}
        isCancelled={isCancelled}
        onPress={() => handleOrderPress(order)}
        android_ripple={{
          color: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
          borderless: false,
        }}
      >
        <OrderCardContent>
          <AvatarContainer isDark={isDark}>
            {hasImage ? (
              <Avatar source={{ uri: order.clientImageUrl }} />
            ) : order.clientName === "Tolu Balogun" ? (
              <AvatarInitials isDark={isDark}>
                <AvatarInitialsText>
                  {getInitials(order.clientName)}
                </AvatarInitialsText>
              </AvatarInitials>
            ) : (
              <AvatarPlaceholder isDark={isDark}>
                <MaterialIcons
                  name="person"
                  size={32}
                  color={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
              </AvatarPlaceholder>
            )}
            <ServiceIconBadge isDark={isDark}>
              <ServiceIconContainer>
                <MaterialIcons
                  name={order.serviceIcon}
                  size={12}
                  color={PRIMARY_COLOR}
                />
              </ServiceIconContainer>
            </ServiceIconBadge>
          </AvatarContainer>

          <OrderInfo>
            <OrderHeader>
              <ClientName isDark={isDark} isCancelled={isCancelled}>
                {order.clientName}
              </ClientName>
              <OrderPrice isDark={isDark} isCancelled={isCancelled}>
                {order.price}
              </OrderPrice>
            </OrderHeader>
            <ServiceName isDark={isDark}>{order.serviceName}</ServiceName>
            <OrderFooter>
              <OrderDateTime isDark={isDark}>
                {order.date} • {order.time}
              </OrderDateTime>
              <StatusBadge status={order.status} isDark={isDark}>
                {order.status === "Completed" && (
                  <StatusDot status={order.status} isDark={isDark} />
                )}
                {order.status === "Cancelled" && (
                  <MaterialIcons
                    name="cancel"
                    size={14}
                    color={isDark ? "#fca5a5" : "#991b1b"}
                  />
                )}
                <StatusBadgeText status={order.status} isDark={isDark}>
                  {order.status}
                </StatusBadgeText>
              </StatusBadge>
            </OrderFooter>
          </OrderInfo>
        </OrderCardContent>
      </OrderCard>
    );
  };

  return (
    <Container isDark={isDark}>
      {/* Sticky Header */}
      <StickyHeader paddingTop={insets.top} isDark={isDark}>
        <HeaderTop>
          <HeaderTitle isDark={isDark}>Order History</HeaderTitle>
          <CalendarButton
            isDark={isDark}
            onPress={handleCalendarPress}
            android_ripple={{
              color: isDark
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.05)",
              borderless: false,
              radius: 20,
            }}
          >
            <MaterialIcons
              name="calendar-month"
              size={24}
              color={isDark ? Colors.dark.text : Colors.light.text}
            />
          </CalendarButton>
        </HeaderTop>

        {/* Search Bar */}
        <SearchContainer>
          <SearchInputContainer isFocused={searchFocused} isDark={isDark}>
            <SearchIcon>
              <MaterialIcons
                name="search"
                size={20}
                color={
                  isDark
                    ? Colors.dark.textSecondary
                    : Colors.light.textSecondary
                }
              />
            </SearchIcon>
            <SearchInput
              isDark={isDark}
              placeholder="Search client or service..."
              placeholderTextColor={
                isDark ? Colors.dark.textTertiary : Colors.light.textTertiary
              }
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </SearchInputContainer>
        </SearchContainer>

        {/* Filter Chips */}
        <FilterContainer>
          <FilterScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: Spacing.xl }}
          >
            {(
              [
                "All",
                "Completed",
                "Cancelled",
                "Refunded",
                "Last 30 Days",
              ] as FilterType[]
            ).map((filter) => (
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
            ))}
          </FilterScrollView>
        </FilterContainer>

        <HeaderDivider isDark={isDark} />
      </StickyHeader>

      {/* Scrollable Content */}
      <ScrollContent
        isDark={isDark}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ContentWrapper>
          {/* This Month Section */}
          {filteredOrders.thisMonth.length > 0 && (
            <>
              <SectionHeader>
                <SectionHeaderText isDark={isDark}>
                  This Month
                </SectionHeaderText>
              </SectionHeader>
              {filteredOrders.thisMonth.map((order) => renderOrderCard(order))}
            </>
          )}

          {/* Last Month Section */}
          {filteredOrders.lastMonth.length > 0 && (
            <>
              <SectionHeader>
                <SectionHeaderText isDark={isDark}>
                  Last Month
                </SectionHeaderText>
              </SectionHeader>
              {filteredOrders.lastMonth.map((order) => renderOrderCard(order))}
            </>
          )}
        </ContentWrapper>
      </ScrollContent>
    </Container>
  );
}
