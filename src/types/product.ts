import { Prisma } from "@/generated/prisma";

export type Product = Prisma.ProductGetPayload<{
  include: { imgs: true; category: true };
}>;
