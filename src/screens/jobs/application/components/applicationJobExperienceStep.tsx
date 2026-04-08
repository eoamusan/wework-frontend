"use client";

import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray } from "react-hook-form";

import { Button } from "@wew/components/ui/button";
import { DatePicker } from "@wew/components/ui/datePicker";
import { FormCheckbox } from "@wew/customs/formCheckbox";
import { FormInput } from "@wew/customs/formInput";
import type { JobApplicationFormValues } from "@wew/lib/schemas/job-application-form";
import { cn } from "@wew/lib/utils";

import type { UseFormReturn } from "react-hook-form";

type ApplicationJobExperienceStepProps = {
  form: UseFormReturn<JobApplicationFormValues>;
};

export function ApplicationJobExperienceStep({
  form,
}: ApplicationJobExperienceStepProps) {
  const fieldArray = useFieldArray({
    control: form.control,
    name: "jobExperience.experiences",
  });

  return (
    <div className="space-y-7">
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
            const itemError =
              form.formState.errors.jobExperience?.experiences?.[index];
            const isCurrentRole = form.watch(
              `jobExperience.experiences.${index}.currentlyWorking`,
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
                    {...form.register(
                      `jobExperience.experiences.${index}.companyName`,
                    )}
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Controller
                      control={form.control}
                      name={`jobExperience.experiences.${index}.startDate`}
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
                      name={`jobExperience.experiences.${index}.endDate`}
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
                    name={`jobExperience.experiences.${index}.currentlyWorking`}
                    render={({ field: controllerField }) => (
                      <FormCheckbox
                        checked={controllerField.value}
                        name={controllerField.name}
                        onBlur={controllerField.onBlur}
                        onChange={(checked) => {
                          controllerField.onChange(checked);
                          if (checked) {
                            form.setValue(
                              `jobExperience.experiences.${index}.endDate`,
                              "",
                            );
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
                    {...form.register(
                      `jobExperience.experiences.${index}.jobTitle`,
                    )}
                  />

                  <label className="space-y-5">
                    <span className="text-base text-secondary">Description</span>
                    <textarea
                      className={cn(
                        "min-h-[124px] w-full rounded-[0.8rem] border border-[#e2e2e2] px-4 py-4 text-[0.95rem] text-dark-soft outline-none transition placeholder:text-[#9a9a9a] focus-visible:ring-2 focus-visible:ring-accent-blue/15",
                        itemError?.description ? "border-[#ffb8b8]" : "",
                      )}
                      placeholder="Describe your role and responsibilities in the company"
                      {...form.register(
                        `jobExperience.experiences.${index}.description`,
                      )}
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
        error={form.formState.errors.jobExperience?.linkedinProfile?.message}
        label="LinkedIn Profile"
        placeholder="https://linkedin.com/in/..."
        {...form.register("jobExperience.linkedinProfile")}
      />

      <FormInput
        error={form.formState.errors.jobExperience?.portfolioWebsite?.message}
        label="Portfolio/Website"
        placeholder="https://..."
        {...form.register("jobExperience.portfolioWebsite")}
      />
    </div>
  );
}
