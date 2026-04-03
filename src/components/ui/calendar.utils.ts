export const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function isSameDay(first?: Date, second?: Date) {
  if (!first || !second) {
    return false;
  }

  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

export function isSameMonth(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth()
  );
}

export function isDateDisabled(
  date: Date,
  disabled?: Date[] | ((date: Date) => boolean),
) {
  if (!disabled) {
    return false;
  }

  if (typeof disabled === "function") {
    return disabled(date);
  }

  return disabled.some((disabledDate) => isSameDay(disabledDate, date));
}

export function buildCalendarDays(month: Date) {
  const firstDayOfMonth = startOfMonth(month);
  const startDay = firstDayOfMonth.getDay();
  const firstVisibleDay = new Date(firstDayOfMonth);

  firstVisibleDay.setDate(firstDayOfMonth.getDate() - startDay);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(firstVisibleDay);
    date.setDate(firstVisibleDay.getDate() + index);
    return date;
  });
}

export function getMonthLabel(date: Date) {
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

export function getMonthOptions() {
  return Array.from({ length: 12 }, (_, index) => ({
    label: new Date(2026, index, 1).toLocaleString("default", {
      month: "short",
    }),
    value: index.toString(),
  }));
}

export function getYearOptions(fromYear: number, toYear: number) {
  return Array.from({ length: toYear - fromYear + 1 }, (_, index) => {
    const year = fromYear + index;
    return {
      label: year.toString(),
      value: year.toString(),
    };
  });
}
