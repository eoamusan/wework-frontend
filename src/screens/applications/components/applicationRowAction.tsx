"use client";

import { useState } from "react";

import { Button } from "@wew/components/ui/button";

import { ApplicationInterviewDetailsModal } from "./applicationInterviewDetailsModal";
import { ApplicationOfferDetailsModal } from "./applicationOfferDetailsModal";
import { ApplicationRescheduleModal } from "./applicationRescheduleModal";
import { ApplicationStatusModal } from "./applicationStatusModal";

import type { ApplicationHistoryAction } from "./application-modal.data";
import type { ApplicationItem } from "../data";

type ModalView = "interview" | "offer" | "reschedule" | "status" | null;

export function ApplicationRowAction({ item }: { item: ApplicationItem }) {
  const [activeView, setActiveView] = useState<ModalView>(null);

  return (
    <>
      <Button
        className="h-10 rounded-full px-5 text-sm cursor-pointer shadow-none hover:translate-y-0"
        onClick={() => setActiveView("status")}
        size={null}
        type="button"
        variant="outline"
      >
        {item.actionLabel}
      </Button>

      <ApplicationStatusModal
        item={item}
        onHistoryAction={(action: ApplicationHistoryAction) =>
          setActiveView(action === "interview" ? "interview" : "offer")
        }
        onOpenChange={(open) => setActiveView(open ? "status" : null)}
        open={activeView === "status"}
      />

      <ApplicationInterviewDetailsModal
        item={item}
        onBack={() => setActiveView("status")}
        onConfirm={() => setActiveView(null)}
        onOpenChange={(open) => setActiveView(open ? "interview" : null)}
        onReschedule={() => setActiveView("reschedule")}
        open={activeView === "interview"}
      />

      <ApplicationRescheduleModal
        onOpenChange={(open) => setActiveView(open ? "reschedule" : null)}
        onSubmit={() => setActiveView(null)}
        open={activeView === "reschedule"}
      />

      <ApplicationOfferDetailsModal
        item={item}
        onAccept={() => setActiveView(null)}
        onBack={() => setActiveView("status")}
        onOpenChange={(open) => setActiveView(open ? "offer" : null)}
        onReject={() => setActiveView(null)}
        open={activeView === "offer"}
      />
    </>
  );
}
