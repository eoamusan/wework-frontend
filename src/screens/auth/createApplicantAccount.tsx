"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

import applicantSignupImage from "@wew/assets/images/applicant-sign-up.jpg";
import { Button } from "@wew/components/ui/button";
import { AuthShowcaseCard } from "@wew/customs/authShowcaseCard";
import { FormCheckbox } from "@wew/customs/formCheckbox";
import { FormInput } from "@wew/customs/formInput";
import { PhoneInputField } from "@wew/customs/phoneInputField";
import {
  type CreateApplicantAccountFormValues,
  createApplicantAccountFormSchema,
} from "@wew/lib/schemas/create-applicant-account-form";

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

const CreateApplicantAccountPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const form = useForm<CreateApplicantAccountFormValues>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phoneNumber: "",
      receiveMarketing: false,
      termsAccepted: false,
    },
    resolver: zodResolver(createApplicantAccountFormSchema),
  });

  const onSubmit = (values: CreateApplicantAccountFormValues) => {
    form.reset(values);
  };

  return (
    <main className="bg-white">
      <section className="mx-auto grid w-full max-w-[86rem] gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.86fr)] lg:items-center lg:gap-14 lg:px-8 lg:pt-10 lg:pb-24">
        <AuthShowcaseCard
          alt="Applicant smiling while speaking on the phone"
          description="Sign up, apply quickly, and manage your applications with ease."
          image={applicantSignupImage}
          title="Ready to Get Hired?"
        />

        <div className="mx-auto flex w-full max-w-[31.5rem] flex-col justify-center py-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-[-0.05em] text-dark-soft sm:text-5xl">
              Create an account
            </h2>
            <p className="mt-1 text-sm text-[#6e6e6e]">Join WeWork today</p>
          </div>

          <form className="mt-10 flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
              error={form.formState.errors.firstName?.message}
              id="firstName"
              label="First Name"
              placeholder="Enter first name"
              {...form.register("firstName")}
            />

            <FormInput
              error={form.formState.errors.lastName?.message}
              id="lastName"
              label="Last Name"
              placeholder="Enter last name"
              {...form.register("lastName")}
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
                  onToggle={() =>
                    setIsConfirmPasswordVisible((value) => !value)
                  }
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
              size={null}
              type="submit"
              variant="primary"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-[#636363]">
            Already have an account?
            <Link
              className="ml-1 font-medium text-accent-blue transition hover:text-[#2411a3]"
              href="/login"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}


export default CreateApplicantAccountPage;