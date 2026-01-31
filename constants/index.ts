export const ENV = {
  GRAPHQL_URI: process.env.EXPO_PUBLIC_GRAPHQL_URI,
  API_BASE: (process.env.EXPO_PUBLIC_GRAPHQL_URI || "").replace(
    /\/graphql\/?$/i,
    "",
  ),
  GOOGLE_WEB_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  GOOGLE_APPLE_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  GOOGLE_MAPS_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
};
