import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { LoaderCircle } from "lucide-react";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@wew/lib/utils";

const loaderVariants = cva(
  "inline-flex items-center justify-center text-current",
  {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default: "size-4",
        lg: "size-5",
        xl: "size-7",
      },
    },
  },
);

type LoaderProps = React.ComponentProps<"span"> &
  VariantProps<typeof loaderVariants> & {
    asChild?: boolean;
    label?: string;
  };

function Loader({
  asChild = false,
  className,
  label = "Loading",
  size,
  ...props
}: LoaderProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      aria-busy="true"
      aria-label={label}
      className={cn("inline-flex items-center gap-2", className)}
      role="status"
      {...props}
    >
      <LoaderCircle className={cn(loaderVariants({ size }), "animate-spin")} />
      <span className="sr-only">{label}</span>
    </Comp>
  );
}

export { Loader };
