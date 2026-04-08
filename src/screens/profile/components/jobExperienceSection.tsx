"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@wew/components/ui/button";
import { FormInput } from "@wew/customs/formInput";
import type { ProfileData } from "@wew/hooks/services/profile/useGetProfileQuery";
import { useUpdateJobExperienceMutation } from "@wew/hooks/services/profile/useUpdateJobExperienceMutation";
import {
  type JobExperienceFormValues,
  jobExperienceFormSchema,
} from "@wew/lib/schemas/profile-forms";
import { JobExperienceFormCard } from "@wew/screens/profile/components/jobExperienceFormCard";

import { JobExperienceView } from "./jobExperienceView";

type JobExperienceSectionProps = {
  accountId: string;
  formId: string;
  isEditing: boolean;
  onSaved: () => void;
  onSubmittingChange: (isSubmitting: boolean) => void;
  profile?: ProfileData;
};

function getDefaultValues(profile?: ProfileData): JobExperienceFormValues {
  return {
    experiences: profile?.experiences?.length
      ? profile.experiences.map((experience) => ({
          companyName: experience.companyName || "",
          currentlyWorking: Boolean(experience.currentlyWorking),
          description: experience.description || "",
          endDate: experience.endDate || "",
          jobTitle: experience.jobTitle || "",
          startDate: experience.startDate || "",
        }))
      : [
          {
            companyName: "",
            currentlyWorking: false,
            description: "",
            endDate: "",
            jobTitle: "",
            startDate: "",
          },
        ],
    linkedinProfile: profile?.linkedinProfile || "",
    portfolioWebsite: profile?.portfolioWebsite || "",
  };
}

export function JobExperienceSection({
  accountId,
  formId,
  isEditing,
  onSaved,
  onSubmittingChange,
  profile,
}: JobExperienceSectionProps) {
  const { updateJobExperienceHandler } = useUpdateJobExperienceMutation({
    accountId,
    onSuccess: onSaved,
  });
  const form = useForm<JobExperienceFormValues>({
    defaultValues: getDefaultValues(profile),
    resolver: zodResolver(jobExperienceFormSchema),
  });
  const fieldArray = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  useEffect(() => {
    form.reset(getDefaultValues(profile));
  }, [form, profile]);

  useEffect(() => {
    onSubmittingChange(form.formState.isSubmitting);
    return () => onSubmittingChange(false);
  }, [form.formState.isSubmitting, onSubmittingChange]);

  const onSubmit = async (values: JobExperienceFormValues) => {
    try {
      await updateJobExperienceHandler(values);
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "We could not update your experience right now.",
      });
    }
  };

  return (
    <section className="rounded-[1.65rem] border border-[#eceaf5] bg-white p-5 shadow-[0_18px_48px_rgba(7,10,29,0.05)] sm:p-8">
      {isEditing ? (
        <form
          className="space-y-7"
          id={formId}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="rounded-[1.1rem] border border-[#eceaf5] bg-[#fafbfd] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-dark-soft">
                  Job Experience
                </h3>
                <p className="text-sm text-secondary/75">Add previous roles</p>
              </div>

              <Button
                className="h-11 rounded-[0.8rem] px-5 text-sm shadow-none hover:translate-y-0"
                onClick={() =>
                  fieldArray.append({
                    companyName: "",
                    currentlyWorking: false,
                    description: "",
                    endDate: "",
                    jobTitle: "",
                    startDate: "",
                  })
                }
                size={null}
                type="button"
                variant="success"
              >
                <Plus className="size-4" />
                Add More
              </Button>
            </div>

            <div className="mt-6 space-y-6">
              {fieldArray.fields.map((field, index) => {
                return (
                  <JobExperienceFormCard
                    form={form}
                    index={index}
                    key={field.id}
                    onRemove={() => fieldArray.remove(index)}
                    removable={fieldArray.fields.length > 1}
                  />
                );
              })}
            </div>
          </div>

          <FormInput
            error={form.formState.errors.linkedinProfile?.message}
            label="LinkedIn Profile"
            placeholder="https://linkedin.com/in/..."
            {...form.register("linkedinProfile")}
          />

          <FormInput
            error={form.formState.errors.portfolioWebsite?.message}
            label="Portfolio / Website"
            placeholder="https://..."
            {...form.register("portfolioWebsite")}
          />

          {form.formState.errors.root?.message ? (
            <p className="text-sm text-[#ff5a5a]">
              {form.formState.errors.root.message}
            </p>
          ) : null}
        </form>
      ) : (
        <JobExperienceView profile={profile} />
      )}
    </section>
  );
}
