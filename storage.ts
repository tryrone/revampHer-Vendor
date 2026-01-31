import { appSessionStorage } from "@/shared/auth/sessionStorage";
import { User } from "@/types/gqlReactTypings.generated";
import { isSimulator } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ACCESS_TOKEN_KEY = "token";
export const LOCAL_USER_DATA_KEY = "user_data";

const shouldUseSessionStorage = (): boolean => {
  return !isSimulator() && false;
};

export const getAccessToken = async (): Promise<string | null> => {
  return shouldUseSessionStorage()
    ? appSessionStorage.getItem(ACCESS_TOKEN_KEY)
    : await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessToken = async (token: string) => {
  await (shouldUseSessionStorage()
    ? appSessionStorage.setItem(ACCESS_TOKEN_KEY, token)
    : AsyncStorage.setItem(ACCESS_TOKEN_KEY, token));
};

export const setLocalItem = async (key: string, value: string) => {
  await (shouldUseSessionStorage()
    ? appSessionStorage.setItem(key, value)
    : AsyncStorage.setItem(key, value));
};

export const getLocalItem = async (key: string): Promise<string | null> => {
  return shouldUseSessionStorage()
    ? appSessionStorage.getItem(key)
    : AsyncStorage.getItem(key);
};

export const saveLocalUserData = async (userData: User) => {
  await setLocalItem(LOCAL_USER_DATA_KEY, JSON.stringify(userData));
};

export const getLocalUserData = async (): Promise<User | null> => {
  const userData = await getLocalItem(LOCAL_USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const removeLocalItem = async (key: string) => {
  await (shouldUseSessionStorage()
    ? appSessionStorage.removeItem(key)
    : AsyncStorage.removeItem(key));
};

export const removeAllLocalItems = async () => {
  await (shouldUseSessionStorage()
    ? appSessionStorage.clear()
    : AsyncStorage.clear());
};
