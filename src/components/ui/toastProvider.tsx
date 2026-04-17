"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import { CheckCircle2, CircleAlert, X } from "lucide-react";

import { cn } from "@wew/lib/utils";

type ToastVariant = "error" | "success";

type ToastItem = {
  id: string;
  message: string;
  title?: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  showError: (message: string, title?: string) => void;
  showSuccess: (message: string, title?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function ToastIcon({ variant }: { variant: ToastVariant }) {
  if (variant === "success") {
    return <CheckCircle2 className="size-5 text-[#179d64]" />;
  }

  return <CircleAlert className="size-5 text-[#ff5a5a]" />;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (variant: ToastVariant, message: string, title?: string) => {
      const id = `${variant}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

      setToasts((current) => [...current, { id, message, title, variant }]);

      window.setTimeout(() => {
        removeToast(id);
      }, 4200);
    },
    [removeToast],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      showError: (message, title) => showToast("error", message, title),
      showSuccess: (message, title) => showToast("success", message, title),
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed top-5 right-5 z-[120] flex w-[min(92vw,24rem)] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            className={cn(
              "pointer-events-auto rounded-[1rem] border bg-white px-4 py-4 shadow-[0_20px_45px_rgba(6,2,18,0.12)]",
              toast.variant === "success"
                ? "border-[#d4f2e4]"
                : "border-[#ffd9dd]",
            )}
            key={toast.id}
          >
            <div className="flex items-start gap-3">
              <ToastIcon variant={toast.variant} />

              <div className="min-w-0 flex-1">
                {toast.title ? (
                  <p className="text-sm font-semibold text-dark-soft">{toast.title}</p>
                ) : null}
                <p className="text-sm leading-6 text-secondary">{toast.message}</p>
              </div>

              <button
                aria-label="Dismiss notification"
                className="rounded-full p-1 text-secondary/60 transition hover:bg-[#f5f2ff] hover:text-dark-soft"
                onClick={() => removeToast(toast.id)}
                type="button"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export { ToastContext };
