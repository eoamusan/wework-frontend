"use client";

import { useState } from "react";

import { X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import weWorkLogo from "@wew/assets/icons/we-work.png";
import { Button } from "@wew/components/ui/button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@wew/components/ui/modal";
import { RadioGroup, RadioGroupItem } from "@wew/components/ui/radio-group";
import { cn } from "@wew/lib/utils";

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
                  item.isActive ? "font-medium text-accent-blue" : "font-normal",
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
                  className="h-11 min-w-[112px] rounded-xl px-6 shadow-[0_16px_34px_rgba(51,0,201,0.22)]"
                  size={null}
                  type="button"
                  variant="primary"
                >
                  Get started
                </Button>
              </ModalTrigger>
              <ModalContent
                className="w-[min(94vw,720px)] gap-8 rounded-[2rem] border border-[#ece8f7] bg-white px-6 py-10 shadow-[0_28px_70px_rgba(6,2,18,0.18)] sm:px-10"
                showCloseButton={false}
              >
                <ModalClose
                  aria-label="Close account type modal"
                  className="absolute top-7 right-7 rounded-full p-2 text-secondary/75 transition hover:bg-black/5 hover:text-dark-soft"
                >
                  <X className="size-7 stroke-[1.75]" />
                </ModalClose>

                <ModalHeader className="items-center text-center">
                  <ModalTitle className="text-[2.05rem] font-semibold tracking-[-0.04em] text-dark">
                    Select Account Type
                  </ModalTitle>
                  <ModalDescription className="text-xl text-secondary/55">
                    Pick the account that applies to you
                  </ModalDescription>
                </ModalHeader>

                <RadioGroup
                  className="gap-5"
                  onValueChange={setAccountType}
                  value={accountType}
                >
                  <label className="flex cursor-pointer items-center gap-4 rounded-[1rem] border border-[#e7e3ef] bg-white px-4 py-7 shadow-[0_8px_24px_rgba(6,2,18,0.04)]">
                    <RadioGroupItem value="company" />
                    <span className="text-[1.05rem] font-medium text-secondary">
                      Sign up as a Company
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-4 rounded-[1rem] border border-[#e7e3ef] bg-white px-4 py-7 shadow-[0_8px_24px_rgba(6,2,18,0.04)]">
                    <RadioGroupItem value="applicant" />
                    <span className="text-[1.05rem] font-medium text-secondary">
                      Sign up as an Applicant
                    </span>
                  </label>
                </RadioGroup>

                <ModalClose asChild>
                  <Button
                    className="h-14 w-full rounded-[1.2rem] text-[1.05rem] shadow-[0_20px_40px_rgba(51,0,201,0.22)]"
                    size={null}
                    type="button"
                    variant="primary"
                  >
                    Continue
                  </Button>
                </ModalClose>
              </ModalContent>
            </Modal>

            <Button
              className="h-11 min-w-[112px] rounded-xl border-accent-blue/70 px-6 hover:bg-accent-purple/30"
              size={null}
              type="button"
              variant="outline"
            >
              Login
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
