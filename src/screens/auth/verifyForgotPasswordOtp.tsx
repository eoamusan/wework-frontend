"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@wew/components/ui/button";
import { FormInput } from "@wew/customs/formInput";
import { useResendOtpMutation } from "@wew/hooks/services/auth/useResendOtpMutation";
import { useVerifyOtpMutation } from "@wew/hooks/services/auth/useVerifyOtpMutation";
import type { AccountType } from "@wew/lib/auth";
import {
  type PasswordRecoveryState,
  getStoredPasswordRecoveryState,
  setStoredPasswordRecoveryState,
} from "@wew/lib/password-recovery";
import {
  type VerifyOtpFormValues,
  verifyOtpFormSchema,
} from "@wew/lib/schemas/forgot-password-form";

import { getAuthVisualContent } from "./authVisuals";

export default function VerifyForgotPasswordOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [recoveryState, setRecoveryState] = useState<PasswordRecoveryState | null>(
    null,
  );
  const [isReady, setIsReady] = useState(false);
  const form = useForm<VerifyOtpFormValues>({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(verifyOtpFormSchema),
  });

  const accountType = (searchParams.get("accountType") ||
    "applicant") as AccountType;
  const redirectTo = searchParams.get("redirectTo") || "";
  const { isPending, verifyOtpHandler } = useVerifyOtpMutation();
  const { isPending: isResendingOtp, resendOtpHandler } = useResendOtpMutation();
  const resolvedAccountType = recoveryState?.accountType || accountType;
  const resolvedRedirectTo = recoveryState?.redirectTo || redirectTo;
  const heroContent = getAuthVisualContent(resolvedAccountType);

  useEffect(() => {
    const storedState = getStoredPasswordRecoveryState();

    if (!storedState?.email) {
      router.replace(
        `/forgot-password?accountType=${accountType}${redirectTo ? `&redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
      );
      return;
    }

    setRecoveryState(storedState);
    setIsReady(true);
  }, [accountType, redirectTo, router]);

  const onSubmit = async (values: VerifyOtpFormValues) => {
    if (!recoveryState?.email) {
      return;
    }

    try {
      await verifyOtpHandler({
        email: recoveryState.email,
        otp: values.otp,
      });

      setStoredPasswordRecoveryState({
        ...recoveryState,
        otp: values.otp,
      });

      router.push(
        `/forgot-password/reset?accountType=${resolvedAccountType}${resolvedRedirectTo ? `&redirectTo=${encodeURIComponent(resolvedRedirectTo)}` : ""}`,
      );
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "We could not verify that code. Please try again.",
      });
    }
  };

  const onResendOtp = async () => {
    if (!recoveryState?.accountId) {
      form.setError("root", {
        message:
          "We could not find your account details to resend the code. Please restart the reset flow.",
      });
      return;
    }

    try {
      await resendOtpHandler({
        accountId: recoveryState.accountId,
      });
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "We could not resend the verification code.",
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
                Verify your reset code.
              </h1>
              <p className="mt-2 text-base text-white sm:text-lg">
                Use the 6-digit code sent to your email to continue securely.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[34rem] flex-col justify-center py-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-dark-soft sm:text-4xl">
              Enter verification code
            </h2>
            <p className="mt-1 text-sm text-dark">
              We sent a 6-digit code to{" "}
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
              autoComplete="one-time-code"
              error={form.formState.errors.otp?.message}
              id="otp"
              inputClassName="text-center text-lg tracking-[0.35em]"
              inputMode="numeric"
              label="Verification code"
              maxLength={6}
              placeholder="000000"
              {...form.register("otp")}
            />

            <Button
              className="mt-3 h-14 w-full rounded-[0.7rem] text-base font-medium shadow-none hover:translate-y-0"
              disabled={isPending}
              size={null}
              type="submit"
              variant="primary"
            >
              {isPending ? "Verifying..." : "Verify code"}
            </Button>

            {form.formState.errors.root?.message ? (
              <p className="text-sm text-[#ff5a5a]">
                {form.formState.errors.root.message}
              </p>
            ) : null}
          </form>

          <div className="mt-7 flex flex-col items-center gap-3 text-center text-sm text-dark">
            <button
              className="font-medium text-accent-blue transition hover:text-[#2411a3] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!recoveryState.accountId || isResendingOtp}
              onClick={onResendOtp}
              type="button"
            >
              {isResendingOtp
                ? "Resending code..."
                : recoveryState.accountId
                  ? "Resend code"
                  : "Resend unavailable"}
            </button>

            {!recoveryState.accountId ? (
              <p className="text-xs text-[#7b7b7b]">
                Start the reset flow again if you need a new code.
              </p>
            ) : null}

            <Link
              className="font-medium text-accent-blue transition hover:text-[#2411a3]"
              href={`/forgot-password?accountType=${resolvedAccountType}${resolvedRedirectTo ? `&redirectTo=${encodeURIComponent(resolvedRedirectTo)}` : ""}`}
            >
              Use a different email
            </Link>

            <Link
              className="font-medium text-[#6e6e6e] transition hover:text-dark-soft"
              href={`/login?accountType=${resolvedAccountType}${resolvedRedirectTo ? `&redirectTo=${encodeURIComponent(resolvedRedirectTo)}` : ""}`}
            >
              Back to login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
