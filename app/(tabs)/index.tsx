import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeights,
  PRIMARY_COLOR,
  Spacing,
} from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { showToast } from "@/utils/toast";
import type {
  SalonCreatedOrdersQuery,
  SalonOrdersQuery,
} from "@/types/gqlReactTypings.generated";
import {
  OrderStatus,
  StatusActor,
  useGetMyProfileQuery,
  useSalonCreatedOrdersQuery,
  useSalonOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/types/gqlReactTypings.generated";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, RefreshControl, View } from "react-native";
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
  background-color: ${(props) =>
    props.isDark
      ? Colors.dark.background + "F5"
      : Colors.light.backgroundSecondary + "F5"};
  padding: ${Spacing.md}px;
  padding-top: ${(props) => props.paddingTop + Spacing.md}px;
  padding-bottom: ${Spacing.sm}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.isDark ? "rgba(148, 163, 184, 0.1)" : "rgba(226, 232, 240, 0.5)"};
`;

const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProfileSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.md}px;
`;

const ProfileImageContainer = styled.View`
  position: relative;
`;

const ProfileImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const ProfilePlaceholder = styled.View<{ isDark: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isDark
      ? Colors.dark.backgroundTertiary
      : Colors.light.backgroundTertiary};
  align-items: center;
  justify-content: center;
`;

const OnlineIndicator = styled.View<{ isDark: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: #22c55e;
  border-width: 2px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.background};
`;

const GreetingText = styled.View`
  gap: ${Spacing.xs}px;
`;

const GreetingLabel = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const GreetingName = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.lg}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const NotificationButton = styled.Pressable<{ isDark: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  border-width: 1px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  align-items: center;
  justify-content: center;
  position: relative;
  shadow-color: rgba(0, 0, 0, 0.05);
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 4px;
  elevation: 2;
`;

const NotificationBadge = styled.View`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #ef4444;
`;

const MainContent = styled.ScrollView<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundSecondary};
`;

const ContentWrapper = styled.View`
  padding: ${Spacing.md}px;
  gap: ${Spacing["2xl"]}px;
  padding-bottom: ${Spacing["6xl"]}px;
`;

const StatsSection = styled.View`
  flex-direction: row;
  gap: ${Spacing.md}px;
`;

const StatCard = styled.View<{ isDark: boolean }>`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  gap: ${Spacing.md}px;
  border-radius: ${BorderRadius["2xl"]}px;
  padding: ${Spacing.xl}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.backgroundTertiary : Colors.light.background};
  border-width: 1px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  shadow-color: rgba(0, 0, 0, 0.04);
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 8px;
  elevation: 2;
`;

const StatCardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.sm}px;
`;

const StatCardLabel = styled.Text<{ isDark: boolean; color: string }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${(props) => (props.isDark ? Colors.dark.textSecondary : props.color)};
`;

const StatCardValue = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes["2xl"]}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
  letter-spacing: -0.5px;
`;

const StatCardSubtitle = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.medium};
  color: ${(props) =>
    props.isDark ? Colors.dark.textTertiary : Colors.light.textTertiary};
  margin-top: ${Spacing.xs}px;
`;

const ProgressBarContainer = styled.View<{ isDark: boolean }>`
  width: 100%;
  height: 6px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.backgroundTertiary};
  border-radius: ${BorderRadius.full}px;
  overflow: hidden;
  margin-top: ${Spacing.xs}px;
`;

const ProgressBarFill = styled.View<{ percentage: number }>`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background-color: #22c55e;
  border-radius: ${BorderRadius.full}px;
`;

const CompletedValue = styled.View`
  flex-direction: row;
  align-items: flex-end;
  gap: ${Spacing.sm}px;
`;

const CompletedFraction = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.lg}px;
  font-weight: ${FontWeights.normal};
  color: ${(props) =>
    props.isDark ? Colors.dark.textTertiary : Colors.light.textTertiary};
