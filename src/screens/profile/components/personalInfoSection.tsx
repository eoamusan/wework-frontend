"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { ProfileData } from "@wew/hooks/services/profile/useGetProfileQuery";
import { useUpdatePersonalInfoMutation } from "@wew/hooks/services/profile/useUpdatePersonalInfoMutation";
import type { AuthSession } from "@wew/lib/auth";
import {
  type PersonalInfoFormValues,
  personalInfoFormSchema,
} from "@wew/lib/schemas/profile-forms";

import { PersonalInfoForm } from "./personalInfoForm";
import { PersonalInfoView } from "./personalInfoView";

type PersonalInfoSectionProps = {
  accountId: string;
  formId: string;
  isEditing: boolean;
  onSaved: () => void;
  onSubmittingChange: (isSubmitting: boolean) => void;
  profile?: ProfileData;
  session: AuthSession | null;
};

function getDefaultValues(profile?: ProfileData): PersonalInfoFormValues {
  return {
    bio: profile?.bio || "",
    emailAddress: profile?.emailAddress || "",
    firstName: profile?.firstName || "",
    jobTitle: profile?.jobTitle || "",
    lastName: profile?.lastName || "",
    location: profile?.location || "",
    phone: profile?.phone || "",
    profilePicture: profile?.profilePicture || "",
  };
}

export function PersonalInfoSection({
  accountId,
  formId,
  isEditing,
  onSaved,
  onSubmittingChange,
  profile,
  session,
}: PersonalInfoSectionProps) {
  const { updatePersonalInfoHandler } = useUpdatePersonalInfoMutation({
    accountId,
    onSuccess: onSaved,
    session,
  });
  const form = useForm<PersonalInfoFormValues>({
    defaultValues: getDefaultValues(profile),
    resolver: zodResolver(personalInfoFormSchema),
  });

  useEffect(() => {
    form.reset(getDefaultValues(profile));
  }, [form, profile]);

  useEffect(() => {
    onSubmittingChange(form.formState.isSubmitting);

    return () => {
      onSubmittingChange(false);
    };
  }, [form.formState.isSubmitting, onSubmittingChange]);

  const onSubmit = async (values: PersonalInfoFormValues) => {
    try {
      await updatePersonalInfoHandler(values);
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "We could not update your profile right now.",
      });
    }
  };

  return (
    <section className="rounded-[1.65rem] border border-[#eceaf5] bg-white p-5 shadow-[0_18px_48px_rgba(7,10,29,0.05)] sm:p-8">
      {isEditing ? (
        <PersonalInfoForm
          form={form}
          formId={formId}
          onSubmit={onSubmit}
          profile={profile}
        />
      ) : (
        <PersonalInfoView profile={profile} session={session} />
      )}
    </section>
  );
}
