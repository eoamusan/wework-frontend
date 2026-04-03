import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@wew/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-[1.35rem] text-base font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/30",
  {
    defaultVariants: {
      size: "default",
      variant: "primary",
    },
    variants: {
      size: {
        default: "h-14 px-6 text-base",
        lg: "h-16 px-10 text-[1.375rem]",
      },
      variant: {
        danger:
          "border border-[#ffd7dd] bg-white/80 text-[#ff4d58] shadow-[0_8px_24px_rgba(255,77,88,0.08)] hover:bg-[#fff7f8]",
        outline:
          "border border-accent-blue bg-white text-accent-blue shadow-[0_12px_28px_rgba(51,0,201,0.08)] hover:-translate-y-0.5",
        primary:
          "bg-[linear-gradient(90deg,#5f30ff_0%,#3300c9_100%)] text-white shadow-[0_20px_40px_rgba(51,0,201,0.26)] hover:-translate-y-0.5 hover:shadow-[0_24px_44px_rgba(51,0,201,0.32)]",
        success:
          "border border-[#254C00] bg-white text-[#254C00] shadow-[0_12px_28px_rgba(62,100,31,0.12)] hover:bg-[#f8fff3]",
      },
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  asChild = false,
  className,
  size,
  variant,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ className, size, variant }))}
      {...props}
    />
  );
}

export { Button };
