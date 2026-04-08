"use client";

import { Check } from "lucide-react";

import { cn } from "@wew/lib/utils";

export type ApplicationStepId =
  | "personal"
  | "experience"
  | "resume"
  | "preview";

const steps: { description: string; label: string; value: ApplicationStepId }[] = [
  {
    description: "Your Details",
    label: "Personal Information",
    value: "personal",
  },
  {
    description: "Add previous roles and links",
    label: "Job Experience & Links",
    value: "experience",
  },
  {
    description: "Upload your Resume/CV",
    label: "Resume/CV",
    value: "resume",
  },
  {
    description: "Review summary",
    label: "Preview",
    value: "preview",
  },
];

type ApplicationStepperProps = {
  currentStep: ApplicationStepId;
};

export function ApplicationStepper({
  currentStep,
}: ApplicationStepperProps) {
  const currentIndex = steps.findIndex((step) => step.value === currentStep);

  return (
    <div className="mx-auto flex w-full max-w-[48rem] items-start justify-between">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <div className="flex min-w-0 flex-1 items-start" key={step.value}>
            <div className="flex min-w-0 flex-1 flex-col items-center text-center">
              <div
                className={cn(
                  "flex size-7 items-center justify-center rounded-full border text-xs font-semibold",
                  isCompleted
                    ? "border-[#179d64] bg-[#179d64] text-white"
                    : isActive
                      ? "border-[#e3def3] bg-white text-secondary"
                      : "border-[#e3def3] bg-white text-secondary/50",
                )}
              >
                {isCompleted ? <Check className="size-4" /> : index + 1}
              </div>
              <p className="mt-4 whitespace-nowrap text-[11px] font-medium text-dark-soft sm:text-sm">
                {step.label}
              </p>
              <p className="mt-2 whitespace-nowrap text-[10px] text-secondary/55 sm:text-xs">
                {step.description}
              </p>
            </div>

            {index < steps.length - 1 ? (
              <div className="mt-3 hidden h-px flex-1 border-t border-dashed border-[#dcd8eb] sm:block" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
