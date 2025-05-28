import { prisma } from "@/lib/db";

export async function getUserCartItems({ id }: { id: string }) {
  return await prisma.cart.findMany({
    where: { userId: id, quantity: { gt: 0 } },
    include: { product: { include: { imgs: true, categories: true } } },
  });
}
