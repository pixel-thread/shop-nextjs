import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";

type Props = {
  where: Prisma.TokenWhereUniqueInput;
  userId?: string;
};
export async function revokeToken({ where, userId }: Props) {
  const now = new Date();
  return await prisma.token.update({
    where: where,
    data: { revoked: true, revokedAt: now, revokedBy: userId },
  });
}
