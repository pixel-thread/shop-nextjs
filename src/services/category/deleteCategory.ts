import { prisma } from "@/lib/db";

type Props = { id: string };

export async function deleteCategory({ id }: Props) {
  return await prisma.category.delete({ where: { id } });
}
