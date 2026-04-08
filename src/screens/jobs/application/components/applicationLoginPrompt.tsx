import Link from "next/link";

import { Button } from "@wew/components/ui/button";

export function ApplicationLoginPrompt() {
  return (
    <main className="bg-main-bg">
      <div className="mx-auto flex min-h-[60vh] max-w-[86rem] items-center justify-center px-5 py-16">
        <div className="max-w-[34rem] rounded-[1.8rem] border border-[#ebe7f6] bg-white p-8 text-center shadow-[0_18px_48px_rgba(7,10,29,0.06)]">
          <h1 className="text-4xl font-semibold tracking-[-0.05em] text-dark-soft">
            Apply for this Role
          </h1>
          <p className="mt-4 text-base leading-7 text-secondary/80">
            Sign in to complete your job application.
          </p>
          <Button
            asChild
            className="mt-8 h-13 rounded-[0.85rem] px-7 text-base shadow-none hover:translate-y-0"
            size={null}
          >
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
