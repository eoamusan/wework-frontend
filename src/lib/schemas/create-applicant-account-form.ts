import { z } from "zod";

export const createApplicantAccountFormSchema = z
  .object({
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
    email: z.email("Enter a valid email address"),
    firstName: z.string().trim().min(2, "Enter your first name"),
    lastName: z.string().trim().min(2, "Enter your last name"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phoneNumber: z
      .string()
      .trim()
      .min(7, "Enter a valid phone number")
      .regex(/^\d+$/, "Phone number should contain only numbers"),
    receiveMarketing: z.boolean(),
    termsAccepted: z.boolean().refine((value) => value, {
      message: "You must agree to the Terms and Condition",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CreateApplicantAccountFormValues = z.infer<
  typeof createApplicantAccountFormSchema
>;
