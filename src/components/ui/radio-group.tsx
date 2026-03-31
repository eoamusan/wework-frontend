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
        "grid size-7 place-items-center rounded-full border-[3px] border-[#8c8c8c] bg-white outline-none transition focus-visible:ring-2 focus-visible:ring-accent-blue/30",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="grid size-full place-items-center">
        <span className="block size-5 shrink-0 rounded-full bg-accent-blue" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
