"use client";

import Image from "next/image";

import downloadIcon from "@wew/assets/icons/download.svg";
import eyeIcon from "@wew/assets/icons/gray-eye.svg";
import PdfIcon from "@wew/assets/icons/pdf.svg";
import { Button } from "@wew/components/ui/button";

import { ApplicationModalShell } from "./applicationModalShell";

import type { ApplicationItem } from "../data";

type ApplicationOfferDetailsModalProps = {
  item: ApplicationItem;
  onAccept: () => void;
  onBack: () => void;
  onOpenChange: (open: boolean) => void;
  onReject: () => void;
  open: boolean;
};

const offerDocuments = ["Offer Letter.pdf", "Contract Letter.pdf"];

export function ApplicationOfferDetailsModal({
  item,
  onAccept,
  onBack,
  onOpenChange,
  onReject,
  open,
}: ApplicationOfferDetailsModalProps) {
  return (
    <ApplicationModalShell
      badge={
        <span className="inline-flex rounded-full bg-[#fff4e6] px-5 py-2 text-sm font-medium text-[#f59f0b]">
          Pending
        </span>
      }
      description=""
      onOpenChange={onOpenChange}
      open={open}
      title="Offer Details"
      widthClassName="w-[min(96vw,49rem)]"
    >
      <div className="rounded-[1.35rem] bg-white p-7 shadow-[0_16px_42px_rgba(6,2,18,0.04)]">
        <div className="space-y-5">
          <InfoBlock label="Job Title" value={item.jobTitle} />
          <InfoBlock label="Employment Type" value="Full Time" />
          
          <div>
            <p className="text-base font-medium text-dark-soft">Documents</p>
            <div className="mt-2 space-y-3">
              {offerDocuments.map((document) => (
                <div
                  className="flex items-center justify-between rounded-[0.95rem] border border-[#ece8fb] px-4 py-4"
                  key={document}
                >
                  <div className="flex items-center gap-1.5">
                    <Image alt="pdf" height={28} src={PdfIcon} width={28} />
                    <span className="text-sm text-secondary">{document}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-secondary">
                    <Image alt="eye" height={18} src={eyeIcon} width={18} />
                    <Image alt="download" height={18} src={downloadIcon} width={18} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            className="h-11 rounded-2xl px-6 text-base shadow-none hover:translate-y-0"
            onClick={onBack}
            size={null}
            type="button"
            variant="success"
          >
            Back
          </Button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="h-11 rounded-2xl px-6 text-base shadow-none hover:translate-y-0"
              onClick={onReject}
              size={null}
              type="button"
              variant="success"
            >
              Reject Offer
            </Button>
            <Button
              className="h-11 rounded-2xl px-6 text-base shadow-none hover:translate-y-0"
              onClick={onAccept}
              size={null}
              type="button"
              variant="primary"
            >
              Accept Offer
            </Button>
          </div>
        </div>
      </div>
    </ApplicationModalShell>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-base font-medium text-secondary">{label}</p>
      <p className="mt-3 text-sm text-gray">{value}</p>
    </div>
  );
}