`;

const TabsContainer = styled.View<{ paddingTop: number; isDark: boolean }>`
  top: ${(props) => props.paddingTop}px;
  z-index: 10;
  background-color: ${(props) =>
    props.isDark
      ? Colors.dark.background + "F5"
      : Colors.light.backgroundSecondary + "F5"};
  padding: ${Spacing.sm}px ${Spacing.md}px;
  margin: 0 -${Spacing.md}px;
`;

const TabsWrapper = styled.View<{ isDark: boolean }>`
  flex-direction: row;
  padding: ${Spacing.xs}px;
  background-color: ${(props) =>
    props.isDark ? "rgba(148, 163, 184, 0.15)" : "rgba(226, 232, 240, 0.6)"};
  border-radius: ${BorderRadius.xl}px;
  gap: ${Spacing.xs}px;
`;

const TabButton = styled.Pressable<{ isActive: boolean; isDark: boolean }>`
  flex: 1;
  padding: ${Spacing.sm}px ${Spacing.sm}px;
  border-radius: ${BorderRadius.lg}px;
  background-color: ${(props) =>
    props.isActive
      ? props.isDark
        ? Colors.dark.backgroundTertiary
        : Colors.light.background
      : "transparent"};
  align-items: center;
  justify-content: center;
  shadow-color: ${(props) =>
    props.isActive ? "rgba(0, 0, 0, 0.05)" : "transparent"};
  shadow-offset: 0px 2px;
  shadow-opacity: ${(props) => (props.isActive ? 1 : 0)};
  shadow-radius: 4px;
  elevation: ${(props) => (props.isActive ? 2 : 0)};
`;

const TabButtonText = styled.Text<{ isActive: boolean; isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-weight: ${(props) =>
    props.isActive ? FontWeights.bold : FontWeights.medium};
  color: ${(props) =>
    props.isActive
      ? props.isDark
        ? Colors.dark.text
        : Colors.light.text
      : props.isDark
        ? Colors.dark.textSecondary
        : Colors.light.textSecondary};
`;

const OrdersList = styled.View`
  gap: ${Spacing.md}px;
`;

const EmptyState = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${Spacing.xl}px;
  gap: ${Spacing.sm}px;
`;

const EmptyStateText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const OrderCard = styled.Pressable<{ isDark: boolean }>`
  flex-direction: column;
  gap: ${Spacing.md}px;
  border-radius: ${BorderRadius["2xl"]}px;
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

const OrderHeader = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const OrderClientInfo = styled.View`
  flex-direction: row;
  gap: ${Spacing.md}px;
  flex: 1;
`;

const OrderClientImagePlaceholder = styled.View<{ isDark: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: ${BorderRadius.xl}px;
  background-color: ${(props) =>
    props.isDark
      ? Colors.dark.backgroundTertiary
      : Colors.light.backgroundTertiary};
  align-items: center;
  justify-content: center;
`;

const OrderClientInitials = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.lg}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const OrderClientDetails = styled.View`
  flex: 1;
  gap: ${Spacing.xs}px;
`;

const OrderClientName = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.base}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const OrderService = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
`;

const TimeBadge = styled.View<{ isDark: boolean }>`
  padding: ${Spacing.xs}px ${Spacing.sm + 2}px;
  border-radius: ${BorderRadius.md}px;
  background-color: ${(props) =>
    props.isDark ? "rgba(48, 140, 232, 0.3)" : "rgba(239, 246, 255, 1)"};
`;

const TimeBadgeText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? PRIMARY_COLOR : "#2563EB")};
`;

const LocationRow = styled.View<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.sm}px;
  padding: ${Spacing.sm}px;
  background-color: ${(props) =>
    props.isDark ? Colors.dark.background : Colors.light.backgroundTertiary};
  border-radius: ${BorderRadius.lg}px;
`;

const LocationText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.sm}px;
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
  flex: 1;
