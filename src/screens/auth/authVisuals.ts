import applicantLoginImage from "@wew/assets/images/applicant-login.jpg";
import companyLoginImage from "@wew/assets/images/company-sign-in.jpg";
import type { AccountType } from "@wew/lib/auth";

export function getAuthVisualContent(accountType: AccountType) {
  if (accountType === "company") {
    return {
      alt: "Company team reviewing candidates together",
      description:
        "Log in to manage openings, review applicants, and grow your team.",
      image: companyLoginImage,
      imageClassName: "object-cover object-[center_90%]",
      title: "Hire Better, Faster.",
    };
  }

  return {
    alt: "Smiling applicant using a laptop",
    description:
      "Log in to discover new jobs and move closer to your next role.",
    image: applicantLoginImage,
    imageClassName: "object-cover object-center",
    title: "Your Next Opportunity Is Waiting.",
  };
}
