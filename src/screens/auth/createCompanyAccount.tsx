"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import companySignupImage from "@wew/assets/images/company-sign-up.jpg";
import { Button } from "@wew/components/ui/button";
import { AuthShowcaseCard } from "@wew/customs/authShowcaseCard";
import { FormCheckbox } from "@wew/customs/formCheckbox";
import { FormInput } from "@wew/customs/formInput";
import { PhoneInputField } from "@wew/customs/phoneInputField";
import { useCompanySignUpMutation } from "@wew/hooks/services/auth/useCompanySignUpMutation";
import type { AccountType } from "@wew/lib/auth";
import {
  type CreateCompanyAccountFormValues,
  createCompanyAccountFormSchema,
} from "@wew/lib/schemas/create-company-account-form";

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

export default function CreateCompanyAccountPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const searchParams = useSearchParams();
  const form = useForm<CreateCompanyAccountFormValues>({
    defaultValues: {
      companyName: "",
      confirmPassword: "",
      email: "",
      industryType: "",
      password: "",
      phoneNumber: "",
      receiveMarketing: false,
      termsAccepted: false,
    },
    resolver: zodResolver(createCompanyAccountFormSchema),
  });

  const redirectTo = searchParams.get("redirectTo") || "";
  const accountType = (searchParams.get("accountType") || "company") as AccountType;
  const { isPending, signUpHandler } = useCompanySignUpMutation({
    redirectTo,
  });

  const onSubmit = async (values: CreateCompanyAccountFormValues) => {
    try {
      await signUpHandler(values);
      form.reset(values);
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "We could not create your company account. Please try again.",
      });
    }
  };

  return (
    <main className="bg-white">
      <section className="mx-auto grid w-full max-w-[86rem] gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.86fr)] lg:items-center lg:gap-14 lg:px-8 lg:pt-10 lg:pb-24">
        <AuthShowcaseCard
          alt="Hiring team collaborating in an office"
          description="Post jobs and connect with top talent."
          image={companySignupImage}
          title="Start Hiring Smarter."
        />

        <div className="mx-auto flex w-full max-w-[31.5rem] flex-col justify-center py-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-[-0.05em] text-dark-soft sm:text-5xl">
              Create an account
            </h2>
            <p className="mt-1 text-sm text-[#6e6e6e]">Join WeWork today</p>
          </div>

          <form
            className="mt-10 flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormInput
              error={form.formState.errors.companyName?.message}
              id="companyName"
              label="Company Name"
              placeholder="Enter company name"
              {...form.register("companyName")}
            />

            <FormInput
              error={form.formState.errors.industryType?.message}
              id="industryType"
              label="Industry Type"
              placeholder="Enter industry type"
              {...form.register("industryType")}
            />

            <FormInput
              error={form.formState.errors.email?.message}
              id="email"
              label="Email address"
              placeholder="Enter email"
              type="email"
              {...form.register("email")}
            />

            <PhoneInputField
              error={form.formState.errors.phoneNumber?.message}
              id="phoneNumber"
              label="Phone number"
              {...form.register("phoneNumber")}
            />

            <FormInput
              error={form.formState.errors.password?.message}
              id="password"
              label="Password"
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
              label="Confirm Password"
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

            <div className="space-y-2 pt-1">
              <Controller
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormCheckbox
                    checked={field.value}
                    error={form.formState.errors.termsAccepted?.message}
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                  >
                    I have read and agree to the{" "}
                    <Link
                      className="font-medium text-accent-blue transition hover:text-[#2411a3]"
                      href="#"
                    >
                      Terms and Condition
                    </Link>
                  </FormCheckbox>
                )}
              />

              <Controller
                control={form.control}
                name="receiveMarketing"
                render={({ field }) => (
                  <FormCheckbox
                    checked={field.value}
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                  >
                    I agree to receive marketing messages from Tenda
                  </FormCheckbox>
                )}
              />
            </div>

            <Button
              className="mt-4 h-14 w-full rounded-[0.7rem] text-base font-medium shadow-none hover:translate-y-0"
              disabled={isPending}
              size={null}
              type="submit"
              variant="primary"
            >
              {isPending ? "Creating account..." : "Create Account"}
            </Button>

            {form.formState.errors.root?.message ? (
              <p className="text-sm text-[#ff5a5a]">
                {form.formState.errors.root.message}
              </p>
            ) : null}
          </form>

          <p className="mt-8 text-center text-sm text-[#636363]">
            Already have an account?
            <Link
              className="ml-1 font-medium text-accent-blue transition hover:text-[#2411a3]"
              href={`/login?accountType=${accountType}${redirectTo ? `&redirectTo=${encodeURIComponent(redirectTo)}` : ""}`}
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
