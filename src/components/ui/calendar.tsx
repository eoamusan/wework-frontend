"use client";

import * as React from "react";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@wew/components/ui/select";
import { cn } from "@wew/lib/utils";

import {
  addMonths,
  buildCalendarDays,
  getMonthLabel,
  getMonthOptions,
  getYearOptions,
  isDateDisabled,
  isSameDay,
  isSameMonth,
  startOfMonth,
  weekdayLabels,
} from "./calendar.utils";
import { CalendarDayButton } from "./calendarDayButton";

type CalendarClassNames = Partial<{
  day: string;
  disabled: string;
  month: string;
  monthCaption: string;
  nav: string;
  outside: string;
  root: string;
  selected: string;
  table: string;
  today: string;
  week: string;
  weekday: string;
  weekdays: string;
}>;

type CalendarProps = {
  captionLayout?: "buttons" | "dropdown" | "label";
  className?: string;
  classNames?: CalendarClassNames;
  disabled?: Date[] | ((date: Date) => boolean);
  fromYear?: number;
  month?: Date;
  onMonthChange?: (month: Date) => void;
  onSelect?: (date: Date | undefined) => void;
  selected?: Date;
  showOutsideDays?: boolean;
  toYear?: number;
};

export function Calendar({
  captionLayout = "label",
  className,
  classNames,
  disabled,
  fromYear = 2000,
  month,
  onMonthChange,
  onSelect,
  selected,
  showOutsideDays = true,
  toYear = new Date().getFullYear() + 10,
}: CalendarProps) {
  const [internalMonth, setInternalMonth] = React.useState<Date>(
    startOfMonth(month || selected || new Date()),
  );

  React.useEffect(() => {
    if (month) {
      setInternalMonth(startOfMonth(month));
    }
  }, [month]);

  const currentMonth = month ? startOfMonth(month) : internalMonth;
  const calendarDays = buildCalendarDays(currentMonth);
  const monthOptions = getMonthOptions();
  const yearOptions = getYearOptions(fromYear, toYear);

  const updateMonth = (nextMonth: Date) => {
    if (!month) {
      setInternalMonth(nextMonth);
    }

    onMonthChange?.(nextMonth);
  };

  const handleMonthSelect = (nextMonthValue: string) => {
    updateMonth(
      new Date(currentMonth.getFullYear(), Number(nextMonthValue), 1),
    );
  };

  const handleYearSelect = (nextYearValue: string) => {
    updateMonth(
      new Date(Number(nextYearValue), currentMonth.getMonth(), 1),
    );
  };

  return (
    <div
      className={cn(
        "w-full rounded-[1.15rem] border border-[#ece6ff] bg-white p-4 shadow-[0_16px_38px_rgba(6,2,18,0.05)]",
        classNames?.root,
        className,
      )}
      data-slot="calendar"
    >
      <div
        className={cn(
          "mb-4 flex items-center justify-between gap-3",
          classNames?.nav,
        )}
      >
        <button
          className="flex size-9 items-center cursor-pointer justify-center rounded-xl border border-[#ece6ff] text-secondary transition hover:bg-[#f7f4ff]"
          onClick={() => updateMonth(addMonths(currentMonth, -1))}
          type="button"
        >
          <ChevronLeft className="size-4" />
        </button>

        {captionLayout === "dropdown" ? (
          <div
            className={cn(
              "flex items-center gap-2",
              classNames?.monthCaption,
            )}
          >
            <Select
              onValueChange={handleMonthSelect}
              value={currentMonth.getMonth().toString()}
            >
              <SelectTrigger className="h-10 min-w-[7rem] cursor-pointer rounded-xl border-[#ece6ff] px-3 text-sm shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={handleYearSelect}
              value={currentMonth.getFullYear().toString()}
            >
              <SelectTrigger className="h-10 min-w-[6rem] cursor-pointer rounded-xl border-[#ece6ff] px-3 text-sm shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div
            className={cn(
              "flex items-center gap-2 text-sm font-semibold cursor-pointer text-dark-soft",
              classNames?.monthCaption,
            )}
          >
            <span>{getMonthLabel(currentMonth)}</span>
            {captionLayout === "buttons" ? (
              <ChevronDown className="size-4 text-secondary/70" />
            ) : null}
          </div>
        )}

        <button
          className="flex size-9 items-center justify-center cursor-pointer rounded-xl border border-[#ece6ff] text-secondary transition hover:bg-[#f7f4ff]"
          onClick={() => updateMonth(addMonths(currentMonth, 1))}
          type="button"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className={cn("space-y-2", classNames?.table)}>
        <div
          className={cn(
            "grid grid-cols-7 gap-1",
            classNames?.weekdays,
          )}
        >
          {weekdayLabels.map((label) => (
            <div
              className={cn(
                "py-2 text-center text-xs font-medium text-secondary/70",
                classNames?.weekday,
              )}
              key={label}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="space-y-1">
          {Array.from({ length: 6 }, (_, weekIndex) => (
            <div
              className={cn("grid grid-cols-7 gap-1", classNames?.week)}
              key={weekIndex}
            >
              {calendarDays
                .slice(weekIndex * 7, weekIndex * 7 + 7)
                .map((date) => {
                  const isOutside = !isSameMonth(date, currentMonth);
                  const isToday = isSameDay(date, new Date());
                  const isSelected = isSameDay(date, selected);
                  const isDisabled = isDateDisabled(date, disabled);

                  if (!showOutsideDays && isOutside) {
                    return <div key={date.toISOString()} />;
                  }

                  return (
                    <CalendarDayButton
                      className={cn(
                        "flex aspect-square items-center cursor-pointer justify-center rounded-xl text-sm text-dark-soft transition",
                        isOutside ? "text-secondary/45" : "hover:bg-[#f7f4ff]",
                        isToday ? "border border-[#ddd1ff]" : "",
                        isSelected
                          ? "bg-[linear-gradient(90deg,#5f30ff_0%,#3300c9_100%)] font-semibold text-white"
                          : "",
                        isDisabled
                          ? "cursor-not-allowed opacity-45 hover:bg-transparent"
                          : "",
                        classNames?.day,
                        isOutside ? classNames?.outside : "",
                        isToday ? classNames?.today : "",
                        isSelected ? classNames?.selected : "",
                        isDisabled ? classNames?.disabled :  "",
                      )}
                      disabled={isDisabled}
                      key={date.toISOString()}
                      onClick={() => onSelect?.(date)}
                    >
                      {date.getDate()}
                    </CalendarDayButton>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
