"use client";

import { Building2, CircleCheck } from "lucide-react";
import Image from "next/image";

import calendarIcon from "@wew/assets/icons/calendar-linear.svg";
import eyeIcon from "@wew/assets/icons/eye.svg";
import { Button } from "@wew/components/ui/button";
import { cn } from "@wew/lib/utils";

import {
  getApplicationModalData,
  modalStatusStyles,
} from "./application-modal.data";
import { ApplicationModalShell } from "./applicationModalShell";

import type { ApplicationHistoryAction } from "./application-modal.data";
import type { ApplicationItem } from "../data";


type ApplicationStatusModalProps = {
  item: ApplicationItem;
  onHistoryAction: (action: ApplicationHistoryAction) => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

export function ApplicationStatusModal({
  item,
  onHistoryAction,
  onOpenChange,
  open,
}: ApplicationStatusModalProps) {
  const modalData = getApplicationModalData(item);

  return (
    <ApplicationModalShell
      description="Track your application status"
      onOpenChange={onOpenChange}
      open={open}
      title="Application Status"
      widthClassName="w-[min(96vw,48rem)]"
    >
      <div className="rounded-[1.35rem] bg-white p-5 shadow-[0_16px_42px_rgba(6,2,18,0.04)]">
        <div className="rounded-[1.15rem] border border-[#ddd9ef] bg-[#3300C908] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-[-0.04em] text-dark">
                {item.jobTitle}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-base text-secondary/80">
                <Building2 className="size-5" />
                <span>{item.company}</span>
              </div>
            </div>

            <span
              className={cn(
                "inline-flex min-w-[130px] items-center justify-center rounded-full px-4 py-2 text-sm font-medium",
                modalStatusStyles[modalData.statusTone],
              )}
            >
              {item.status}
            </span>
          </div>

          <div className="mt-5 border-t border-[#d8d3e7] pt-4">
            <div className="flex flex-col gap-3 text-sm text-secondary/80 sm:flex-row sm:gap-8">
              <div className="flex items-center gap-2">
                <Image
                  alt="calendar"
                  height={19}
                  src={calendarIcon}
                  width={19}
                />
                <span>Applied: {item.dateApplied}</span>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  alt="calendar"
                  height={19}
                  src={calendarIcon}
                  width={19}
                />
                <span>Last Updated: {item.lastUpdate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-[1.15rem] border border-[#d7d2e5] bg-white p-4">
          <h4 className="text-xl font-semibold tracking-[-0.04em] text-secondary">
            Application History
          </h4>

          <div className="mt-4 space-y-3">
            {modalData.history.map((entry) => {
              const isPending = entry.state === "pending";
              const isRejected = entry.state === "rejected";
              const iconClassName = isRejected
                ? "border-[#e63946] bg-[#e63946] text-white"
                : isPending
                  ? "border-[#d7d7dc] bg-[#4343432E] text-[#ffffff]"
                  : "border-[#27ae60] bg-[#27ae60] text-white";

              return (
                <div
                  className="flex flex-col gap-4 rounded-[0.95rem] border border-[#ece8fb] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                  key={entry.title}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={cn(
                        "mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border",
                        iconClassName,
                      )}
                    >
                      <CircleCheck className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-base font-medium text-secondary">
                        {entry.title}
                      </p>

                      <p className="mt-1 text-xs text-secondary">
                        {entry.description}
                        {entry.timestamp ? (
                          <>
                            <span className="mx-2 text-[0.55rem] align-middle">
                              •
                            </span>
                            {entry.timestamp}
                          </>
                        ) : null}
                      </p>
                    </div>
                  </div>

                  {entry.action && !isPending ? (
                    <Button
                      className="h-11 rounded-[0.9rem] px-4 text-sm shadow-none hover:translate-y-0"
                      onClick={() => onHistoryAction(entry.action!)}
                      size={null}
                      type="button"
                      variant="success"
                    >
                      <Image alt="eye" height={24} src={eyeIcon} width={24} />
                      {entry.action === "interview"
                        ? "View Details"
                        : "Offer Details"}
                    </Button>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ApplicationModalShell>
  );
}
