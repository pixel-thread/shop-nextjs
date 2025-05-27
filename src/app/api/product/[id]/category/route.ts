import { prisma } from "@/lib/db";
import { SuccessResponse } from "@/lib/successResponse";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { requiredAdminMiddleware } from "@/utils/middleware/partnerMiddleware";
import { productCategorySchema } from "@/utils/validation/product/productCategorySchema";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requiredAdminMiddleware(req);
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id: id },
      include: { categories: true },
    });
    return SuccessResponse({ data: product.categories });
  } catch (error) {
    return handleApiErrors(error);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requiredAdminMiddleware(req);

    const { id } = await params;

    const body = productCategorySchema.parse(await req.json());

    const product = await prisma.product.update({
      where: { id: id },
      data: { categories: { connect: { id: body.id } } },
      include: { categories: true },
    });

    return SuccessResponse({
      message: "Product Category added successfully",
      data: product,
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
