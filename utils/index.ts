import { ApolloError } from "@apollo/client/v4-migration";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import dayjs from "dayjs";
import { isDevice, osBuildFingerprint } from "expo-device";
import { cloneDeep, compact, debounce, last, memoize } from "lodash";
import { useEffect } from "react";
import { Alert, Linking, NativeModules, Platform } from "react-native";

export const isIos = () => {
  return Platform.OS === "ios";
};

export const isAndroid = () => {
  return Platform.OS === "android";
};

export function isSimulator() {
  return !isDevice || osBuildFingerprint?.includes("emulator");
}

export function testingOnlyData<T>(value: T, defaultVal: T) {
  if (isSimulator()) {
    return value;
  }
  return defaultVal;
}

export function hookStateChangeInjector<T>(
  state: T,
  changer: (obj: T) => any,
  callback?: () => any,
) {
  return (propertyKey: keyof T) => {
    return (val: any) => {
      const newState = cloneDeep(state);
      newState[propertyKey] = val;
      changer(newState);
      callback && callback();
    };
  };
}

export function formatGqlError(error: ApolloError | undefined) {
  console.log("full error", JSON.stringify(error, null, 2));
  return error
    ? error.toString().replace("Error: GraphQL error: ", "")
    : undefined;
}

export const useOnFocus = (
  navigation: NavigationProp<ParamListBase>,
  callback: () => void,
) =>
  useEffect(() => {
    navigation.addListener("focus", callback);
  }, []);

export function filterForAlphanumeric(val: string) {
  return val.replace(/[^a-z0-9]/gi, "");
}

export const callPhoneNumber = (phoneNumber?: string) => {
  return Linking.openURL(`tel:${phoneNumber}`);
};

export const openUrl = (url: string) => {
  return Linking.openURL(url);
};

export const showConfirmation = ({
  cancelText = "Cancel",
  continueText = "OK",
  description,
  onContinue,
  title = "Are you sure?",
}: {
  cancelText?: string;
  continueText?: string;
  description: string;
  onContinue: () => void;
  title?: string;
}) => {
  Alert.alert(
    title,
    description,
    [
      {
        text: cancelText,
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: continueText,
        onPress: onContinue,
      },
    ],
    { cancelable: false },
  );
};

export const formatDate = (dateString: string) => {
  // Detect ISO 8601 date strings (contains 'T' or matches YYYY-MM-DD pattern)
  const isIsoDateString =
    typeof dateString === "string" &&
    (dateString.includes("T") || /^\d{4}-\d{2}-\d{2}/.test(dateString));

  // Handle ISO 8601 date strings or Unix timestamps
  let date: Date;
  if (isIsoDateString) {
    // Use Date constructor directly for ISO strings
    date = new Date(dateString);
  } else {
    // Handle Unix timestamp (milliseconds) - can be string or number
    const timestamp =
      typeof dateString === "string"
        ? dateString.length > 10
          ? parseInt(dateString, 10)
          : parseInt(dateString, 10) * 1000
        : dateString;
    date = new Date(timestamp);
  }
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  // Just now (less than 1 minute)
  if (diffSeconds < 60) {
    return "Just now";
  }
  // Minutes ago
  if (diffMinutes < 60) {
    return `${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"} ago`;
  }
  // Hours ago
  if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
  }
  // Days ago
  if (diffDays === 1) {
    return "Yesterday";
  }
  if (diffDays < 7) {
    return `${diffDays} days ago`;
  }
  // Weeks ago
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) {
    return `${diffWeeks} ${diffWeeks === 1 ? "week" : "weeks"} ago`;
  }
  // Months ago
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} ${diffMonths === 1 ? "month" : "months"} ago`;
  }
  // Years ago or fallback to date
  return date.toLocaleDateString();
};

export const formatDateRange = (start: string, end: string): string => {
  const startDate = new Date(start).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
  });
  const endDate = new Date(end).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
  });
  return `${startDate}-${endDate}`;
};

export const getLocale = (): string => {
  if (isIos()) {
    return NativeModules.SettingsManager.settings.AppleLocale; // "fr_FR"
  } else {
    return NativeModules.I18nManager.localeIdentifier;
  }
};

export const removeNonDigits = (number: string) => {
  return number.replace(/\D/g, "");
};

export const formatCurrency = (value?: number) =>
  `₦${((value || 0) / 100.0).toFixed(2)}`;

export const getLatestFormattedDate = (dates: (string | null)[] | undefined) =>
  dayjs(last(compact(dates).sort()))
    .toDate()
    .toLocaleDateString("en-US");

export const maybeRenderEmailLine = (
  title: string,
  val: string | undefined,
) => {
  if (val == null || val.length === 0) {
    return "";
  }

  return `<b>${title}:</b><br/>${val}<br/><br/>`;
};

export function memoizeDebounce(
  func: (...params: any) => any | void,
  cacheKeyResolver: (obj: any) => string | number,
  wait = 500,
  options = {},
) {
  return memoize((..._param) => {
    return debounce(func, wait, options);
  }, cacheKeyResolver);
}

export function getUseFocusCallback() {
  const date = new Date();
  return [
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    Math.round(date.getSeconds() / 10),
  ];
}

export const millisToString = (millis: number) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = Math.round((millis % 60000) / 1000);

  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export const formatCurreny = (value?: number, currency: string = "NGN") => {
  if (currency === "NGN") {
    return `₦${(value || 0).toFixed(2)}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value || 0);
};

export const getFirstName = (fullName: string) => {
  return fullName.split(" ")[0];
};
