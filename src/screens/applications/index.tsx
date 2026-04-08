import { ApplicationMetricCard } from "./components/applicationMetricCard";
import { ApplicationsTable } from "./components/applicationsTable";
import { applicationItems, applicationMetrics } from "./data";

export default function ApplicationsScreen() {
  return (
    <main className="bg-main-bg">
      <section className="mx-auto w-full max-w-[86rem] px-5 py-10 sm:px-8 lg:px-10 lg:pt-12 lg:pb-24">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.06em] text-dark-soft sm:text-4xl">
            My Applications
          </h1>
          <p className="mt-3 text-base leading-7 text-secondary/80">
            Track and manage your job applications
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
