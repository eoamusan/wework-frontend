import { z } from "zod";

export const createCompanyAccountFormSchema = z
  .object({
    companyName: z.string().trim().min(2, "Enter your company name"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
    email: z.email("Enter a valid email address"),
    industryType: z.string().trim().min(2, "Enter your industry type"),
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

export type CreateCompanyAccountFormValues = z.infer<
  typeof createCompanyAccountFormSchema
>;
