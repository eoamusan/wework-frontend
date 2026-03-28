"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@wew/lib/utils";

type AppPaginationProps = {
  className?: string;
  currentPage: number;
  onPageChange?: (page: number) => void;
  totalPages: number;
};

export function AppPagination({
  className,
  currentPage,
  onPageChange,
  totalPages,
}: AppPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-3 text-sm text-secondary", className)}
    >
      <button
        className="inline-flex items-center gap-2 text-secondary transition hover:text-dark-soft disabled:cursor-not-allowed disabled:opacity-40"
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        type="button"
      >
        <ChevronLeft className="size-4" />
        Previous
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-lg border text-sm transition",
              page === currentPage
                ? "border-[#ddd9ef] bg-white text-dark-soft shadow-[0_8px_18px_rgba(6,2,18,0.06)]"
                : "border-transparent text-secondary hover:text-dark-soft",
            )}
            key={page}
            onClick={() => onPageChange?.(page)}
            type="button"
          >
            {page}
          </button>
        ))}
      </div>

      <span className="px-1 text-secondary/60">...</span>

      <button
        className="inline-flex items-center gap-2 text-secondary transition hover:text-dark-soft disabled:cursor-not-allowed disabled:opacity-40"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        type="button"
      >
        Next
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