`;

const OrderFooter = styled.View<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: ${Spacing.sm}px;
  border-top-width: 1px;
  border-top-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  margin-top: ${Spacing.xs}px;
`;

const OrderPrice = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.lg}px;
  font-weight: ${FontWeights.bold};
  color: ${(props) => (props.isDark ? Colors.dark.text : Colors.light.text)};
`;

const OrderStatusBadge = styled.View<{ isDark: boolean }>`
  padding: ${Spacing.xs}px ${Spacing.sm + 2}px;
  border-radius: ${BorderRadius.full}px;
  background-color: ${(props) =>
    props.isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(226, 232, 240, 0.7)"};
`;

const OrderStatusBadgeText = styled.Text<{ isDark: boolean }>`
  font-size: ${FontSizes.xs}px;
  font-weight: ${FontWeights.semibold};
  color: ${(props) =>
    props.isDark ? Colors.dark.textSecondary : Colors.light.textSecondary};
  text-transform: capitalize;
`;

const OrderActions = styled.View`
  flex-direction: row;
  gap: ${Spacing.sm}px;
  align-items: center;
`;

const DeclineButton = styled.TouchableOpacity<{ isDark: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${(props) =>
    props.isDark ? Colors.dark.border : Colors.light.border};
  align-items: center;
  justify-content: center;
`;

const AcceptButton = styled.TouchableOpacity`
  height: 40px;
  padding: 0 ${Spacing.xl}px;
  border-radius: ${BorderRadius.full}px;
  background-color: ${PRIMARY_COLOR};
  align-items: center;
  justify-content: center;
  shadow-color: ${PRIMARY_COLOR};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 4;
`;

const AcceptButtonText = styled.Text`
  font-size: ${FontSizes.sm}px;
  font-weight: ${FontWeights.bold};
  color: #ffffff;
`;

// Sample order data type
type Order = {
  id: string;
  rawStatus: OrderStatus;
  orderId: string;
  status: string;
  placedDate: string;
  serviceTitle: string;
  service: string;
  clientName: string;
  clientAddress: string;
  location: string;
  time: string;
  price: string;
  serviceCost: string;
  transportFee: string;
  totalPaid: string;
  paymentMethod: string;
  rating: string;
  orderCount: string;
  dateTime: string;
  duration: string;
  locationType: string;
  imageUrl?: string;
  clientImageUrl?: string;
  stylistImageUrl?: string;
};

type ApiOrder =
  | SalonCreatedOrdersQuery["salonCreatedOrders"]["orders"][number]
  | SalonOrdersQuery["salonOrders"]["orders"][number];

const NEW_STATUSES = new Set<OrderStatus>([OrderStatus.Created]);
const COMPLETED_STATUSES = new Set<OrderStatus>([OrderStatus.Delivered]);
const EXCLUDED_ACTIVE_STATUSES = new Set<OrderStatus>([
  OrderStatus.Cancelled,
  ...NEW_STATUSES,
  ...COMPLETED_STATUSES,
]);

const formatAmount = (amount: number): string => {
  return amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  });
};

