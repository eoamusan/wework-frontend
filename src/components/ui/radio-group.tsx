"use client";

import type { ComponentProps } from "react";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@wew/lib/utils";

function RadioGroup(props: ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root className="grid gap-4" {...props} />;
}

function RadioGroupItem({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "flex size-9 items-center justify-center rounded-full border-2 border-secondary/50 bg-white shadow-[0_6px_16px_rgba(6,2,18,0.06)] outline-none transition focus-visible:ring-2 focus-visible:ring-accent-blue/30 data-[state=checked]:border-accent-blue",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className="size-4 rounded-full bg-accent-blue shadow-[0_0_0_4px_rgba(51,0,201,0.12)]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
