import { jobs } from "@wew/lib/jobs";
import JobDetailsScreen from "@wew/screens/jobs/details";

// eslint-disable-next-line react-refresh/only-export-components
export function generateStaticParams() {
  return jobs.map((job) => ({
    jobId: job.id,
  }));
}

export default function JobDetailsPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  return <JobDetailsScreen params={params} />;
}
