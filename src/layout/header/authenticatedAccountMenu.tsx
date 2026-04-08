"use client";

import { useEffect, useRef, useState } from "react";

import { ChevronDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@wew/hooks/useAuth";
import { getUserDisplayName, getUserInitials } from "@wew/lib/auth";
import { cn } from "@wew/lib/utils";

export function AuthenticatedAccountMenu() {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const router = useRouter();
  const accountMenuRef = useRef<HTMLDivElement | null>(null);
  const { logout, session } = useAuth();
  const displayName = getUserDisplayName(session?.user);
  const initials = getUserInitials(session?.user);
  const isCompanyAccount = session?.accountType === "company";

  useEffect(() => {
    if (!isAccountMenuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setIsAccountMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isAccountMenuOpen]);

  const handleLogout = () => {
    setIsAccountMenuOpen(false);
    logout();
    router.push("/");
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative" ref={accountMenuRef}>
        <button
          aria-expanded={isAccountMenuOpen}
          aria-haspopup="menu"
          className="flex items-center gap-4 rounded-2xl border border-transparent py-1.5 transition hover:border-[#ece6ff] hover:bg-[#faf8ff]"
          onClick={() => setIsAccountMenuOpen((value) => !value)}
          type="button"
        >
          {session?.user?.avatarUrl ? (
            <img
              alt={displayName}
              className={cn(
                "object-cover",
                isCompanyAccount ? "h-11 w-11 rounded-[0.8rem]" : "h-12 w-12 rounded-full",
              )}
              src={session.user.avatarUrl}
            />
          ) : (
            <div
              className={cn(
                "flex items-center justify-center bg-[#f1ebff] text-sm font-semibold text-accent-blue",
                isCompanyAccount ? "h-11 w-11 rounded-[0.8rem]" : "h-12 w-12 rounded-full",
              )}
            >
              {initials}
            </div>
          )}

          <span
            className={cn(
              "font-medium text-dark",
              isCompanyAccount ? "text-base" : "text-lg",
            )}
          >
            {displayName}
          </span>

          {!isCompanyAccount ? (
            <ChevronDown
              className={cn(
                "size-5 text-secondary transition-transform",
                isAccountMenuOpen ? "rotate-180" : "",
              )}
            />
          ) : null}
        </button>

        {isAccountMenuOpen ? (
          <div
            className="absolute top-[calc(100%+0.9rem)] right-0 min-w-[190px] rounded-[1rem] border border-[#eceaf5] bg-white p-2 shadow-[0_20px_50px_rgba(7,10,29,0.12)]"
            role="menu"
          >
            <button
              className="flex w-full items-center gap-3 rounded-[0.85rem] px-4 py-3 text-left text-sm font-medium text-[#ff4d58] transition hover:bg-[#fff7f8]"
              onClick={handleLogout}
              role="menuitem"
              type="button"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
