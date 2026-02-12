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
  OrderStatus,
  type SalonOrdersQuery,
  useGetMyProfileQuery,
  useSalonOrdersQuery,
} from "@/types/gqlReactTypings.generated";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";
import DatePicker from "react-native-date-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

// Order History Type
type OrderHistory = {
  id: string;
  orderDisplayId: string;
  orderQueryId: string;
  customerName: string;
  customerId: string;
  serviceName: string;
  date: string;
  time: string;
  price: string;
  status: "Completed" | "Cancelled";
  rawStatus: OrderStatus;
  createdAt: Date;
  clientImageUrl?: string;
  serviceIcon: keyof typeof MaterialIcons.glyphMap;
  month: "this" | "last" | "older";
  location: string;
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

const EmptyState = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${Spacing["4xl"]}px ${Spacing.md}px;
  gap: ${Spacing.sm}px;
`;

const EmptyStateText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
  text-align: center;
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

  border-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
`;

const Avatar = styled(Image)`
  width: 56px;
  height: 56px;
  border-radius: 28px;
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

const CustomerIdText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textTertiary : Colors.light.textTertiary};
  margin-top: 2px;
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

type FilterType = "All" | "Completed" | "Cancelled" | "Last 30 Days";

type ApiOrder = SalonOrdersQuery["salonOrders"]["orders"][number];

const HISTORY_STATUSES = new Set<OrderStatus>([
  OrderStatus.AcceptedBySalon,
  OrderStatus.Delivered,
  OrderStatus.Cancelled,
]);

const toDate = (value: unknown): Date | null => {
  if (!value) {
    return null;
  }

  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatAmount = (amount: number): string => {
  return amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  });
};

const formatDate = (value: Date): string =>
  value.toLocaleDateString("en-NG", {
    month: "short",
    day: "numeric",
  });

const formatTime = (value: Date): string =>
  value.toLocaleTimeString("en-NG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

const isSameDay = (first: Date, second: Date): boolean => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

const resolveMonthBucket = (date: Date): "this" | "last" | "older" => {
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  if (date >= thisMonthStart) {
    return "this";
  }
  if (date >= lastMonthStart) {
    return "last";
  }
  return "older";
};

const formatCustomerName = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};

const mapOrderToHistory = (order: ApiOrder): OrderHistory | null => {
  const createdAt = toDate(order.createdAt);
  if (!createdAt) {
    return null;
  }

  const itemCount = order.items.length;
  const serviceName = itemCount > 1 ? `${itemCount} services` : "Service";
  const customerName = formatCustomerName(
    order.customer.fullName?.trim() || "Customer",
  );
  const customerId = order.customerId.slice(0, 6).toUpperCase();

  return {
    id: order.id,
    orderDisplayId: order.id.slice(-6).toUpperCase(),
    orderQueryId: order.id,
    customerName,
    customerId,
    serviceName,
    date: formatDate(createdAt),
    time: formatTime(createdAt),
    price: formatAmount(order.totalAmount),
    status: order.status === OrderStatus.Cancelled ? "Cancelled" : "Completed",
    rawStatus: order.status,
    createdAt,
    clientImageUrl: order.customer.profileImage ?? undefined,
    serviceIcon: "content-cut",
    month: resolveMonthBucket(createdAt),
    location: order.pickupAddress?.address?.trim() || "Address not available",
  };
};

export default function HistoryScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [searchFocused, setSearchFocused] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [pickerDate, setPickerDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const { data: profileData } = useGetMyProfileQuery();
  const salonId = profileData?.me.salonProfile?.id;
  const { data, loading, refetch } = useSalonOrdersQuery({
    variables: {
      input: {
        limit: 100,
        salonId,
      },
    },
    skip: !salonId,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  const allOrders = useMemo(() => {
    return (
      data?.salonOrders.orders
        .filter((order) => HISTORY_STATUSES.has(order.status))
        .map(mapOrderToHistory)
        .filter((order): order is OrderHistory => order !== null)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) ?? []
    );
  }, [data?.salonOrders.orders]);

  const filteredOrders = useMemo(() => {
    let filtered = allOrders;

    if (activeFilter === "Completed") {
      filtered = filtered.filter(
        (order) => order.rawStatus === OrderStatus.Delivered,
      );
    } else if (activeFilter === "Cancelled") {
      filtered = filtered.filter(
        (order) => order.rawStatus === OrderStatus.Cancelled,
      );
    } else if (activeFilter === "Last 30 Days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = filtered.filter((order) => order.createdAt >= thirtyDaysAgo);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.customerName.toLowerCase().includes(query) ||
          order.customerId.toLowerCase().includes(query) ||
          order.serviceName.toLowerCase().includes(query),
      );
    }

    if (selectedDate) {
      filtered = filtered.filter((order) =>
        isSameDay(order.createdAt, selectedDate),
      );
    }

    const thisMonth = filtered.filter((order) => order.month === "this");
    const lastMonth = filtered.filter((order) => order.month === "last");
    const older = filtered.filter((order) => order.month === "older");

    return { thisMonth, lastMonth, older, total: filtered.length };
  }, [activeFilter, allOrders, searchQuery, selectedDate]);

  const handleOrderPress = (order: OrderHistory) => {
    router.push({
      pathname: "/order-details",
      params: {
        orderId: order.orderDisplayId,
        orderQueryId: order.orderQueryId,
        status: order.rawStatus,
        placedDate: `${order.date} • ${order.time}`,
        serviceTitle: order.serviceName,
        clientName: order.customerName,
        clientAddress: order.location,
        rating: "0.0",
        orderCount: "0",
        dateTime: `${order.date} • ${order.time}`,
        duration: "N/A",
        locationType: "Home Service",
        serviceCost: order.price,
        transportFee: formatAmount(0),
        totalPaid: order.price,
        paymentMethod: "Payment details unavailable",
      },
    });
  };

  const handleCalendarPress = () => {
    setPickerDate(selectedDate || new Date());
    setIsDatePickerOpen(true);
  };

  const clearDateFilter = () => {
    setSelectedDate(null);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
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
            ) : (
              <AvatarInitials isDark={isDark}>
                <AvatarInitialsText>
                  {getInitials(order.customerName)}
                </AvatarInitialsText>
              </AvatarInitials>
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
                {order.customerName}
              </ClientName>
              <OrderPrice isDark={isDark} isCancelled={isCancelled}>
                {order.price}
              </OrderPrice>
            </OrderHeader>
            <CustomerIdText isDark={isDark}>
              Customer ID: {order.customerId}
            </CustomerIdText>
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
              ["All", "Completed", "Cancelled", "Last 30 Days"] as FilterType[]
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
            {selectedDate && (
              <FilterChip
                isActive
                isDark={isDark}
                onPress={clearDateFilter}
                android_ripple={{
                  color: isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                  borderless: false,
                }}
              >
                <FilterChipText isActive isDark={isDark}>
                  {`Date: ${formatDate(selectedDate)} ✕`}
                </FilterChipText>
              </FilterChip>
            )}
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={PRIMARY_COLOR}
            colors={[PRIMARY_COLOR]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <ContentWrapper>
          {loading && allOrders.length === 0 && (
            <EmptyState>
              <ActivityIndicator size="small" color={PRIMARY_COLOR} />
              <EmptyStateText isDark={isDark}>
                Loading order history...
              </EmptyStateText>
            </EmptyState>
          )}

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

          {filteredOrders.older.length > 0 && (
            <>
              <SectionHeader>
                <SectionHeaderText isDark={isDark}>Older</SectionHeaderText>
              </SectionHeader>
              {filteredOrders.older.map((order) => renderOrderCard(order))}
            </>
          )}

          {!loading && filteredOrders.total === 0 && (
            <EmptyState>
              <MaterialIcons
                name="history"
                size={24}
                color={
                  isDark
                    ? Colors.dark.textSecondary
                    : Colors.light.textSecondary
                }
              />
              <EmptyStateText isDark={isDark}>
                No order history found for the selected filters.
              </EmptyStateText>
            </EmptyState>
          )}
        </ContentWrapper>
      </ScrollContent>
      <DatePicker
        modal
        open={isDatePickerOpen}
        date={pickerDate}
        mode="date"
        onConfirm={(date: Date) => {
          setIsDatePickerOpen(false);
          setSelectedDate(date);
        }}
        onCancel={() => {
          setIsDatePickerOpen(false);
        }}
      />
    </Container>
  );
}
