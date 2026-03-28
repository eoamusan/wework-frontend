"use client";

import { useState } from "react";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import briefcaseIcon from "@wew/assets/icons/briefcase.svg";
import clockIcon from "@wew/assets/icons/clock.svg";
import companyIcon from "@wew/assets/icons/company.svg";
import filterIcon from "@wew/assets/icons/filter.svg";
import locationIcon from "@wew/assets/icons/location.svg";
import { AppPagination } from "@wew/components/ui/appPagination";
import { Button } from "@wew/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@wew/components/ui/select";

const filters = {
  companies: ["Tech Flow", "Ondea", "TalentGrid"],
  jobTypes: ["Full Time", "Part Time", "Contract"],
  locations: ["Lagos, Nigeria", "Abuja, Nigeria", "Remote"],
} as const;

const jobs = Array.from({ length: 6 }, (_, index) => ({
  company: "Tech Flow",
  department: "Engineering",
  id: `senior-frontend-engineer-${index + 1}`,
  location: "Lagos, Nigeria",
  postedAt: "Posted Jan16, 2026",
  summary:
    "We are looking for an experienced Frontend Engineer to lead our core product team. You will be responsible for architecting and building scalable UI components...",
  title: "Senior Frontend Engineer",
  type: "Full Time",
}));

export function JobListingsSection() {
  const [currentPage, setCurrentPage] = useState(2);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-main-bg py-4 sm:pt-4">
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-8 px-2 sm:px-2.5 md:px-3">
        <motion.div
          className="grid gap-4 lg:grid-cols-[1fr_1fr_1.1fr_auto]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <Select defaultValue={filters.companies[0]}>
            <SelectTrigger className="h-14 rounded-xl bg-transparent border-[#ebe7f6] text-sm shadow-[0_10px_26px_rgba(6,2,18,0.04)]">
              <span className="flex items-center gap-3">
                <Image src={companyIcon} alt="Company" width={16} height={16} />
                <SelectValue placeholder="Company" />
              </span>
            </SelectTrigger>
            <SelectContent>
              {filters.companies.map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue={filters.jobTypes[0]}>
            <SelectTrigger className="h-14 rounded-xl bg-transparent border-[#ebe7f6] text-sm shadow-[0_10px_26px_rgba(6,2,18,0.04)]">
              <span className="flex items-center gap-3">
                <Image
                  src={briefcaseIcon}
                  alt="Job Type"
                  width={16}
                  height={16}
                />
                <SelectValue placeholder="Job Type" />
              </span>
            </SelectTrigger>
            <SelectContent>
              {filters.jobTypes.map((jobType) => (
                <SelectItem key={jobType} value={jobType}>
                  {jobType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue={filters.locations[0]}>
            <SelectTrigger className="h-14 rounded-xl bg-transparent border-[#ebe7f6] text-sm shadow-[0_10px_26px_rgba(6,2,18,0.04)]">
              <span className="flex items-center gap-3">
                <Image
                  src={locationIcon}
                  alt="Location"
                  width={16}
                  height={16}
                />
                <SelectValue placeholder="Location" />
              </span>
            </SelectTrigger>
            <SelectContent>
              {filters.locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            aria-label="Filter jobs"
            className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-[#ebe7f6] bg-none text-secondary shadow-[0_10px_26px_rgba(6,2,18,0.04)] transition hover:text-dark-soft"
            type="button"
          >
            <Image src={filterIcon} alt="filter" width={24} height={24} />
          </button>
        </motion.div>

        <motion.div
          className="grid gap-6 md:mt-12 md:grid-cols-2 xl:grid-cols-3"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          transition={{
            delayChildren: 0.08,
            duration: 0.45,
            staggerChildren: 0.08,
          }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        >
          {jobs.map((job) => (
            <motion.article
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              className="rounded-[1.1rem] border border-[#edf0ea] bg-white p-5 shadow-[0_16px_34px_rgba(6,2,18,0.04)]"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              key={job.id}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={shouldReduceMotion ? undefined : { y: -6 }}
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-dark-soft">
                  {job.title}
                </h2>
                <span className="rounded-full bg-[#f1efee] px-3 py-1.5 text-[10px] text-secondary">
                  {job.type}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-secondary/60">
                <span className="flex items-center gap-2">
                <Image src={companyIcon} alt="Company" width={16} height={16} />
                  {job.company}
                </span>

                <span className="rounded-full bg-accent-purple/55 px-2.5 py-1 text-[10px] text-accent-blue/75">
                  {job.department}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm text-secondary/80">
                <span className="flex items-center gap-2">
                <Image src={locationIcon} alt="Location" width={16} height={16} />
                  {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <Image src={clockIcon} alt="Posted" width={16} height={16} />
                  {job.postedAt}
                </span>
              </div>

              <p className="mt-5 text-sm leading-8 text-secondary/80">
                {job.summary}
              </p>

              <Button
                className="mt-6 h-11 w-full rounded-xl px-6 text-sm shadow-none hover:translate-y-0"
                size={null}
                type="button"
                variant="outline"
              >
                View Details
              </Button>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 pt-2 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.35 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <p>
            Showing <span className="font-semibold text-dark-soft">1-12</span>{" "}
            of <span className="font-semibold text-dark-soft">64</span>
          </p>

          <AppPagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={3}
          />
        </motion.div>
      </div>
    </section>
  );
}
