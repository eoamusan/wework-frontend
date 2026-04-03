"use client";

import { type ChangeEvent, useRef, useState } from "react";

import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { type UseFormReturn } from "react-hook-form";

import cameraIcon from "@wew/assets/icons/camera.svg";
import { FormInput } from "@wew/customs/formInput";
import type { ProfileData } from "@wew/hooks/services/profile/useGetProfileQuery";
import { uploadToCloudinary } from "@wew/lib/cloudinary";
import {
  type PersonalInfoFormValues,
} from "@wew/lib/schemas/profile-forms";
import { cn } from "@wew/lib/utils";

type PersonalInfoFormProps = {
  formId: string;
  form: UseFormReturn<PersonalInfoFormValues>;
  onSubmit: (values: PersonalInfoFormValues) => Promise<void>;
  profile?: ProfileData;
};

export function PersonalInfoForm({
  form,
  formId,
  onSubmit,
  profile,
}: PersonalInfoFormProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const watchedAvatar = form.watch("profilePicture");
  const initials = `${profile?.firstName?.[0] || "M"}${profile?.lastName?.[0] || "P"}`.toUpperCase();

  const handleAvatarSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadError("");
    setAvatarUploading(true);

    try {
      const result = await uploadToCloudinary(file, {
        folder: "profile/avatar",
        resourceType: "image",
        tags: ["profile-picture"],
      });

      form.setValue("profilePicture", result.url, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : "We could not upload your profile photo.",
      );
    } finally {
      setAvatarUploading(false);
      event.target.value = "";
    }
  };

  return (
    <form
      className="grid gap-8 lg:grid-cols-[140px_minmax(0,1fr)]"
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-3">
        <div className="relative">
          {watchedAvatar ? (
            <img
              alt="Profile preview"
              className="h-[140px] w-[140px] rounded-full object-cover"
              src={watchedAvatar}
            />
          ) : (
            <div className="flex h-[140px] w-[140px] items-center justify-center rounded-full bg-[#f2ecff] text-3xl font-semibold text-accent-blue">
              {initials}
            </div>
          )}

          <button
            className="absolute right-0 bottom-3 flex p-2 items-center justify-center rounded-full bg-[#f4efff] text-accent-blue transition hover:bg-[#ece3ff]"
            onClick={() => inputRef.current?.click()}
            type="button"
          >
            {avatarUploading ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Image src={cameraIcon} alt="Upload avatar" width={24} height={24} />
            )}
          </button>

          <input
            accept="image/*"
            className="sr-only"
            onChange={handleAvatarSelected}
            ref={inputRef}
            type="file"
          />
        </div>

        {uploadError ? <p className="text-sm text-[#ff5a5a]">{uploadError}</p> : null}
      </div>

      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput
            error={form.formState.errors.firstName?.message}
            label="First Name"
            placeholder="Enter your first name"
            {...form.register("firstName")}
          />
          <FormInput
            error={form.formState.errors.lastName?.message}
            label="Last Name"
            placeholder="Enter your last name"
            {...form.register("lastName")}
          />
        </div>

        <FormInput
          error={form.formState.errors.emailAddress?.message}
          label="Email Address"
          placeholder="Enter your email address"
          type="email"
          {...form.register("emailAddress")}
        />

        <FormInput
          error={form.formState.errors.phone?.message}
          label="Phone Number"
          placeholder="Enter your phone number"
          {...form.register("phone")}
        />

        <FormInput
          error={form.formState.errors.jobTitle?.message}
          label="Job Title"
          placeholder="Enter your job title"
          {...form.register("jobTitle")}
        />

        <label className="space-y-2.5">
          <span className="text-base text-[#666]">Bio</span>
          <textarea
            className={cn(
              "min-h-[146px] w-full rounded-[0.8rem] border border-[#e2e2e2] px-4 py-4 text-[0.95rem] text-dark-soft outline-none transition placeholder:text-[#9a9a9a] focus-visible:ring-2 focus-visible:ring-accent-blue/15",
              form.formState.errors.bio ? "border-[#ffb8b8]" : "",
            )}
            placeholder="Tell us about yourself"
            {...form.register("bio")}
          />
          {form.formState.errors.bio?.message ? (
            <p className="text-sm text-[#ff5a5a]">
              {form.formState.errors.bio.message}
            </p>
          ) : null}
        </label>

        <FormInput
          error={form.formState.errors.location?.message}
          label="Location"
          placeholder="Enter your location"
          {...form.register("location")}
        />

        {form.formState.errors.root?.message ? (
          <p className="text-sm text-[#ff5a5a]">
            {form.formState.errors.root.message}
          </p>
        ) : null}

        {avatarUploading ? (
          <p className="text-sm text-secondary/75">Uploading profile photo...</p>
        ) : null}
      </div>
    </form>
  );
}
