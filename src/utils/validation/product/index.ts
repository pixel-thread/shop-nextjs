import { z } from "zod";
import { categorySchema } from "../category";

const imagesSchema = z.object({
  thumbnails: z.array(z.string()).optional(),
  previews: z.array(z.string()).optional(),
});

export const productSchema = z.object({
  title: z
    .string({ required_error: "Product Title is required" })
    .min(3, { message: "Product Title must be at least 3 characters long" }),
  reviews: z
    .number({
      message: "Product Review is required",
    })
    .optional(),
  price: z
    .number({ required_error: "Product Price is required" })
    .min(0, { message: "Product Price must be at least 0" }),
  discountedPrice: z
    .number({ required_error: "Product Discounted Price is required" })
    .min(0, { message: "Product Discounted Price must be at least 0" }),
  categories: categorySchema.optional(),
  imgs: imagesSchema.optional(),
});
