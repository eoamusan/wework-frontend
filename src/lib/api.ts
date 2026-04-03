import axios, { type AxiosInstance } from "axios";

import {
  clearStoredAuthSession,
  getAccessToken,
  isBrowser,
} from "@wew/lib/auth";

export const api: AxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_BASE_URL,
  env: {
    // The FormData class to be used to automatically serialize the payload into a FormData object
    FormData: globalThis?.FormData,
  },
});

// Set up axios request interceptors
api.interceptors.request.use(
  function (config) {
    const token =
      typeof (config?.headers as Record<string, string> | undefined)?.Authorization ===
      "undefined"
        ? getAccessToken()
        : "";

    config.headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
      ...config.headers,
    } as any;

    return config;
  },
  function (error: any) {
    if (isBrowser() && getOnlineStatus() === "offline") {
      error = {
        message:
          "You are currently offline. Kindly turn on your network or try again",
      };
      return Promise.reject(error);
    }
  },
);

api.interceptors.response.use(null, function (error) {
  if (error?.response?.status === 401 || error?.response?.status === 403) {
    clearStoredAuthSession();
  }

  return Promise.reject(error);
});

function getOnlineStatus() {
  return navigator.onLine ? "online" : "offline";
}

if (isBrowser()) {
  window.addEventListener("offline", getOnlineStatus);
  window.addEventListener("online", getOnlineStatus);
}

export default api;
