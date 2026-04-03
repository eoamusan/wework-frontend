"use client";

import { useRouter } from "next/navigation";

import { Button } from "@wew/components/ui/button";
import { useAuth } from "@wew/hooks/useAuth";
import { setStoredRedirectPath } from "@wew/lib/auth";

export function ApplyNowButton({ redirectPath }: { redirectPath: string }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleApply = () => {
    if (isAuthenticated) {
      return;
    }

    setStoredRedirectPath(redirectPath);
    router.push(`/login?redirectTo=${encodeURIComponent(redirectPath)}`);
  };

  return (
    <Button
      className="h-12 min-w-40 rounded-xl px-8 text-sm shadow-[0_14px_34px_rgba(51,0,201,0.24)]"
      onClick={handleApply}
      type="button"
    >
      Apply Now
    </Button>
  );
}
