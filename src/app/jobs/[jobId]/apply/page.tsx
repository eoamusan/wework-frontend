import JobApplicationScreen from "@wew/screens/jobs/application";

export default function JobApplicationPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  return <JobApplicationScreen params={params} />;
}
