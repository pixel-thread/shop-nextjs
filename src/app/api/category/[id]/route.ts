import { ErrorResponse } from "@/lib/errorResponse";
import { SuccessResponse } from "@/lib/successResponse";
import { deleteCategory } from "@/services/category/deleteCategory";
import { getCategoryById } from "@/services/category/getCategoryById";
import { updateCategory } from "@/services/category/updateCategory";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { requiredAdminMiddleware } from "@/utils/middleware/partnerMiddleware";
import { categorySchema } from "@/utils/validation/category";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    requiredAdminMiddleware(req);
    const { id } = await params;
    const category = await getCategoryById({ id });

    return SuccessResponse({ data: category });
  } catch (error) {
    return handleApiErrors(error);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    requiredAdminMiddleware(req);
    const body = categorySchema.parse(await req.json());
    const { id } = await params;

    const isCategoryExist = await getCategoryById({ id: id });
    if (!isCategoryExist) {
      return ErrorResponse({
        message: "Category not found",
      });
    }

    const category = await updateCategory({ id, title: body.title });

    return SuccessResponse({
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    requiredAdminMiddleware(req);
    const { id } = await params;
    const isCategoryExist = await getCategoryById({ id: id });
    if (!isCategoryExist) {
      return ErrorResponse({
        message: "Category not found",
      });
    }
    const category = await deleteCategory({ id });
    return SuccessResponse({
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
