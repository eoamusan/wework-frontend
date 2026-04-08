"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

import searchIcon from "@wew/assets/icons/search-normal.svg";
import { Button } from "@wew/components/ui/button";

import { ApplicationRowAction } from "./applicationRowAction";
import { ApplicationStatusBadge } from "./applicationStatusBadge";
import { ApplicationStatusFilter } from "./applicationStatusFilter";

import type { ApplicationItem, ApplicationStatus } from "../data";

type ApplicationsTableProps = {
  items: ApplicationItem[];
};

type PaginationItem = number | "...";

const ITEMS_PER_PAGE = 5;
const statusOptions: Array<"All" | ApplicationStatus> = [
  "All",
  "Interviewing",
  "Rejected",
  "Shortlisted",
  "Review",
  "Approved",
  "Submitted",
  "Draft",
];

function getVisiblePaginationPages(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}

export function ApplicationsTable({ items }: ApplicationsTableProps) {
  const filterPanelRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"All" | ApplicationStatus>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return items.filter((item) => {
      const matchesStatus =
        selectedStatus === "All" ? true : item.status === selectedStatus;
      const matchesSearch = normalizedQuery
        ? [item.jobTitle, item.company, item.status, item.actionLabel]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery)
        : true;

      return matchesStatus && matchesSearch;
    });
  }, [items, searchQuery, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredItems]);
  const paginationItems = useMemo(
    () => getVisiblePaginationPages(currentPage, totalPages),
    [currentPage, totalPages],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!isFilterOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        filterPanelRef.current &&
        !filterPanelRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isFilterOpen]);

  return (
    <section className="rounded-[1.5rem] border border-[#eceaf5] bg-white p-5 shadow-[0_18px_48px_rgba(7,10,29,0.04)] sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.05em] text-dark-soft">
            Applications
          </h2>
          <p className="mt-1 text-sm text-secondary/70">
            {filteredItems.length} result{filteredItems.length === 1 ? "" : "s"} found
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
          <label className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-[1rem] border border-[#e8e4f2] bg-white px-4 shadow-[0_10px_26px_rgba(6,2,18,0.04)] transition focus-within:border-[#d8d0ef] sm:min-w-[19rem] lg:flex-none">
            <Image alt="search" height={16} src={searchIcon} width={16} />
            <input
              className="w-full bg-transparent text-sm text-dark-soft outline-none placeholder:text-secondary/45"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search applications......"
              type="search"
              value={searchQuery}
            />
          </label>

          <div className="relative shrink-0 self-start" ref={filterPanelRef}>
            <ApplicationStatusFilter
              isOpen={isFilterOpen}
              items={items}
              onClear={() => setSelectedStatus("All")}
              onSelect={(status) => {
                setSelectedStatus(status);
                setIsFilterOpen(false);
              }}
              onToggle={() => setIsFilterOpen((open) => !open)}
              selectedStatus={selectedStatus}
              statusOptions={statusOptions}
            />
          </div>
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

          {paginatedItems.length ? (
            <div className="space-y-3">
              {paginatedItems.map((item) => (
                <div
                  className="grid grid-cols-[1.5fr_1.25fr_1.1fr_1.1fr_1fr_0.95fr] items-center gap-6 rounded-[1.1rem] border border-[#eceaf5] px-4 py-4"
                  key={item.id}
                >
                  <p className="text-sm font-medium text-dark-soft">{item.jobTitle}</p>
                  <p className="text-sm text-secondary">{item.company}</p>
                  <p className="text-sm text-secondary">{item.dateApplied}</p>
                  <ApplicationStatusBadge status={item.status} />
                  <p className="text-sm text-secondary">{item.lastUpdate}</p>
                  <ApplicationRowAction item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.1rem] border border-dashed border-[#e3dff0] bg-[#fcfbff] px-6 py-14 text-center">
              <p className="text-base font-semibold text-dark-soft">No applications found</p>
              <p className="mt-2 text-sm text-secondary/75">
                Try a different search term or clear the status filter.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-[#f0edf8] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button
          className="h-12 rounded-[0.9rem] border-[#D5D7DA] px-5 text-sm font-semibold text-accent-blue shadow-none hover:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          size={null}
          type="button"
          variant="outline"
        >
          <ArrowLeft className="size-4" />
          Previous
        </Button>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-secondary">
          {paginationItems.map((item, index) =>
            item === "..." ? (
              <span className="px-1 text-secondary" key={`ellipsis-${index}`}>
                ...
              </span>
            ) : (
              <button
                className={
                  item === currentPage
                    ? "flex h-8 min-w-8 items-center justify-center rounded-[0.6rem] bg-[#F4EEFF] px-2 font-medium text-accent-blue"
                    : "flex h-8 min-w-8 items-center justify-center rounded-[0.6rem] px-2 text-secondary transition hover:bg-[#faf8ff] hover:text-accent-blue"
                }
                key={item}
                onClick={() => setCurrentPage(item)}
                type="button"
              >
                {item}
              </button>
            ),
          )}
        </div>

        <Button
          className="h-12 rounded-[0.9rem] border-[#D5D7DA] px-5 text-sm text-[#414651] shadow-none hover:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === totalPages || !filteredItems.length}
          onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
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
