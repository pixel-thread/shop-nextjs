import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid email" }),
  otp: z
    .string({ required_error: "OTP is required" })
    .regex(/^[0-9]+$/, { message: "Invalid OTP" })
    .min(6, { message: "Min 6 Required" })
    .max(6, { message: "Max 6 Required" })
    .optional(),
});
