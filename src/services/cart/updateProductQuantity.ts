import { prisma } from "@/lib/db";

type Props = {
  data: {
    userId: string;
    productId: string;
    quantity: number;
  };
};

export async function updateCartProductQuantity({ data }: Props) {
  const existingCartItem = await prisma.cart.findUnique({
    where: {
      userId_productId: {
        userId: data.userId,
        productId: data.productId,
      },
    },
  });

  return await prisma.cart.update({
    where: {
      userId_productId: {
        userId: data.userId,
        productId: data.productId,
      },
    },
    data: {
      quantity: existingCartItem.quantity > 0 ? data.quantity : 0,
    },
  });
}
