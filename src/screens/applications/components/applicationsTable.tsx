import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

import filterIcon from "@wew/assets/icons/filter.svg";
import searchIcon from "@wew/assets/icons/search.svg";
import { Button } from "@wew/components/ui/button";

import { ApplicationStatusBadge } from "./applicationStatusBadge";

import type { ApplicationItem } from "../data";

type ApplicationsTableProps = {
  items: ApplicationItem[];
};

const paginationItems = ["1", "2", "3", "...", "8", "9", "10"];

export function ApplicationsTable({ items }: ApplicationsTableProps) {
  return (
    <section className="rounded-[1.5rem] border border-[#eceaf5] bg-white p-5 shadow-[0_18px_48px_rgba(7,10,29,0.04)] sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-2xl font-semibold tracking-[-0.05em] text-dark-soft">
          Applications
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex h-12 min-w-[min(100%,19rem)] items-center gap-3 rounded-[1rem] border border-[#e8e4f2] bg-white px-4">
            <Image alt="search" height={16} src={searchIcon} width={16} />
            <input
              className="w-full bg-transparent text-sm text-dark-soft outline-none placeholder:text-secondary/45"
              placeholder="Search applications......"
            />
          </label>

          <button
            className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-[#e8e4f2] bg-white transition hover:bg-[#faf8ff]"
            type="button"
          >
            <Image alt="filter" height={18} src={filterIcon} width={18} />
          </button>
        </div>
      </div>

      <div className="mt-7 overflow-x-auto">
        <div className="min-w-[880px]">
          <div className="grid grid-cols-[1.5fr_1.25fr_1.1fr_1.1fr_1fr_0.95fr] gap-6 px-6 pb-3 text-sm text-secondary/70">
            <p>Job Title</p>
            <p>Company</p>
            <p>Date Applied</p>
            <p>Status</p>
            <p>Last Update</p>
            <p>Action</p>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                className="grid grid-cols-[1.5fr_1.25fr_1.1fr_1.1fr_1fr_0.95fr] items-center gap-6 rounded-[1.1rem] border border-[#eceaf5] px-4 py-4"
                key={item.id}
              >
                <p className="text-sm font-medium text-dark-soft">{item.jobTitle}</p>
                <p className="text-sm text-secondary">{item.company}</p>
                <p className="text-sm text-secondary">{item.dateApplied}</p>
                <ApplicationStatusBadge status={item.status} />
                <p className="text-sm text-secondary">{item.lastUpdate}</p>
                <Button
                  className="h-10 rounded-full px-5 text-sm shadow-none hover:translate-y-0"
                  size={null}
                  type="button"
                  variant="outline"
                >
                  {item.actionLabel}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-[#f0edf8] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button
          className="h-12 rounded-[0.9rem] px-5 text-sm text-[#414651] shadow-none border-[#D5D7DA] hover:translate-y-0"
          size={null}
          type="button"
          variant="outline"
        >
          <ArrowLeft className="size-4" />
          Previous
        </Button>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-secondary">
          {paginationItems.map((item) => (
            <button
              className={
                item === "1"
                  ? "flex h-8 min-w-8 items-center justify-center rounded-[0.6rem] bg-[#F4EEFF] px-2 font-medium text-accent-blue"
                  : "px-1 text-secondary transition hover:text-accent-blue"
              }
              key={item}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <Button
          className="h-12 rounded-[0.9rem] px-5 text-sm text-[#414651] shadow-none border-[#D5D7DA] hover:translate-y-0"
          size={null}
          type="button"
          variant="outline"
        >
          Next
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
