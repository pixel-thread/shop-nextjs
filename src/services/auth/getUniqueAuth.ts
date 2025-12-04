import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";

type Props = {
  where: Prisma.AuthWhereUniqueInput;
};

export async function getUniqueAuth({ where }: Props) {
  return await prisma.auth.findUnique({ where, include: { user: true } });
}
