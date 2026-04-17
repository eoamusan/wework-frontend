import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) => !value || /^https?:\/\/.+/i.test(value),
    "Enter a valid URL starting with http:// or https://",
  );

export const personalInfoFormSchema = z.object({
  firstName: z.string().trim().min(2, "Enter your first name"),
  lastName: z.string().trim().min(2, "Enter your last name"),
  emailAddress: z.email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  location: z.string().trim().min(2, "Enter your location"),
  jobTitle: z.string().trim().min(2, "Enter your job title"),
  bio: z.string().trim().min(10, "Tell us a bit more about yourself"),
  profilePicture: z.string().trim(),
});

export const jobExperienceItemSchema = z
  .object({
    companyName: z.string().trim().min(2, "Enter a company name"),
    startDate: z.string().min(1, "Select a start date"),
    endDate: z.string(),
    jobTitle: z.string().trim().min(2, "Enter a job title"),
    description: z.string().trim().min(10, "Add a short description"),
    currentlyWorking: z.boolean(),
  })
  .superRefine((value, context) => {
    if (!value.currentlyWorking && !value.endDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Select an end date or mark this role as current",
        path: ["endDate"],
      });
    }

    if (!value.startDate || !value.endDate) {
      return;
    }

    const startDate = new Date(`${value.startDate}T00:00:00`);
    const endDate = new Date(`${value.endDate}T00:00:00`);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime()) ||
      startDate <= endDate
    ) {
      return;
    }

    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Start date cannot be after end date",
      path: ["startDate"],
    });
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "End date cannot be before start date",
      path: ["endDate"],
    });
  });

export const jobExperienceFormSchema = z.object({
  experiences: z
    .array(jobExperienceItemSchema)
    .min(1, "Add at least one job experience"),
  linkedinProfile: optionalUrl,
  portfolioWebsite: optionalUrl,
});

export const documentsFormSchema = z.object({
  resumeUrl: z.string().trim().min(1, "Upload your resume"),
  resumeName: z.string().trim().min(1, "Resume name is required"),
  resumeSize: z.number().min(1, "Resume size is required"),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;
export type JobExperienceFormValues = z.infer<typeof jobExperienceFormSchema>;
export type DocumentsFormValues = z.infer<typeof documentsFormSchema>;
