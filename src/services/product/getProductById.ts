import { prisma } from "@/lib/db";

type Props = { id: string };

export async function getProductById({ id }: Props) {
  return prisma.product.findUnique({ where: { id } });
}
