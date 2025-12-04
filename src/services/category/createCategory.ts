import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";

type Props = {
  data: Prisma.CategoryCreateInput;
};

export async function createCategory({ data }: Props) {
  return await prisma.category.create({ data });
}
