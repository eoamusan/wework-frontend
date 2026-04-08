import type { ReactNode } from "react";

import { cn } from "@wew/lib/utils";

type ApplicationCardProps = {
  children: ReactNode;
  className?: string;
};

export function ApplicationCard({
  children,
  className,
}: ApplicationCardProps) {
  return (
    <section
      className={cn(
        "rounded-[1.5rem] border border-[#eceaf5] bg-white p-4 shadow-[0_18px_48px_rgba(7,10,29,0.05)] sm:p-6 lg:p-8",
        className,
      )}
    >
      {children}
    </section>
  );
}
