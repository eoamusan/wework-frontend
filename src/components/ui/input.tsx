import * as React from "react";

import { cn } from "@wew/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-14 w-full rounded-2xl border border-[#ddd9ef] bg-white px-5 text-base text-dark-soft shadow-[0_16px_38px_rgba(6,2,18,0.05)] outline-none transition focus-visible:ring-2 focus-visible:ring-accent-blue/20 placeholder:text-secondary",
        className,
      )}
      type={type}
      {...props}
    />
  );
}

export { Input };
