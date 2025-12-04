import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { logger } from "@/utils/logger";

type Props = {
  data: Prisma.AuthCreateInput;
};

export async function createUser({ data }: Props) {
  return await prisma.auth.create({ data, include: { user: true } });
}
