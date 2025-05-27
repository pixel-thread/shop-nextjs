import { prisma } from "@/lib/db";

type Props = {
  userId: string;
  productId: string;
};
export async function removeAllUserProductFromCart({
  userId,
  productId,
}: Props) {
  return await prisma.cart.deleteMany({
    where: {
      userId: userId,
      productId: productId,
    },
  });
}
