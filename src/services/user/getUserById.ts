import { prisma } from "@/lib/db";

export async function getUserById({ id }: { id: string }) {
  return await prisma.user.findUnique({
    where: { id },
    omit: { deletedAt: true, updatedAt: true },
    include: {
      cart: true,
      auth: {
        omit: {
          isInternal: true,
          isOtpRevoked: true,
          deletedAt: true,
          createdAt: true,
          updatedAt: true,
          otpExpiresAt: true,
          otp: true,
        },
        include: { tokens: false },
      },
    },
  });
}
