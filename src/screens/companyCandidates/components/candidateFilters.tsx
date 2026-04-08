"use client";

import type { ReactNode } from "react";

import Image from "next/image";

import companyIcon from "@wew/assets/icons/company.svg";
import filterIcon from "@wew/assets/icons/filter.svg";
import locationIcon from "@wew/assets/icons/location.svg";
import userIcon from "@wew/assets/icons/user.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@wew/components/ui/select";

import type { CandidateCategory, CandidateGender, CandidateLocation } from "../data";

type CandidateFiltersProps = {
  category: string;
  gender: string;
  location: string;
  onCategoryChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onLocationChange: (value: string) => void;
};

const categories: Array<"All Categories" | CandidateCategory> = [
  "All Categories",
  "Design",
  "Engineering",
  "Marketing",
];
const genders: Array<"All Gender" | CandidateGender> = [
  "All Gender",
  "Female",
  "Male",
];
const locations: Array<"Location" | CandidateLocation> = [
  "Location",
  "Abuja, Nigeria",
  "Lagos, Nigeria",
  "Remote",
];

export function CandidateFilters({
  category,
  gender,
  location,
  onCategoryChange,
  onGenderChange,
  onLocationChange,
}: CandidateFiltersProps) {
  return (
    <div className="mt-8 grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
      <FilterSelect
        icon={<Image alt="company" height={16} src={companyIcon} width={16} />}
        onValueChange={onCategoryChange}
        options={categories}
        value={category}
      />
      <FilterSelect
        icon={<Image alt="user" height={16} src={userIcon} width={16} />}
        onValueChange={onGenderChange}
        options={genders}
        value={gender}
      />
      <FilterSelect
        icon={<Image alt="location" height={16} src={locationIcon} width={16} />}
        onValueChange={onLocationChange}
        options={locations}
        value={location}
      />

      <button
        className="flex h-14 w-14 items-center justify-center rounded-[1rem] border border-[#ece6ff] bg-white text-secondary shadow-[0_10px_26px_rgba(6,2,18,0.04)] transition hover:bg-[#faf8ff]"
        type="button"
      >
        <Image alt="filter" height={24} src={filterIcon} width={24} />
      </button>
    </div>
  );
}

function FilterSelect({
  icon,
  onValueChange,
  options,
  value,
}: {
  icon: ReactNode;
  onValueChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className="h-14 rounded-[1rem] border-[#ece6ff] px-4 text-sm text-secondary shadow-[0_10px_26px_rgba(6,2,18,0.04)]">
        <div className="flex items-center gap-2">
          {icon}
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
