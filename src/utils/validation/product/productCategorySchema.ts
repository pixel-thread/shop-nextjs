import { z } from "zod";

export const productCategorySchema = z.object({
  id: z.string().uuid(),
});
