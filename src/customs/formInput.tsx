import type { ComponentProps, ReactNode } from "react";

import { Input } from "@wew/components/ui/input";
import { cn } from "@wew/lib/utils";

interface FormInputProps extends Omit<ComponentProps<typeof Input>, "className"> {
  error?: string;
  inputClassName?: string;
  label: string;
  labelClassName?: string;
  rightAdornment?: ReactNode;
  wrapperClassName?: string;
}

export function FormInput({
  error,
  inputClassName,
  label,
  labelClassName,
  rightAdornment,
  wrapperClassName,
  ...props
}: FormInputProps) {
  return (
    <label className={cn("flex flex-col gap-2", wrapperClassName)}>
      <span className={cn("text-base text-secondary", labelClassName)}>{label}</span>

      <div className="relative">
        <Input
          className={cn(
            "h-13 rounded-[0.6rem] border-[#e2e2e2] px-4 text-[0.95rem] shadow-none placeholder:text-[#9a9a9a] focus-visible:ring-accent-blue/15",
            rightAdornment ? "pr-12" : "",
            inputClassName,
          )}
          {...props}
        />

        {rightAdornment ? (
          <div className="absolute inset-y-0 right-4 flex items-center">
            {rightAdornment}
          </div>
        ) : null}
      </div>

      {error ? <p className="text-sm text-[#ff5a5a]">{error}</p> : null}
    </label>
  );
}
