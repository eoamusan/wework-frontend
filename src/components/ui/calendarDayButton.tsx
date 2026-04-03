"use client";

import * as React from "react";

import { cn } from "@wew/lib/utils";

type CalendarDayButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function CalendarDayButton({
  className,
  ...props
}: CalendarDayButtonProps) {
  return (
    <button
      className={cn(
        "flex aspect-square items-center justify-center rounded-xl text-sm transition hover:bg-[#f7f4ff]",
        className,
      )}
      type="button"
      {...props}
    />
  );
}
