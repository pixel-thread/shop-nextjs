import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";

type AddProductProps = {
  data: Prisma.ProductCreateInput;
};

export async function addProduct({ data }: AddProductProps) {
  return await prisma.product.create({ data });
}
