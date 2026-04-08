import { MapPin, Star } from "lucide-react";
import Link from "next/link";

import { Button } from "@wew/components/ui/button";
import { cn } from "@wew/lib/utils";

import type { CandidateItem } from "../data";

export function CandidateCard({ candidate }: { candidate: CandidateItem }) {
  return (
    <article className="rounded-[1.1rem] bg-white p-3 shadow-[0_12px_32px_rgba(7,10,29,0.05)]">
      <div
        className={cn(
          "relative flex h-[13rem] items-end overflow-hidden rounded-[0.85rem] bg-gradient-to-br p-4",
          candidate.theme,
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.26),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.18),transparent_24%)]" />

        {candidate.recommended ? (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#8f6d2f]/80 px-2.5 py-1 text-[0.68rem] font-medium text-[#ffd65f]">
            <Star className="size-3" />
            Recommended
          </span>
        ) : null}

        <div className="relative flex size-16 items-center justify-center rounded-full border border-white/30 bg-white/14 text-2xl font-semibold text-white backdrop-blur-sm">
          {candidate.initials}
        </div>
      </div>

      <div className="px-1 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-dark-soft">{candidate.name}</h3>
            <p className="mt-0.5 text-xs text-secondary/80">{candidate.role}</p>
          </div>

          <div className="flex items-center gap-1 text-xs text-secondary/80">
            <MapPin className="size-3.5" />
            <span>{candidate.location}</span>
          </div>
        </div>

        <p className="mt-3 line-clamp-3 text-[0.74rem] leading-5 text-secondary/80">
          {candidate.description}
        </p>

        <Button
          asChild
          className="mt-4 h-11 w-full rounded-[0.75rem] border-accent-blue text-sm shadow-none hover:translate-y-0"
          size={null}
          variant="outline"
        >
          <Link href={`/browse-candidates/${candidate.id}`}>View Profile</Link>
        </Button>
      </div>
    </article>
  );
}
