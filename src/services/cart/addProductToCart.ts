import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";

type Props = {
  data: Prisma.CartUncheckedCreateInput;
};
export async function addProductToCart({
  data: { userId, productId, quantity = 1 },
}: Props) {
  // Check if product is already in cart
  const existingCartItem = await prisma.cart.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (existingCartItem) {
    // Product already in cart → increment quantity
    return await prisma.cart.update({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      data: { quantity: { increment: quantity } },
    });
  }

  // Product not in cart → create new entry
  return await prisma.cart.create({
    data: {
      userId,
      productId,
      quantity,
    },
  });
}
