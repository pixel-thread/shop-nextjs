import { prisma } from "@/lib/db";

type Props = {
  userId: string;
  productId: string;
};

export async function getUserWishListProduct({ userId, productId }: Props) {
  return await prisma.wishList.findUnique({
    where: { userId, productId },
  });
}
