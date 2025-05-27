import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { getPagination } from "@/utils/pagination";

type Props = {
  where?: Prisma.ProductWhereInput;
  page?: string;
};

export async function getAllProducts({ where, page }: Props) {
  const { skip, take } = getPagination({ page });
  return await prisma.$transaction([
    prisma.product.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: { imgs: true },
    }),
    prisma.product.count({
      where,
      orderBy: { createdAt: "desc" },
    }),
  ]);
}
