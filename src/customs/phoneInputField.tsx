import type { ComponentProps } from "react";

import { ChevronDown } from "lucide-react";

import { Input } from "@wew/components/ui/input";
import { cn } from "@wew/lib/utils";

interface PhoneInputFieldProps
  extends Omit<ComponentProps<typeof Input>, "className" | "type"> {
  error?: string;
  label: string;
  wrapperClassName?: string;
}

export function PhoneInputField({
  error,
  label,
  wrapperClassName,
  ...props
}: PhoneInputFieldProps) {
  return (
    <label className={cn("space-y-2.5", wrapperClassName)}>
      <span className="text-base text-[#666]">{label}</span>

      <div className="flex h-13 items-center rounded-[0.75rem] border border-[#e2e2e2] bg-white pl-3 shadow-none">
        <div className="flex items-center gap-2 pr-3">
          <span className="flex size-5 overflow-hidden rounded-full border border-[#d8e8c8]">
            <span className="flex-1 bg-[#7ec343]" />
            <span className="flex-1 bg-white" />
            <span className="flex-1 bg-[#7ec343]" />
          </span>
          <ChevronDown className="size-3 text-accent-blue" strokeWidth={2.25} />
        </div>

        <div aria-hidden="true" className="mr-3 h-5 w-px bg-[#ececec]" />

        <span className="mr-2 text-[0.92rem] text-[#b2b2b2]">(+234)</span>

        <Input
          className="h-full rounded-none border-0 px-0 text-[0.95rem] shadow-none focus-visible:ring-0"
          inputMode="numeric"
          placeholder="123 456 789"
          type="tel"
          {...props}
        />
      </div>

      {error ? <p className="text-sm text-[#ff5a5a]">{error}</p> : null}
    </label>
  );
}
