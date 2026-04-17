"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@wew/components/ui/button";
import { FormInput } from "@wew/customs/formInput";
import { useResetPasswordMutation } from "@wew/hooks/services/auth/useResetPasswordMutation";
import type { AccountType } from "@wew/lib/auth";
import {
  type PasswordRecoveryState,
  clearStoredPasswordRecoveryState,
  getStoredPasswordRecoveryState,
} from "@wew/lib/password-recovery";
import {
  type ResetPasswordFormValues,
  resetPasswordFormSchema,
} from "@wew/lib/schemas/forgot-password-form";

import { getAuthVisualContent } from "./authVisuals";

function PasswordAdornment({
  isVisible,
  onToggle,
}: {
  isVisible: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      aria-label={isVisible ? "Hide password" : "Show password"}
      className="text-[#919191] transition hover:text-[#5e5e5e]"
      onClick={onToggle}
      type="button"
    >
      {isVisible ? (
        <EyeOff className="size-5 stroke-[1.8]" />
      ) : (
        <Eye className="size-5 stroke-[1.8]" />
      )}
    </button>
  );
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [recoveryState, setRecoveryState] = useState<PasswordRecoveryState | null>(
    null,
  );
  const [isReady, setIsReady] = useState(false);
  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const accountType = (searchParams.get("accountType") ||
    "applicant") as AccountType;
  const redirectTo = searchParams.get("redirectTo") || "";
  const { isPending, resetPasswordHandler } = useResetPasswordMutation();
  const resolvedAccountType = recoveryState?.accountType || accountType;
  const resolvedRedirectTo = recoveryState?.redirectTo || redirectTo;
  const heroContent = getAuthVisualContent(resolvedAccountType);

  useEffect(() => {
    const storedState = getStoredPasswordRecoveryState();

    if (!storedState?.email || !storedState?.otp) {
      router.replace(
        `/forgot-password?accountType=${accountType}${redirectTo ? `&redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
      );
      return;
    }

    setRecoveryState(storedState);
    setIsReady(true);
  }, [accountType, redirectTo, router]);

  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!recoveryState?.email || !recoveryState.otp) {
      return;
    }

    try {
      await resetPasswordHandler({
        confirmPassword: values.confirmPassword,
        email: recoveryState.email,
        otp: recoveryState.otp,
        password: values.password,
      });

      clearStoredPasswordRecoveryState();
      form.reset();
      router.push(
        `/login?accountType=${resolvedAccountType}${resolvedRedirectTo ? `&redirectTo=${encodeURIComponent(resolvedRedirectTo)}` : ""}`,
      );
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "We could not reset your password. Please try again.",
      });
    }
  };

  if (!isReady || !recoveryState) {
    return null;
  }

  return (
    <main className="bg-white">
      <section className="mx-auto grid w-full max-w-[86rem] gap-10 px-4 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-center lg:gap-16 lg:px-8 lg:pt-10 lg:pb-24">
        <div className="relative overflow-hidden rounded-[1.35rem] border border-black/6 bg-[#f3eadf] shadow-[0_18px_45px_rgba(6,2,18,0.08)]">
          <div className="relative aspect-[1/0.98] min-h-[420px] w-full">
            <Image
              alt={heroContent.alt}
              className={heroContent.imageClassName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 54vw"
              src={heroContent.image}
            />

            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(7,4,18,0)_0%,rgba(7,4,18,0.28)_42%,rgba(7,4,18,0.82)_100%)] px-6 pb-7 pt-20 text-center text-white sm:px-9 sm:pb-9">
              <div className="mb-5 flex items-center justify-center gap-2">
                <span className="size-2 rounded-full bg-white/55" />
                <span className="size-2 rounded-full bg-white" />
                <span className="size-2 rounded-full bg-white/55" />
              </div>

              <h1 className="text-2xl font-semibold tracking-[-0.04em] sm:text-[2.15rem]">
                Create a fresh password.
              </h1>
              <p className="mt-2 text-base text-white sm:text-lg">
                Choose a strong password to finish securing your account.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[34rem] flex-col justify-center py-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-dark-soft sm:text-4xl">
              Reset password
            </h2>
            <p className="mt-1 text-sm text-dark">
              Updating access for{" "}
              <span className="font-medium text-dark-soft">
                {recoveryState.email}
              </span>
            </p>
          </div>

          <form
            className="mt-10 space-y-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormInput
              error={form.formState.errors.password?.message}
              id="password"
              label="New password"
              placeholder="****************"
              rightAdornment={
                <PasswordAdornment
                  isVisible={isPasswordVisible}
                  onToggle={() => setIsPasswordVisible((value) => !value)}
                />
              }
              type={isPasswordVisible ? "text" : "password"}
              {...form.register("password")}
            />

            <FormInput
              error={form.formState.errors.confirmPassword?.message}
              id="confirmPassword"
              label="Confirm password"
              placeholder="****************"
              rightAdornment={
                <PasswordAdornment
                  isVisible={isConfirmPasswordVisible}
                  onToggle={() => setIsConfirmPasswordVisible((value) => !value)}
                />
              }
              type={isConfirmPasswordVisible ? "text" : "password"}
              {...form.register("confirmPassword")}
            />

            <Button
              className="mt-3 h-14 w-full rounded-[0.7rem] text-base font-medium shadow-none hover:translate-y-0"
              disabled={isPending}
              size={null}
              type="submit"
              variant="primary"
            >
              {isPending ? "Resetting password..." : "Reset password"}
            </Button>

            {form.formState.errors.root?.message ? (
              <p className="text-sm text-[#ff5a5a]">
                {form.formState.errors.root.message}
              </p>
            ) : null}
          </form>

          <p className="mt-9 text-center text-sm text-dark">
            Need a new code?
            <Link
              className="ml-1 font-medium text-accent-blue transition hover:text-[#2411a3]"
              href={`/forgot-password/verify?accountType=${resolvedAccountType}${resolvedRedirectTo ? `&redirectTo=${encodeURIComponent(resolvedRedirectTo)}` : ""}`}
            >
              Go back
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
