"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { Button } from "@wew/components/ui/button";
import { DatePicker } from "@wew/components/ui/datePicker";
import { FormCheckbox } from "@wew/customs/formCheckbox";
import { FormInput } from "@wew/customs/formInput";
import type { ProfileData } from "@wew/hooks/services/profile/useGetProfileQuery";
import { useUpdateJobExperienceMutation } from "@wew/hooks/services/profile/useUpdateJobExperienceMutation";
import {
  type JobExperienceFormValues,
  jobExperienceFormSchema,
} from "@wew/lib/schemas/profile-forms";
import { cn } from "@wew/lib/utils";

import { JobExperienceView } from "./jobExperienceView";

type JobExperienceSectionProps = {
  accountId: string;
  formId: string;
  isEditing: boolean;
  onSaved: () => void;
  profile?: ProfileData;
};

function getDefaultValues(profile?: ProfileData): JobExperienceFormValues {
  return {
    experiences:
      profile?.experiences?.length
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
        <form className="space-y-7" id={formId} onSubmit={form.handleSubmit(onSubmit)}>
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
                const itemError = form.formState.errors.experiences?.[index];
                const isCurrentRole = form.watch(
                  `experiences.${index}.currentlyWorking`,
                );

                return (
                  <div
                    className="rounded-[1rem] border border-[#e8e4f3] bg-white p-5"
                    key={field.id}
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <p className="text-base font-medium text-dark-soft">
                        Experience {index + 1}
                      </p>

                      {fieldArray.fields.length > 1 ? (
                        <button
                          className="text-[#ff4d58] transition hover:opacity-80"
                          onClick={() => fieldArray.remove(index)}
                          type="button"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      ) : null}
                    </div>

                    <div className="space-y-5">
                      <FormInput
                        error={itemError?.companyName?.message}
                        label="Company Name"
                        placeholder="e.g Acme Corporation"
                        {...form.register(`experiences.${index}.companyName`)}
                      />

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Controller
                          control={form.control}
                          name={`experiences.${index}.startDate`}
                          render={({ field: controllerField }) => (
                            <DatePicker
                              error={itemError?.startDate?.message}
                              label="Start Date"
                              onChange={controllerField.onChange}
                              value={controllerField.value}
                            />
                          )}
                        />
                        <Controller
                          control={form.control}
                          name={`experiences.${index}.endDate`}
                          render={({ field: controllerField }) => (
                            <DatePicker
                              disabled={isCurrentRole}
                              error={itemError?.endDate?.message}
                              label="End Date"
                              onChange={controllerField.onChange}
                              value={controllerField.value}
                            />
                          )}
                        />
                      </div>

                      <Controller
                        control={form.control}
                        name={`experiences.${index}.currentlyWorking`}
                        render={({ field: controllerField }) => (
                          <FormCheckbox
                            checked={controllerField.value}
                            name={controllerField.name}
                            onBlur={controllerField.onBlur}
                            onChange={(checked) => {
                              controllerField.onChange(checked);
                              if (checked) {
                                form.setValue(`experiences.${index}.endDate`, "");
                              }
                            }}
                          >
                            I currently work in this role
                          </FormCheckbox>
                        )}
                      />

                      <FormInput
                        error={itemError?.jobTitle?.message}
                        label="Job Title"
                        placeholder="e.g Product Designer"
                        {...form.register(`experiences.${index}.jobTitle`)}
                      />

                      <label className="space-y-2.5">
                        <span className="text-base text-[#666]">Description</span>
                        <textarea
                          className={cn(
                            "min-h-[124px] w-full rounded-[0.8rem] border border-[#e2e2e2] px-4 py-4 text-[0.95rem] text-dark-soft outline-none transition placeholder:text-[#9a9a9a] focus-visible:ring-2 focus-visible:ring-accent-blue/15",
                            itemError?.description ? "border-[#ffb8b8]" : "",
                          )}
                          placeholder="Describe your role and responsibilities in the company"
                          {...form.register(`experiences.${index}.description`)}
                        />
                        {itemError?.description?.message ? (
                          <p className="text-sm text-[#ff5a5a]">
                            {itemError.description.message}
                          </p>
                        ) : null}
                      </label>
                    </div>
                  </div>
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
