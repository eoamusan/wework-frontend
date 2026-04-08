import { z } from "zod";

import {
  documentsFormSchema,
  jobExperienceFormSchema,
} from "@wew/lib/schemas/profile-forms";

export const jobApplicationPersonalInfoSchema = z.object({
  bio: z.string().trim().min(10, "Tell us a bit more about yourself"),
  emailAddress: z.email("Enter a valid email address"),
  firstName: z.string().trim().min(2, "Enter your first name"),
  lastName: z.string().trim().min(2, "Enter your last name"),
  location: z.string().trim().min(2, "Enter your location"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
});

export const jobApplicationFormSchema = z.object({
  documents: documentsFormSchema,
  jobExperience: jobExperienceFormSchema,
  personalInfo: jobApplicationPersonalInfoSchema,
});

export type JobApplicationFormValues = z.infer<
  typeof jobApplicationFormSchema
>;
