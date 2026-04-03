export const AUTH_SESSION_STORAGE_KEY = "wework.auth.session";
export const AUTH_REDIRECT_STORAGE_KEY = "wework.auth.redirect";
export const AUTH_SESSION_CHANGED_EVENT = "wework:auth-session-changed";

export type AccountType = "applicant" | "company";

export type AuthUser = {
  id?: string;
  accountId?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  avatarUrl?: string;
};

export type AuthSession = {
  accessToken: string;
  refreshToken?: string;
  accountType?: AccountType;
  accountId?: string;
  user?: AuthUser;
};

type TokenPayload = {
  accessToken?: string;
  token?: string;
  jwt?: string;
  refreshToken?: string;
  refresh?: string;
  accountType?: AccountType;
  user?: AuthUser;
  accountId?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  avatarUrl?: string;
};

export function isBrowser() {
  return typeof window !== "undefined";
}

export function normalizeAuthSession(payload: TokenPayload): AuthSession | null {
  const accessToken = payload.accessToken || payload.token || payload.jwt;

  if (!accessToken) {
    return null;
  }

  const user =
    payload.user ||
    (payload.firstName || payload.lastName || payload.fullName || payload.email
      ? {
          accountId: payload.accountId || payload.id,
          avatarUrl: payload.avatarUrl,
          email: payload.email,
          firstName: payload.firstName,
          fullName: payload.fullName,
          id: payload.id || payload.accountId,
          lastName: payload.lastName,
        }
      : undefined);
  const accountId =
    payload.accountId || payload.id || payload.user?.accountId || payload.user?.id;

  return {
    accessToken,
    accountId,
    accountType: payload.accountType,
    refreshToken: payload.refreshToken || payload.refresh,
    user,
  };
}

export function getStoredAuthSession(): AuthSession | null {
  if (!isBrowser()) {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(AUTH_SESSION_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as AuthSession;
  } catch {
    window.sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    return null;
  }
}

function dispatchAuthSessionChanged() {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new Event(AUTH_SESSION_CHANGED_EVENT));
}

export function setStoredAuthSession(session: AuthSession) {
  if (!isBrowser()) {
    return;
  }

  window.sessionStorage.setItem(
    AUTH_SESSION_STORAGE_KEY,
    JSON.stringify(session),
  );
  dispatchAuthSessionChanged();
}

export function clearStoredAuthSession() {
  if (!isBrowser()) {
    return;
  }

  window.sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  dispatchAuthSessionChanged();
}

export function getAccessToken() {
  return getStoredAuthSession()?.accessToken || "";
}

export function getRefreshToken() {
  return getStoredAuthSession()?.refreshToken || "";
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}

export function setStoredRedirectPath(path: string) {
  if (!isBrowser()) {
    return;
  }

  window.sessionStorage.setItem(AUTH_REDIRECT_STORAGE_KEY, path);
}

export function getStoredRedirectPath() {
  if (!isBrowser()) {
    return "";
  }

  return window.sessionStorage.getItem(AUTH_REDIRECT_STORAGE_KEY) || "";
}

export function clearStoredRedirectPath() {
  if (!isBrowser()) {
    return;
  }

  window.sessionStorage.removeItem(AUTH_REDIRECT_STORAGE_KEY);
}

export function getUserDisplayName(user?: AuthUser) {
  if (!user) {
    return "My Profile";
  }

  const fullName = user.fullName?.trim();

  if (fullName) {
    return fullName;
  }

  const firstName = user.firstName?.trim();
  const lastName = user.lastName?.trim();
  const composedName = [firstName, lastName].filter(Boolean).join(" ").trim();

  if (composedName) {
    return composedName;
  }

  return user.email?.trim() || "My Profile";
}

export function getUserInitials(user?: AuthUser) {
  const displayName = getUserDisplayName(user);
  const nameParts = displayName
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2);

  if (!nameParts.length) {
    return "MP";
  }

  return nameParts.map((part) => part[0]?.toUpperCase() || "").join("");
}
