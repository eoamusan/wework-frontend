"use client";

import { useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SuccessModal } from "@wew/customs/successModal";
import { useGetProfileQuery } from "@wew/hooks/services/profile/useGetProfileQuery";
import { useAuth } from "@wew/hooks/useAuth";
import { getJobById } from "@wew/lib/jobs";
import {
  type JobApplicationFormValues,
  jobApplicationFormSchema,
} from "@wew/lib/schemas/job-application-form";
import { profilePreviewData } from "@wew/screens/profile/profilePreviewData";

import { importProfileToApplication } from "./application-form.utils";
import { importResumeToApplication } from "./application-resume-import.utils";
import {
  applicationSteps,
  getApplicationDefaultValues,
  getDraftKey,
  getStepFields,
} from "./application.constants";
import { ApplicationCard } from "./components/applicationCard";
import { ApplicationFooterActions } from "./components/applicationFooterActions";
import { ApplicationJobExperienceStep } from "./components/applicationJobExperienceStep";
import { ApplicationLoginPrompt } from "./components/applicationLoginPrompt";
import { ApplicationPersonalInfoStep } from "./components/applicationPersonalInfoStep";
import { ApplicationPreviewStep } from "./components/applicationPreviewStep";
import { ApplicationResumeStep } from "./components/applicationResumeStep";
import {
  type ApplicationStepId,
  ApplicationStepper,
} from "./components/applicationStepper";

type JobApplicationScreenProps = {
  params: Promise<{ jobId: string }>;
};

export default function JobApplicationScreen({
  params,
}: JobApplicationScreenProps) {
  const router = useRouter();
  const [jobId, setJobId] = useState("");
  const [currentStep, setCurrentStep] = useState<ApplicationStepId>("personal");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isImportingFromResume, setIsImportingFromResume] = useState(false);
  const [uploadedResumeFile, setUploadedResumeFile] = useState<File | null>(null);
  const { isAuthenticated, session } = useAuth();
  const accountId =
    session?.accountId || session?.user?.accountId || session?.user?.id || "";
  const { error, profile } = useGetProfileQuery({ accountId });
  const profileData =
    (error as { response?: { status?: number } } | null)?.response?.status === 404
      ? profilePreviewData
      : profile;
  const form = useForm<JobApplicationFormValues>({
    defaultValues: getApplicationDefaultValues(),
    resolver: zodResolver(jobApplicationFormSchema),
  });
  const values = form.watch();
  const job = useMemo(() => (jobId ? getJobById(jobId) : undefined), [jobId]);

  useEffect(() => {
    params.then(({ jobId: nextJobId }) => setJobId(nextJobId));
  }, [params]);

  useEffect(() => {
    if (!jobId || typeof window === "undefined") {
      return;
    }

    const savedDraft = window.localStorage.getItem(getDraftKey(jobId));

    if (!savedDraft) {
      return;
    }

    try {
      const parsedDraft = JSON.parse(savedDraft) as {
        step?: ApplicationStepId;
        values?: JobApplicationFormValues;
      };

      if (parsedDraft.values) {
        form.reset(parsedDraft.values);
      }

      if (parsedDraft.step && applicationSteps.includes(parsedDraft.step)) {
        setCurrentStep(parsedDraft.step);
      }
    } catch {
      window.localStorage.removeItem(getDraftKey(jobId));
    }
  }, [form, jobId]);

  if (!isAuthenticated) {
    return <ApplicationLoginPrompt />;
  }

  if (!job) {
    return null;
  }

  const saveDraft = () => {
    if (typeof window === "undefined" || !jobId) {
      return;
    }

    window.localStorage.setItem(
      getDraftKey(jobId),
      JSON.stringify({
        step: currentStep,
        values,
      }),
    );
  };

  const goBack = () => {
    const currentIndex = applicationSteps.indexOf(currentStep);

    if (currentIndex === 0) {
      router.push(`/jobs/${jobId}`);
      return;
    }

    setCurrentStep(applicationSteps[currentIndex - 1]);
  };

  const handleNext = async () => {
    const currentIndex = applicationSteps.indexOf(currentStep);
    const valid = await form.trigger(getStepFields(currentStep));

    if (!valid) {
      return;
    }

    setCurrentStep(applicationSteps[currentIndex + 1] || currentStep);
  };

  const handleSubmit = async () => {
    const valid = await form.trigger();

    if (!valid) {
      return;
    }

    saveDraft();
    setIsSuccessModalOpen(true);
  };

  const handleImportFromResume = async () => {
    form.clearErrors("root");
    setIsImportingFromResume(true);

    try {
      await importResumeToApplication(form, {
        file: uploadedResumeFile,
        name:
          form.getValues("documents.resumeName") ||
          profileData?.documents?.resumeName ||
          profileData?.resumeName,
        url:
          form.getValues("documents.resumeUrl") ||
          profileData?.documents?.resumeUrl ||
          profileData?.resumeUrl,
      });
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "We could not import details from your resume.",
      });
    } finally {
      setIsImportingFromResume(false);
    }
  };

  return (
    <>
      <main className="bg-main-bg">
        {/* <HeroSection /> */}

        <div className="mx-auto flex w-full max-w-[96rem] items-center flex-col gap-10 px-5 py-12 sm:px-8 lg:px-10">
          <ApplicationStepper currentStep={currentStep} />

          <div className="mx-auto w-full max-w-[850px]">
            <ApplicationCard>
              <form className="space-y-8">
                {currentStep === "personal" ? (
                  <ApplicationPersonalInfoStep
                    form={form}
                    isImportingFromResume={isImportingFromResume}
                    onImportFromResume={handleImportFromResume}
                    onUseSavedProfile={() => {
                      form.clearErrors("root");
                      importProfileToApplication(form, profileData);
                    }}
                    profile={profileData}
                  />
                ) : null}

                {currentStep === "experience" ? (
                  <ApplicationJobExperienceStep form={form} />
                ) : null}

                {currentStep === "resume" ? (
                  <ApplicationResumeStep
                    form={form}
                    onResumeUploaded={setUploadedResumeFile}
                  />
                ) : null}

                {currentStep === "preview" ? (
                  <ApplicationPreviewStep values={values} />
                ) : null}

                {form.formState.errors.root?.message ? (
                  <p className="text-sm text-[#ff5a5a]">
                    {form.formState.errors.root.message}
                  </p>
                ) : null}

                <ApplicationFooterActions
                  nextLabel={
                    currentStep === "preview"
                      ? "Submit Application"
                      : "Next Step"
                  }
                  onBack={goBack}
                  onPrimaryAction={
                    currentStep === "preview" ? form.handleSubmit(handleSubmit) : handleNext
                  }
                  onSaveDraft={saveDraft}
                />
              </form>
            </ApplicationCard>
          </div>
        </div>
      </main>

      <SuccessModal
        actionLabel="Okay"
        closeAlign="right"
        description="You've successfully Submitted an Application"
        onAction={() => router.push("/applications")}
        onOpenChange={setIsSuccessModalOpen}
        open={isSuccessModalOpen}
        title="Application Submitted!"
      />
    </>
  );
}
