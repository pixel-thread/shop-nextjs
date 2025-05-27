import { z } from "zod";

export const cartSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
});
