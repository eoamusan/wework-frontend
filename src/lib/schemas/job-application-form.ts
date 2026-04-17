import { z } from "zod";

import {
  documentsFormSchema,
  jobExperienceFormSchema,
} from "@wew/lib/schemas/profile-forms";

const optionalHtml = z.string().trim();
const optionalString = z.string().trim();

export const jobApplicationPersonalInfoSchema = z.object({
  bio: z.string().trim().min(10, "Tell us a bit more about yourself"),
  emailAddress: z.email("Enter a valid email address"),
  firstName: z.string().trim().min(2, "Enter your first name"),
  lastName: z.string().trim().min(2, "Enter your last name"),
  location: z.string().trim().min(2, "Enter your location"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
});

export const jobApplicationCoverLetterSchema = z
  .object({
    content: optionalHtml,
    fileName: optionalString,
    fileSize: z.number().min(0),
    fileUrl: optionalString,
  })
  .superRefine((value, context) => {
    const htmlText = value.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const hasWrittenCoverLetter = Boolean(htmlText);
    const hasUploadedCoverLetter = Boolean(value.fileUrl && value.fileName);

    if (hasWrittenCoverLetter || hasUploadedCoverLetter) {
      return;
    }

    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Upload a cover letter or write one in the editor",
      path: ["content"],
    });
  });

export const jobApplicationFormSchema = z.object({
  coverLetter: jobApplicationCoverLetterSchema,
  documents: documentsFormSchema,
  jobExperience: jobExperienceFormSchema,
  personalInfo: jobApplicationPersonalInfoSchema,
});

export type JobApplicationFormValues = z.infer<
  typeof jobApplicationFormSchema
>;
