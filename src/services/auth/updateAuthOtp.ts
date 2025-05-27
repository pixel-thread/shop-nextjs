import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";

type Props = {
  where: Prisma.AuthWhereUniqueInput;
  otpCode?: number;
  isOtpRevoked?: boolean;
};
export async function updateAuthOtp({
  isOtpRevoked = false,
  where,
  otpCode,
}: Props) {
  await prisma.auth.update({
    where: where,
    data: {
      otp: Number(otpCode),
      otpExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
      isOtpRevoked: isOtpRevoked || false,
    },
  });
}
