import { prisma } from "@/lib/db";

export async function getUserWishList({ id }: { id: string }) {
  return await prisma.wishList.findMany({
    where: { userId: id },
    include: { product: { include: { imgs: true, categories: true } } },
  });
}
