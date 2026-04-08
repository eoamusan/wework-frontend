"use client";

import Image from "next/image";

import briefcaseIcon from "@wew/assets/icons/briefcase.svg";
import calendarIcon from "@wew/assets/icons/calendar.svg";
import linkIcon from "@wew/assets/icons/link.svg";
import userIcon from "@wew/assets/icons/user.svg";
import videoIcon from "@wew/assets/icons/video.svg";
import { Button } from "@wew/components/ui/button";

import { ApplicationModalShell } from "./applicationModalShell";

import type { ApplicationItem } from "../data";

type ApplicationInterviewDetailsModalProps = {
  item: ApplicationItem;
  onBack: () => void;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
  onReschedule: () => void;
  open: boolean;
};

export function ApplicationInterviewDetailsModal({
  item,
  onBack,
  onConfirm,
  onOpenChange,
  onReschedule,
  open,
}: ApplicationInterviewDetailsModalProps) {
  return (
    <ApplicationModalShell
      badge={
        <span className="inline-flex rounded-full bg-[#fff4e6] px-5 py-1.5 text-sm font-medium text-[#f59f0b]">
          Pending
        </span>
      }
      description=""
      onOpenChange={onOpenChange}
      open={open}
      title="Interview Details"
      widthClassName="w-[min(96vw,52rem)]"
    >
      <div className="rounded-[1.35rem] bg-white p-7 shadow-[0_16px_42px_rgba(6,2,18,0.04)]">
        <div className="grid gap-8 sm:grid-cols-2">
          <DetailItem icon={userIcon} label="Applicant" value="Femilare Oladimeji Johnson" />
          <DetailItem icon={calendarIcon} label="Date & Time" value="May 12, 2024, 8:30am" />
          <DetailItem icon={briefcaseIcon} label="Role Applied For" value={item.jobTitle} />
          <DetailItem icon={userIcon} label="Interviewer(s)" value="May 15, 2024 at 10:00 AM - 11:00 AM WAT" />
          <DetailItem icon={videoIcon} label="Interview Type" value="Online" />
          <DetailItem
            icon={linkIcon}
            label="Location / Link"
            value="https://meet.google.com/abc-defg-hij"
          />
        </div>

        <div className="mt-16 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            className="h-11 rounded-[0.95rem] px-6 text-base shadow-none hover:translate-y-0"
            onClick={onBack}
            size={null}
            type="button"
            variant="success"
          >
            Back
          </Button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="h-11 rounded-[0.95rem] px-6 text-base shadow-none hover:translate-y-0"
              onClick={onReschedule}
              size={null}
              type="button"
              variant="success"
            >
              Reschedule
            </Button>
            <Button
              className="h-11 rounded-[0.95rem] px-6 text-base shadow-none hover:translate-y-0"
              onClick={onConfirm}
              size={null}
              type="button"
              variant="primary"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </ApplicationModalShell>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-6">
      <p className="text-base font-medium text-secondary">{label}</p>
      <div className="flex items-center gap-2 text-secondary">
        <Image alt={`${label} icon`} height={24} src={icon} width={24} />  
        <span className="text-sm">{value}</span>
      </div>
    </div>
  );
}
