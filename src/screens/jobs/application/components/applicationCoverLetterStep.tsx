"use client";

import { type ChangeEvent, useRef, useState } from "react";

import { LoaderCircle } from "lucide-react";
import Image from "next/image";

import fileIcon from "@wew/assets/icons/file.svg";
import trashIcon from "@wew/assets/icons/trash.svg";
import uploadIcon from "@wew/assets/icons/upload.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@wew/components/ui/tabs";
import { UploadDropzoneButton } from "@wew/customs/uploadDropzoneButton";
import {
  getCloudinaryResourceTypeForFile,
  uploadToCloudinary,
} from "@wew/lib/cloudinary";
import type { JobApplicationFormValues } from "@wew/lib/schemas/job-application-form";

import { ApplicationCoverLetterEditor } from "./applicationCoverLetterEditor";

import type { UseFormReturn } from "react-hook-form";

type ApplicationCoverLetterStepProps = {
  form: UseFormReturn<JobApplicationFormValues>;
};

function formatFileSize(bytes?: number) {
  if (!bytes) {
    return "0 MB";
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export function ApplicationCoverLetterStep({
  form,
}: ApplicationCoverLetterStepProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const values = form.watch("coverLetter");
  const coverLetterError = form.formState.errors.coverLetter?.content?.message;
  const hasUploadedFile = Boolean(values.fileUrl && values.fileName);

  const uploadDocument = async (file: File) => {
    setUploadError("");
    setUploading(true);

    try {
      const result = await uploadToCloudinary(file, {
        folder: "job-application/cover-letter",
        resourceType: getCloudinaryResourceTypeForFile(file),
        tags: ["job-application-cover-letter"],
      });

      form.setValue("coverLetter.fileName", file.name, {
        shouldDirty: true,
        shouldValidate: true,
      });
      form.setValue("coverLetter.fileSize", file.size, {
        shouldDirty: true,
        shouldValidate: true,
      });
      form.setValue("coverLetter.fileUrl", result.url, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : "We could not upload your cover letter.",
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
    form.setValue("coverLetter.fileName", "", {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setValue("coverLetter.fileSize", 0, {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setValue("coverLetter.fileUrl", "", {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-semibold text-dark-soft">Cover letter</h3>
        <p className="mt-1 text-sm text-secondary/75">
          Upload a prepared cover letter or write one directly in the app.
        </p>
      </div>

      <Tabs className="space-y-1" defaultValue="upload">
        <TabsList>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="write">Write in app</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <div className="space-y-4">
            {!hasUploadedFile ? (
              <UploadDropzoneButton
                className="min-h-[146px] py-6"
                description="Upload PDF, DOC, or DOCX cover letter"
                icon={<Image alt="upload" height={48} src={uploadIcon} width={48} />}
                onClick={() => fileInputRef.current?.click()}
                title="Click or drag file to this area to upload"
              />
            ) : (
              <div className="flex items-center justify-between rounded-[1rem] border border-[#e6e1f0] bg-white px-4 py-4 shadow-[0_12px_30px_rgba(7,10,29,0.04)]">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-[#efeaff] text-accent-blue">
                    <Image alt="file" height={28} src={fileIcon} width={28} />
                  </div>

                  <div>
                    <p className="text-xl font-semibold tracking-[-0.04em] text-dark-soft">
                      {values.fileName}
                    </p>
                    <p className="mt-1 text-base text-secondary/75">
                      {formatFileSize(values.fileSize)}
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
            )}

            <input
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              onChange={handleFileChange}
              ref={fileInputRef}
              type="file"
            />

            {uploadError ? <p className="text-sm text-[#ff5a5a]">{uploadError}</p> : null}
            {uploading ? (
              <p className="flex items-center gap-2 text-sm text-secondary/75">
                <LoaderCircle className="size-4 animate-spin" />
                Uploading cover letter...
              </p>
            ) : null}
          </div>
        </TabsContent>

        <TabsContent value="write">
          <ApplicationCoverLetterEditor
            error={coverLetterError}
            onChange={(nextValue) =>
              form.setValue("coverLetter.content", nextValue, {
                shouldDirty: true,
                shouldValidate: true,
              })}
            value={values.content}
          />
        </TabsContent>
      </Tabs>

      {coverLetterError ? (
        <p className="text-sm text-[#ff5a5a]">{coverLetterError}</p>
      ) : null}
    </div>
  );
}
