import { prisma } from "@/lib/db";

type Props = {
  id: string;
};
export async function getCategoryById({ id }: Props) {
  return prisma.category.findUnique({ where: { id } });
}
