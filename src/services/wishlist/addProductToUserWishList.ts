import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";

type Props = {
  data: Prisma.WishListCreateInput;
};

export async function addProductToUserWishList({ data }: Props) {
  return prisma.wishList.create({ data });
}
