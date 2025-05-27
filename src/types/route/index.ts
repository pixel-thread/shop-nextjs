import { Prisma } from "@/generated/prisma";

export type RoleRoute = {
  url: string;
  role: Prisma.UserCreateInput["role"][];
  redirect?: string;
  needAuth?: boolean;
};
