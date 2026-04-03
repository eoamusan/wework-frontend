"use client";

import Image from "next/image";

import briefCaseIcon from "@wew/assets/icons/briefcase.svg";
import locationIcon from "@wew/assets/icons/locator.svg";
import mailIcon from "@wew/assets/icons/mail.svg";
import phoneIcon from "@wew/assets/icons/phone.svg";
import userIcon from "@wew/assets/icons/user.svg";
import type { ProfileData } from "@wew/hooks/services/profile/useGetProfileQuery";
import type { AuthSession } from "@wew/lib/auth";

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-5">
      <p className="text-sm font-medium text-secondary">{label}</p>
      <div className="flex items-start gap-3 text-secondary">
        <Image src={icon} alt={label} width={24} />
        <span className="text-sm leading-7">{value || "Not added yet"}</span>
      </div>
    </div>
  );
}

type PersonalInfoViewProps = {
  profile?: ProfileData;
  session: AuthSession | null;
};

export function PersonalInfoView({
  profile,
  session,
}: PersonalInfoViewProps) {
  const fullName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ");
  const initials = `${profile?.firstName?.[0] || "M"}${profile?.lastName?.[0] || "P"}`.toUpperCase();

  return (
    <div className="grid gap-8 lg:grid-cols-[140px_minmax(0,1fr)]">
      <div>
        {profile?.profilePicture ? (
          <img
            alt={fullName || "Profile photo"}
            className="h-[140px] w-[140px] rounded-full object-cover"
            src={profile.profilePicture}
          />
        ) : (
          <div className="flex h-[140px] w-[140px] items-center justify-center rounded-full bg-[#f2ecff] text-3xl font-semibold text-accent-blue">
            {initials}
          </div>
        )}
      </div>

      <div className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <DetailItem
            icon={userIcon}
            label="Name"
            value={profile?.name || fullName}
          />
          <DetailItem
            icon={phoneIcon}
            label="Phone"
            value={profile?.phone || ""}
          />
          <DetailItem
            icon={mailIcon}
            label="Email Address"
            value={profile?.emailAddress || session?.user?.email || ""}
          />
          <DetailItem
            icon={locationIcon}
            label="Location"
            value={profile?.location || ""}
          />
          <DetailItem
            icon={briefCaseIcon}
            label="Job Title"
            value={profile?.jobTitle || ""}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-secondary">Bio</p>
          <p className="max-w-[42rem] text-sm leading-5 text-secondary">
            {profile?.bio || "No bio added yet."}
          </p>
        </div>
      </div>
    </div>
  );
}
