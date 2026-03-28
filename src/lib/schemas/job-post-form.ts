import { z } from "zod";

export const jobPostFormSchema = z
  .object({
    department: z.string().min(1, "Please choose a department."),
    email: z.email("Enter a valid email address."),
    jobType: z.enum(["full-time", "part-time"], {
      error: "Choose a job type.",
    }),
    password: z.string().min(8, "Password must be at least 8 characters."),
    phone: z.string().min(7, "Enter a valid phone number."),
  })
  .required();

export type JobPostFormValues = z.infer<typeof jobPostFormSchema>;
