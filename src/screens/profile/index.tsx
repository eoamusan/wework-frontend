"use client";

import { useState } from "react";

import Header from "@wew/components/header";
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
  const [isSaving, setIsSaving] = useState(false);
  const { session } = useAuth();
  const accountId =
    session?.accountId || session?.user?.accountId || session?.user?.id || "";
  const { error, isLoading, profile } = useGetProfileQuery({
    accountId,
  });
  const isProfileNotFound =
    (error as { response?: { status?: number } } | null)?.response?.status ===
    404;
  const profileData = isProfileNotFound ? profilePreviewData : profile;
  const isPreviewMode = isProfileNotFound;

  const handleTabChange = (value: string) => {
    setActiveTab(value as ProfileTab);
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleSaved = () => {
    setIsSaving(false);
    setIsEditing(false);
  };

  const handlePrimaryAction = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    const activeForm = document.getElementById(formIds[activeTab]);

    if (activeForm instanceof HTMLFormElement) {
      activeForm.requestSubmit();
    }
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
            onSubmittingChange={setIsSaving}
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
            onSubmittingChange={setIsSaving}
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
            onSubmittingChange={setIsSaving}
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
          <Header
            title="My Profile"
            description="Manage your public profile, portfolio, and visibility."
          />

          <Button
            className="h-13 rounded-[0.8rem] min-w-full md:min-w-[183px] px-8 text-base shadow-none hover:translate-y-0"
            // disabled={isPreviewMode}
            disabled={isLoading}
            isLoading={isSaving}
            loadingText="Saving Changes"
            onClick={handlePrimaryAction}
            size={null}
            type="button"
            variant="primary"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <Tabs
          className="mt-10"
          onValueChange={handleTabChange}
          value={activeTab}
        >
          <TabsList className="gap-8 border-b-0">
            <TabsTrigger
              className="pb-3 text-sm cursor-pointer"
              value="personal"
            >
              Personal Information
            </TabsTrigger>
            <TabsTrigger
              className="pb-3 text-sm cursor-pointer"
              value="experience"
            >
              Job Experience &amp; Links
            </TabsTrigger>
            <TabsTrigger
              className="pb-3 text-sm cursor-pointer"
              value="documents"
            >
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