import { SuccessResponse } from "@/lib/successResponse";
import { addProduct } from "@/services/product/addProduct";
import { getAllProducts } from "@/services/product/getAllProducts";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { getMeta } from "@/utils/pagination/getMeta";
import { productSchema } from "@/utils/validation/product";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";

    const [product, count] = await getAllProducts({
      where: { deletedAt: null },
    });

    return SuccessResponse({
      data: product,
      status: 200,
      meta: getMeta({ currentPage: page, total: count }),
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = productSchema.parse(await req.json());

    const createdProduct = await addProduct({
      data: {
        title: body.title,
        reviews: body.reviews,
        price: body.price,
        discountedPrice: body.discountedPrice,
        imgs: {
          create: {
            thumbnails: body.imgs?.thumbnails,
            previews: body.imgs?.previews,
          },
        },
        categories: {
          connectOrCreate: {
            where: { title: body.categories.title },
            create: { title: body.categories.title },
          },
        },
      },
    });

    return SuccessResponse({
      status: 200,
      message: "Products inserted successfully",
      data: createdProduct,
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
