"use client";

import { useMemo, useState } from "react";

import { Button } from "@wew/components/ui/button";

import { ApplicationModalShell } from "./applicationModalShell";

type ApplicationRescheduleModalProps = {
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  open: boolean;
};

export function ApplicationRescheduleModal({
  onOpenChange,
  onSubmit,
  open,
}: ApplicationRescheduleModalProps) {
  const [reason, setReason] = useState("");
  const remainingCount = useMemo(() => 200 - reason.length, [reason.length]);

  return (
    <ApplicationModalShell
      description=""
      onOpenChange={onOpenChange}
      open={open}
      title="Request Reschedule"
      widthClassName="w-[min(96vw,45rem)]"
    >
      <div className="rounded-[1.35rem] bg-white p-6 shadow-[0_16px_42px_rgba(6,2,18,0.04)]">
        <label className="block">
          <span className="text-[1.05rem] font-medium text-dark-soft">
            Reason for Reschedule
          </span>
          <textarea
            className="mt-4 min-h-[9rem] w-full rounded-[1.25rem] border border-[#e4e0ee] px-6 py-5 text-base text-dark-soft outline-none transition placeholder:text-secondary/55 focus-visible:ring-2 focus-visible:ring-accent-blue/15"
            maxLength={200}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Describe why you want to reschedule and state the date that will work for you..."
            value={reason}
          />
        </label>

        <p className="mt-3 text-right text-base text-secondary/70">
          {200 - remainingCount}/200
        </p>

        <Button
          className="mt-10 h-14 w-full rounded-[1rem] text-xl shadow-none hover:translate-y-0"
          disabled={!reason.trim()}
          onClick={() => {
            setReason("");
            onSubmit();
          }}
          size={null}
          type="button"
          variant="primary"
        >
          Submit
        </Button>
      </div>
    </ApplicationModalShell>
  );
}
