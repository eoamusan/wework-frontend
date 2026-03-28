import * as React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@wew/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-5 py-2 text-sm font-medium",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: "bg-accent-purple text-accent-blue",
        muted: "bg-[#f6f4ff] text-secondary",
      },
    },
  },
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ className, variant }))} {...props} />;
}

export { Badge };
