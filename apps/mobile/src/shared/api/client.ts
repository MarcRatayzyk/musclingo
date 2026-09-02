import Constants from "expo-constants";
import { Platform } from "react-native";
import { invalidateSession } from "../auth/session";
import { tokenStorage } from "../storage/mmkv";
import { OFFLINE, offlineFetch } from "./offline";

function resolveApiUrl(): string {
  if (OFFLINE) return "";

  const configured =
    process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3001";

  if (Platform.OS === "web") return configured;

  const needsLanHost =
    configured.includes("localhost") || configured.includes("127.0.0.1");

  if (!needsLanHost) return configured;

  const debuggerHost =
    Constants.expoGoConfig?.debuggerHost ??
    Constants.expoConfig?.hostUri?.split(":")[0];

  if (debuggerHost) {
    const host = debuggerHost.split(":")[0];
    return configured.replace(/localhost|127\.0\.0\.1/, host);
  }

  return configured;
}

export const API_URL = resolveApiUrl();

export function resolveMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  if (OFFLINE || !API_URL) return null;
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

async function refreshAccessToken(): Promise<string | null> {
  if (OFFLINE) {
    tokenStorage.setTokens("offline-access", "offline-refresh");
    return "offline-access";
  }

  const refreshToken = tokenStorage.getRefresh();
  if (!refreshToken) return null;

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    invalidateSession();
    return null;
  }

  const data = (await res.json()) as {
    accessToken: string;
    refreshToken: string;
  };
  tokenStorage.setTokens(data.accessToken, data.refreshToken);
  return data.accessToken;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  retry = true,
): Promise<T> {
  if (OFFLINE) {
    return offlineFetch<T>(path, options);
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  const access = tokenStorage.getAccess();
  if (access) headers.Authorization = `Bearer ${access}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (res.status === 401 && retry) {
    const newAccess = await refreshAccessToken();
    if (newAccess) {
      return apiFetch<T>(path, options, false);
    }
    invalidateSession();
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const raw = (body as { message?: string | string[] }).message;
    const message = Array.isArray(raw)
      ? raw.join(" ")
      : (raw ?? `HTTP ${res.status}`);
    throw new ApiError(message, res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
