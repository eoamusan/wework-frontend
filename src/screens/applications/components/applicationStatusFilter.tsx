import { Check } from "lucide-react";
import Image from "next/image";

import filterIcon from "@wew/assets/icons/filter.svg";
import { cn } from "@wew/lib/utils";

import type { ApplicationItem, ApplicationStatus } from "../data";

type ApplicationStatusFilterProps = {
  isOpen: boolean;
  items: ApplicationItem[];
  onClear: () => void;
  onToggle: () => void;
  onSelect: (status: "All" | ApplicationStatus) => void;
  selectedStatus: "All" | ApplicationStatus;
  statusOptions: Array<"All" | ApplicationStatus>;
};

export function ApplicationStatusFilter({
  isOpen,
  items,
  onClear,
  onSelect,
  onToggle,
  selectedStatus,
  statusOptions,
}: ApplicationStatusFilterProps) {
  const hasActiveFilters = selectedStatus !== "All";

  return (
    <>
      <button
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-[1rem] border border-[#e8e4f2] bg-white shadow-[0_10px_26px_rgba(6,2,18,0.04)] transition hover:bg-[#faf8ff]",
          hasActiveFilters ? "border-[#d8d0ef] bg-[#faf8ff]" : "",
        )}
        onClick={onToggle}
        type="button"
      >
        <Image alt="filter" height={24} src={filterIcon} width={24} />
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-20 mt-3 w-[16rem] rounded-[1.2rem] border border-[#eceaf5] bg-white p-4 shadow-[0_24px_60px_rgba(6,2,18,0.14)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-dark-soft">Filter by status</p>
              <p className="mt-1 text-xs text-secondary/70">
                Narrow the applications list
              </p>
            </div>

            {hasActiveFilters ? (
              <button
                className="text-xs font-medium text-accent-blue transition hover:opacity-80"
                onClick={onClear}
                type="button"
              >
                Clear
              </button>
            ) : null}
          </div>

          <div className="mt-4 space-y-2">
            {statusOptions.map((status) => {
              const isSelected = selectedStatus === status;
              const statusCount =
                status === "All"
                  ? items.length
                  : items.filter((item) => item.status === status).length;

              return (
                <button
                  className={cn(
                    "flex w-full items-center justify-between rounded-[0.95rem] px-3 py-3 text-left text-sm transition",
                    isSelected
                      ? "bg-[#f4eeff] text-accent-blue"
                      : "text-dark-soft hover:bg-[#faf8ff]",
                  )}
                  key={status}
                  onClick={() => onSelect(status)}
                  type="button"
                >
                  <span className="flex items-center gap-2">
                    {isSelected ? <Check className="size-4" /> : null}
                    <span>{status}</span>
                  </span>
                  <span className="text-xs text-secondary/70">{statusCount}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}
