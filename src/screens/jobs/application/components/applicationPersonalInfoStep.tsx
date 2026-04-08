"use client";

import Image from "next/image";

import importIcon from "@wew/assets/icons/import.svg";
import userIcon from "@wew/assets/icons/user-tick.svg";
import { FormInput } from "@wew/customs/formInput";
import type { ProfileData } from "@wew/hooks/services/profile/useGetProfileQuery";
import type { JobApplicationFormValues } from "@wew/lib/schemas/job-application-form";
import { cn } from "@wew/lib/utils";

import type { UseFormReturn } from "react-hook-form";

type ApplicationPersonalInfoStepProps = {
  form: UseFormReturn<JobApplicationFormValues>;
  profile?: ProfileData;
  isImportingFromResume?: boolean;
  onImportFromResume: () => Promise<void> | void;
  onUseSavedProfile: () => void;
};

export function ApplicationPersonalInfoStep({
  form,
  isImportingFromResume = false,
  onImportFromResume,
  onUseSavedProfile,
  profile,
}: ApplicationPersonalInfoStepProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-dark">
            Personal Information
          </h3>
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-[0.9rem] bg-[#efe6fd] px-4 py-3 text-sm font-medium text-accent-blue transition hover:bg-[#e7ddfb]"
          disabled={isImportingFromResume}
          onClick={onImportFromResume}
          type="button"
        >
          <Image src={importIcon} alt="import" width={20} height={20} />
          {isImportingFromResume ? "Importing Resume..." : "Import from Resume"}
        </button>
      </div>

      <div className="rounded-[1rem] border border-[#eceaf5] p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <div className="border rounded-full border-[#EFE6FD] p-2">
              <Image src={userIcon} alt="user" width={24} height={24} />
            </div>

            <div>
              <p className="text-sm font-semibold text-secondary">
                Use your saved profile?
              </p>
              <p className="mt-1 text-xs font-medium text-secondary">
                Auto-fill fields from your profile data
              </p>
            </div>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-[0.7rem] border border-[#eceaf5] bg-white px-4 py-2.5 text-sm font-medium text-dark-soft transition hover:bg-[#faf8ff]"
            disabled={!profile}
            onClick={onUseSavedProfile}
            type="button"
          >
            Apply with Profile
          </button>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormInput
          error={form.formState.errors.personalInfo?.firstName?.message}
          label="First Name"
          placeholder="Enter your first name"
          {...form.register("personalInfo.firstName")}
        />
        <FormInput
          error={form.formState.errors.personalInfo?.lastName?.message}
          label="Last Name"
          placeholder="Enter your last name"
          {...form.register("personalInfo.lastName")}
        />
      </div>

      <FormInput
        error={form.formState.errors.personalInfo?.emailAddress?.message}
        label="Email Address"
        placeholder="Enter your email address"
        {...form.register("personalInfo.emailAddress")}
      />

      <FormInput
        error={form.formState.errors.personalInfo?.phone?.message}
        label="Phone Number"
        placeholder="Enter your phone number"
        {...form.register("personalInfo.phone")}
      />

      <label className="space-y-5">
        <span className="text-base text-secondary">Bio</span>
        <textarea
          className={cn(
            "min-h-[124px] w-full rounded-[0.8rem] border border-[#e2e2e2] px-4 py-4 text-[0.95rem] text-dark-soft outline-none transition placeholder:text-[#9a9a9a] focus-visible:ring-2 focus-visible:ring-accent-blue/15",
            form.formState.errors.personalInfo?.bio ? "border-[#ffb8b8]" : "",
          )}
          placeholder="Tell us about yourself"
          {...form.register("personalInfo.bio")}
        />
        {form.formState.errors.personalInfo?.bio?.message ? (
          <p className="text-sm text-[#ff5a5a]">
            {form.formState.errors.personalInfo.bio.message}
          </p>
        ) : null}
      </label>

      <FormInput
        error={form.formState.errors.personalInfo?.location?.message}
        label="Location"
        placeholder="Enter your location"
        {...form.register("personalInfo.location")}
      />
    </div>
  );
}
