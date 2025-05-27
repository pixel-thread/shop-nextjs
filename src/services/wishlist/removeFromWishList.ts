import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";

type Props = {
  where: Prisma.WishListWhereUniqueInput;
};

export async function removeProductFromWishList({ where }: Props) {
  return await prisma.wishList.delete({ where });
}
