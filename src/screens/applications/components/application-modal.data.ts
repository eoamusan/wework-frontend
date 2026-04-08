import type { ApplicationItem } from "../data";

export type ApplicationHistoryState = "completed" | "current" | "pending" | "rejected";
export type ApplicationHistoryAction = "interview" | "offer";

export type ApplicationHistoryEntry = {
  action?: ApplicationHistoryAction;
  description: string;
  state: ApplicationHistoryState;
  timestamp?: string;
  title: string;
};

export type ApplicationStatusTone = "approved" | "interviewing" | "rejected" | "review";

export type ApplicationModalData = {
  history: ApplicationHistoryEntry[];
  statusTone: ApplicationStatusTone;
};

export const modalStatusStyles: Record<ApplicationStatusTone, string> = {
  approved: "bg-[#E7F6EC] text-[#13A452]",
  interviewing: "bg-[#EEE6FF] text-[#5F30FF]",
  rejected: "bg-[#DC35451A] text-danger",
  review: "bg-[#FFF3E2] text-[#F59F0B]",
};

const baseTimestamps = {
  approved: "Dec 20, 2025, 11:47AM",
  interviewing: "Dec 20, 2025, 11:47AM",
  review: "Dec 20, 2025, 11:47AM",
  shortlisted: "Dec 20, 2025, 11:47AM",
  submitted: "Dec 13, 2025, 10:30 AM",
};

function baseProgressHistory(): ApplicationHistoryEntry[] {
  return [
    {
      description: "Your application was received successfully.",
      state: "completed",
      timestamp: baseTimestamps.submitted,
      title: "Application Submitted",
    },
    {
      description: "Recruiting team is reviewing your profile.",
      state: "completed",
      timestamp: baseTimestamps.review,
      title: "Under Review",
    },
    {
      description: "You have been shortlisted for the role.",
      state: "completed",
      timestamp: baseTimestamps.shortlisted,
      title: "Shortlisted",
    },
    {
      action: "interview",
      description: "You have been schedule for an interview.",
      state: "completed",
      timestamp: baseTimestamps.interviewing,
      title: "Interviewing",
    },
    {
      description: "Your application has been approved.",
      state: "pending",
      title: "Approved",
    },
    {
      action: "offer",
      description: "Pending",
      state: "pending",
      title: "Offer Sent",
    },
    {
      description: "Pending",
      state: "pending",
      title: "Offer Accepted",
    },
  ];
}

export function getApplicationModalData(item: ApplicationItem): ApplicationModalData {
  switch (item.status) {
    case "Approved": {
      const history = baseProgressHistory();

      history[4] = {
        description: "Your application has been approved.",
        state: "current",
        timestamp: baseTimestamps.approved,
        title: "Approved",
      };
      history[5] = {
        action: "offer",
        description: "Your offer letter has been sent.",
        state: "completed",
        timestamp: baseTimestamps.approved,
        title: "Offer Sent",
      };

      return { history, statusTone: "approved" };
    }
    case "Interviewing": {
      const history = baseProgressHistory();

      history[3] = {
        action: "interview",
        description: "You have been schedule for an interview.",
        state: "current",
        timestamp: baseTimestamps.interviewing,
        title: "Interviewing",
      };

      return { history, statusTone: "interviewing" };
    }
    case "Rejected":
      return {
        history: [
          {
            description: "Your application was received successfully.",
            state: "completed",
            timestamp: baseTimestamps.submitted,
            title: "Application Submitted",
          },
          {
            description: "Recruiting team is reviewing your profile.",
            state: "completed",
            timestamp: baseTimestamps.review,
            title: "Under Review",
          },
          {
            description: "Your application was not selected.",
            state: "rejected",
            timestamp: baseTimestamps.review,
            title: "Rejected",
          },
        ],
        statusTone: "rejected",
      };
    case "Shortlisted": {
      const history = baseProgressHistory();

      history[2] = {
        description: "You have been shortlisted for the role.",
        state: "current",
        timestamp: baseTimestamps.shortlisted,
        title: "Shortlisted",
      };
      history[3].state = "pending";
      history[3].description = "Pending";

      return { history, statusTone: "review" };
    }
    case "Review": {
      const history = baseProgressHistory();

      history[1] = {
        description: "Recruiting team is reviewing your profile.",
        state: "current",
        timestamp: baseTimestamps.review,
        title: "Under Review",
      };
      history[2].state = "pending";
      history[2].description = "Pending";
      history[3].state = "pending";
      history[3].description = "Pending";

      return { history, statusTone: "review" };
    }
    case "Submitted": {
      const history = baseProgressHistory();

      history[0] = {
        description: "Your application was received successfully.",
        state: "current",
        timestamp: baseTimestamps.submitted,
        title: "Application Submitted",
      };
      history[1].state = "pending";
      history[1].description = "Pending";
      history[2].state = "pending";
      history[2].description = "Pending";
      history[3].state = "pending";
      history[3].description = "Pending";

      return { history, statusTone: "review" };
    }
    case "Draft":
      return {
        history: [
          {
            description: "Your application is still in progress.",
            state: "current",
            timestamp: baseTimestamps.submitted,
            title: "Application Draft",
          },
          {
            description: "Pending",
            state: "pending",
            title: "Application Submitted",
          },
        ],
        statusTone: "review",
      };
    default:
      return {
        history: baseProgressHistory(),
        statusTone: "review",
      };
  }
}
