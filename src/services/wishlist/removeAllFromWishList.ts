import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";

type Props = { where: Prisma.WishListWhereInput };

export async function removeAllFromWishList({ where }: Props) {
  return await prisma.wishList.deleteMany({ where });
}
