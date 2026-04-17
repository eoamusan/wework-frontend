"use client";

import { type ChangeEvent, useRef, useState } from "react";

import { LoaderCircle } from "lucide-react";
import Image from "next/image";

import fileIcon from "@wew/assets/icons/file.svg";
import trashIcon from "@wew/assets/icons/trash.svg";
import uploadIcon from "@wew/assets/icons/upload.svg";
import { UploadDropzoneButton } from "@wew/customs/uploadDropzoneButton";
import {
  getCloudinaryResourceTypeForFile,
  uploadToCloudinary,
} from "@wew/lib/cloudinary";
import type { JobApplicationFormValues } from "@wew/lib/schemas/job-application-form";

import type { UseFormReturn } from "react-hook-form";

type ApplicationResumeStepProps = {
  form: UseFormReturn<JobApplicationFormValues>;
  onResumeUploaded?: (file: File | null) => void;
};

function formatFileSize(bytes?: number) {
  if (!bytes) {
    return "0 MB";
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export function ApplicationResumeStep({
  form,
  onResumeUploaded,
}: ApplicationResumeStepProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const values = form.watch("documents");
  const hasDocument = Boolean(values.resumeUrl && values.resumeName);

  const uploadDocument = async (file: File) => {
    setUploadError("");
    setUploading(true);

    try {
      const result = await uploadToCloudinary(file, {
        folder: "job-application/resume",
        resourceType: getCloudinaryResourceTypeForFile(file),
        tags: ["job-application-resume"],
      });

      form.setValue("documents.resumeName", file.name, {
        shouldDirty: true,
        shouldValidate: true,
      });
      form.setValue("documents.resumeSize", file.size, {
        shouldDirty: true,
        shouldValidate: true,
      });
      form.setValue("documents.resumeUrl", result.url, {
        shouldDirty: true,
        shouldValidate: true,
      });
      onResumeUploaded?.(file);
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : "We could not upload your resume.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      await uploadDocument(file);
    }

    event.target.value = "";
  };

  const clearDocument = () => {
    form.setValue("documents.resumeName", "", {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setValue("documents.resumeSize", 0, {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setValue("documents.resumeUrl", "", {
      shouldDirty: true,
      shouldValidate: true,
    });
    onResumeUploaded?.(null);
  };

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-dark-soft">
          Upload Resume/CV
        </h3>
      </div>

      {!hasDocument ? (
        <UploadDropzoneButton
          description="Upload PDF, DOC, or DOCX resume"
          icon={<Image alt="upload" height={48} src={uploadIcon} width={48} />}
          onClick={() => fileInputRef.current?.click()}
          title="Click or drag file to this area to upload"
          className="min-h-[146px] py-6"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-[1rem] border border-[#e6e1f0] bg-white px-4 py-4 shadow-[0_12px_30px_rgba(7,10,29,0.04)]">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-[#efeaff] text-accent-blue">
                <Image alt="file" height={28} src={fileIcon} width={28} />
              </div>

              <div>
                <p className="text-xl font-semibold tracking-[-0.04em] text-dark-soft">
                  {values.resumeName}
                </p>
                <p className="mt-1 text-base text-secondary/75">
                  {formatFileSize(values.resumeSize)}
                </p>
              </div>
            </div>

            <button
              className="text-[#ff4d58] transition hover:opacity-80"
              onClick={clearDocument}
              type="button"
            >
              <Image alt="trash" height={24} src={trashIcon} width={24} />
            </button>
          </div>
        </div>
      )}

      <input
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="sr-only"
        onChange={handleFileChange}
        ref={fileInputRef}
        type="file"
      />

      {uploadError ? (
        <p className="text-sm text-[#ff5a5a]">{uploadError}</p>
      ) : null}
      {form.formState.errors.documents?.resumeUrl?.message ? (
        <p className="text-sm text-[#ff5a5a]">
          {form.formState.errors.documents.resumeUrl.message}
        </p>
      ) : null}
      {uploading ? (
        <p className="flex items-center gap-2 text-sm text-secondary/75">
          <LoaderCircle className="size-4 animate-spin" />
          Uploading document...
        </p>
      ) : null}
    </div>
  );
}
