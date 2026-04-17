import { type AccountType, isBrowser } from "@wew/lib/auth";

export const PASSWORD_RECOVERY_STORAGE_KEY = "wework.auth.password-recovery";

export type PasswordRecoveryState = {
  accountId?: string;
  accountType?: AccountType;
  email: string;
  otp?: string;
  redirectTo?: string;
};

export function getStoredPasswordRecoveryState() {
  if (!isBrowser()) {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(PASSWORD_RECOVERY_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as PasswordRecoveryState;
  } catch {
    window.sessionStorage.removeItem(PASSWORD_RECOVERY_STORAGE_KEY);
    return null;
  }
}

export function setStoredPasswordRecoveryState(state: PasswordRecoveryState) {
  if (!isBrowser()) {
    return;
  }

  window.sessionStorage.setItem(
    PASSWORD_RECOVERY_STORAGE_KEY,
    JSON.stringify(state),
  );
}

export function clearStoredPasswordRecoveryState() {
  if (!isBrowser()) {
    return;
  }

  window.sessionStorage.removeItem(PASSWORD_RECOVERY_STORAGE_KEY);
}
