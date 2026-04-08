import Header from "@wew/components/header";

import { ApplicationMetricCard } from "./components/applicationMetricCard";
import { ApplicationsTable } from "./components/applicationsTable";
import { applicationItems, applicationMetrics } from "./data";

export default function ApplicationsScreen() {
  return (
    <main className="bg-main-bg">
      <section className="mx-auto w-full max-w-[86rem] px-5 py-10 sm:px-8 lg:px-10 lg:pt-12 lg:pb-24">
        <Header title="My Applications" description="Track and manage your job applications" />

        <div className="mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {applicationMetrics.map((metric) => (
            <ApplicationMetricCard key={metric.title} metric={metric} />
          ))}
        </div>

        <div className="mt-6">
          <ApplicationsTable items={applicationItems} />
        </div>
      </section>
    </main>
  );
}
