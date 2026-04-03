import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import circleCheckIcon from "@wew/assets/icons/circle-check.svg";
import clockIcon from "@wew/assets/icons/clock.svg";
import companyIcon from "@wew/assets/icons/company.svg";
import copyIcon from "@wew/assets/icons/copy-icon.svg";
import facebookIcon from "@wew/assets/icons/facebook-icon.svg";
import flagIcon from "@wew/assets/icons/flag.svg";
import instagramIcon from "@wew/assets/icons/instagram-icon.svg";
import linkedinIcon from "@wew/assets/icons/linkedin-icon.svg";
import mailIcon from "@wew/assets/icons/mail-icon.svg";
import twitterIcon from "@wew/assets/icons/twitter-icon.svg";
import whatsappIcon from "@wew/assets/icons/whatsapp-icon.svg";
import { getJobById } from "@wew/lib/jobs";

import { ApplyNowButton } from "./applyNowButton";

const shareLinks = [
  {
    alt: "Facebook",
    backgroundClassName: "bg-[#1877F2]",
    icon: facebookIcon,
  },
  {
    alt: "X",
    backgroundClassName: "bg-[#111111]",
    icon: twitterIcon,
  },
  {
    alt: "LinkedIn",
    backgroundClassName: "bg-[#0A66C2]",
    icon: linkedinIcon,
  },
  {
    alt: "Instagram",
    backgroundClassName:
      "bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]",
    icon: instagramIcon,
  },
  {
    alt: "WhatsApp",
    backgroundClassName: "bg-[#25D366]",
    icon: whatsappIcon,
  },
  {
    alt: "Email",
    backgroundClassName: "bg-[#F04E37]",
    icon: mailIcon,
  },
  {
    alt: "Copy link",
    backgroundClassName: "bg-[#3300C9]",
    icon: copyIcon,
  },
] as const;

type JobDetailsScreenProps = {
  params: Promise<{ jobId: string }>;
};

export default async function JobDetailsScreen({
  params,
}: JobDetailsScreenProps) {
  const { jobId } = await params;
  const job = getJobById(jobId);

  if (!job) {
    notFound();
  }

  return (
    <main className="bg-main-bg">
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-9 px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
        <Link
          className="inline-flex w-fit items-center gap-3 text-sm font-medium text-secondary transition hover:text-dark-soft"
          href="/"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Jobs</span>
        </Link>

        <section className="rounded-[1.7rem] border border-[#eceaf5] bg-white px-6 py-7 shadow-[0_16px_40px_rgba(7,10,29,0.06)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-5">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold  text-dark-soft sm:text-[40px]">
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-lg text-secondary/80">
                  <span className="flex items-center gap-2.5">
                    <Image
                      src={companyIcon}
                      alt="Company"
                      width={27}
                      height={27}
                    />
                    {job.company}
                  </span>

                  <span className="flex items-center gap-2.5">
                    <Image src={clockIcon} alt="clock" width={27} height={27} />
                    {job.applicationDeadlineLabel}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <span className="rounded-full bg-[#f3efff] px-5 py-2 text-xs font-medium text-[#8b74eb]">
                  {job.department}
                </span>

                <span className="rounded-full bg-[#f5f0ff] px-5 py-2 text-xs font-medium text-[#b098ff]">
                  {job.type}
                </span>
              </div>
            </div>

            <ApplyNowButton redirectPath={`/jobs/${jobId}`} />
          </div>
        </section>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_17.25rem] lg:gap-10">
          <section className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-[-0.03em] text-dark-soft">
                Description
              </h2>
              <div className="max-w-[48rem] text-base leading-[1.95] text-secondary/80">
                {job.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <h2 className="text-2xl font-bold tracking-[-0.03em] text-dark-soft">
                Requirements
              </h2>

              <ul className="space-y-4 text-base text-secondary/80">
                {job.requirements.map((requirement) => (
                  <li className="flex items-start gap-3" key={requirement}>
                    <Image
                      src={circleCheckIcon}
                      alt="check"
                      width={20}
                      height={20}
                    />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <h2 className="text-2xl font-bold tracking-[-0.03em] text-dark-soft">
                Share this Job
              </h2>

              <div className="flex flex-wrap items-center gap-3">
                {shareLinks.map((shareLink) => (
                  <button
                    aria-label={shareLink.alt}
                    className={`flex items-center justify-center rounded-full`}
                    key={shareLink.alt}
                    type="button"
                  >
                    <Image
                      alt={shareLink.alt}
                      className="h-[40px] w-[40px]"
                      height={20}
                      src={shareLink.icon}
                      width={20}
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-8">
            <section className="rounded-[1.35rem] border border-[#eceaf5] bg-white px-5 py-6 shadow-[0_16px_36px_rgba(7,10,29,0.05)] sm:px-6">
              <h2 className="text-xl font-bold tracking-[-0.03em] text-dark-soft">
                Job Overview
              </h2>

              <dl className="mt-7 space-y-6 text-secondary/75">
                <div className="space-y-1.5">
                  <dt className="text-sm font-medium text-secondary">
                    Employment Type
                  </dt>
                  <dd className="text-sm">{job.employmentType}</dd>
                </div>

                <div className="space-y-1.5">
                  <dt className="text-sm font-medium text-secondary">
                    Cadre Level
                  </dt>
                  <dd className="text-sm">{job.cadreLevel}</dd>
                </div>

                <div className="space-y-1.5">
                  <dt className="text-sm font-medium text-secondary">
                    Salary Range
                  </dt>
                  <dd className="text-sm">{job.salaryRange}</dd>
                </div>

                <div className="space-y-1.5">
                  <dt className="text-sm font-medium text-secondary/85">
                    Application Deadline
                  </dt>
                  <dd className="text-sm">{job.applicationDeadline}</dd>
                </div>
              </dl>
            </section>

            <button
              className="flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl border border-[#ffd8db] bg-white/70 px-4 text-sm font-medium text-[#ff5a60] transition hover:bg-[#fff6f7]"
              type="button"
            >
              <Image src={flagIcon} alt="flag" width={24} height={24} />
              <span>{job.reportLabel}</span>
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
