"use client";

import { useState } from "react";

import Link from "next/link";

import { Button } from "@wew/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@wew/components/ui/tabs";
import { useGetProfileQuery } from "@wew/hooks/services/profile/useGetProfileQuery";
import { useAuth } from "@wew/hooks/useAuth";

import { DocumentsSection } from "./components/documentsSection";
import { JobExperienceSection } from "./components/jobExperienceSection";
import { PersonalInfoSection } from "./components/personalInfoSection";
import { ProfileBoostCard } from "./components/profileBoostCard";
import { profilePreviewData } from "./profilePreviewData";

type ProfileTab = "personal" | "experience" | "documents";

const formIds: Record<ProfileTab, string> = {
  documents: "profile-documents-form",
  experience: "profile-experience-form",
  personal: "profile-personal-form",
};

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("personal");
  const [isEditing, setIsEditing] = useState(false);
  const { isAuthenticated, session } = useAuth();
  const accountId =
    session?.accountId || session?.user?.accountId || session?.user?.id || "";
  const { error, isLoading, profile, refetch } = useGetProfileQuery({
    accountId,
  });
  const isProfileNotFound =
    (error as { response?: { status?: number } } | null)?.response?.status ===
    404;
  const profileData = isProfileNotFound ? profilePreviewData : profile;
  const isPreviewMode = isProfileNotFound;

  if (!isAuthenticated) {
    return (
      <main className="bg-main-bg">
        <section className="mx-auto flex min-h-[60vh] w-full max-w-[86rem] items-center justify-center px-5 py-16 sm:px-8 lg:px-10">
          <div className="max-w-[32rem] rounded-[1.8rem] border border-[#ebe7f6] bg-white p-8 text-center shadow-[0_18px_48px_rgba(7,10,29,0.06)]">
            <h1 className="text-4xl font-semibold tracking-[-0.05em] text-dark-soft">
              My Profile
            </h1>
            <p className="mt-4 text-base leading-7 text-secondary/80">
              Sign in to manage your public profile, experience, and resume.
            </p>
            <Button
              asChild
              className="mt-8 h-13 rounded-[0.85rem] px-7 text-base shadow-none hover:translate-y-0"
              size={null}
            >
              <Link href="/login">Go to Login</Link>
            </Button>
          </div>
        </section>
      </main>
    );
  }

  if (!accountId) {
    return (
      <main className="bg-main-bg">
        <section className="mx-auto flex min-h-[60vh] w-full max-w-[86rem] items-center justify-center px-5 py-16 sm:px-8 lg:px-10">
          <div className="max-w-[34rem] rounded-[1.8rem] border border-[#ebe7f6] bg-white p-8 shadow-[0_18px_48px_rgba(7,10,29,0.06)]">
            <h1 className="text-4xl font-semibold tracking-[-0.05em] text-dark-soft">
              My Profile
            </h1>
            <p className="mt-4 text-base leading-7 text-secondary/80">
              We could not find your account identifier in the current session,
              so the profile endpoints cannot be loaded yet. Please sign in again
              once the API includes `accountId` in the auth response.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value as ProfileTab);
    setIsEditing(false);
  };

  const handleSaved = async () => {
    setIsEditing(false);
    await refetch();
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case "experience":
        return (
          <JobExperienceSection
            accountId={accountId}
            formId={formIds.experience}
            isEditing={isEditing}
            onSaved={handleSaved}
            profile={profileData}
          />
        );
      case "documents":
        return (
          <DocumentsSection
            accountId={accountId}
            formId={formIds.documents}
            isEditing={isEditing}
            onSaved={handleSaved}
            profile={profileData}
          />
        );
      case "personal":
      default:
        return (
          <PersonalInfoSection
            accountId={accountId}
            formId={formIds.personal}
            isEditing={isEditing}
            onSaved={handleSaved}
            profile={profileData}
            session={session}
          />
        );
    }
  };

  return (
    <main className="bg-main-bg">
      <section className="mx-auto w-full max-w-[86rem] px-5 py-10 sm:px-8 lg:px-10 lg:pt-12 lg:pb-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.06em] text-dark-soft sm:text-5xl">
              My Profile
            </h1>
            <p className="mt-5 text-xl leading-7 text-secondary/80">
              Manage your public profile, portfolio, and visibility.
            </p>
          </div>

          <Button
            className="h-13 rounded-[0.8rem] min-w-full md:min-w-[183px] px-8 text-base shadow-none hover:translate-y-0"
            // disabled={isPreviewMode}
            form={isEditing ? formIds[activeTab] : undefined}
            onClick={!isEditing ? () => setIsEditing(true) : undefined}
            size={null}
            type={isEditing ? "submit" : "button"}
            variant="primary"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <Tabs className="mt-10" onValueChange={handleTabChange} value={activeTab}>
          {/* {isPreviewMode ? (
            <div className="mb-6 rounded-[1rem] border border-[#ece7ff] bg-[#faf8ff] px-4 py-3 text-sm text-accent-blue">
              Profile endpoint returned `404`, so preview data is being shown to
              help you inspect the UI. Saving is disabled in this mode.
            </div>
          ) : null} */}

          <TabsList className="gap-8 border-b-0">
            <TabsTrigger className="pb-3 text-sm" value="personal">
              Personal Information
            </TabsTrigger>
            <TabsTrigger className="pb-3 text-sm" value="experience">
              Job Experience &amp; Links
            </TabsTrigger>
            <TabsTrigger className="pb-3 text-sm" value="documents">
              Documents
            </TabsTrigger>
          </TabsList>

          <div className="mt-8 grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_23rem]">
            <div>
              {isLoading ? (
                <section className="rounded-[1.65rem] border border-[#eceaf5] bg-white p-8 shadow-[0_18px_48px_rgba(7,10,29,0.05)]">
                  <div className="space-y-4">
                    <div className="h-6 w-40 animate-pulse rounded-full bg-[#efebf8]" />
                    <div className="h-28 animate-pulse rounded-[1rem] bg-[#f6f3ff]" />
                    <div className="h-14 animate-pulse rounded-[1rem] bg-[#f6f3ff]" />
                    <div className="h-14 animate-pulse rounded-[1rem] bg-[#f6f3ff]" />
                  </div>
                </section>
              ) : error && !isPreviewMode ? (
                <section className="rounded-[1.65rem] border border-[#ffe0e0] bg-white p-8 shadow-[0_18px_48px_rgba(7,10,29,0.05)]">
                  <p className="text-base text-[#ff5a5a]">
                    {error instanceof Error
                      ? error.message
                      : "We could not load your profile right now."}
                  </p>
                </section>
              ) : (
                <>
                  <TabsContent
                    className="pt-0"
                    forceMount
                    hidden={activeTab !== "personal"}
                    value="personal"
                  >
                    {activeTab === "personal" ? renderActiveSection() : null}
                  </TabsContent>
                  <TabsContent
                    className="pt-0"
                    forceMount
                    hidden={activeTab !== "experience"}
                    value="experience"
                  >
                    {activeTab === "experience" ? renderActiveSection() : null}
                  </TabsContent>
                  <TabsContent
                    className="pt-0"
                    forceMount
                    hidden={activeTab !== "documents"}
                    value="documents"
                  >
                    {activeTab === "documents" ? renderActiveSection() : null}
                  </TabsContent>
                </>
              )}
            </div>

            <ProfileBoostCard isDocumentsActive={activeTab === "documents"} />
          </div>
        </Tabs>
      </section>
    </main>
  );
}
