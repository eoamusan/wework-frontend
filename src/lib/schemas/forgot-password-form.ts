import { z } from "zod";

export const forgotPasswordFormSchema = z.object({
  email: z.email("Enter a valid email address"),
});

export const verifyOtpFormSchema = z.object({
  otp: z
    .string()
    .trim()
    .min(6, "Enter the 6-digit code")
    .max(6, "Enter the 6-digit code")
    .regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export const resetPasswordFormSchema = z
  .object({
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ForgotPasswordFormValues = z.infer<
  typeof forgotPasswordFormSchema
>;

export type VerifyOtpFormValues = z.infer<typeof verifyOtpFormSchema>;

export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;
