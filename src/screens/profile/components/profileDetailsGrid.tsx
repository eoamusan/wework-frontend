"use client";

import Image from "next/image";

type ProfileDetailItem = {
  icon?: string;
  label: string;
  value: string;
};

type ProfileDetailsGridProps = {
  items: ProfileDetailItem[];
};

function DetailItem({ icon, label, value }: ProfileDetailItem) {
  return (
    <div className="space-y-5">
      <p className="text-sm font-semibold text-secondary">{label}</p>
      <div className="flex items-start gap-3 text-secondary">
        {icon ? <Image src={icon} alt={label} width={24} /> : null}
        <span className="text-sm leading-7">{value || "Not added yet"}</span>
      </div>
    </div>
  );
}

export function ProfileDetailsGrid({ items }: ProfileDetailsGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <DetailItem
          icon={item.icon}
          key={`${item.label}-${item.value}`}
          label={item.label}
          value={item.value}
        />
      ))}
    </div>
  );
}
