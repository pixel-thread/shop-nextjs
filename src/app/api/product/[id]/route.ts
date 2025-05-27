import { prisma } from "@/lib/db";
import { SuccessResponse } from "@/lib/successResponse";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const data = await prisma.product.findUnique({
    where: { id },
    include: { imgs: true },
  });
  return SuccessResponse({
    data: data,
    status: 200,
  });
}
