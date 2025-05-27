import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";

type Props = {
  where: Prisma.TokenWhereInput;
};

export async function getUnRevokedToken({ where }: Props) {
  return await prisma.token.findFirst({
    where: where,
    orderBy: { createdAt: "desc" },
  });
}
