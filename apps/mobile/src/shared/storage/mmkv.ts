import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Platform } from "react-native";

const ACCESS = "access_token";
const REFRESH = "refresh_token";

const memory = new Map<string, string>();

/** Expo Go and web cannot load react-native-mmkv (native module). */
function canUseNativeMmkv(): boolean {
  if (Platform.OS === "web") return false;
  if (Constants.executionEnvironment === "storeClient") return false;
  return true;
}

type NativeStore = {
  getString: (key: string) => string | undefined;
  set: (key: string, value: string) => void;
  delete: (key: string) => void;
};

let nativeStorage: NativeStore | null = null;

if (canUseNativeMmkv()) {
  try {
    const { MMKV } = require("react-native-mmkv") as typeof import("react-native-mmkv");
    nativeStorage = new MMKV({ id: "muscle-mind" });
  } catch {
    nativeStorage = null;
  }
}

function read(key: string): string | undefined {
  if (nativeStorage) return nativeStorage.getString(key);
  return memory.get(key);
}

function write(key: string, value: string) {
  if (nativeStorage) {
    nativeStorage.set(key, value);
    return;
  }
  memory.set(key, value);
  void AsyncStorage.setItem(key, value);
}

function remove(key: string) {
  if (nativeStorage) {
    nativeStorage.delete(key);
    return;
  }
  memory.delete(key);
  void AsyncStorage.removeItem(key);
}

export const mmkv = {
  getString: read,
  set: write,
  delete: remove,
};

export const tokenStorage = {
  getAccess: () => read(ACCESS),
  getRefresh: () => read(REFRESH),
  setTokens: (access: string, refresh: string) => {
    write(ACCESS, access);
    write(REFRESH, refresh);
  },
  clear: () => {
    remove(ACCESS);
    remove(REFRESH);
  },
  hydrate: async () => {
    if (nativeStorage) return;
    const [access, refresh] = await Promise.all([
      AsyncStorage.getItem(ACCESS),
      AsyncStorage.getItem(REFRESH),
    ]);
    if (access) memory.set(ACCESS, access);
    if (refresh) memory.set(REFRESH, refresh);
  },
};
