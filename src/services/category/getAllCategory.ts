import { prisma } from "@/lib/db";

export async function getAllCategory() {
  return await prisma.category.findMany();
}
