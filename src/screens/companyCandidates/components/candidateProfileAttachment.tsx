import Image from "next/image";

import downloadIcon from "@wew/assets/icons/download.svg";
import eyeIcon from "@wew/assets/icons/gray-eye.svg";
import pdfIcon from "@wew/assets/icons/pdf.svg";

import type { CandidateProfile } from "../candidateProfiles";

function formatFileSize(bytes?: number) {
  if (!bytes) {
    return "0 MB";
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export function CandidateProfileAttachment({
  candidate,
}: {
  candidate: CandidateProfile;
}) {
  const hasResume = Boolean(
    (candidate.documents?.resumeName || candidate.resumeName) &&
    (candidate.documents?.resumeUrl || candidate.resumeUrl),
  );

  if (!hasResume) {
    return (
      <div className="rounded-[1rem] bg-[#faf9ff] px-4 py-4 text-sm text-secondary/75">
        No attachment added yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-[1rem] border border-[#eceaf5] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Image alt="resume" height={26} src={pdfIcon} width={26} />
        <div>
          <p className="text-sm font-medium text-dark-soft">
            {candidate.documents?.resumeName || candidate.resumeName}
          </p>
          <p className="text-xs text-secondary/75">
            {formatFileSize(
              candidate.documents?.resumeSize || candidate.resumeSize,
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Image alt="view resume" height={16} src={eyeIcon} width={16} className="cursor-pointer" />

        <a
          className="inline-flex size-8 items-center justify-center transition hover:border-accent-blue/30 hover:bg-[#f8f6ff] p-0"
          href={candidate.documents?.resumeUrl || candidate.resumeUrl || "#"}
          rel="noreferrer"
          target="_blank"
        >
          <Image
            alt="download resume"
            height={18}
            src={downloadIcon}
            width={18}
          />
        </a>
      </div>
    </div>
  );
}
