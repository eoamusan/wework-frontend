"use client";

import { useState } from "react";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import weWorkLogo from "@wew/assets/icons/we-work.png";
import { Button } from "@wew/components/ui/button";
import {
  Modal,
  ModalTrigger,
} from "@wew/components/ui/modal";
import { cn } from "@wew/lib/utils";

import SelectAccountTypeModalContent from "./modal/selectAccountType";

const navItems = [
  {
    href: "#",
    isActive: true,
    label: "Home",
  },
  {
    href: "#",
    isActive: false,
    label: "Browse Candidates",
  },
] as const;

export function Header() {
  const [accountType, setAccountType] = useState("company");
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.header
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      className="w-full border-b border-black/10 bg-white"
      initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-4 px-2 py-4 sm:px-2.5 lg:flex-row lg:items-center lg:justify-between lg:px-3">
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
                  "transition-colors hover:text-accent-blue",
                  item.isActive
                    ? "font-medium text-accent-blue"
                    : "font-normal",
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
            className="hidden h-9 w-px bg-black/12 lg:block"
          />

          <div className="flex flex-wrap items-center gap-4">
            <Modal>
              <ModalTrigger asChild>
                <Button
                  className="h-11 min-w-[102px] rounded-xl px-6 shadow-[0_16px_34px_rgba(51,0,201,0.22)]"
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
        </motion.div>
      </div>
    </motion.header>
  );
}
