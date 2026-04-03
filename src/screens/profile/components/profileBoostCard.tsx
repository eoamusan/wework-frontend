"use client";

import { useState } from "react";

import Image from "next/image";

import boostIcon from "@wew/assets/icons/boost.svg";
import starIcon from "@wew/assets/icons/star.svg";
import tickCircleIcon from "@wew/assets/icons/tick-circle.svg";
import { Button } from "@wew/components/ui/button";
import { SuccessModal } from "@wew/customs/successModal";

type ProfileBoostCardProps = {
  isDocumentsActive?: boolean;
};

export function ProfileBoostCard({
  isDocumentsActive = false,
}: ProfileBoostCardProps) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  return (
    <>
      <aside className="rounded-[1.5rem] border border-[#eceaf5] bg-white p-5 shadow-[0_18px_44px_rgba(7,10,29,0.06)]">
        <div className="flex items-center gap-4">
          <div className="flex p-2 items-center justify-center rounded-lg bg-[#efeaff] text-accent-blue">
            <Image src={boostIcon} alt="boost" width={24} height={24} />
          </div>

          <h3 className="text-xl font-bold tracking-[-0.04em] text-secondary">
            Profile Boost
          </h3>
        </div>

        <p className="mt-3 text-sm leading-5 text-secondary">
          Get 3x more views from recruiters by boosting your profile to the top
          of the candidate directory.
        </p>

        <div className="mt-6 space-y-3">
          {isDocumentsActive ? (
            <div className="rounded-lg border border-[#F0EEFF] px-4 py-4">
              <div className="flex items-center gap-2 text-[#f0ad1f]">
                <Image src={starIcon} alt="star" width={24} height={24} />

                <p className="font-medium text-secondary">
                  Active until Dec 31, 2023
                </p>
              </div>

              <p className="mt-2 text-sm text-secondary">
                Your profile is highlighted in recruiter searches.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 font-medium text-sm text-secondary">
                <Image
                  src={tickCircleIcon}
                  alt="boost"
                  width={24}
                  height={24}
                />
                <span>Priority placement in search</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-secondary">
                <Image
                  src={tickCircleIcon}
                  alt="boost"
                  width={24}
                  height={24}
                />
                <span>"Featured" badge on your card</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-secondary">
                <Image
                  src={tickCircleIcon}
                  alt="boost"
                  width={24}
                  height={24}
                />
                <span>7 days of premium visibility</span>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 border-t border-[#eeeaf7] pt-5">
          <div className="flex items-center justify-between text-secondary">
            <span className="text-base font-medium">7-day boost</span>
            <span className="text-xl font-bold tracking-[-0.04em]">₦5,000</span>
          </div>

          <Button
            className="mt-5 h-13 w-full rounded-[0.85rem] text-base shadow-none hover:translate-y-0"
            onClick={() => setIsSuccessModalOpen(true)}
            size={null}
            type="button"
            variant="primary"
          >
            {isDocumentsActive ? "Extend Boost" : "Boost My Profile"}
          </Button>
        </div>
      </aside>

      <SuccessModal
        actionLabel="Back"
        description="You've successfully Boosted your Profile"
        onOpenChange={setIsSuccessModalOpen}
        open={isSuccessModalOpen}
        title="Profile Boosted"
      />
    </>
  );
}
