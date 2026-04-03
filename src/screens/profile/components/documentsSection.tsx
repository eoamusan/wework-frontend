"use client";

import { type ChangeEvent, useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import fileIcon from "@wew/assets/icons/file.svg";
import trashIcon from "@wew/assets/icons/trash.svg";
import uploadIcon from "@wew/assets/icons/upload.svg";
import { UploadDropzoneButton } from "@wew/customs/uploadDropzoneButton";
import type { ProfileData } from "@wew/hooks/services/profile/useGetProfileQuery";
import { useUpdateDocumentsMutation } from "@wew/hooks/services/profile/useUpdateDocumentsMutation";
import { uploadToCloudinary } from "@wew/lib/cloudinary";
import {
  type DocumentsFormValues,
  documentsFormSchema,
} from "@wew/lib/schemas/profile-forms";

type DocumentsSectionProps = {
  accountId: string;
  formId: string;
  isEditing: boolean;
  onSaved: () => void;
  profile?: ProfileData;
};

function getDefaultValues(profile?: ProfileData): DocumentsFormValues {
  return {
    resumeName: profile?.documents?.resumeName || profile?.resumeName || "",
    resumeSize: profile?.documents?.resumeSize || profile?.resumeSize || 0,
    resumeUrl: profile?.documents?.resumeUrl || profile?.resumeUrl || "",
  };
}

function formatFileSize(bytes?: number) {
  if (!bytes) {
    return "0 MB";
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export function DocumentsSection({
  accountId,
  formId,
  isEditing,
  onSaved,
  profile,
}: DocumentsSectionProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const { updateDocumentsHandler } = useUpdateDocumentsMutation({
    accountId,
    onSuccess: onSaved,
  });
  const form = useForm<DocumentsFormValues>({
    defaultValues: getDefaultValues(profile),
    resolver: zodResolver(documentsFormSchema),
  });
  const values = form.watch();
  const hasDocument = Boolean(values.resumeUrl && values.resumeName);

  useEffect(() => {
    form.reset(getDefaultValues(profile));
  }, [form, profile]);

  const onSubmit = async (values: DocumentsFormValues) => {
    try {
      await updateDocumentsHandler(values);
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "We could not update your documents right now.",
      });
    }
  };

  const uploadDocument = async (file: File) => {
    setUploadError("");
    setUploading(true);

    try {
      const result = await uploadToCloudinary(file, {
        folder: "profile/resume",
        resourceType: "raw",
        tags: ["resume"],
      });

      form.setValue("resumeName", file.name, {
        shouldDirty: true,
        shouldValidate: true,
      });
      form.setValue("resumeSize", file.size, {
        shouldDirty: true,
        shouldValidate: true,
      });
      form.setValue("resumeUrl", result.url, {
        shouldDirty: true,
        shouldValidate: true,
      });
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
    form.setValue("resumeName", "", { shouldDirty: true, shouldValidate: true });
    form.setValue("resumeSize", 0, { shouldDirty: true, shouldValidate: true });
    form.setValue("resumeUrl", "", { shouldDirty: true, shouldValidate: true });
  };

  return (
    <section className="rounded-[1.65rem] border border-[#eceaf5] bg-white p-5 shadow-[0_18px_48px_rgba(7,10,29,0.05)] sm:p-8">
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <div>
            <h3 className="text-base font-semibold text-dark-soft">Upload Resume/CV</h3>
          </div>

          {isEditing && !hasDocument ? (
            <UploadDropzoneButton
              description="Upload PDF, DOC, or DOCX resume"
              icon={<Image alt="upload" height={48} src={uploadIcon} width={48} />}
              onClick={() => fileInputRef.current?.click()}
              title="Click or drag file to this area to upload"
            />
          ) : hasDocument ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-[1rem] border border-[#e6e1f0] bg-white px-4 py-4 shadow-[0_12px_30px_rgba(7,10,29,0.04)]">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-[#efeaff] text-accent-blue">
                    <Image src={fileIcon} alt="file" width={28} height={28} />
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

                {isEditing ? (
                  <button
                    className="text-[#ff4d58] transition hover:opacity-80"
                    onClick={clearDocument}
                    type="button"
                  >
                    <Image src={trashIcon} alt="trash" width={24} height={24} />
                  </button>
                ) : null}
              </div>

              <div className="rounded-[0.95rem] bg-[#EFE6FD] px-4 py-4 text-sm text-accent-blue">
                This resume will be attached to your job applications
              </div>

              {isEditing ? (
                <button
                  className="text-sm font-medium text-accent-blue underline-offset-4 hover:underline"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  Replace document
                </button>
              ) : null}
            </div>
          ) : (
            <p className="rounded-[1rem] bg-[#faf9ff] px-4 py-5 text-base text-secondary/75">
              No resume uploaded yet.
            </p>
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

          {form.formState.errors.resumeUrl?.message ? (
            <p className="text-sm text-[#ff5a5a]">
              {form.formState.errors.resumeUrl.message}
            </p>
          ) : null}

          {form.formState.errors.root?.message ? (
            <p className="text-sm text-[#ff5a5a]">
              {form.formState.errors.root.message}
            </p>
          ) : null}

          {uploading ? (
            <p className="flex items-center gap-2 text-sm text-secondary/75">
              <LoaderCircle className="size-4 animate-spin" />
              Uploading document...
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
