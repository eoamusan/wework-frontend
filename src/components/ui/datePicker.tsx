"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";

import calendarIcon from "@wew/assets/icons/calendar.svg";
import { Calendar } from "@wew/components/ui/calendar";
import { cn } from "@wew/lib/utils";


type DatePickerProps = {
  disabled?: boolean;
  error?: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value?: string;
};

function getCalendarMonth(date?: Date) {
  const baseDate = date ?? new Date();
  return new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
}

function parseDateValue(value?: string) {
  if (!value) {
    return undefined;
  }

  const isoDateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (isoDateMatch) {
    const [, year, month, day] = isoDateMatch;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return Number.isNaN(date.getTime()) ? undefined : date;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function formatDisplayDate(value?: string) {
  const date = parseDateValue(value);

  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function DatePicker({
  disabled = false,
  error,
  label,
  onChange,
  placeholder = "Select date",
  value,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLLabelElement | null>(null);
  const selectedDate = useMemo(() => parseDateValue(value), [value]);
  const displayValue = useMemo(() => formatDisplayDate(value), [value]);
  const [visibleMonth, setVisibleMonth] = useState<Date>(() =>
    getCalendarMonth(selectedDate),
  );

  useEffect(() => {
    setVisibleMonth(getCalendarMonth(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        target?.closest('[data-slot="select-content"]') ||
        target?.closest('[data-slot="select-trigger"]')
      ) {
        return;
      }

      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <label className="space-y-5" ref={containerRef}>
      <span className="text-base text-secondary">{label}</span>

      <div className="relative">
        <button
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className={cn(
            "flex h-13 w-full items-center cursor-pointer justify-between rounded-[0.6rem] border border-[#e2e2e2] bg-white px-4 text-left text-[0.95rem] text-dark-soft shadow-none transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/15",
            !displayValue ? "text-[#9a9a9a]" : "",
            disabled ? "cursor-not-allowed opacity-50" : "",
            error ? "border-[#ffb8b8]" : "",
          )}
          disabled={disabled}
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          <span>{displayValue || placeholder}</span>
          <Image src={calendarIcon} alt="Calendar" width={18} height={18} />
        </button>

        {isOpen ? (
          <div className="absolute top-[calc(100%+0.65rem)] left-0 z-30 w-full min-w-[18rem]">
            <Calendar
              captionLayout="dropdown"
              month={visibleMonth}
              onMonthChange={setVisibleMonth}
              onSelect={(date) => {
                if (!date) {
                  return;
                }

                onChange(formatDateValue(date));
                setVisibleMonth(getCalendarMonth(date));
                setIsOpen(false);
              }}
              selected={selectedDate}
            />
          </div>
        ) : null}
      </div>

      {error ? <p className="text-sm text-[#ff5a5a]">{error}</p> : null}
    </label>
  );
}
