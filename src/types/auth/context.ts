import { Prisma } from "@/generated/prisma";

export type AuthContextT = {
  user: null | Prisma.UserGetPayload<{
    include: { auth: true; address: true; cart: true };
  }>;
  isSuperAdmin: boolean;
  isAuthLoading: boolean;
  refresh: () => void;
};
