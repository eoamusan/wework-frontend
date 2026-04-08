import { cn } from "@wew/lib/utils";

import type { ApplicationStatus } from "../data";

const statusStyles: Record<ApplicationStatus, string> = {
  Approved: "bg-[#E7F6EC] text-[#13A452]",
  Draft: "bg-[#EEEEF0] text-[#83848A]",
  Interviewing: "bg-[#EEE6FF] text-[#5F30FF]",
  Rejected: "bg-[#FDEBEC] text-[#F04251]",
  Review: "bg-[#FFF3E2] text-[#F59F0B]",
  Shortlisted: "bg-[#E8F5FF] text-[#4CA8F6]",
  Submitted: "bg-[#F4F7E6] text-[#B6D13D]",
};

export function ApplicationStatusBadge({
  status,
}: {
  status: ApplicationStatus;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-[125px] justify-self-start items-center justify-center rounded-full py-2 text-xs font-medium",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
}
