"use client";

import { useEffect, useRef, useState } from "react";

import { ChevronDown, LogOut } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import weWorkLogo from "@wew/assets/icons/we-work.png";
import { Button } from "@wew/components/ui/button";
import {
  Modal,
  ModalTrigger,
} from "@wew/components/ui/modal";
import { useAuth } from "@wew/hooks/useAuth";
import {
  getUserDisplayName,
  getUserInitials,
} from "@wew/lib/auth";
import { cn } from "@wew/lib/utils";

import SelectAccountTypeModalContent from "./modal/selectAccountType";

const guestNavItems = [
  { href: "/", label: "Home" },
  { href: "#", label: "Browse Candidates" },
] as const;

const authenticatedNavItems = [
  { href: "/", label: "Home" },
  { href: "/applications", label: "My Applications" },
  { href: "/profile", label: "My Profile" },
] as const;

export function Header() {
  const [accountType, setAccountType] = useState("company");
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const accountMenuRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const { isAuthenticated, logout, session } = useAuth();
  const displayName = getUserDisplayName(session?.user);
  const initials = getUserInitials(session?.user);
  const navItems = isAuthenticated ? authenticatedNavItems : guestNavItems;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 18);
  });

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
    <motion.header
      animate={
        shouldReduceMotion
          ? undefined
          : {
              backdropFilter: isScrolled ? "blur(18px)" : "blur(0px)",
              backgroundColor: isScrolled
                ? "rgba(255,255,255,0.88)"
                : "rgba(255,255,255,1)",
              boxShadow: isScrolled
                ? "0 18px 45px rgba(6, 2, 18, 0.08)"
                : "0 0 0 rgba(6, 2, 18, 0)",
              opacity: 1,
              y: 0,
            }
      }
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors",
        isScrolled ? "border-black/5" : "border-black/10",
      )}
      initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                paddingBottom: isScrolled ? "0.95rem" : "1.25rem",
                paddingTop: isScrolled ? "0.95rem" : "1.25rem",
              }
        }
        className="mx-auto flex w-full max-w-[86rem] flex-col gap-4 px-2 sm:px-2.5 lg:flex-row lg:items-center lg:justify-between lg:px-3"
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          aria-label="WeWerk home"
          className="inline-flex w-fit items-center"
          href="/"
        >
          <Image
            alt="WeWerk"
            className="h-auto w-[136px] sm:w-[170px]"
            priority
            src={weWorkLogo}
          />
        </Link>

        <motion.div
          animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
          className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
          transition={{ delay: 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav
            aria-label="Primary"
            className="flex flex-wrap items-center gap-5 text-secondary lg:gap-6"
          >
            {navItems.map((item) => (
              <Link
                className={cn(
                  "transition-colors text-base text-dark font-medium hover:text-accent-blue",
                  pathname === item.href
                    ? "font-semibold text-accent-blue"
                    : "",
                )}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div
            aria-hidden="true"
            className="hidden h-[45px] w-[2px] bg-[#D9D9D9] lg:block"
          />

          {isAuthenticated ? (
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
                      className="h-12 w-12 rounded-full object-cover"
                      src={session.user.avatarUrl}
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1ebff] text-sm font-semibold text-accent-blue">
                      {initials}
                    </div>
                  )}

                  <span className="text-lg font-medium text-dark">
                    {displayName}
                  </span>

                  <ChevronDown
                    className={cn(
                      "size-5 text-secondary transition-transform",
                      isAccountMenuOpen ? "rotate-180" : "",
                    )}
                  />
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
          ) : (
            <div className="flex flex-wrap items-center gap-6">
              <Modal>
                <ModalTrigger asChild>
                  <Button
                    className="h-11 min-w-[148px] rounded-xl px-6 shadow-[0_16px_34px_rgba(51,0,201,0.22)]"
                    size={null}
                    type="button"
                    variant="primary"
                  >
                    Get started
                  </Button>
                </ModalTrigger>

                <SelectAccountTypeModalContent
                  accountType={accountType}
                  setAccountType={setAccountType}
                />
              </Modal>

              <Button
                asChild
                className="h-11 min-w-[112px] rounded-xl border-accent-blue/70 px-6 hover:bg-accent-purple/30"
                size={null}
                variant="outline"
              >
                <Link href="/login">Login</Link>
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
