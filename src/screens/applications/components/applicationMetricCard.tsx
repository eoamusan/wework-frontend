import { cn } from "@wew/lib/utils";

import type { ApplicationMetric } from "../data";

type ApplicationMetricCardProps = {
  metric: ApplicationMetric;
};

export function ApplicationMetricCard({
  metric,
}: ApplicationMetricCardProps) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-[#eceaf5] bg-white px-5 py-4 shadow-[0_18px_48px_rgba(7,10,29,0.04)]">
      <p className="text-sm font-medium text-secondary">{metric.title}</p>
      <p className="mt-4 text-base font-bold tracking-[-0.05em] text-secondary">
        {metric.value}
      </p>
      <p
        className={cn(
          "mt-3 text-xs font-semibold",
          metric.changeTone === "positive" ? "text-[#16a34a]" : "text-[#ff5a5a]",
        )}
      >
        {metric.changeTone === "positive" ? "▲" : "▼"} {metric.change}
      </p>

      <div className="absolute right-5 bottom-4 flex items-end gap-1">
        {[12, 18, 24, 32].map((height, index) => (
          <span
            className={cn(
              "w-[6px] rounded-t-full",
              metric.changeTone === "positive" ? "bg-[#7CFF69]" : "bg-[#ff7b7b]",
            )}
            key={`${metric.title}-${index}`}
            style={{ height }}
          />
        ))}
      </div>
    </article>
  );
}
