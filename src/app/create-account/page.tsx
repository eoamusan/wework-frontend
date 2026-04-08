import CreateApplicantAccountPage from "@wew/screens/auth/createApplicantAccount";
import CreateCompanyAccountPage from "@wew/screens/auth/createCompanyAccount";

type CreateAccountPageProps = {
  searchParams?: Promise<{ accountType?: string }>;
};

export default async function Page({ searchParams }: CreateAccountPageProps) {
  const resolvedSearchParams = await searchParams;

  if (resolvedSearchParams?.accountType === "company") {
    return <CreateCompanyAccountPage />;
  }

  return <CreateApplicantAccountPage />;
}
