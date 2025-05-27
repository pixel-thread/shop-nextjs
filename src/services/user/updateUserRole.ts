import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";

type Props = {
  data: {
    userId: string;
    role: Prisma.UserCreateInput["role"];
  };
};

export async function updateUserRole({ data }: Props) {
  return await prisma.user.update({
    where: { id: data.userId },
    data: { role: data.role },
  });
}
