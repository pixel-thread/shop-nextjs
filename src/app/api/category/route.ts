import { SuccessResponse } from "@/lib/successResponse";
import { createCategory } from "@/services/category/createCategory";
import { getAllCategory } from "@/services/category/getAllCategory";
import { getCategoryByName } from "@/services/category/getCategoryByName";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { requiredAdminMiddleware } from "@/utils/middleware/partnerMiddleware";
import { categorySchema } from "@/utils/validation/category";

export async function GET(req: Request) {
  try {
    requiredAdminMiddleware(req);
    const categories = await getAllCategory();
    return SuccessResponse({ data: categories });
  } catch (error) {
    return handleApiErrors(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = categorySchema.parse(await req.json());
    const isCategoryExist = await getCategoryByName({ name: body.title });

    if (isCategoryExist) {
      return SuccessResponse({
        message: "Category already exist",
        data: isCategoryExist,
      });
    }

    const category = await createCategory({ title: body.title });
    return SuccessResponse({
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
