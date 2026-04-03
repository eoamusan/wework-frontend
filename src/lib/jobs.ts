export type JobRecord = {
  applicationDeadline: string;
  applicationDeadlineLabel: string;
  cadreLevel: string;
  company: string;
  department: string;
  description: string[];
  employmentType: string;
  id: string;
  location: string;
  postedAt: string;
  reportLabel: string;
  requirements: string[];
  salaryRange: string;
  summary: string;
  title: string;
  type: string;
};

const defaultDescription = [
  "We are looking for an experienced Senior Software Engineer to join our core product team.",
  "You will be responsible for designing and building scalable backend services and intuitive frontend interfaces.",
  "You will work closely with product managers, designers, and other engineers to deliver high-quality software that solves real problems for our users.",
];

const defaultRequirements = [
  "5+ years of experience with React and Node.js",
  "Strong understanding of distributed systems",
  "Experience with cloud platforms (AWS/GCP)",
  "Excellent communication skills",
  "Bachelor's degree in Computer Science or equivalent",
];

export const jobs: JobRecord[] = Array.from({ length: 6 }, (_, index) => ({
  applicationDeadline: "May 12, 2024.",
  applicationDeadlineLabel:
    index === 0 ? "Deadline: February 5, 2026." : "Deadline: February 18, 2026.",
  cadreLevel: "Senior Management",
  company: "Tech Flow",
  department: "Engineering",
  description: defaultDescription,
  employmentType: "Full Time",
  id: `senior-frontend-engineer-${index + 1}`,
  location: "Lagos, Nigeria",
  postedAt: "Posted Jan16, 2026",
  reportLabel: "Report this post",
  requirements: defaultRequirements,
  salaryRange: "₦15,000,000 - ₦25,000,000",
  summary:
    "We are looking for an experienced Frontend Engineer to lead our core product team. You will be responsible for architecting and building scalable UI components...",
  title: "Senior Frontend Engineer",
  type: "Full Time",
}));

export function getJobById(jobId: string) {
  return jobs.find((job) => job.id === jobId);
}
