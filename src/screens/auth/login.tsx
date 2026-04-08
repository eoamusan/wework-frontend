"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import googleIcon from "@wew/assets/icons/google.svg";
import applicantLoginImage from "@wew/assets/images/applicant-login.jpg";
import companyLoginImage from "@wew/assets/images/company-sign-in.jpg";
import { Button } from "@wew/components/ui/button";
import { FormInput } from "@wew/customs/formInput";
import { useSignInMutation } from "@wew/hooks/services/auth/useSignInMutation";
import type { AccountType } from "@wew/lib/auth";
import {
  type LoginFormValues,
  loginFormSchema,
} from "@wew/lib/schemas/login-form";

export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const searchParams = useSearchParams();
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    resolver: zodResolver(loginFormSchema),
  });

  const accountType = (searchParams.get("accountType") ||
    "applicant") as AccountType;
  const redirectTo = searchParams.get("redirectTo") || "";
  const loginContent =
    accountType === "company"
      ? {
          alt: "Company team reviewing candidates together",
          imageClassName: "object-cover object-[center_90%]",
          description:
            "Log in to manage openings, review applicants, and grow your team.",
          image: companyLoginImage,
          title: "Hire Better, Faster.",
        }
      : {
          alt: "Smiling applicant using a laptop",
          imageClassName: "object-cover object-center",
          description:
            "Log in to discover new jobs and move closer to your next role.",
          image: applicantLoginImage,
          title: "Your Next Opportunity Is Waiting.",
        };
  const { isPending, signInHandler } = useSignInMutation({
    accountType,
    redirectTo,
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await signInHandler(values);
      form.reset(values);
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "We could not sign you in. Please try again.",
      });
    }
  };

  return (
    <main className="bg-white">
      <section className="mx-auto grid w-full max-w-[86rem] gap-10 px-4 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-center lg:gap-16 lg:px-8 lg:pt-10 lg:pb-24">
        <div className="relative overflow-hidden rounded-[1.35rem] border border-black/6 bg-[#f3eadf] shadow-[0_18px_45px_rgba(6,2,18,0.08)]">
          <div className="relative aspect-[1/0.98] min-h-[420px] w-full">
            <Image
              alt={loginContent.alt}
              className={loginContent.imageClassName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 54vw"
              src={loginContent.image}
            />

            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(7,4,18,0)_0%,rgba(7,4,18,0.28)_42%,rgba(7,4,18,0.82)_100%)] px-6 pb-7 pt-20 text-center text-white sm:px-9 sm:pb-9">
              <div className="mb-5 flex items-center justify-center gap-2">
                <span className="size-2 rounded-full bg-white/55" />
                <span className="size-2 rounded-full bg-white" />
                <span className="size-2 rounded-full bg-white/55" />
              </div>

              <h1 className="text-2xl font-semibold tracking-[-0.04em] sm:text-[2.15rem]">
                {loginContent.title}
              </h1>
              <p className="mt-2 text-base text-white sm:text-lg">
                {loginContent.description}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[34rem] flex-col justify-center py-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold  text-dark-soft sm:text-4xl">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-dark">
              Sign in to your account to continue
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
              placeholder="Enter Email"
              type="email"
              {...form.register("email")}
            />

            <div className="mt-6 space-y-2">
              <FormInput
                error={form.formState.errors.password?.message}
                id="password"
                label="Password"
                placeholder="****************"
                rightAdornment={
                  <button
                    aria-label={
                      isPasswordVisible ? "Hide password" : "Show password"
                    }
                    className="text-[#919191] transition hover:text-[#5e5e5e]"
                    onClick={() => setIsPasswordVisible((value) => !value)}
                    type="button"
                  >
                    {isPasswordVisible ? (
                      <EyeOff className="size-5 stroke-[1.8]" />
                    ) : (
                      <Eye className="size-5 stroke-[1.8]" />
                    )}
                  </button>
                }
                type={isPasswordVisible ? "text" : "password"}
                {...form.register("password")}
              />

              <div className="flex items-center justify-between gap-4 text-xs mt-2">
                <label className="inline-flex cursor-pointer items-center gap-2 text-gray">
                  <input
                    className="size-3.5 rounded-[0.2rem] accent-[#8b5cf6]"
                    type="checkbox"
                    {...form.register("rememberMe")}
                  />
                  <span>Remember Me</span>
                </label>

                <Link
                  className="font-medium text-[#ff5a5a] transition hover:text-[#ff3d3d]"
                  href="#"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              className="mt-3 h-14 w-full rounded-[0.7rem] text-base font-medium shadow-none hover:translate-y-0"
              disabled={isPending}
              size={null}
              type="submit"
              variant="primary"
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>

            {form.formState.errors.root?.message ? (
              <p className="text-sm text-[#ff5a5a]">
                {form.formState.errors.root.message}
              </p>
            ) : null}

            <button
              className="flex h-13 w-full items-center justify-center gap-3 rounded-[0.7rem] border border-[#e7e7e7] bg-white text-sm font-medium text-[#4a4a4a] transition hover:bg-[#fafafa]"
              type="button"
            >
              <Image alt="Google" src={googleIcon} width={25} height={25} />
              <span>Log with Google</span>
            </button>
          </form>

          <p className="mt-9 text-center text-sm text-dark">
            Not Registered Yet?
            <Link
              className="ml-1 font-medium text-accent-blue transition hover:text-[#2411a3]"
              href={`/create-account?accountType=${accountType}${redirectTo ? `&redirectTo=${encodeURIComponent(redirectTo)}` : ""}`}
            >
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
