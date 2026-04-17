"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@wew/components/ui/button";
import { FormInput } from "@wew/customs/formInput";
import { useForgotPasswordMutation } from "@wew/hooks/services/auth/useForgotPasswordMutation";
import type { AccountType } from "@wew/lib/auth";
import { setStoredPasswordRecoveryState } from "@wew/lib/password-recovery";
import {
  type ForgotPasswordFormValues,
  forgotPasswordFormSchema,
} from "@wew/lib/schemas/forgot-password-form";

import { getAuthVisualContent } from "./authVisuals";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordFormSchema),
  });

  const accountType = (searchParams.get("accountType") ||
    "applicant") as AccountType;
  const redirectTo = searchParams.get("redirectTo") || "";
  const heroContent = getAuthVisualContent(accountType);
  const { forgotPasswordHandler, isPending } = useForgotPasswordMutation();

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      const response = await forgotPasswordHandler(values);

      setStoredPasswordRecoveryState({
        accountId: response.data?.accountId,
        accountType,
        email: values.email,
        redirectTo,
      });

      router.push(
        `/forgot-password/verify?accountType=${accountType}${redirectTo ? `&redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
      );
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "We could not send a verification code. Please try again.",
      });
    }
  };

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
                Reset access with confidence.
              </h1>
              <p className="mt-2 text-base text-white sm:text-lg">
                Enter the email on your account and we will send you a
                verification code.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[34rem] flex-col justify-center py-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-dark-soft sm:text-4xl">
              Forgot password?
            </h2>
            <p className="mt-1 text-sm text-dark">
              We will email you a one-time verification code
            </p>
          </div>

          <form
            className="mt-10 space-y-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormInput
              error={form.formState.errors.email?.message}
              id="email"
              label="Email"
              placeholder="Enter email"
              type="email"
              {...form.register("email")}
            />

            <Button
              className="mt-3 h-14 w-full rounded-[0.7rem] text-base font-medium shadow-none hover:translate-y-0"
              disabled={isPending}
              size={null}
              type="submit"
              variant="primary"
            >
              {isPending ? "Sending code..." : "Send verification code"}
            </Button>

            {form.formState.errors.root?.message ? (
              <p className="text-sm text-[#ff5a5a]">
                {form.formState.errors.root.message}
              </p>
            ) : null}
          </form>

          <p className="mt-9 text-center text-sm text-dark">
            Remembered your password?
            <Link
              className="ml-1 font-medium text-accent-blue transition hover:text-[#2411a3]"
              href={`/login?accountType=${accountType}${redirectTo ? `&redirectTo=${encodeURIComponent(redirectTo)}` : ""}`}
            >
              Back to login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