const toDate = (value: unknown): Date | null => {
  if (!value) {
    return null;
  }

  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatTime = (value: unknown): string => {
  const date = toDate(value);
  if (!date) {
    return "--";
  }

  return date.toLocaleTimeString("en-NG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const formatDateTime = (value: unknown): string => {
  const date = toDate(value);
  if (!date) {
    return "Date unavailable";
  }

  return date.toLocaleString("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const statusLabel = (status: OrderStatus): string =>
  status.replace(/_/g, " ").toUpperCase();

const readableStatus = (status: OrderStatus): string =>
  status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatPersonName = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};

const getInitials = (name: string): string => {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getCustomerName = (order: ApiOrder): string => {
  if ("customer" in order && order.customer?.fullName?.trim()) {
    return formatPersonName(order.customer.fullName);
  }

  return `Customer ${order.customerId.slice(0, 6).toUpperCase()}`;
};

const getCustomerLocation = (order: ApiOrder): string => {
  if ("pickupAddress" in order && order.pickupAddress?.address?.trim()) {
    return order.pickupAddress.address.trim();
  }

  return "Location unavailable";
};

const mapOrderToUiOrder = (order: ApiOrder): Order => {
  const firstItem = order.items[0];
  const serviceName =
    firstItem && "nameSnapshot" in firstItem && firstItem.nameSnapshot
      ? firstItem.nameSnapshot
      : "Service";
  const amount = formatAmount(order.totalAmount);
  const customerName = getCustomerName(order);
  const customerLocation = getCustomerLocation(order);

  return {
    id: order.id,
    rawStatus: order.status,
    orderId: order.id.slice(-6).toUpperCase(),
    status: statusLabel(order.status),
    placedDate: formatDateTime(order.createdAt),
    serviceTitle: serviceName,
    clientName: customerName,
    clientAddress: customerLocation,
    service: serviceName,
    location: customerLocation,
    time: formatTime(order.createdAt),
    price: amount,
    serviceCost: amount,
    transportFee: formatAmount(0),
    totalPaid: amount,
    paymentMethod: "Payment details unavailable",
    rating: "0.0",
    orderCount: "0",
    dateTime: formatDateTime(order.createdAt),
    duration: "N/A",
    locationType: "Service",
  };
};

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";

  const [activeTab, setActiveTab] = useState<"new" | "active" | "completed">(
    "new",
  );
  const [refreshing, setRefreshing] = useState(false);
  const [processingOrderId, setProcessingOrderId] = useState<string | null>(null);

  const { data: profileData } = useGetMyProfileQuery();

  const {
    data: salonCreatedOrdersData,
    loading: inProgressLoading,
    refetch: refetchSalonCreatedOrders,
  } = useSalonCreatedOrdersQuery({
    variables: {
      input: { limit: 100, salonId: profileData?.me.salonProfile?.id },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    skip: !profileData?.me.salonProfile?.id,
  });

  const {
    data: salonOrdersData,
    loading: salonOrdersLoading,
    refetch: refetchSalonOrders,
  } = useSalonOrdersQuery({
    variables: {
      input: { limit: 100, salonId: profileData?.me.salonProfile?.id },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    skip: !profileData?.me.salonProfile?.id,
  });
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const isLoadingOrders = inProgressLoading || salonOrdersLoading;

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchSalonCreatedOrders(), refetchSalonOrders()]);
    } finally {
      setRefreshing(false);
    }
  }, [refetchSalonCreatedOrders, refetchSalonOrders]);

  const newOrders = useMemo(() => {
    return (
      salonCreatedOrdersData?.salonCreatedOrders.orders
        .filter((order) => NEW_STATUSES.has(order.status))
        .sort((a, b) => {
          const bUpdatedAt = toDate(b.updatedAt)?.getTime() ?? 0;
          const aUpdatedAt = toDate(a.updatedAt)?.getTime() ?? 0;
          return bUpdatedAt - aUpdatedAt;
        }) ?? []
    );
  }, [salonCreatedOrdersData?.salonCreatedOrders.orders]);

  const activeOrders = useMemo(() => {
    return (
      salonOrdersData?.salonOrders.orders
        .filter((order) => !EXCLUDED_ACTIVE_STATUSES.has(order.status))
        .sort((a, b) => {
          const bUpdatedAt = toDate(b.updatedAt)?.getTime() ?? 0;
          const aUpdatedAt = toDate(a.updatedAt)?.getTime() ?? 0;
          return bUpdatedAt - aUpdatedAt;
        }) ?? []
    );
  }, [salonOrdersData?.salonOrders.orders]);

  const completedOrders = useMemo(() => {
    return (
      salonOrdersData?.salonOrders.orders
        .filter((order) => COMPLETED_STATUSES.has(order.status))
        .sort((a, b) => {
          const bUpdatedAt = toDate(b.updatedAt)?.getTime() ?? 0;
          const aUpdatedAt = toDate(a.updatedAt)?.getTime() ?? 0;
          return bUpdatedAt - aUpdatedAt;
        }) ?? []
    );
  }, [salonOrdersData?.salonOrders.orders]);

  const tabOrders = useMemo(() => {
    if (activeTab === "new") {
      return newOrders.map(mapOrderToUiOrder);
    }
    if (activeTab === "active") {
      return activeOrders.map(mapOrderToUiOrder);
    }
    return completedOrders.map(mapOrderToUiOrder);
  }, [activeTab, activeOrders, completedOrders, newOrders]);

  const completedCount = completedOrders.length;
  const totalOrderCount =
    newOrders.length + activeOrders.length + completedCount;
  const completionPercentage =
    totalOrderCount > 0 ? (completedCount / totalOrderCount) * 100 : 0;
  const profileFullName = profileData?.me.fullName?.trim() || "Vendor";
  const greetingName = profileFullName.split(" ")[0] || profileFullName;

  const handleOrderPress = (order: Order) => {
    router.push({
      pathname: "/order-details",
      params: {
        orderId: order.orderId,
        orderQueryId: order.id,
        status: order.status,
        placedDate: order.placedDate,
        serviceTitle: order.serviceTitle,
        clientName: order.clientName,
        clientAddress: order.clientAddress,
        rating: order.rating,
        orderCount: order.orderCount,
        dateTime: order.dateTime,
        duration: order.duration,
        locationType: order.locationType,
        serviceCost: order.serviceCost,
        transportFee: order.transportFee,
        totalPaid: order.totalPaid,
        paymentMethod: order.paymentMethod,
      },
    });
  };

  const handleAccept = async (order: Order) => {
    if (processingOrderId) return;
    if (order.rawStatus !== OrderStatus.Created) {
      showToast({
        type: "error",
        text: "Only newly created orders can be accepted.",
      });
      return;
    }

    setProcessingOrderId(order.id);
    try {
      await updateOrderStatus({
        variables: {
          input: {
            orderId: order.id,
            status: OrderStatus.AcceptedBySalon,
            actor: StatusActor.Salon,
            message: "Order accepted by salon",
          },
        },
      });
      await Promise.all([refetchSalonCreatedOrders(), refetchSalonOrders()]);
      showToast({
        type: "success",
        text: "Order accepted.",
      });
    } catch {
      showToast({
        type: "error",
        text: "Failed to accept order. Please try again.",
      });
    } finally {
      setProcessingOrderId(null);
    }
  };

  const handleDecline = async (order: Order) => {
    if (processingOrderId) return;
    if (order.rawStatus !== OrderStatus.Created) {
      showToast({
        type: "error",
        text: "Only newly created orders can be rejected.",
      });
      return;
    }

    setProcessingOrderId(order.id);
    try {
      await updateOrderStatus({
        variables: {
          input: {
            orderId: order.id,
            status: OrderStatus.Cancelled,
            actor: StatusActor.Salon,
            message: "Order rejected by salon",
          },
        },
      });
      await Promise.all([refetchSalonCreatedOrders(), refetchSalonOrders()]);
      showToast({
        type: "success",
        text: "Order rejected.",
      });
    } catch {
      showToast({
        type: "error",
        text: "Failed to reject order. Please try again.",
      });
    } finally {
      setProcessingOrderId(null);
    }
  };

  const handleNotification = () => {
    router.push("/notifications");
  };

  return (
    <Container isDark={isDark}>
      {/* Header */}
      <Header paddingTop={insets.top} isDark={isDark}>
        <HeaderContent>
          <ProfileSection>
            <ProfileImageContainer>
              <ProfilePlaceholder isDark={isDark}>
                <MaterialIcons
                  name="person"
                  size={24}
                  color={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
              </ProfilePlaceholder>
              <OnlineIndicator isDark={isDark} />
            </ProfileImageContainer>
            <GreetingText>
              <GreetingLabel isDark={isDark}>Good morning,</GreetingLabel>
              <GreetingName isDark={isDark}>{greetingName}</GreetingName>
            </GreetingText>
          </ProfileSection>
          <NotificationButton
            isDark={isDark}
            onPress={handleNotification}
            android_ripple={{
              color: isDark
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.05)",
              borderless: false,
              radius: 20,
            }}
          >
            <MaterialIcons
              name="notifications"
              size={20}
              color={
                isDark ? Colors.dark.textSecondary : Colors.light.textSecondary
              }
            />
            <NotificationBadge />
          </NotificationButton>
        </HeaderContent>
      </Header>

      {/* Main Content */}
      <MainContent
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
          {/* Stats Section */}
          <StatsSection>
            {/* Today Earnings Card */}
            <StatCard isDark={isDark}>
              <StatCardHeader>
                <MaterialIcons
                  name="account-balance-wallet"
                  size={20}
                  color={PRIMARY_COLOR}
                />
                <StatCardLabel isDark={isDark} color={PRIMARY_COLOR}>
                  Today
                </StatCardLabel>
              </StatCardHeader>
              <View>
                <StatCardValue isDark={isDark}>₦ 45,000</StatCardValue>
                <StatCardSubtitle isDark={isDark}>
                  +12% vs yesterday
                </StatCardSubtitle>
              </View>
            </StatCard>

            {/* Completed Tasks Card */}
            <StatCard isDark={isDark}>
              <StatCardHeader>
                <MaterialIcons name="check-circle" size={20} color="#22c55e" />
                <StatCardLabel isDark={isDark} color="#22c55e">
                  Completed
                </StatCardLabel>
              </StatCardHeader>
              <View>
                <CompletedValue>
                  <StatCardValue isDark={isDark}>
                    {completedCount}
                  </StatCardValue>
                  <CompletedFraction isDark={isDark}>
                    /{totalOrderCount}
                  </CompletedFraction>
                </CompletedValue>
                <ProgressBarContainer isDark={isDark}>
                  <ProgressBarFill percentage={completionPercentage} />
                </ProgressBarContainer>
              </View>
            </StatCard>
          </StatsSection>

          {/* Segmented Control Tabs */}
          <TabsContainer paddingTop={Spacing.xs} isDark={isDark}>
            <TabsWrapper isDark={isDark}>
              <TabButton
                isActive={activeTab === "new"}
                isDark={isDark}
                onPress={() => setActiveTab("new")}
                android_ripple={{
                  color: isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                  borderless: false,
                }}
              >
                <TabButtonText isActive={activeTab === "new"} isDark={isDark}>
                  New ({newOrders.length})
                </TabButtonText>
              </TabButton>

              <TabButton
                isActive={activeTab === "active"}
                isDark={isDark}
                onPress={() => setActiveTab("active")}
                android_ripple={{
                  color: isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                  borderless: false,
                }}
              >
                <TabButtonText
                  isActive={activeTab === "active"}
                  isDark={isDark}
                >
                  Active ({activeOrders.length})
                </TabButtonText>
              </TabButton>

              <TabButton
                isActive={activeTab === "completed"}
                isDark={isDark}
                onPress={() => setActiveTab("completed")}
                android_ripple={{
                  color: isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                  borderless: false,
                }}
              >
                <TabButtonText
                  isActive={activeTab === "completed"}
                  isDark={isDark}
                >
                  Completed ({completedCount})
                </TabButtonText>
              </TabButton>
            </TabsWrapper>
          </TabsContainer>

          {/* Orders List */}
          <OrdersList>
            {isLoadingOrders ? (
              <EmptyState>
                <ActivityIndicator size="small" color={PRIMARY_COLOR} />
                <EmptyStateText isDark={isDark}>
                  Loading orders...
                </EmptyStateText>
              </EmptyState>
            ) : tabOrders.length === 0 ? (
              <EmptyState>
                <EmptyStateText isDark={isDark}>
                  No {activeTab} orders available.
                </EmptyStateText>
              </EmptyState>
            ) : (
              tabOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  isDark={isDark}
                  onPress={() => handleOrderPress(order)}
                  android_ripple={{
                    color: isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)",
                    borderless: false,
                  }}
                >
                  <OrderHeader>
                    <OrderClientInfo>
                      <OrderClientImagePlaceholder isDark={isDark}>
                        <OrderClientInitials isDark={isDark}>
                          {getInitials(order.clientName)}
                        </OrderClientInitials>
                      </OrderClientImagePlaceholder>
                      <OrderClientDetails>
                        <OrderClientName isDark={isDark}>
                          {order.clientName}
                        </OrderClientName>
                        <OrderService isDark={isDark}>
                          {order.service}
                        </OrderService>
                      </OrderClientDetails>
                    </OrderClientInfo>
                    <TimeBadge isDark={isDark}>
                      <TimeBadgeText isDark={isDark}>
                        {order.time}
                      </TimeBadgeText>
                    </TimeBadge>
                  </OrderHeader>

                  <LocationRow isDark={isDark}>
                    <MaterialIcons
                      name="location-on"
                      size={18}
                      color={
                        isDark
                          ? Colors.dark.textTertiary
                          : Colors.light.textTertiary
                      }
                    />
                    <LocationText isDark={isDark}>
                      {order.location}
                    </LocationText>
                  </LocationRow>

                  <OrderFooter isDark={isDark}>
                    <OrderPrice isDark={isDark}>{order.price}</OrderPrice>
                    {order.rawStatus === OrderStatus.Created && (
                      <OrderActions>
                        <DeclineButton
                          isDark={isDark}
                          onPress={() => handleDecline(order)}
                          disabled={processingOrderId === order.id}
                        >
                          {processingOrderId === order.id ? (
                            <ActivityIndicator
                              size="small"
                              color={
                                isDark
                                  ? Colors.dark.textSecondary
                                  : Colors.light.textSecondary
                              }
                            />
                          ) : (
                            <MaterialIcons
                              name="close"
                              size={20}
                              color={
                                isDark
                                  ? Colors.dark.textSecondary
                                  : Colors.light.textSecondary
                              }
                            />
                          )}
                        </DeclineButton>
                        <AcceptButton
                          onPress={() => handleAccept(order)}
                          disabled={processingOrderId === order.id}
                        >
                          {processingOrderId === order.id ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                          ) : (
                            <AcceptButtonText>Accept</AcceptButtonText>
                          )}
                        </AcceptButton>
                      </OrderActions>
                    )}
                    {activeTab === "active" &&
                      order.rawStatus !== OrderStatus.Created && (
                        <OrderStatusBadge isDark={isDark}>
                          <OrderStatusBadgeText isDark={isDark}>
                            {readableStatus(order.rawStatus)}
                          </OrderStatusBadgeText>
                        </OrderStatusBadge>
                      )}
                  </OrderFooter>
                </OrderCard>
              ))
            )}
          </OrdersList>
        </ContentWrapper>
      </MainContent>

      {/* Floating Action Button */}
      {/* <FloatingActionButton
        paddingBottom={insets.bottom}
        isDark={isDark}
        onPress={handleWalkIn}
        android_ripple={{
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
          borderless: false,
          radius: 30,
        }}
      >
        <MaterialIcons
          name="add"
          size={20}
          color={isDark ? Colors.dark.background : Colors.light.background}
        />
        <FABText isDark={isDark}>Walk-in</FABText>
      </FloatingActionButton> */}
    </Container>
  );
}
