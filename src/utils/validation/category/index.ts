import { z } from "zod";

export const categorySchema = z.object({
  title: z
    .string({ required_error: "Category Title is required" })
    .min(3, { message: "Category Title must be at least 3 characters long" }),
});
