"use client";

import { Trash2 } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { DatePicker } from "@wew/components/ui/datePicker";
import { FormCheckbox } from "@wew/customs/formCheckbox";
import { FormInput } from "@wew/customs/formInput";
import type { JobExperienceFormValues } from "@wew/lib/schemas/profile-forms";
import { cn } from "@wew/lib/utils";

type JobExperienceFormCardProps = {
  form: UseFormReturn<JobExperienceFormValues>;
  index: number;
  onRemove: () => void;
  removable: boolean;
};

export function JobExperienceFormCard({
  form,
  index,
  onRemove,
  removable,
}: JobExperienceFormCardProps) {
  const itemError = form.formState.errors.experiences?.[index];
  const isCurrentRole = form.watch(`experiences.${index}.currentlyWorking`);

  return (
    <div className="rounded-[1rem] border border-[#e8e4f3] bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-base font-medium text-dark-soft">
          Experience {index + 1}
        </p>

        {removable ? (
          <button
            className="text-[#ff4d58] transition hover:opacity-80"
            onClick={onRemove}
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
            render={({ field }) => (
              <DatePicker
                error={itemError?.startDate?.message}
                label="Start Date"
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />

          <Controller
            control={form.control}
            name={`experiences.${index}.endDate`}
            render={({ field }) => (
              <DatePicker
                disabled={isCurrentRole}
                error={itemError?.endDate?.message}
                label="End Date"
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </div>

        <Controller
          control={form.control}
          name={`experiences.${index}.currentlyWorking`}
          render={({ field }) => (
            <FormCheckbox
              checked={field.value}
              name={field.name}
              onBlur={field.onBlur}
              onChange={(checked) => {
                field.onChange(checked);
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
}
