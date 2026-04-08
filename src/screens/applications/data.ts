export type ApplicationStatus =
  | "Interviewing"
  | "Rejected"
  | "Shortlisted"
  | "Review"
  | "Approved"
  | "Submitted"
  | "Draft";

export type ApplicationMetric = {
  change: string;
  changeTone: "positive" | "negative";
  title: string;
  value: string;
};

export type ApplicationItem = {
  actionLabel: string;
  company: string;
  dateApplied: string;
  id: string;
  jobTitle: string;
  lastUpdate: string;
  status: ApplicationStatus;
};

export const applicationMetrics: ApplicationMetric[] = [
  {
    change: "+5%",
    changeTone: "positive",
    title: "Total Applications",
    value: "70",
  },
  {
    change: "-2%",
    changeTone: "negative",
    title: "In Progress",
    value: "20",
  },
  {
    change: "+5%",
    changeTone: "positive",
    title: "Approved",
    value: "70",
  },
  {
    change: "+2%",
    changeTone: "positive",
    title: "Rejected",
    value: "50",
  },
];

export const applicationItems: ApplicationItem[] = [
  {
    actionLabel: "Track Status",
    company: "Techflow Company",
    dateApplied: "Dec 13,2025",
    id: "1",
    jobTitle: "Senior Frontend Engineer",
    lastUpdate: "Jan 07,2025",
    status: "Interviewing",
  },
  {
    actionLabel: "Track Status",
    company: "Techflow Company",
    dateApplied: "Dec 13,2025",
    id: "2",
    jobTitle: "Product Designer",
    lastUpdate: "Jan 07,2025",
    status: "Rejected",
  },
  {
    actionLabel: "Track Status",
    company: "Techflow Company",
    dateApplied: "Dec 13,2025",
    id: "3",
    jobTitle: "Marketing Manager",
    lastUpdate: "Jan 07,2025",
    status: "Shortlisted",
  },
  {
    actionLabel: "Track Status",
    company: "Techflow Company",
    dateApplied: "Dec 13,2025",
    id: "4",
    jobTitle: "Backend Developer",
    lastUpdate: "Jan 07,2025",
    status: "Review",
  },
  {
    actionLabel: "Track Status",
    company: "Techflow Company",
    dateApplied: "Dec 13,2025",
    id: "5",
    jobTitle: "Marketing Manager",
    lastUpdate: "Jan 07,2025",
    status: "Approved",
  },
  {
    actionLabel: "Track Status",
    company: "Techflow Company",
    dateApplied: "Dec 13,2025",
    id: "6",
    jobTitle: "Product Designer",
    lastUpdate: "Jan 07,2025",
    status: "Submitted",
  },
  {
    actionLabel: "Continue",
    company: "Techflow Company",
    dateApplied: "Not Submitted",
    id: "7",
    jobTitle: "Customer Success Specialist",
    lastUpdate: "Jan 07,2025",
    status: "Draft",
  },
];
