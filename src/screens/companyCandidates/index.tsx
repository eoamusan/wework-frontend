"use client";

import { useMemo, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import Header from "@wew/components/header";

import { CandidateCard } from "./components/candidateCard";
import { CandidateFilters } from "./components/candidateFilters";
import { candidateItems } from "./data";

const ITEMS_PER_PAGE = 6;

export default function CompanyCandidatesScreen() {
  const [category, setCategory] = useState("All Categories");
  const [gender, setGender] = useState("All Gender");
  const [location, setLocation] = useState("Location");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCandidates = useMemo(() => {
    return candidateItems.filter((candidate) => {
      const matchesCategory =
        category === "All Categories" || candidate.category === category;
      const matchesGender = gender === "All Gender" || candidate.gender === gender;
      const matchesLocation = location === "Location" || candidate.location === location;

      return matchesCategory && matchesGender && matchesLocation;
    });
  }, [category, gender, location]);

  const totalPages = Math.max(1, Math.ceil(filteredCandidates.length / ITEMS_PER_PAGE));
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const paginationItems = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <main className="bg-main-bg">
      <section className="mx-auto w-full max-w-[86rem] px-5 py-10 sm:px-8 lg:px-10 lg:pt-12 lg:pb-24">
        <Header
          description="Hire faster! Browse and filter from our list of qualified candidates."
          title="Explore Available Candidates"
        />

        <CandidateFilters
          category={category}
          gender={gender}
          location={location}
          onCategoryChange={(value) => {
            setCategory(value);
            setCurrentPage(1);
          }}
          onGenderChange={(value) => {
            setGender(value);
            setCurrentPage(1);
          }}
          onLocationChange={(value) => {
            setLocation(value);
            setCurrentPage(1);
          }}
        />

        <div className="mt-14 grid gap-y-10 gap-x-12 md:grid-cols-2 xl:grid-cols-3">
          {paginatedCandidates.map((candidate) => (
            <CandidateCard candidate={candidate} key={candidate.id} />
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base text-secondary/80">
            Showing{" "}
            <span className="font-semibold text-dark-soft">
              {filteredCandidates.length
                ? `${(currentPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    filteredCandidates.length,
                  )}`
                : "0"}
            </span>{" "}
            of <span className="font-semibold text-dark-soft">{filteredCandidates.length}</span>
          </p>

          <div className="flex items-center gap-4 text-sm text-secondary/80">
            <button
              className="inline-flex items-center gap-1 transition hover:text-accent-blue disabled:opacity-40"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              type="button"
            >
              <ChevronLeft className="size-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {paginationItems.map((page) => (
                <button
                  className={
                    currentPage === page
                      ? "flex size-9 items-center justify-center rounded-[0.55rem] border border-[#d9d9e6] bg-white font-medium text-dark-soft"
                      : "flex size-9 items-center justify-center rounded-[0.55rem] text-secondary transition hover:bg-white hover:text-accent-blue"
                  }
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  type="button"
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className="inline-flex items-center gap-1 transition hover:text-accent-blue disabled:opacity-40"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              type="button"
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
