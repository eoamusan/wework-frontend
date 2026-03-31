import type { ReactNode } from "react";

import { Check } from "lucide-react";

import { cn } from "@wew/lib/utils";

interface FormCheckboxProps {
  checked?: boolean;
  children: ReactNode;
  className?: string;
  error?: string;
  name?: string;
  onBlur?: () => void;
  onChange?: (checked: boolean) => void;
}

export function FormCheckbox({
  checked = false,
  children,
  className,
  error,
  name,
  onBlur,
  onChange,
}: FormCheckboxProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <label className="flex cursor-pointer items-center gap-2.5 text-xs text-dark">
        <input
          checked={checked}
          className="peer sr-only"
          name={name}
          onBlur={onBlur}
          onChange={(event) => onChange?.(event.target.checked)}
          type="checkbox"
        />

        <span className="flex size-4 shrink-0 items-center justify-center rounded-md border border-gray-soft bg-white text-[#b8b8b8] transition peer-focus-visible:ring-2 peer-focus-visible:ring-accent-blue/15 peer-checked:border-accent-blue/35 peer-checked:bg-accent-blue/6 peer-checked:text-accent-blue">
          <Check className="size-2 stroke-[2.4]" />
        </span>

        <span>{children}</span>
      </label>

      {error ? <p className="text-sm text-[#ff5a5a]">{error}</p> : null}
    </div>
  );
}
